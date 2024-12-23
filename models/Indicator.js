const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const indicatorSchema = new Schema({
  
  idindicator: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  valor: {
    type: Schema.Types.Decimal128,
    required: true
  },
  tipo: {
    type: String,
    required: true
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

module.exports = mongoose.model('indicator', indicatorSchema);