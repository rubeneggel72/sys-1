const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const organizacionSchema = new Schema({
  idorganizacion: {
    type: String,
    required: false
  },

cliente:{
  type: String,
  default: ""
},
proveedor:{
  type: String,
  default: ""
},
otro:{
  type: String,
  default: ""
},


razonsocial:{
    type: String,
    default: ""
  },
nombre: {
  type: String,
  default: ""
},

cuit: {
  type: Number,
  default: ""
},
pdireccion:{
  type: String,
  default: ""
},
pciudad :{
  type: String,
  default: ""
},
pprovincia:{
  type: String,
  default: ""
},
ppais:{
  type: String,
  default: ""
},
pcp:{
  type: String,
  default: ""
},
acp:{
  type: String,
  default: ""
},
adireccion:{
  type: String,
  default: ""
},
aciudad :{
  type: String,
  default: ""
},
aprovincia:{
  type: String,
  default: ""
},
apais:{
  type: String,
  default: ""
},
acp:{
  type: String,
  default: ""
},
  rubro: {
    type: String,
    required: false
  },

  personas:{
    type:Array,
    default:[]
  },

  details: {
    type: String,
    required: false
  },
//contacto proveedor 
  string01: {
    type: String,
    default: ''
  },
//email proveedor 
  string02: {
    type: String,
    default: ''
  },
//whatsapp proveedor 
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
  array1:{
    type:Array,
    default: []
  },
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

module.exports = mongoose.model('organizacion', organizacionSchema);



