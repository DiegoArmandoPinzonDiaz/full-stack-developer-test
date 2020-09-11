
var mongoose = require('mongoose');
const moment= require('moment') 
const modelVehiculo = require('../../models/vehiculo');
const listaTiposVehiculos = ['PARTICULAR', 'OFICIAL', 'RESIDENTE']

'use strict';

module.exports = function (app, express) {
    var apiRouter = express.Router()
    apiRouter.route('/vehiculo')
    .get(async (req, res) => {
        let vehiculos = await modelVehiculo.find();
        if (vehiculos) {
            return res.status(200).json({vehiculos})
        } else {
            return res.status(400).json({msg:'Error al obtener los datos de los vehículos'})
        }
    })
    .post(async (req, res) => {
        let nuevoVehiculo  = req.body;
        if (!nuevoVehiculo.hasOwnProperty('placa') ||
            !nuevoVehiculo.hasOwnProperty('tipo') ||
            !nuevoVehiculo.hasOwnProperty('hora_entrada') ||
            !nuevoVehiculo.hasOwnProperty('tiempo_acu') ) {
                return res.status(400).json({msg:'El objeto recibido no tiene todos los elementos necesarios.'})
            }

        if (!moment(nuevoVehiculo.hora_entrada,'YYYY-MM-DD hh:mm:ss').isValid()) {
            return res.status(400).json({msg:'El formato de hora_entrada no valido, debe de ser YYYY-MM-DD hh:mm:ss.'})
        }

        let vehiculoRepetido = await modelVehiculo.findOne({placa:nuevoVehiculo.placa});
        if (vehiculoRepetido) {
            return res.status(400).json({msg:'El vehículo con placa '+ nuevoVehiculo.placa + ' ya existe.'})
        }

        if (listaTiposVehiculos.indexOf(nuevoVehiculo.tipo) === -1) {
            return res.status(400).json({msg:'El tipo del vehículo no existe.'})
        }

        let vehiculos = await modelVehiculo.insertMany(nuevoVehiculo)
        if (vehiculos) {
            return res.status(200).json({vehiculos})
        } else {
            return res.status(400).json({msg:'Error al guardar los vehículos'})
        }
    })
    .put(async (req, res) => {
        let nuevoVehiculo  = req.body;
        if (!nuevoVehiculo.hasOwnProperty('placa') ||
            !nuevoVehiculo.hasOwnProperty('tipo') ||
            !nuevoVehiculo.hasOwnProperty('hora_entrada') ||
            !nuevoVehiculo.hasOwnProperty('tiempo_acu') ) {
                return res.status(400).json({msg:'El objeto recibido no tiene todos los elementos necesarios.'})
            }
            
        if (!moment(nuevoVehiculo.hora_entrada,'YYYY-MM-DD hh:mm:ss').isValid()) {
            return res.status(400).json({msg:'El formato de hora_entrada no valido, debe de ser YYYY-MM-DD hh:mm:ss.'})
        }

        if (listaTiposVehiculos.indexOf(nuevoVehiculo.tipo) === -1) {
            return res.status(400).json({msg:'El tipo del vehículo no existe.'})
        }

        let vehiculoModificar = await modelVehiculo.find({placa:nuevoVehiculo.placa}); 
        if (!vehiculoModificar[0]) {
            return res.status(400).json({msg:'El vehículo a modificar con placas ' + nuevoVehiculo.placa + ' no existe.'})
        }

        let vehiculos = await modelVehiculo.update({_id:vehiculoModificar[0]._id},{
            $set: {
                tiempo_acu : nuevoVehiculo.tiempo_acu, 
                tipo: nuevoVehiculo.tipo,
                hora_entrada: nuevoVehiculo.hora_entrada
        }})
        if (vehiculos) {
            return res.status(200).json({vehiculos})
        } else {
            return res.status(400).json({msg:'Error al actualizar los vehículos'})
        }
    })
    .delete(async (req, res) => {
        let eliminarVehiculo  = req.body;
        if (!eliminarVehiculo.hasOwnProperty('placa')) {
                return res.status(400).json({msg:'Se esperaba el numero de la placa.'})
            }
            
        let vehiculoeliminado = await modelVehiculo.deleteOne({placa:eliminarVehiculo.placa});
        if (vehiculoeliminado) {
            return res.status(200).json({vehiculoeliminado})
        } else {
            return res.status(400).json({msg:'Error al eliminar el vehículo.'})
        }
    })
    return apiRouter;
}