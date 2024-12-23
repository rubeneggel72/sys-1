const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const clienteSchema = new Schema({
  idcliente: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },

  profesion: {
    type: String,
    required: false
  },
  cargo: {
    type: String,
    required: false
  },
  dni: {
    type: String,
    required: false
  },
  cui: {
    type: Number,
    required: false
  },

  details: {
    type: String,
    required: false
  },
  string01: {
    type: String,
    default: ''
  },
  string02: {
    type: String,
    default: ''
  },
  string03: {
    type: String,
    default: ''
  },
  string04: {
    type: String,
    default: ''
  },
    string05: {
    type: String,
    default: ''
  },

  numero01: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero02: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero03: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero04: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero05: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  array1:{
    type:Array,
    default: []
  },
  array2:{
    type:Array,
    default: []
  },







  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('cliente', clienteSchema);