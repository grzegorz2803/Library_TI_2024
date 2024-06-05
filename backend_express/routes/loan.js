const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Op } = require('sequelize');

// Pobieranie wszystkich wypożyczonych, ale nie oddanych książek, posortowanych w kolejności od najkrótszego czasu do oddania
router.get('/borrowed', async (req, res) => {
    try {
        // Pobranie wszystkich wypożyczonych, ale nie oddanych książek
        const loans = await Loan.findAll({
            where: {
                return_date: {
                    [Op.is]: null
                }
            },
            include: [
                { model: Book },
                { model: User }
            ]
        });

        // Obliczenie czasu do oddania i sortowanie
        const result = loans.map(loan => {
            const loanDate = new Date(loan.loan_date);
            const returnDeadline = new Date(loanDate);
            returnDeadline.setDate(returnDeadline.getDate() + 30);
            const timeToReturn = Math.floor((returnDeadline - new Date()) / (1000 * 60 * 60 * 24)); // w dniach

            return {
                book: loan.Book,
                user: {
                    name: loan.User.name,
                    lastName: loan.User.lastName
                },
                loan_date: loan.loan_date,
                time_to_return: `${timeToReturn} dni`
            };
        });

        // Sortowanie wyników
        result.sort((a, b) => a.time_to_return - b.time_to_return);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});
router.get('/:login', async (req, res) => {
    try {
        const { login } = req.params;

        // Znalezienie użytkownika na podstawie loginu
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        // Pobranie wypożyczonych, ale nie oddanych książek przez użytkownika
        const loans = await Loan.findAll({
            where: {
                id_user: user.id_user,
                return_date: {
                    [Op.is]: null
                }
            },
            include: [{ model: Book }]
        });

        // Obliczenie czasu do oddania
        const result = loans.map(loan => {
            const loanDate = new Date(loan.loan_date);
            const timeToReturn = Math.max(0, 30 - Math.floor((new Date() - loanDate) / (1000 * 60 * 60 * 24))); // w dniach
            return {
                book: loan.Book,
                loan_date: loan.loan_date,
                time_to_return: `${timeToReturn} dni`
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});

router.get('/returned/:login', async (req, res) => {
    try {
        const { login } = req.params;

        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        // Pobranie oddanych książek przez użytkownika
        const loans = await Loan.findAll({
            where: {
                id_user: user.id_user,
                return_date: {
                    [Op.not]: null
                }
            },
            include: [{ model: Book }]
        });

        const result = loans.map(loan => {
            return {
                book: loan.Book,
                loan_date: loan.loan_date,
                return_date: loan.return_date
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});
router.post('/borrow', async (req, res) => {
    try {
        const { id_book, name, lastName } = req.body;

        // Znalezienie użytkownika na podstawie imienia i nazwiska
        const user = await User.findOne({ where: { name, lastName } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        // Znalezienie książki na podstawie id_book
        const book = await Book.findOne({ where: { id_book } });
        if (!book) {
            return res.status(404).json({ message: 'Książka nie znaleziona' });
        }



        // Tworzenie nowego wpisu wypożyczenia
        const newLoan = await Loan.create({
            id_user: user.id_user,
            id_book: book.id_book,
            loan_date: new Date()
        });

        // Zmiana statusu książki na "wypożyczona"
        book.availablity = 'wypożyczona';
        await book.save();

        res.status(201).json({ message: 'Książka została wypożyczona', loan: newLoan });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});
// Zwracanie książki na podstawie id_book
router.post('/return', async (req, res) => {
    try {
        const { id_book } = req.body;

        // Znalezienie książki na podstawie id_book
        const book = await Book.findOne({ where: { id_book } });
        if (!book) {
            return res.status(404).json({ message: 'Książka nie znaleziona' });
        }

        // Sprawdzenie, czy książka jest wypożyczona
        const loan = await Loan.findOne({
            where: {
                id_book: id_book,
                return_date: {
                    [Op.is]: null
                }
            }
        });

        if (!loan) {
            return res.status(409).json({ message: 'Książka nie jest wypożyczona' });
        }

        // Dodanie daty oddania
        loan.return_date = new Date();
        await loan.save();

        // Zmiana statusu książki na "dostępna"
        book.availablity = 'dostępna';
        await book.save();

        // Obliczenie kwoty za zwłokę (2 zł za każdy dzień zwłoki)
        const loanDate = new Date(loan.loan_date);
        const returnDate = new Date(loan.return_date);
        const daysLate = Math.floor((returnDate - loanDate) / (1000 * 60 * 60 * 24)) - 30; // 30 dni na zwrot
        const lateFee = daysLate > 0 ? daysLate * 2 : 0;

        res.status(200).json({ message: 'Książka została zwrócona', lateFee: `${lateFee} zł` });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});

module.exports = router;

module.exports = router;