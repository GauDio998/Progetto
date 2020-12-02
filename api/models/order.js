//per definire come dovrebbe apparire l'ordine nella mia applicazione
//importo pacchetti mongoose
const mongoose = require('mongoose');

//schema dell'ordine e come dovrà essere configurato il modello dell'ordine
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1}
});

//esporta lo schema dell'ordine
module.exports = mongoose.model('Order', orderSchema);