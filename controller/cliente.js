const Cliente = require('../models/Cliente');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
  const messages = 'mensaje';
 
  const locals = {
    area:'cliente',
    title: 'Registro de Personas',
    description: 'Lista de registros'
  };
  let searchTerm="";
  let perPage = 30;
  let page = req.query.page || 1;

  try {
    const clientes = await Cliente.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Cliente.count();

    res.render('pages/01_cliente_index', {
      user: req.user,
      locals,
      clientes,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addcliente = async (req, res) => {

  const locals = {
    area:'cliente',
    title: 'Registro de Personas',
    description: 'Nuevo registro'
  };
  res.render('pages/01_cliente_add', {
    user: req.user,
    locals
  });
};

exports.view = async (req, res) => {
  try {
    console.log(req.params.id);
    const cliente = await Cliente.findOne({ _id: req.params.id });
    console.log('view cliente ', cliente);
    const locals = {
      area:'cliente',
      title: 'Registro de Personas',
      description: 'Ver registro de persona'
    };
    res.render('pages/01_cliente_view', {
      user: req.user,
      locals,
      cliente
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area:'cliente',
      title: 'Registro de Personas',
      description: 'Editar registro'
    };
    console.log('Edit:', cliente);
    res.render('pages/01_cliente_edit', {
      user: req.user,
      locals,
      cliente,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  const messages = 'Registo de Cliente Actualizado';

  const locals = {
    area:'cliente',
    title: 'Registro de Personas',
    description: '- Realizado'
  };
  try {
    await Cliente.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      string01: req.body.string01,
      profesion:req.body.profesion,
      cargo:req.body.cargo,
      dni:req.body.dni,
      cui:req.body.cui,
      details: req.body.details,
      updatedAt: Date.now()
    });
    res.render('pages/01_cliente_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletecliente = async (req, res) => {
  const messages = 'Registo de Cliente Eliminado';
  const locals = {
    area:'cliente',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('delete:', req.params.id);
    await Cliente.deleteOne({ _id: req.params.id });
    res.render('pages/01_cliente_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchclientes = async (req, res) => {
  const locals = {
    area:'cliente',
    title: 'Registro de Personas',
    description: 'Busqueda de registros'
  };
  const messages = 'mensaje';
  try { 
    let perPage = 12;
    let page = req.query.page || 1;
    let searchTerm = req.body.searchTerm;
    
    let arr = searchTerm.split('+');
    let obj=[];
    let obj2=[];
     let clientes=[];
   
    for (let i=0;i<arr.length;i++){

    const searchNoSpecialChar = arr[i].replace(/[^a-zA-Z0-9 ]/g, '');
    console.log("searchNoSpecialChar:",searchNoSpecialChar); 
    console.log("Array elem:"+i+"-"+arr[i]); 
    
    obj2 =await Cliente.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { profesion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { cargo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { idcliente:{ $regex: new RegExp(searchNoSpecialChar, 'i') } }
      ]
    });
    clientes = [...obj,...obj2]; 
      obj=clientes; 
    }

    var hash = {};
    clientes = clientes.filter(function(current) {
  var exists = !hash[current.id];
  hash[current.id] = true;
  return exists;
});
  
    // console.log(obj);
    // console.log(obj2);
    
    console.log("Clientes:",obj); 
    
      const count = await Cliente.count();
  
      res.render('pages/01_cliente_index', {
        user: req.user,
        locals,
        clientes,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
        searchTerm
      });
  } catch (error) {
    console.log(error);
  }
};


// exports.postcliente = async (req, res) => {

//   const foundDuplicate = async (email) => {
//     try {
//       const duplicate = await Cliente.findOne({ email: email });
//       if (duplicate) return true;
//       return false;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   };
//   const errors = [];
//   const nameRegex = /^[a-zA-Z ]*$/;
//   const emailRegex = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
//   const newCliente = {
//       firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     details: req.body.details,
//     tel: req.body.tel,
//     email: req.body.email,
//   };
//   if (!nameRegex.test(newCliente.firstname)) {
//     errors.push({
//       msg: `Name doesn't Contain any number or a special Charecter.`
//     });
//   }
//   if (!emailRegex.test(newCliente.email)) {
//     errors.push({
//       msg: `Email is not Valid. Please enter a valid Email.`
//     });
//   }

//   if (await foundDuplicate(newCliente.email)) {
//     errors.push({
//       msg: `Email is already Registered`
//     });
//   }
//   if (errors.length > 0) {
//     res.render('pages/01_cliente/add', { errors: errors, newCliente: newCliente });
//   } else {
//     try {
//       console.log(req.body);
//           const savedCliente = new Cliente({

//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           details: newUser.details,
//           tel: newUser.tel,
//           email: newUser.email,
//         });
//         await savedCliente.save();

//         console.log("registrado")
//         res.redirect('pages/01_cliente_index', {
//           user: req.user,
//           locals,
//           cliente,

//         });
//       }

//      catch (e) {
//       console.log("registro error: Internal error "+newCliente)
//       res.render('pages/01_cliente_index', { errors: { msg: 'Internal Server Error' }, newCliente: newCliente });
//     }
//   }
// };




exports.postcliente = async (req, res) => {
  let ids = await Ids.findById("64ffb0d38fee698da0eb3713" )
  console.log(ids.cliente);
  let aux1=ids.idcliente
   aux1 = aux1.slice(1)
  let aux=parseInt(aux1);
  aux++;
  ids.idcliente=aux.toString()
  let j=5-ids.idcliente.length
  for(j;j>0;j--){
    ids.idcliente="0"+ids.idcliente
  }
  ids.idcliente="P"+ids.idcliente
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
  
    idcliente: ids.idcliente,
    idorganizacion: ids.idorganizacion,
    updatedAt: Date.now()
  });
  console.log("Update ids"+ids);
  const cliente = {
    idcliente:ids.idcliente,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
    cargo: req.body.cargo,
    profesion: req.body.profesion,
    dni:req.body.dni,
    cui:req.body.cui,
    string01: req.body.string01,
  };
  try { 
   
  
  

    const newCliente = new Cliente(cliente);
    await newCliente.save();

    const locals = {
      area:'cliente',
      title: 'Registro de Personas',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/01_cliente_view', {
      user: req.user,
      locals,
      cliente
    });
  } catch (e) {
    console.log(e);
    res.render('pages/01_cliente_add', { user: req.user });
  }
};
