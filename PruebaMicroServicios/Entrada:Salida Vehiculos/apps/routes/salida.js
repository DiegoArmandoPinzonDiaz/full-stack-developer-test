
var mongoose = require('mongoose');
const moment= require('moment') 
const modelVehiculo = require('../../models/vehiculo');
const modelOficiales = require('../../models/oficiales');
const listaTiposVehiculos = ['PARTICULAR', 'OFICIAL', 'RESIDENTE']

'use strict';

module.exports = function (app, express) {
    var apiRouter = express.Router()
    apiRouter.route('/salida')
    .put(async (req, res) => {
        let nuevoRegistro  = req.body;
        if (!nuevoRegistro.hasOwnProperty('placa')) {
                return res.status(400).json({msg:'El objeto recibido no tiene todos los elementos necesarios.'})
            }

        let vehiculoRepetido = await modelVehiculo.findOne({placa:nuevoRegistro.placa});
        if (!vehiculoRepetido) {
            return res.status(400).json({msg:'El vehículo con placa '+ nuevoRegistro.placa + ' no existe.'})
        } else if (!vehiculoRepetido.adentro) {
            return res.status(400).json({msg:'El vehículo con placa '+ nuevoRegistro.placa + ' no se encuentra en el estacionamiento.'})
        }

        let diferenciaTiempo = moment( Date.now()).diff(moment(vehiculoRepetido.hora_entrada), 'm')
        let vehiculos = await modelVehiculo.update({_id:vehiculoRepetido._id},{
            $set: {
                tiempo_acu : diferenciaTiempo + vehiculoRepetido.tiempo_acu,
                adentro: false
        }})

        if (vehiculoRepetido.tipo === 'OFICIAL') {
            let vehiculoOficial = await modelOficiales.insertMany({
                placa:vehiculoRepetido.placa,
                hora_entrada:vehiculoRepetido.hora_entrada,
                hora_salida:Date.now()
            })
        }

        if (vehiculos) {
            if (vehiculoRepetido.tipo === 'PARTICULAR') {
                return res.status(200).json({mgs: 'El importe a pagar es de: $'+((diferenciaTiempo * 0.05).toFixed(2))})
            } else {
                return res.status(200).json({mgs: 'Se registro la salida del vehículo.'})
            }
        } else {
            return res.status(400).json({msg:'Error registrar la salida del vehículo.'})
        }

    })
    return apiRouter;
}