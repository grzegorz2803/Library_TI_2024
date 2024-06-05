const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');

// Pobieranie wszystkich zarezerwowanych książek przez użytkownika
router.get('/:login', async (req, res) => {
    try {
        const { login } = req.params;

        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        const reservations = await Reservation.findAll({
            where: { id_user: user.id_user },
            include: [{ model: Book }]
        });

        const result = reservations.map(reservation => {
            const reservationDate = new Date(reservation.reservation_date);
            const timeToBorrow = Math.max(0, 3 - Math.floor((new Date() - reservationDate) / (1000 * 60 * 60 * 24))); // w dniach
            return {
                book: reservation.Book,
                reservation_date: reservation.reservation_date,
                time_to_borrow: `${timeToBorrow} dni`
            };
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});
// endpoint do rezerwacji książki
router.post('/', async (req, res) => {
    try {
        const { login, id_book } = req.body;

        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        const book = await Book.findOne({ where: { id_book } });
        if (!book) {
            return res.status(404).json({ message: 'Książka nie znaleziona' });
        }


        const newReservation = await Reservation.create({
            id_user: user.id_user,
            id_book: book.id_book,
            reservation_date: new Date(),
            status: 'zarezerwowana'
        });

        book.availablity = 'zarezerwowana';
        await book.save();

        res.status(201).json({ message: 'Rezerwacja zakończona sukcesem', reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd', error: error.message });
    }
});
module.exports = router;