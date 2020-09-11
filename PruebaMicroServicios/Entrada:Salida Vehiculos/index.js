
require('./connection'); 

const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')

let app = express();
var cors = require('cors')

let entrada = require('./apps/routes/entrada') (app, express);
let salida = require('./apps/routes/salida') (app, express);

app.use('/public', express.static(path.join(__dirname, 'static')));

app.use(cors())
app.use(bodyParser.json());
app.use('/',entrada)
app.use('/',salida)

app.listen(3001);
console.log('server listening on port' + 3001)


