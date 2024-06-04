const express  = require('express');
const  router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res)=>{
    try{
        const {login, password, email, name, lastName, addres} = req.body;
        const role = 'reader';
        const  newUser = await User.create({login, password, email, role, name, lastName,addres});
        res.status(201).json(newUser);

    }catch (error){
        res.status(500).json({message: error.message});
    }
});
module.exports =router;