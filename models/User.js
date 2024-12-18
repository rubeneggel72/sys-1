const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    short:{type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: ''
    },
    string1:{
        type: String,
        default: ''
    },
    string2:{
        type: String,
        default: ''
    },
    string3:{
        type: String,
        default: ''
    },
    string4:{
        type: String,
        default: ''
    },
    string5:{
        type: String,
        default: ''
    },
    notaventaindex:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    cotizacionindex:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    itemcompraindex:{
        type: String,
        default: ';iditemcompra,-1;1'
    },

    itemcomprasearchitemagregado:{
        type: String,
        default: ';iditemcompra,-1;1'
    },
    notaventasearchitemagregado:{
        type: String,
        default: ';idnotaventa,-1;1'
    }, 
     cotizacionsearchitemagregado:{
        type: String,
        default: ';idcotizacion,-1;1'
    },

    ordencompraindex:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    ordencomprasearchitemagregado:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    ordentrabajoindex:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    ordentrabajosearchitemagregado:{
        type: String,
        default: ';idnotaventa,-1;1'
    },
    mailuser:{
        type: String,
        default: 'reggel@ec-ingenieria.com'
    },
    mailpass:{
        type: String,
        default: 'RubenJavier1972*'
    },
    mailfrom:{
        type: String,
        default: '"Ruben Eggel (EC-Ingenieria)" <reggel@ec-ingenieria.com>'
    },
    

});

module.exports = mongoose.model("User", userSchema);

