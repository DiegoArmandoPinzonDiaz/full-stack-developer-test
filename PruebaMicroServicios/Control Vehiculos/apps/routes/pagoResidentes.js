
var mongoose = require('mongoose');
const moment= require('moment') 
const fs = require('fs');
const http = require('http');
const modelVehiculo = require('../../models/vehiculo');
const listaTiposVehiculos = ['PARTICULAR', 'OFICIAL', 'RESIDENTE']

'use strict';

module.exports = function (app, express) {
    var apiRouter = express.Router()
    apiRouter.route('/pagoResidentes')
    .get(async (req, res) => {
        let archivo  = req.body;
        if (!archivo.hasOwnProperty('nombre')) {
                return res.status(400).json({msg:'El objeto recibido no tiene todos los elementos necesarios.'})
            }

        let vehiculosPagos = await modelVehiculo.find({tipo: 'RESIDENTE'});

        let data = [];
        data.push('Núm. placa     Tiempo estacionado (min.)     Cantidad a pagar\n');
        for (const vehiculo of vehiculosPagos) {
            data.push(vehiculo.placa+'          '+vehiculo.tiempo_acu+'                                 '+(vehiculo.tiempo_acu * 0.05).toFixed(2)+'\n');
        };
        fs.writeFile(archivo.nombre+'.txt', data, function (err,data) {
            if (err) {
              return console.log(err);
            }
            res.download(archivo.nombre);
        })

        if (vehiculosPagos) {
            return res.status(200).json({msg:'Se genero con exito el archivo.'})
        } else {
            return res.status(400).json({msg:'Error al generar los pagos de los vehículos residentes'})
        }
    })
    return apiRouter;
}