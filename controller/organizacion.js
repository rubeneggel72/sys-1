const Organizacion = require('../models/Organizacion');
const Cliente = require('../models/Cliente');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');
exports.homepage = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'organizacion',
    title: 'Organizaciones',
    description: 'Lista de organizaciones'
  };
  search='idorganizacion,-1';
  let searchTerm = '';
  let perPage = 30;
  let page = req.query.page || 1;
  try {
    const organizacion = await Organizacion.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    let count = organizacion.length;
    console.log(organizacion);
    res.render('pages/02_organizacion_index', {
      user: req.user,
      locals,
      organizacion,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm
    });
  } catch (error) {
    console.log(error);
  }
};

exports.add = async (req, res) => {
  const locals = {
    area: 'organizacion',
    title: 'Organizaciones ',
    description: 'Agregar una nueva organización'
  };
  res.render('pages/02_organizacion_add', {
    user: req.user,
    locals
  });
};

exports.view = async (req, res) => {
  try {
    // console.log(req.params.id);
    const organizacion = await Organizacion.findOne({ _id: req.params.id });
    // console.log('view organizacion ', organizacion);
    const locals = {
      area: 'organizacion',
      title: 'Organizaciones',
      description: 'Ver Organización'
    };
    organizacion.updatedAtSH = fechaSinHora(organizacion.updatedAt.toISOString());
    organizacion.createdAtSH = fechaSinHora(organizacion.updatedAt.toISOString());

    res.render('pages/02_organizacion_view', {
      user: req.user,
      locals,
      organizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const organizacion = await Organizacion.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area: 'organizacion',
      title: 'Organización',
      description: 'Editar Organización'
    };
    let personas = [];
    organizacion.updatedAtSH = fechaSinHora(organizacion.updatedAt.toISOString());
    organizacion.createdAtSH = fechaSinHora(organizacion.updatedAt.toISOString());

    for (let i = 0; i < organizacion.personas.length; i++) {
      personas.push(await Cliente.findOne({ _id: organizacion.personas[i] }));
    }

    organizacion.listaPersonas = personas;
    console.log('Details get ' + organizacion.details);
    res.render('pages/02_organizacion_edit', {
      user: req.user,
      locals,
      organizacion,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  const messages = 'Registo de Organizacion Actualizado';
  const locals = {
    area: 'organizacion',
    title: 'Proceso actualización registro',
    description: '- Realizado'
  };
  try {
    console.log('Details---' + req.body.idorganizacion.details);
    await Organizacion.findByIdAndUpdate(req.params.id, {
      idorganizacion: req.body.idorganizacion,
      cliente: req.body. cliente,
      proveedor:req.body.proveedor,
      otro:req.body.otro,
      razonsocial:req.body.razonsocial,
      nombre: req.body.nombre,
      cuit: req.body.cuit,
      pdireccion:req.body.pdireccion,
      pciudad :req.body.pciudad,
      pprovincia:req.body.pprovincia,
      ppais:req.body.ppais,
      acp:req.body.acp,
      adireccion:req.body.adireccion,
      aciudad :req.body.aciudad,
      aprovincia:req.body.aprovincia,
      apais:req.body.apais,
      acp:req.body.acp,
      pcp:req.body.pcp,
      rubro: req.body.rubro,
     
      details: req.body.details,
      string01: req.body.string01    ,  
string02: req.body.string02    ,  
string03: req.body.string03    , 
      updatedAt: Date.now()
    });
    res.render('pages/02_organizacion_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  const messages = 'Registo de Organizacion Eliminado';
  const locals = {
    area: 'organizacion',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('delete:', req.params.id);
    await Organizacion.deleteOne({ _id: req.params.id });
    res.render('pages/02_organizacion_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.search = async (req, res) => {
  const locals = {
    area: 'organizacion',
    title: 'Busqueda datos Organizacion',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 30;
    let page = req.query.page || 1;
 
/////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    let searchTerm = req.body.searchTerm;
    let search = req.body.search;
    console.log("search ordenam:",search)
    if(search==undefined){
       search='idorganizacion,-1';
    }
    console.log("search ordenam final:",search)
    let ordenamiento = search.split(',');
    var sort = {[ordenamiento[0]]:ordenamiento[1]};
    let arr = searchTerm.split('+');
    let obj = [];
    let obj2 = [];
    let obj3 = [];
    let obj4 = [];
    let ii = 0;
 
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Organizacion.find({
        $or: [
          { razonSocial: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { ciudadPlantaIndustrial: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { provinciaPlantaIndustrial: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { paisPlantaIndustrial: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { idorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
      
        ]
      }).sort(sort);
      if (ii == 0) {
        obj = obj2;
      } else {
        for (let i = 0; i < obj2.length; i++) {
          let aux = obj.length;
          for (let j = 0; j < aux; j++) {
            if (obj2[i].id === obj[j].id) {
              obj3.push(obj[j]);
            }
          }
        }
        obj = obj3;
      }
    }
    if (ii == 1) {
      obj4 = obj2;
    } else {
      obj4 = obj3;
    }
    var hash = {};
    obj4 = obj4.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
   /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    organizacion = obj4;
    //////////////////////////////////

    let count = organizacion.length;
  
    res.render('pages/02_organizacion_index', {
      user: req.user,
      locals,
      organizacion,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      search
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

exports.postAdd = async (req, res) => {
  let ids = await Ids.findById('64ffb0d38fee698da0eb3713');
  searchTerm = '';
  let aux1 = ids.idorganizacion;
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.idorganizacion = aux.toString();
  let j = 5 - ids.idorganizacion.length;
  for (j; j > 0; j--) {
    ids.idorganizacion = '0' + ids.idorganizacion;
  }
  ids.idorganizacion = 'G' + ids.idorganizacion;
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    idcliente: ids.idcliente,
    idorganizacion: ids.idorganizacion,
    updatedAt: Date.now()
  });
  console.log('Update ids' + ids);
  const organizacion = {
    idorganizacion: ids.idorganizacion,
    
cliente: req.body. cliente    ,
proveedor:req.body.proveedor     ,
otro:req.body.otro     ,
razonsocial:req.body.razonsocial     ,
nombre: req.body.nombre     ,
cuit: req.body.cuit ,
pdireccion:req.body.pdireccion     ,
pciudad :req.body.pciudad     ,
pprovincia:req.body.pprovincia    ,
ppais:req.body.ppais     ,
acp:req.body.acp     ,
adireccion:req.body.adireccion     ,
aciudad :req.body.aciudad    ,
aprovincia:req.body.aprovincia     ,
apais:req.body.apais    ,
acp:req.body.acp     ,
rubro: req.body.rubro     ,
personas:req.body.personas     ,
details: req.body.details     
 
   
  };
  try {
    const newOrganizacion = new Organizacion(organizacion);
    await newOrganizacion.save();

    const locals = {
      area: 'organizacion',
      title: 'Verr datos organizacion',
      description: 'Free NodeJs User Management System'
    };
    res.redirect('./index');
  } catch (e) {
    console.log(e);
  }
};

exports.viewPersona = async (req, res) => {
  try {
    console.log('ViewPersona param' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const cliente = await Cliente.findOne({ _id: arrId[0] });
    console.log('view Ids ', arrId);
    console.log('view cliente ', cliente);
    const locals = {
      area: 'organizacion',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/02_organizacion_view_persona', {
      arrId,
      user: req.user,
      locals,
      cliente
    });
  } catch (error) {
    console.log(error);
  }
};

function fechaSinHora(fecha) {
  console.log('fecha ' + fecha);
  let arr = fecha.split('-');
  let fechasola = arr[2].slice(0, 2) + '-' + arr[1] + '-' + arr[0];
  console.log('fecha ' + fechasola);
  return fechasola;
}

exports.select = async (req, res) => {
  const messages = 'mensaje';
  console.log('select ');
  const locals = {
    area: 'organizacion',
    title: 'Selecionar',
    description: 'Free NodeJs User Management System'
  };
  let searchTerm = '';
  let perPage = 50;
  let page = req.query.page || 1;

  try {
    const clientes = await Cliente.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Cliente.count();

    res.render('pages/02_organizacion_cliente_select', {
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

exports.searchorgcliente = async (req, res) => {
  const locals = {
    area: 'organizacion',
    title: 'Search cliente Data de organizacion',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let organizacion = req.body.organizacion;

    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    let searchTerm = req.body.searchTerm;
    //////////////////////////////////
    let arr = searchTerm.split('+');
    let obj = [];
    let obj2 = [];
    let obj3 = [];
    let obj4 = [];
    let ii = 0;
    console.log('searchTerm:', searchTerm);
    console.log('organizacion:', organizacion);
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Cliente.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { profesion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { cargo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { idcliente: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
        ]
      });
      if (ii == 0) {
        obj = obj2;
      } else {
        for (let i = 0; i < obj2.length; i++) {
          let aux = obj.length;
          for (let j = 0; j < aux; j++) {
            if (obj2[i].id === obj[j].id) {
              obj3.push(obj[j]);
            }
          }
        }
        obj = obj3;
      }
    }
    if (ii == 1) {
      obj4 = obj2;
    } else {
      obj4 = obj3;
    }
    var hash = {};
    obj4 = obj4.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
   /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    clientes = obj4;
    //////////////////////////////////
    const count = await Cliente.count();
    
    res.render('pages/02_organizacion_cliente_select', {
      user: req.user,
      locals,
      clientes,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      organizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.upregister = async (req, res) => {
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const organizacion = await Organizacion.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', organizacion.personas);
    organizacion.personas.push(arrId[0]);

    await Organizacion.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        personas: organizacion.personas,
        updatedAt: Date.now()
      }
    );

    console.log('view personas', organizacion.personas);
    messages = 'Se ha creado el registo';
    const locals = {
      area: 'organizacion',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/02_organizacion_resultado_persona', {
      arrId,
      user: req.user,
      locals,

      organizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePersona = async (req, res) => {
  const messages = 'Registo de Organizacion Eliminado';
  const locals = {
    area: 'organizacion',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const organizacion = await Organizacion.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', organizacion.personas);
    _id: arrId[1];
    const resultado = organizacion.personas.filter((id) => id != arrId[0]);
    await Organizacion.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        personas: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};
