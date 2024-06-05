const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const Book = require('../models/Book');

// dodawanie książki
router.post('/', async (req, res)=>{
   try{
       const {id_book, ISBN, title, author, genre, year, description, imageUrl} = req.body;
       const availablity = 'dostępna';
       const existingBook = await Book.findOne({ where: { id_book } });
       if (existingBook) {
           return res.status(409).json({ message: 'Książka z takim numerem bibliotecznym już istnieje' });
       }
       const newBook = await Book.create({id_book, ISBN, title,author,genre,year,availablity,description,imageUrl});
       res.status(201).json({message: 'Książka została dodana'});
   } catch (error){
       res.status(500).json({message: 'wystąpił błąd', error: error.message});
   }
});

//pobieranie wszytskich dostępnych książek
router.get('/', async (req,res)=>{
   try{
       const books = await Book.findAll();
       res.status(200).json(books);

   } catch (error){
       res.status(500).json({message: 'Wystąpił błąd', error:error.message});
   }
});
// zwaraca dostępne książki
router.get('/available', async (req,res)=>{
    try{
        const books = await Book.findAll({where:{availablity: 'dostępna'}});
        res.status(200).json(books);

    } catch (error){
        res.status(500).json({message: 'Wystąpił błąd', error:error.message});
    }
});

// szukanie książki według kryteriów
router.get('/search', async (req,res)=>{
   try{
       const {title, author, genre} = req.query;
       const criteria = {
           availablity: 'dostępna',
           ...(title && {title:{[Op.like]:`%${title}%`}}),
           ...(author &&{author: {[Op.like]: `%${author}%`}}),
           ...(genre &&{genre: {[Op.like]: `%${genre}%`}})
       };
       const books = await Book.findAll({where: criteria});
       res.status(200).json(books);
   } catch (error){
       res.status(500).json({message: 'Wystąpił błąd',error:error.message});
   }
});
module.exports= router;