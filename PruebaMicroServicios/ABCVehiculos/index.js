
require('./connection'); 

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

let app = express();
var cors = require('cors')

let cars = require('./apps/routes/vehiculo') (app, express);

app.use('/public', express.static(path.join(__dirname, 'static')));

app.use(cors())
app.use(bodyParser.json());
app.use('/',cars)

app.listen(3000);
console.log('server listening on port' + 3000)


