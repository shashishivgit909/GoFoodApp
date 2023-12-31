

// export default router;
const express = require('express'); //express is biulin module so just give its name in require ,not path
const User = require('../models/User.js'); //it is file so give its path
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); //Note: all opreation of bcrypt is asynchronous so we use await to handle them
const jwt=require("jsonwebtoken"); //we apply json web token on sucessfull login
const jwtsecret="mynameisshashikalwar"; //this is not known to user
const router = express.Router(); // we can use app=express()

// Add express.json() middleware to parse JSON data from the request body
router.use(express.json());

router.post(
    '/signup',
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
        //bcrypt  is mostly  used lib. for generating hasing 
        //genearting hascode process using salt also steps and then we  send hased password to databse insted of simpem password which comess from req,body: steps:
        const salt=await bcrypt.genSalt(10); //geneate salt for random(we can use any no)value 10. 
        const secPassword=await bcrypt.hash(req.body.password , salt);//here 1st param: which we want to gen hash , 2nd par: salt , Now we use thic secPassword below t send to database.
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
               // password: req.body.password, Note: for passwaord: 98765 , password stored in backend due to hash look as: "$2b$10$CB/aJPqhNaqDguRrwBjVJOSaBLtMxNULXRHW5G3v5NtI9xv5PN./O"
               password:secPassword
            });

            res.status(201).json({ success: true, user }); // Respond with the created user
        } catch (error) {
            console.error(error);
            res.status(500)({ success: false, error: 'Server error' });
        }
    }
);


router.post('/loginuser', async (req, res) => {
    try {
      // Check if the user with the provided email exists in the database
      const userData = await User.findOne({ email: req.body.email });
  
      if (!userData) {
        return res.status(401).json({ message: 'Email not found' });
      }
  
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
        //console.log(passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // If email and password are valid, create a JWT token
      const data = {
        user: {
          id: userData.id,
        },
      };
  
      // Sign the JWT token with a secret key
      const authToken = jwt.sign(data, jwtsecret);
  
      // Respond with a success message and the token
      return res.status(200).json({ message: 'Login successful', authToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Servererror: error.message }); // Use error.message to include the specific error message
    }
  });
  

module.exports = router;
