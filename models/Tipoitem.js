const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tipoitemSchema= new Schema({
nombre: {
    type: String,
    required: true
  },
  rubroitem: {
    type: Array,
    required: true
  }
});
module.exports = mongoose.model('tipoitem', tipoitemSchema);