
var mongoose = require('mongoose');
const moment= require('moment') 
const modelVehiculo = require('../../models/vehiculo');
const modelOficiales = require('../../models/oficiales');
const listaTiposVehiculos = ['PARTICULAR', 'OFICIAL', 'RESIDENTE']

'use strict';

module.exports = function (app, express) {
    var apiRouter = express.Router()
    apiRouter.route('/comienzoMes')
    .put(async (req, res) => {

        var eliminarOficiales = await modelOficiales.deleteMany();
        var actualizarTiempoResidentes = await modelVehiculo.updateMany({tipo:'RESIDENTE'},{$set: {tiempo_acu: 0}});

        if (eliminarOficiales && actualizarTiempoResidentes) {
            return res.status(200).json({mgs:'Operación realizada con exito.'})
        } else {
            return res.status(400).json({msg:'Error registrar la salida del vehículo.'})
        }

    })
    return apiRouter;
}