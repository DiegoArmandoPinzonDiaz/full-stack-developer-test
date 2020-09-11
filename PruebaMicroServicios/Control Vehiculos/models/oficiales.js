'use strict'

var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var OficialesSchema = Schema({
    placa: {
        type: String,
        required: true
      },
      hora_entrada: {
        type: Date,
        required: true
      },
      hora_salida: {
        type: Date,
        required: true
      }
}, {
    collection: 'oficiales'
});

module.exports = mongoose.model('Oficiales', OficialesSchema);