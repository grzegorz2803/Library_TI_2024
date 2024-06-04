// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Ustaw na true, jeśli używasz HTTPS
}));

// Importowanie modeli
const User = require('./models/User');
const Book = require('./models/Book');
const Loan = require('./models/Loan');
const Reservation = require('./models/Reservation');
const Log = require('./models/Log');
const  userRoutes = require('./routes/user');
const  bookRoutes = require('./routes/book');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// Endpoint testowy połączenia z bazą danych
app.get('/test-db-connection', async (req, res) => {
    try {
        await sequelize.authenticate();
        const users = await User.findAll();
        res.status(200).json({
            message: 'Połączenie z bazą danych działa',
            users: users
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({
            message: 'Nie udało się połączyć z bazą danych',
            error: error.message
        });
    }
});

// Synchronizacja modeli z bazą danych
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Eksportowanie aplikacji dla testów
