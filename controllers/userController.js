const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        return res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    return res.json({ message: "Register the user" });
};

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "All fields are mandatory!"
        })
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({
            success: false,
            message: "Invalid password or email"
        })
    }

    // Compare password with hashedPassword
    const isValidPassword = await bcrypt.compare(password, user.password)
  
    if (!isValidPassword) {
        return res.status(404).send({
            success: false,
            message: "Invalid password or email"
        })
    }

    const accessToken = jwt.sign({
        user: {
            user: user.username,
            email: user.email,
            id: user.id,
        },
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    );

    res.status(200).json({ accessToken });

};

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = async (req, res) => {
    res.json({ message: "Current user information" });
};


module.exports = { registerUser, loginUser, currentUser };