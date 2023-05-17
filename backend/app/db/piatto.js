/**
 * Schema del modello Piatto
 */

var mongoose = require("mongoose");

var SchemaPiatto = new mongoose.Schema({
  id: Number,
  nome: String,
  prezzo: Number,
  disponibile: Boolean,
  descrizione: String,
  allergeni: [String],
  ingredientiModificabili: [String],
});


// Getter per il prezzo
SchemaPiatto.path('prezzo').get(function (num) {
  return (num / 100).toFixed(2);
});

// Setter per il prezzo
SchemaPiatto.path('prezzo').set(function (num) {
  return num * 100;
});

var Piatto = mongoose.model('Plate', SchemaPiatto);

module.exports = {
  Piatto: Piatto
}