const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vehiculo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => { 
    console.log('connected port 3001'); 
});

module.exports = mongoose;