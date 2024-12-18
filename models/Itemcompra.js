const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;
const itemcompraSchema = new Schema({
  iditemcompra: {
    type: String,
    default: ''
  },

  tipoitem: {
    type: String,
    default: ''
  },

  rubroitem: {
    type: String,
    default: ''
  },

  nombre: {
    type: String,
    default: ''
  },
  observacion: {
    type: String,
    default: ''
  },

  trazabilidad:{
    type: String,
    default:'Lote'
  },

  unidad: {
    type: String,
    default: ''
  },
  mxunidad: {
    type: Schema.Types.Decimal128,
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
    default: 0
  },

  stock: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockcompras: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockcomprasm: {
    type: String,
    default: ''
  },

  stockrecepcion1: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockrecepcionm1: {
    type: String,
    default: ''
  },
  stockrecepcionpos1: {
    type: String,
    default: ''
  },
  stockrecepcion2: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockrecepcionm2: {
    type: String,
    default: ''
  },
  stockrecepcionpos2: {
    type: String,
    default: ''
  },


  stockdevolucion: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockdevolucionm: {
    type: String,
    default: ''
  },
  stockdevolucionpos: {
    type: String,
    default: ''
  },

  stockdevuelto: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockdevueltom: {
    type: String,
    default: ''
  },

  stockproduccion: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockproduccionm: {
    type: String,
    default: ''
  },
  stockreservado: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockreservadom: {
    type: String,
    default: ''
  },
  stockacondicionamiento: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockacondicionamientom: {
    type: String,
    default: ''
  },
  stockincorporado: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockincorporadom: {
    type: String,
    default: ''
  },


  stockreservadom: {
    type: String,
    default: ''
  },

  stockdespacho: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockdespachom: {
    type: String,
    default: ''
  },
  stockdespachopos:{
    type: String,
    default: ''
  },

  stockentregado: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stockentregadom: {
    type: String,
    default: ''
  },

  stock1: {
    type: Schema.Types.Decimal128,
    default: 0
  },
  stock1m: {
    type: String,
    default: ''
  },

  stockpos1: {
    type: String,
    default: ''
  },

  stock2: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos2: {
    type: String,
    default: ''
  },
  stock2m: {
    type: String,
    default: ''
  },

  stock3: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos3: {
    type: String,
    default: ''
  },
  stock3m: {
    type: String,
    default: ''
  },

  stock4: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos4: {
    type: String,
    default: ''
  },
  stock4m: {
    type: String,
    default: ''
  },

  stock5: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockpos5: {
    type: String,
    default: ''
  },
  stock5m: {
    type: String,
    default: ''
  },

  stockconsignacion: {
    type: Schema.Types.Decimal128,
    default: 0
  },

  stockconsignacionm: {
    type: String,
    default: ''
  },

  stockposdatos: {
    type: String,
    default: ''
  },

  stock: {
    type: Schema.Types.Decimal128,
    defaultprestamo: 0
  },

  stockprestamo: {
    type: String,
    default: ''
  },

  details: {
    type: String,
    default: ''
  },

  itemagregado: {
    type: Array,
    default: ['']
  },

  itemagregadocant: {
    type: String,
    default: ''
  },

  itemagregadojunto: {
    type: String,
    default: ''
  },

  indicatoragregado: {
    type: Array,
    default: ['']
  },

  indicatoragregadocant: {
    type: String,
    default: ''
  },

  cotizaciondetails: {
    type: String,
    default: ''
  },
  cotizaciontitulo: {
    type: String,
    default: ''
  },
  ordencompradetails: {
    type: String,
    default: ''
  },
  ordencompratitulo: {
    type: String,
    default: ''
  },

  tiendatitulo: {
    type: String,
    default: ''
  },
  tiendadetalle: {
    type: String,
    default: ''
  },
  tiendamaterial: {
    type: String,
    default: ''
  },
  tiendacantidad: {
    type: String,
    default: ''
  },
  tiendaplazo: {
    type: String,
    default: ''
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
    default: ''
  },
  vseccion: {
    type: String,
    default: ''
  },
  vdiametro: {
    type: String,
    default: ''
  },
  vlongitud: {
    type: String,
    default: ''
  },
  vancho: {
    type: String,
    default: ''
  },
  valtura: {
    type: String,
    default: ''
  },
  vdimension: {
    type: String,
    default: ''
  },
  vinclinacion: {
    type: String,
    default: ''
  },
  vpendiente: {
    type: String,
    default: ''
  },
  vaccionamiento: {
    type: String,
    default: ''
  },
  vmando: {
    type: String,
    default: ''
  },
  vmotor: {
    type: String,
    default: ''
  },
  vcapacidadproduccion: {
    type: String,
    default: ''
  },
  vcapacidadutil: {
    type: String,
    default: ''
  },
  vcapacidadtotal: {
    type: String,
    default: ''
  },
  ventrada: {
    type: String,
    default: ''
  },
  vsalida: {
    type: String,
    default: ''
  },
  vtension: {
    type: String,
    default: ''
  },
  vpotencia: {
    type: String,
    default: ''
  },
  vmaterial: {
    type: String,
    default: ''
  },
  vtratamiento: {
    type: String,
    default: ''
  },
  vterminacion: {
    type: String,
    default: ''
  },
  vpeso: {
    type: String,
    default: ''
  },
  cotizacionnota: {
    type: String,
    default: ''
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
  string06: {
    type: String,
    default: ''
  },
  string07: {
    type: String,
    default: ''
  },
  string08: {
    type: String,
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
  array1: {
    type: Array,
    default: []
  },
  array2: {
    type: Array,
    default: []
  },
  array3: {
    type: Array,
    default: []
  },
  array4: {
    type: Array,
    default: []
  },
  array5: {
    type: Array,
    default: []
  },
  contadorhijo: {
    type: Number,
    default: 0
  },
  hijo: {
    type: Number,
    default: 0
  },
  hijos: {
    type: String,
    default: ''
  },
  reservaingenieria:{
    type: String,
    default: ''
  },
  procesocompra:{
    type: String,
    default: ''
  },
  recibidocompra:{
    type: String,
    default: ''
  },

  reservaordentrabajo:{
    type: String,
    default: ''
  },
  lote:{ type: String,
    default: 'XXXXX;0;'},




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


