//importo pacchetti http da node.js
const http = require('http');
//importo app
const app = require('./app');
//imposta la porta del server
const port = process.env.PORT || 3000;
//il server viene creato
const server = http.createServer(app);
//il server si mette in ascolto sulla porta 3000
server.listen(port);