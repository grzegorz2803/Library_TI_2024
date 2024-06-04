// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();

app.use(bodyParser.json());

// Importowanie modeli
const User = require('./models/User');
const Book = require('./models/Book');
const Loan = require('./models/Loan');
const Reservation = require('./models/Reservation');
const Log = require('./models/Log');

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
