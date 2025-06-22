const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        // Support configuring the connection string through environment
        // variables.  This makes it easier to spin up the bot with a new
        // database without touching the source code.
        const { mongoURI } = require('../config');

        mongoose.connect(mongoURI, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection successfully opened!');
        });
        
        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n ${err.stack}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });
    }
};