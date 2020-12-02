//per definire come dovrebbe apparire il prodotto nella mia applicazione
//importo pacchetti momgoose
const mongoose = require('mongoose');

//schema dell'utente e come dovrà essere configurato il modello dell'utente + codifica della password
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: { type: String, required: true}
});

//esporta lo schema dell'utente
module.exports = mongoose.model('User', userSchema);