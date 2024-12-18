const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;
const itemcompraSchema = new Schema({

  iditemcompra: {
    type: String,
    required: true
  },

  tipoitem: {
    type: String,
    required: true
  },

  rubroitem: {
    type: String,
    required: true
  },

  nombre: {
    type: String,
    required: true
  },
  observacion: {
    type: String,
    required: false
  },

  unidad: {
    type: String,
    required: true
  },
  mxunidad: {
    type:Schema.Types.Decimal128,
    default: 0
  },
  m2xunidad: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  m3xunidad: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  kgxunidad: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  lxunidad: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockminimo: {
    type: Schema.Types.Decimal128,
    default: 0},

    stock: {
      type: Schema.Types.Decimal128,
      default: 0
    },
  stock1: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos1: {
    type: String,
    required: false
  },

  stock2: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos2: {
    type: String,
    required: false
  },

  stock3: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockpos3: {
    type: String,
    required: false
  },
  stock4: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockpos4: {
    type: String,
    required: false
  },

  details: {
    type: String,
    required: false
  },

 itemagregado:{
    type:Array,
    required: false
  },
  itemagregadocant:{
    type:String,
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

module.exports = mongoose.model('itemcompra', itemcompraSchema);






