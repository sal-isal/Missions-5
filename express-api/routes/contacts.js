const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

/**
 * INDEX CONTACTS
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM contacts ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Contacts',
                data: rows
            })
        }
    });
});

/**
 * STORE CONTACTS
 */
 router.post('/store', [

    //validation
    body('nama').notEmpty(),
    body('noHp').notEmpty(),
    body('email').notEmpty(),
    body('alamat').notEmpty(),
    body('foto').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        nama: req.body.nama,
        noHp: req.body.noHp,
        email: req.body.email,
        alamat: req.body.alamat,
        foto: req.body.foto
    }

    // insert query
    connection.query('INSERT INTO contacts SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                error: err
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW CONTACTS
 */
 router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM contacts WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if contact not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Contact Not Found!',
            })
        }
        // if contact found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Contact',
                data: rows[0]
            })
        }
    })
});

/**
 * UPDATE CONTACT
 */
 router.patch('/update/:id', [

    //validation
    body('nama').notEmpty(),
    body('noHp').notEmpty(),
    body('email').notEmpty(),
    body('alamat').notEmpty(),
    body('foto').notEmpty()

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id contact
    let id = req.params.id;

    //data contact
    let formData = {
        nama: req.body.nama,
        noHp: req.body.noHp,
        email: req.body.email,
        alamat: req.body.alamat,
        foto: req.body.foto
    }

    // update query
    connection.query(`UPDATE contacts SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                error: err
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

/**
 * DELETE CONTACT
 */
 router.delete('/delete/(:id)', function(req, res) {

    let id = req.params.id;
     
    connection.query(`DELETE FROM contacts WHERE id = ${id}`, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

module.exports = router;