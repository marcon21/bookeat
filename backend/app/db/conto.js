/**
 * Schema del modello Conto
 */

var mongoose = require("mongoose");

var SchemaConto = new mongoose.Schema({
    idUtente: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    nCoperti: {
        type: Number,
        required: true,
        min: 0,
        validate: { validator: Number.isInteger, }
    },
    portate: {
        type: Array,
        required: true,
    },
});

var Conto = mongoose.model('Conto', SchemaConto);

module.exports = {
    Conto: Conto
};

