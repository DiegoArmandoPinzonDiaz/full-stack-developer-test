'use strict'

var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var VehiculoSchema = Schema({
    placa: {
        type: String,
        required: true
      },
      tipo: {
        type: String,
        required: true
      },
      tiempo_acu: {
        type: Number,
        required: true
      },
      hora_entrada: {
        type: Date,
        required: true
      },
      adentro: {
        type: Boolean,
        require: false
      }
}, {
    collection: 'vehiculo'
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);