
var mongoose = require('mongoose');
const moment= require('moment') 
const modelVehiculo = require('../../models/vehiculo');
const listaTiposVehiculos = ['PARTICULAR', 'OFICIAL', 'RESIDENTE']

'use strict';

module.exports = function (app, express) {
    var apiRouter = express.Router()
    apiRouter.route('/entrada')
    .put(async (req, res) => {
        let nuevoRegistro  = req.body;
        if (!nuevoRegistro.hasOwnProperty('placa')) {
                return res.status(400).json({msg:'El objeto recibido no tiene todos los elementos necesarios.'})
            }

        let vehiculoRepetido = await modelVehiculo.findOne({placa:nuevoRegistro.placa});
        if (!vehiculoRepetido) {
            return res.status(400).json({msg:'El vehículo con placa '+ nuevoRegistro.placa + ' no existe.'})
        } else if (vehiculoRepetido.adentro) {
            return res.status(400).json({msg:'El vehículo con placa '+ nuevoRegistro.placa + ' ya esta registrado su ingreso.'})
        }

        let vehiculos = await modelVehiculo.update({_id:vehiculoRepetido._id},{
            $set: {
                hora_entrada : Date.now(),
                adentro: true
        }})
        if (vehiculos) {
            return res.status(200).json({msg:'Se registro la entrada del vehículo.'})
        } else {
            return res.status(400).json({msg:'Error al guardar los vehículos'})
        }
    })
    return apiRouter;
}