const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');
const { Op } = require('sequelize');


// zwaraca wypożyczone ale nie oddane książki
router.get('/:login', async (req, res) => {
    try {
        const { login } = req.params;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        const loans = await Loan.findAll({
            where: {
                id_user: user.id_user,
                return_date: {
                    [Op.is]: null
                }
            },
            include: [{ model: Book }]
        });

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
// zwraca książki oddane
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


module.exports = router;