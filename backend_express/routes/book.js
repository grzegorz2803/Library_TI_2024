const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// dodawanie książki
router.post('/', async (req, res)=>{
   try{
       const {title, author, genre, year, description, imageUrl} = req.body;
       const availablity = 'dostępna';
       const newBook = await Book.create({title,author,genre,year,availablity,description,imageUrl});
       res.status(201).json({message: 'Książka została dodana'});
   } catch (error){
       res.status(500).json({message: 'wystąpił błąd', error: error.message});
   }
});
module.exports= router;