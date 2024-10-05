//import express
const express = require('express');

//import validationResult from express-validator
const { validationResult } = require('express-validator');

//import bcrypt
const bcrypt = require('bcryptjs');

//import prisma client
const prisma = require('../prisma/client');

//function register
const register = async (req, res) => {

    //periksa hasil validasi
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            succes: false,
            Message: 'Validation error',
            errors: errors.array(),
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        //insert data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: "Register succesfully",
                password: hashedPassword,
            },
        });

        //return response json
        res.status(201).send({
            succes: true,
            message: 'Register succesfully',
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            succes: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {register};