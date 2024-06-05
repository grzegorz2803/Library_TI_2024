const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Reservation = require('../models/Reservation');
const { Op } = require('sequelize');
// Pobieranie wszystkich zarezerwowanych książek przez użytkownika
router.get('/:login', async (req, res) => {
    try {
        const { login } = req.params;

        // Znalezienie użytkownika na podstawie loginu
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }

        // Pobranie zarezerwowanych książek przez użytkownika
        const reservations = await Reservation.findAll({
            where: { id_user: user.id },
            include: [{ model: Book }]
        });

        // Obliczenie czasu do wypożyczenia
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

module.exports = router;