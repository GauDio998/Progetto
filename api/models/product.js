//per definire come dovrebbe apparire il prodotto nella mia applicazione
//importo pacchetti mongoose
const mongoose = require('mongoose');

//schema del prodotto e come dovrà essere configurato il modello del prodotto
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: Number, required: true}
});

//esporto lo schema del prodotto
module.exports = mongoose.model('Product', productSchema);