# Progetto piattaforme digitali per la gestione del territorio
Giammarco Gaudini - Matricola N°285766
# Descrizione
Creazione di una rest api di un semplice negozio

# Architettura
Il codice è scritto interamente in javascript. Le informazioni vengono acquisite e immagazzinate in un database (fornito da MongoDB). Per integrare il database è stato usato mongoose ovvero una serie di pacchetti che consentono di definire gli oggetti del database attraverso uno schema prefissato. E' stato usato il framework Express per Node.js.
# server.js
File che crea un server locale, esso userà la porta 3000 e si mette in ascolto su essa.
# app.js
Questo file serve per gestire tutte le richieste fatte dall'utente in maniera efficiente.
Vengono importti tutti i pacchetti necessari per il corretto funzionamento del sistema. Avviene il collegamento con il database esterno (MongoDB), e vengono dichiarati i percorsi che devono gestire le richieste. Infine avviene la gestione degli errori globali.


