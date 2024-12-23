const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const IdsSchema = new Schema({
idcliente: {
    type: String,
    required: false
  },
  idorganizacion: {
    type: String,
    required: false
  },
  iditemcompra:{
    type: String,
    required: false
  },
  idnotaventa:{
    type: String,
    required: false
  },
  idindicator:{
    type: String,
    required: false
  },
  idordencompra:{
    type: String,
    required: false
  },
  idcotizacion:{
    type: String,
    required: false
  },
  idordentrabajo:{
    type: String,
    required: false
  },

});

module.exports = mongoose.model('Ids', IdsSchema);