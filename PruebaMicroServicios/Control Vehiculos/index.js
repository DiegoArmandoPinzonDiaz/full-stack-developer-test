
require('./connection'); 

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

let app = express();
var cors = require('cors')

let pagos = require('./apps/routes/pagoResidentes') (app, express);
let comienzo = require('./apps/routes/comienzoMes') (app, express);

app.use('/public', express.static(path.join(__dirname, 'static')));

app.use(cors())
app.use(bodyParser.json());
app.use('/',pagos)
app.use('/',comienzo)

app.listen(3002);
console.log('server listening on port' + 3002)


