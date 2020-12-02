//importo pacchetti  express
const express = require('express');
const app = express();
//importo pacchetti morgan
const morgan = require('morgan');
//importo pacchetti body-parser per analizzare il corpo di una richiesta
const bodyParser = require('body-parser');
//importo pacchetti mongoose per integrazione con MongoDB
const mongoose = require('mongoose');

//importo productRoutes che richiede ./api/routes/products
const productRoutes = require('./api/routes/products');
//importo ordersRoutes che richiede ./api/routes/order
const orderRoutes = require('./api/routes/orders');
//importo userRoutes che richiede ./api/routes/user
const userRoutes = require('./api/routes/user');

//collego il database alla mia applicazione
mongoose.connect("mongodb+srv://node-rest-shop:" + 
    process.env.MONGO_ATLAS_PW + 
    "@cluster0.yf7vw.mongodb.net/<dbname>?retryWrites=true&w=majority", 
    {
        useMongoClient: true
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//persorsi che devono gestire le richieste
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//gestione degli errori 
app.use((req, res, next) => {
    const error = new Error('Non trovato');
    error.status = 404;
    next(error);
})

//gestione degli errori
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;