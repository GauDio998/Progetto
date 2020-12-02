//importo express
const express = require('express');
//importo il pacchetto router di express
const router = express.Router();
//importo pacchetti mongoose
const mongoose = require('mongoose');

//importo il modello degli ordini dalla cartella models
const Order = require('../models/order');
const product = require('../models/product');
const Product = require('../models/product');

//uso router per registrare percorsi differenti
//i percorsi delle richieste sono specificate in app.js
//Richiesta GET
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Richiesta POST
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: "Prodotto non trovato"
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Ordine ricevuto',
            createOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Richiesta GET su un singolo ordine
router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: 'Ordine non trovato'
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Richiesta Delete
router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Ordine eliminato',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: { productId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;