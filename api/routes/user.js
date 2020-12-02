//importo express
const express = require('express');
//importo il pacchetto router di express
const router = express.Router();
//importo pacchetti mongoose
const mongoose = require('mongoose');
//importo bcrypt per criptare le password degli utenti
const bcrypt = require('bcrypt');
//importo jsonwebtoken
const jwt = require('jsonwebtoken');

//importo lo umodulo user
const User = require('../models/user');
const user = require('../models/user');

//Richiesta POST per l'iscrizione
router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "La mail è già presente nel sistema"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              user.save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "Utente Creato"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });

//Richiesta POST per l'accessso
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(404).json({
                message: 'Autenticazione fallita'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Autenticazione fallita'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Autenticazione riuscita',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Autenticazione fallita'
            });
        }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
});

//Richiesta Delete
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
                message: "Utente eliminato"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });

module.exports = router;