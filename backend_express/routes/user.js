const express  = require('express');
const bcrypt = require('bcrypt');
const  router = express.Router();
const User = require('../models/User');
const Log = require('../models/Log');

// rejestraca usera
router.post('/register', async (req, res)=>{
    try{
        const {login, password, email, name, lastName, addres} = req.body;
        const role = 'reader';
        const existingUser = await  User.findOne({where:{login}});
        if(existingUser){
            return res.status(409).json({message: 'Login już istnieje'});
        }
        const  hashedPassword = await  bcrypt.hash(password,10);
        const  newUser = await User.create({login, password: hashedPassword, email, role, name, lastName,addres});
        res.status(201).json({message: 'Rejestracja zakończona sukcesem'});

    }catch (error){
        res.status(500).json({message: error.message});
    }
});
//logowanie usera
router.post('/login', async (req, res)=>{
    try{
        const {login, password} = req.body;
        const user = await User.findOne({where:{login}});
        if (!user){
            return res.status(401).json({message: 'Błędny login lub hasło'});
        }
        const  isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid){
            return res.status(401).json({message: 'Błędny login lub hasło'});
        }
        const logEntry  = await Log.create({id_user: user.id_user, action: 'log in', timestamp: new Date()});
        if (!logEntry) {
            return res.status(500).json({ message: 'Wystąpił błąd przy logowaniu' });
        }
        const userData = {...user.get(), password:undefined};
        res.status(200).json(userData);
    }catch (error){
        res.status(500).json({message:'Wystąpił bład',error:error.message});
    }
});
// wyświetlanie wszytskich userów
router.get('/', async (req, res)=>{
   try{
       const users = await User.findAll();
       res.status(200).json(users);
   } catch (error){
       res.status(500).json({message: 'Wystąpił bład', error:error.message});
   }
});
module.exports =router;