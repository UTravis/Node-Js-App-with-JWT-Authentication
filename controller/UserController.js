const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { registrationValidation, loginValidation } = require("../validate");


const registration = async (req, res) => {
    //validating the registration details
    const { error } = await registrationValidation.validate(req.body);
    if(error) return res.status(404).json(error.details[0].message)

    //checking if email already exists
    const isUser = await User.findOne({email : req.body.email})
    if(isUser) return res.status(409).json({loginErr: "Email already exists"});

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    try {
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
        await newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).json(error)
    }
}

const login =  async (req, res) => {
    //validating the login details
    const { error } = await loginValidation.validate(req.body)
    if(error) return res.status(409).json(error.details[0].message)

    //retrieving user
    const user = await User.findOne({email : req.body.email})
    if(! user) return res.status(404).json({loginErr: "Email not found"});

    //comparing passwords
    const isPass = await bcrypt.compare(req.body.password, user.password);
    if(! isPass) return res.status(404).json({loginErr: "Password not correct"});

    //creating token for user
    const token = await jwt.sign({_id : user._id}, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
    res.header('Authorization', token).status(200).json({
        name : user.name,
        email : user.email,
        _token : token
    })
}

module.exports.registration = registration;
module.exports.login = login;