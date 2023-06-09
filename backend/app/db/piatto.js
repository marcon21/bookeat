/**
 * Schema del modello Piatto
 */

var mongoose = require("mongoose");

var SchemaPiatto = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  prezzo: {
    type: Number,
    required: true,
    min: 0,
    validate: { validator: Number.isInteger },
  },
  categoria: {
    type: Map,
    of: String,
    required: true,
  },
  disponibile: {
    type: Boolean,
    required: true,
  },
  descrizione: {
    type: String,
    required: true,
  },
  allergeni: [String],
  ingredientiModificabili: [String],
});

var Piatto = mongoose.model("Plate", SchemaPiatto);

module.exports = {
  Piatto: Piatto,
};
