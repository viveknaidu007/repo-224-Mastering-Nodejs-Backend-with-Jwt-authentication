const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')
const User = require('../models/User')

const router = express.Router();

const JWT_SECRET = 'Akasam_Neelam_ga_undi'

router.post('/register',[
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],

async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty){
        return res.status(400).json({error:errors.array()})
    }

    const {userName,email,password} = req.body;

    try {

        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(400).json("user already exist")
        }

        //Hash the password
//hello
//ttttt->12kl76543127
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(password,salt);

        const newUser = new User({
            userName,
            email,
            password:hashedPasword
        })
        const createdUser = await newUser.save();
       res.status(200).json(createdUser)
        
    } catch (error) {

        console.log(error)
        
    }

}

);

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const {email,password} = req.body;

        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json("Please check your email its invalid")
            }
            const isMatch = await bcrypt.compare(password,user.password)
            console.log(isMatch)
            if(!isMatch){
                return res.status(400).json("In Valid Password")

            }
// send a JWT token
               
            const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'})

            console.log(token)

           res.status(200).json({message:"Login Successful",token})

        } catch (error) {

            res.status(400).json({ error: `Failed to log in: ${error.message}` });
        }
    }
)

module.exports = router;

//JWT token->
//LOgin -> long string -> unique 