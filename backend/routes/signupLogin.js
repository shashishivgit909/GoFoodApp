// import express from "express";
// import User from "../models/User.mjs";
// import { body, validationResult } from "express-validator";

// const router = express.Router();

// // Add express.json() middleware to parse JSON data from the request body
// router.use(express.json());

// //Adv: to use validation as middleware is that if any input data donot meet validation then API will not work and  so below data will not be stored
// router.post("/createuser",  //here validation is applied as middleware to API in []: 
//     [
//         body('name').isLength({ min: 5 }),
//         body('password',"invalid password").isLength({ min: 5 }),
//         body('email').isEmail()
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() }); // Use res.status to set the response status code
//         }
//         console.log("insode async")
//         try {
//             //console.log("inside try")
//             await User.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 location: req.body.location,
//                 password: req.body.password
//             });
//         // console.log("below creation")
//             res.status(202).json({ success: true }); // Use res.status to set the response status code
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ success: false, error: "Server error" }); // Use res.status to set the response status code
//         }
//     });

// export default router;
const express = require('express');
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');


const router = express.Router();

// Add express.json() middleware to parse JSON data from the request body
router.use(express.json());

router.post(
    '/createuser',
    [
        body('name').isLength({ min: 5 }),
        body('password', 'Invalid password').isLength({ min: 5 }),
        body('email').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: req.body.password,
            });

            res.status(201).json({ success: true, user }); // Respond with the created user
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Server error' });
        }
    }
);

// Endpoint or API for login
router.post('/loginuser', async (req, res) => {
    try {
        // Validate email and password inputs (using express-validator)

        // Check if the user with the provided email exists in the database
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'Email not found' });
        }

        // Compare the provided password with the hashed password in the database
        if(!(user.password===req.body.password))  {
                 return res.status(401).json({ message: 'Invalid password' });
            }
        else{
            return res.status(200).json({ message: 'Login successful' });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
