const Itemcompra = require('../models/Itemcompra');
const Tipoitem = require('../models/Tipoitem');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');
exports.homepage = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'itemcompra',
    title: 'Lista de Item (compra/producto)',
    description: 'Items '
  };
  let searchTerm = '';
  let perPage = 30;
  let page = req.query.page || 1;
  try {
    const itemcompra = await Itemcompra.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Itemcompra.count();

    res.render('pages/03_itemcompra_index', {
      user: req.user,
      locals,
      itemcompra,
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
    area: 'itemcompra',
    title: 'Nuevo Item (compra/producto)',
    description: 'Free NodeJs User Management System'
  };

  let tipoitem = await Tipoitem.find({});


  res.render('pages/03_itemcompra_add', {
    user: req.user,
    locals,
    tipoitem
  });
};

exports.view  =async (req, res) => {
  try {

    const itemcompra = await Itemcompra.findOne({ _id: req.params.id });
    const tipoitem = await Tipoitem.find({});
    const messages = '';
    itemagregado = [];
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto)',
      description: 'Free NodeJs User Management System'
    };

    itemcompra.updatedAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.createdAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.stock = parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4)
    iacant = itemcompra.itemagregadocant
    let arrcant = iacant.split(',');
    console.log("ITAGCANT" + iacant)
    console.log("ITAGCANT -array" + arrcant)
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: itemcompra.itemagregado[i] })
      aux.cant = arrcant[i]
      itemagregado.push(aux);

      console.log("AUX:" + aux.cant);
    }
    itemcompra.itemagregado = itemagregado;



    res.render('pages/03_itemcompra_view', {
      user: req.user,
      locals,
      itemcompra,
      locals,
      messages,
      tipoitem
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {

    const itemcompra = await Itemcompra.findOne({ _id: req.params.id });
    const tipoitem = await Tipoitem.find({});
    const messages = '';
    itemagregado = [];
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto)',
      description: 'Free NodeJs User Management System'
    };

    itemcompra.updatedAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.createdAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.stock = parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4)
    iacant = itemcompra.itemagregadocant
    let arrcant = iacant.split(',');
    console.log("ITAGCANT" + iacant)
    console.log("ITAGCANT -array" + arrcant)
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: itemcompra.itemagregado[i] })
      aux.cant = arrcant[i]
      itemagregado.push(aux);

      console.log("AUX:" + aux.cant);
    }
    itemcompra.itemagregado = itemagregado;



    res.render('pages/03_itemcompra_edit', {
      user: req.user,
      locals,
      itemcompra,
      locals,
      messages,
      tipoitem
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  const messages = 'Registo  Actualizado';
  const locals = {
    area: 'itemcompra',
    title: 'Edicion de Item (compra/producto)',
    description: '- Realizado'
  };
  try {
    console.log(req.body)
    let stock = parseInt(req.body.stock1) + parseInt(req.body.stock2) + parseInt(req.body.stock3) + parseInt(req.body.stock4)
    console.log('stock', stock)
    await Itemcompra.findByIdAndUpdate(req.params.id, {

      nombre: req.body.nombre,
      observacion: req.body.observacion,
      stock: stock,
      iditemcompra: req.body.iditemcompra,
      tipoitem: req.body.tipoitem,
      rubroitem: req.body.rubroitem,
      stockminimo: req.body.stockminimo,
      unidad: req.body.unidad,
      mxunidad: req.body.mxunidad,
      m2xunidad: req.body.m2xunidad,
      kgxunidad: req.body.kgxunidad,
      lxunidad: req.body.lxunidad,
      stock1: req.body.stock1,
      stockpos1: req.body.stockpos1,
      stock2: req.body.stock2,
      stockpos2: req.body.stockpos2,
      stock3: req.body.stock3,
      stockpos3: req.body.stockpos3,
      stock4: req.body.stock4,
      stockpos4: req.body.stockpos4,
      details: req.body.details,
      itemagregadocant: req.body.itemagregadocant,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,

      updatedAt: Date.now()
    });

    res.render('pages/03_itemcompra_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  const messages = 'Registo  Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Eliminar Item (compra/producto)',
    description: '- Realizado'
  };
  try {
    console.log('delete:', req.params.id);
    await Itemcompra.deleteOne({ _id: req.params.id });
    res.render('pages/03_itemcompra_resultado', {
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
    area: 'itemcompra',
    title: 'Busqueda de Item (compra/producto)',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
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
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      // const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      const searchNoSpecialChar = arr[ii];
      obj2 = await Itemcompra.find({
        $or: [

          { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { observacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { iditemcompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { tipoitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
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
    itemcompra = obj4;
    //////////////////////////////////

    const count = await Itemcompra.count();
    res.render('pages/03_itemcompra_index', {
      user: req.user,
      locals,
      itemcompra,
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
//          cliente,
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
  let aux1 = ids.iditemcompra;
  console.log('ID.', aux1)
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.iditemcompra = aux.toString();
  let j = 5 - ids.iditemcompra.length;
  for (j; j > 0; j--) {
    ids.iditemcompra = '0' + ids.iditemcompra;
  }
  ids.iditemcompra = 'C' + ids.iditemcompra;
  console.log('ID.', ids.iditemcompra)
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    iditemcompra: ids.iditemcompra,
    updatedAt: Date.now()
  });
  let stock = parseInt(req.body.stock1) + parseInt(req.body.stock2) + parseInt(req.body.stock3) + parseInt(req.body.stock4)
  console.log('stock', stock)
  const itemcompra = {
    iditemcompra: ids.iditemcompra,
    stock: stock,
    nombre: req.body.nombre,
    observacion: req.body.observacion,
    tipoitem: req.body.tipoitem,
    rubroitem: req.body.rubroitem,
    stockminimo: req.body.stockminimo,
    unidad: req.body.unidad,
    mxunidad: req.body.mxunidad,
    m2xunidad: req.body.m2xunidad,
    kgxunidad: req.body.kgxunidad,
    lxunidad: req.body.lxunidad,
    stock1: req.body.stock1,
    stockpos1: req.body.stockpos1,
    stock2: req.body.stock2,
    stockpos2: req.body.stockpos2,
    stock3: req.body.stock3,
    stockpos3: req.body.stockpos3,
    stock4: req.body.stock4,
    stockpos4: req.body.stockpos4,
    details: req.body.details,
    itemagregado: [''],
    itemagregadocant:'0'

  };
  console.log(itemcompra)
  try {
    const newItemcompra = new Itemcompra(itemcompra);
    await newItemcompra.save();
    const locals = {
      area: 'itemcompra',
      title: 'Nuevo de Item (compra/producto)',
      description: 'Free NodeJs User Management System'
    };
    res.redirect('./index');
  } catch (e) {
    console.log(e);
  }
};

exports.viewitemagregado = async (req, res) => {
  try {
    console.log('ViewItem agregado param' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemagregado = await Itemcompra.findOne({ _id: arrId[0] });
    console.log('view Ids ', arrId);
    console.log('view cliente ', itemagregado);
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto) - ',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/02_organizacion_view_persona', {
      arrId,
      user: req.user,
      locals,
      itemagregado
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
    area: 'itemcompra',
    title: 'Selecionar',
    description: 'Free NodeJs User Management System'
  };
  let searchTerm = '';
  let perPage = 50;
  let page = req.query.page || 1;

  try {
    const itemagregado = await Itemcompra.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Itemcompra.count();

    res.render('pages/03_organizacion_itemcompra_itemagregado', {
      user: req.user,
      locals,
      itemagregado,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm
    });
  } catch (error) {
    console.log(error);
  }
};


exports.searchitemagregado = async (req, res) => {
  const locals = {
    area: 'itemcompra',
    title: 'Busqueda datos ',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let itemcompra = req.body.itemcompra;
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
    console.log('itemcompra:', itemcompra);
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      // const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      const searchNoSpecialChar = arr[ii];
      obj2 = await Itemcompra.find({
        $or: [

          { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { observacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { iditemcompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { tipoitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
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
    itemagregado = obj4;
    //////////////////////////////////

    const count = await Itemcompra.count();
    res.render('pages/03_itemcompra_itemagregado', {
      user: req.user,
      locals,
      itemagregado,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      itemcompra
    });
  } catch (error) {
    console.log(error);
  }
};


exports.upregister = async (req, res) => {
  try {
    const locals = {
      area: 'itemcompra',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System'
    };
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido=0;

    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });   
     console.log('ic-lenght' +itemcompra.itemagregado.length);
    for (let i=0;i<itemcompra.itemagregado.length;i++){
      console.log("IF :"+itemcompra.itemagregado[i]+"---"+arrId[0])
      if (itemcompra.itemagregado[i]==arrId[0]){repetido=1} 
    }
    if(repetido==0){
        itemcompra.itemagregado.push(arrId[0]);
        itemcompra.itemagregadocant = itemcompra.itemagregadocant + "," + 1
        await Itemcompra.findByIdAndUpdate(
          { _id: arrId[1] },
          {
            itemagregado: itemcompra.itemagregado,
            itemagregadocant: itemcompra.itemagregadocant,
            updatedAt: Date.now()
          }
        );

        messages = 'Se ha creado el registo';
      }else{
        messages = 'No se creó el registro. Registro repetido';
      }
   

      res.render('pages/03_itemcompra_resultado_itemagregado', {
        arrId,
        user: req.user,
        locals,

        itemcompra
      });
    } catch (error) {
      console.log(error);
    }
  };


exports.deleteitemagregado = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.itemagregado);
    _id: arrId[1];
    const resultado = itemcompra.itemagregado.filter((id) => id != arrId[0]);
    await Itemcompra.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        itemagregado: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};

exports.editcantitemagregado = async (req, res) => {
  const messages = 'Item Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.itemagregado);
    _id: arrId[1];
    const resultado = itemcompra.itemagregado.filter((id) => id != arrId[0]);
    await Itemcompra.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        itemagregado: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};