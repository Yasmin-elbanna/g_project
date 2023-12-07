const {check}=require("express-validator")
const User=require('../models/userModel')
const apierror=require('../errors/apierror')
const signupValidate=[check('username').notEmpty().withMessage("please entre your username").isLength({min:4}).withMessage("Invalid username")
    ,
    check('email').notEmpty().withMessage("please entre your email").isEmail().withMessage("Invalid email").custom(async (email) => {
        const existingUser = await User.find({ email })
             
        if (existingUser) {
            throw new apierror('Email already in use',400)
        }
    })
    ,check('password').notEmpty().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/).withMessage("Invalid password")];


const loginValidate=[check('email').notEmpty().withMessage('please entre email').isEmail().withMessage('Invalid email'),
check('password').notEmpty().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/).withMessage("Invalid password")];
module.exports={signupValidate,loginValidate}
    