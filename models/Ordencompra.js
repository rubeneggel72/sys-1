const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ordencompraSchema = new Schema({
  idordencompra: {
    type: String,
    default: ''
  },

  unidadnegocio: {
    type: String,
    default: ''
  },
  mercado:{
    type: String,
    default: ''
  },

  idorganizacion: {
    type: String,
    default: ''
  },
  _idorganizacion: {
    type: String,
    default: ''
  },
  nombreorganizacion: {
    type: String,
    default: ''
  },
  
  titulo: {
    type: String,
    default: ''
  },

  fechaventa: {
    type: String,
    default: '2023-01-01'
  },
  fechaentrega: {
    type: String,
    default: '2023-01-01'
  },
  planpago: {
    type: String,
    default: ''
  },
  planentrega: {
    type: String,
    default: ''
  },
  factura: {
    type: String,
    default: ''
  },
  cobro: {
    type: String,
    default: ''
  },
  entrega: {
    type: String,
    default: ''
  },
  comision: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  vendedor: {
    type: String,
    default: ''
  },
  precioventa: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  unidad: {
    type: String,
    default: 'ARS'
  },
  formapago: {
    type: String,
    default: ''
  },
  details: {
    type: String,
    default: ''
  },
  ordencompra:{
    type: String,
    default: ''
  },

  ordencompraadministracion: {
    type: String,
    default: ''
  },
  ordencompraproduccion: {
    type: String,
    default: ''
  },
  notaadministracionventa: {
    type: String,
    default: ''
  },
  notaadministracion: {
    type: String,
    default: ''
  },

  notaproduccionventa: {
    type: String,
    default: ''
  },
  notaproduccion: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    default: 'Edicion'
  },
  cobrado: {
    type: String,
    default: ''
  },
  entregado: {
    type: String,
    default: ''
  },
  _idorganizacion: {
    type: String,
    default: ''
  },
  idorganizacion: {
    type: String,
    default: ''
  },
  nombreorganizacion: {
    type: String,
    default: ''
  },
  items:{
    type:Array,
    required: false
  },
  itemagregado:{
    type:Array,
    required: false
  },
  itemagregadoestado:{
    type:String,
    default:"Edicion"
  },
  itemagregadocant:{
    type:String,
    required: false
  },
  itemagregadoentregadocant:{
    type:String,
    required: false
  },
  indicatoragregado:{
    type:Array,
    default:""
  },
  indicatoragregadocant:{
    type:String,
    default:""
  },
  organizacionagregado:{
    type:Array,
    required: false
  },
  organizacionagregadocant:{
    type:String,
    required: false
  },
  costopropio: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  costoarbol: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  files_upload: {
    type: String,
    required: false
  },

  pdfpedidocotizacion: {
    type: String,
    required: false
  },
     pdfordencompra: {
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
    default: 'Normal'
  },
    string05: {
    type: String,
    default: ''
  },
  string06: {
    type: String,
    default: ''
  },
  string07: {
    type: String,
    default: ''
  },
  string08: {
    type: Array,
    default: ''
  },
  string09: {
    type: String,
    default: ''
  },
  string10: {
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
  numero06: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero07: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero08: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero09: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  numero10: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  array1:{
    type:Array,
    default: [0,0,0,0,0,0]
  },
  //array2 cotizacion dolar [cot tipo venta,fecha]
  array2:{
    type:Array,
    default: []
  },
  array3:{
    type:Array,
    default: []
  },
  array4:{
    type:Array,
    default: []
  },
  array5:{
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

module.exports = mongoose.model('ordencompra', ordencompraSchema);



   
  