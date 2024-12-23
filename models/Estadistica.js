const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const estadisticaSchema = new Schema({
  
  tipomovimiento: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  fechacorregida: {
    type: Schema.Types.Decimal128,
    required: true
  },
  valorpesos: {
    type: String,
    required: true
  },
  valordolar: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  unidad: {
    type: String,
    required: false
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

module.exports = mongoose.model('estadistica', estadisticaSchema);