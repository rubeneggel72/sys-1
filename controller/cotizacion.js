const Cotizacion = require('../models/Cotizacion');
const Organizacion = require('../models/Organizacion');
const Itemcompra = require('../models/Itemcompra');
const Indicator = require('../models/Indicator');
const Cliente = require('../models/Cliente');
const User = require('../models/User');
const logo_base_64 = require('../logo_base_64.js');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const util = require('util');
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
exports.homepage = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Lista de Notas de Venta'
  };
  //let search = 'idcotizacion,-1';

  // let searchTerm = '';
  let perPage = 30;
  // let page = req.query.page || 1;
  string = req.user.cotizacionindex
  console.log("String"+string)
  let arrsearch = string.split(";")
  let searchTerm = arrsearch[0]
  let page = req.query.page || arrsearch[2];
  let search = arrsearch[1]
  try {

    let ordenamiento = search.split(',');
    var sort = { [ordenamiento[0]]: ordenamiento[1] };
    console.log('sort---:', sort);

    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////

    //////////////////////////////////
    let arr = searchTerm.split('+');
    let obj = [];
    let obj2 = [];
    let obj3 = [];
    let obj4 = [];
    let ii = 0;
    console.log('arr---:', arr);
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Cotizacion.find({
        $and: [
          {
            $or: [
              { unidadnegocio: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { titulo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { entregado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { cobrado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idcotizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { mercado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { fechaventa: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { nombreorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { fechaentrega: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
          }
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
    cotizacion = obj4;
    //////////////////////////////////

    let count = cotizacion.length

    console.log(count)






    // let cotizacion = await Cotizacion.aggregate([{ $sort: { createdAt: -1 } }])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();
    // const count = await Cotizacion.count();

    res.render('pages/09_cotizacion_index', {
      user: req.user,
      locals,
      cotizacion,
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

exports.add = async (req, res) => {
  const organizacion = {
    idorganizacion: '00000',
    nombre: '< Vacío >'
  };

  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Nueva Nota de Venta'
  };
  res.render('pages/09_cotizacion_add', {
    user: req.user,
    locals,
    organizacion
  });
};

exports.selectorganizacion = async (req, res) => {
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Edicion Nota de Venta'
  };
  const messages = 'mensaje';
  try {
    let perPage = 30;
    let page = req.body.page || 1;

    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    let searchTerm = req.body.searchTerm;
    let search = req.body.search;

    if (searchTerm == undefined) {
      searchTerm = '';
    }

    console.log('search ordenam:', search);
    if (search == undefined) {
      search = 'idorganizacion,-1';
    }
    console.log('search ordenam final:', search);
    let ordenamiento = search.split(',');
    var sort = { [ordenamiento[0]]: ordenamiento[1] };
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
    let count = organizacion.lenght;

    res.render('pages/09_cotizacion_organizacion_select', {
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

exports.selectedorganizacion = async (req, res) => {
  const aux = req.params.id;
  let arraux = aux.split(',');
  const organizacion = {
    idorganizacion: arraux[1],
    razonSocial: arraux[2],
    nombre: arraux[3],
    _id: arraux[0]
  };

  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Lista de Ordenes de Venta'
  };
  res.render('pages/09_cotizacion_add', {
    user: req.user,
    locals,
    organizacion
  });
};

exports.view = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findOne({ _id: req.params.id });
    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: ''
    };
    cotizacion.updatedAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
    cotizacion.createdAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
    res.render('pages/09_cotizacion_view', {
      user: req.user,
      locals,
      cotizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: ''
    };
    console.log("string10 ", cotizacion.string10)
    console.log("string09 ", cotizacion.string09)
    if (cotizacion.string10 == "") {
      let string10 = ""
      for (let i = 1; i < cotizacion.itemagregado.length; i++) {
        string10 = string10 + ","
      }
      cotizacion.string10 = string10
    }
    if (cotizacion.string09 == "") {
      let string09 = ""
      for (let i = 1; i < cotizacion.itemagregado.length; i++) {
        string09 = string09 + ","
      }
      cotizacion.string09 = string09
    }

    let date = new Date()
    let fecha = ""
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) { month = "0" + month }
    if (day < 10) { day = "0" + day }
    fecha = year + "-" + month + "-" + day
    if (cotizacion.array1.length == 0) { cotizacion.array1 = [0, 0, 0, 0, 0, 0] }
    if (cotizacion.string02 == '') {
      cotizacion.string02 = 'T-1,,P-2,false,false,false,false,,,,,';
    }
    console.log("precio venta "+cotizacion.precioventa)
    if ((cotizacion.precioventa==undefined)||(cotizacion.precioventa==null)) {cotizacion.precioventa=0}
    if ((cotizacion.numero01==undefined)||(cotizacion.numero01==null)) {cotizacion.numero01=0}

    if (cotizacion.itemagregadoestado == undefined) {
      cotizacion.itemagregadoestado = '';
    }
    let persona = [];
    let itemagregado = [];
    let indicatoragregado = [];
    cotizacion.updatedAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
    cotizacion.createdAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());

    const org = await Organizacion.findOne({ _id: ObjectId(cotizacion._idorganizacion) });

    for (let i = 0; i < org.personas.length; i++) {
      let per = await Cliente.findOne({ _id: ObjectId(org.personas[i]) });

      persona.push(per);
      // console.log('Per:'+ per)
    }

    // console.log('Persona:'+ persona)

    cotizacion.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
    let iaestado = cotizacion.itemagregadoestado;
    let iamotivo = cotizacion.string04;
    let iarefernecia = cotizacion.string05;
    let iapreciocotizado = cotizacion.string06;
    let iatexto = cotizacion.string07;
    let iausuario = cotizacion.string10;
    let iafecha = cotizacion.string09;



    let arrestado = iaestado.split(',');
    let iacant = cotizacion.itemagregadocant;
    let arrcant = iacant.split(',');
    let arrmotivo = iamotivo.split(',');
    let arrefernecia = iarefernecia.split(',');
    let arrpreciocotizado = iapreciocotizado.split(',');
    let arrtexto = iatexto.split(';');
    let arrusuario = iausuario.split(',');
    let arrfecha = iafecha.split(',');


    cotizacion.idorganizacion = org.idorganizacion;

    for (let i = 1; i < cotizacion.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: cotizacion.itemagregado[i] });

      let arrtexto1 = arrtexto[i].split(',');

      aux.textoadaptacion = arrtexto1[0];
      aux.textoretrabajo = arrtexto1[1];
      aux.textodesviacion = arrtexto1[2];
      aux.estado = arrestado[i];
      aux.cant = arrcant[i];
      aux.motivo = arrmotivo[i];
      aux.referencia = arrefernecia[i];
      aux.preciocotizado = arrpreciocotizado[i];
      aux.usuario = arrusuario[i];
      aux.fecha = arrfecha[i];

      itemagregado.push(aux);
    }
    cotizacion.itemagregado = itemagregado;
    iacant = cotizacion.indicatoragregadocant;
    arrcant = iacant.split(',');

    for (let i = 1; i < cotizacion.indicatoragregado.length; i++) {
      let aux = await Indicator.findOne({ _id: cotizacion.indicatoragregado[i] });
      aux.estado = arrestado[i];
      aux.cant = arrcant[i];
      indicatoragregado.push(aux);
    }

    cotizacion.indicatoragregado = indicatoragregado;

    res.render('pages/09_cotizacion_edit', {
      user: req.user,
      locals,
      cotizacion,
      locals,
      messages,
      persona,
      fecha
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  const messages = 'Registo de Organizacion Actualizado';

  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Actualizando Nota de Venta'
  };
  try {

    const cotizacion0 = await Cotizacion.findOne({ _id: req.params.id });
    let arr0 = cotizacion0.itemagregado
    // console.log("arr0>>>>>> ", arr0)
    // console.log("arr0>>>>>> ", arr0.length)
    let arritemagregadocant = req.body.itemagregadocant.split(",")
    let arritemagregadoestado = req.body.itemagregadoestado.split(",")
    let arritemagregadofecha = req.body.string09.split(",")
    let arritemagregadoquien = req.body.string10.split(",")
    

    // console.log("arritemagregadocant ", arritemagregadocant)
    // console.log("arritemagregadoestado ", arritemagregadoestado)
    // console.log("arr0.lenght>>>>>> ", arr0.length)
    let reservaingenieria = ""
    console.log("//////////////////////")
    console.log("arr0>>>>>> ", arr0)
    console.log("arr0>>>>>> ", arr0.length)
    console.log("//////////////////////")
    console.log("//////////////////////")
    console.log("//////////////////////")
    console.log("//////////////////////")
    for (i = 1; i < arr0.length; i++) {
      let cant=0
      let nv = {}

      nv._id = cotizacion0._id
     
      nv.nombreorganizacion=cotizacion0.nombreorganizacion.split("(")[0]
      nv.idcotizacion = cotizacion0.idcotizacion
      nv.estado = arritemagregadoestado[i]
      nv.cant = arritemagregadocant[i]
      nv.fecha = arritemagregadofecha[i]
      nv.quien = arritemagregadoquien[i]
      // console.log("nv>>>>>> ", nv._id)
      let res = ""
      // console.log("nv.estado>>>>>> ", nv.estado)
     
        // console.log("includes TRUE")
        res = nv._id + "," + nv.idcotizacion + "," + nv.cant + ","+ nv.estado+ "," + nv.fecha + "," + nv.quien+ "," +nv.nombreorganizacion
        // console.log("res>>>>>> ", res)
        let itemcompra = await Itemcompra.findOne({ _id: arr0[i] });
        let res0 = itemcompra.reservaingenieria
      //   console.log("res0>>>>>>"+ itemcompra.nombre+"<<<")
      //  console.log("res0>>>>>>"+ res0+"<<<")
       if (res0 != "") {
       res = res +";"+ res0}
      //  console.log("res+res0>>>>>> ", res) 
       arrres1 = res.split(";")

       //calcula cantidad
       res=arrres1[0]
      //  cant=parseFloat(arrres.split(",")[2])
    
       for (j = 1; j < arrres1.length; j++) {
        // console.log("arrr1 >>>>>> ",j,i, arrres)
        // console.log("includes  >>>>>> ",nv._id)
        if (arrres1[j].includes( nv._id,0) ){console.log("TRUE")}
        else{console.log("FLASE")
          res=res+";"+arrres1[j];
          // console.log("FALSE",i,j,nv.estado,nv.estado.includes("Aprobado",0) )
          // if (nv.estado.includes("Aprobado",0) ) {cant=cant+parseFloat(arrres1[j].split(",")[2])}
          // console.log("CANT1 ",cant)
        }}
        cant=0
        arrres=res.split(";")
        for (j = 0; j < arrres.length; j++) {
        console.log(arrres[j].split(",")[1],arrres[j].split(",")[2],arrres[j].split(",")[3])
        if(arrres[j].split(",")[3].includes('Aprob'))
        cant=cant+ parseFloat( arrres[j].split(",")[2])
          // if (nv.estado.includes("Aprobado",0) )
        }
      
      console.log("CANT total ",cant)
      console.log("res>>>>>> ", res)
      itemcompra = await Itemcompra.findOneAndUpdate({ _id: arr0[i] },{reservaingenieria:res,stockreservado:cant});
    }
      



      // console.log("items agregados>>>>>> ",item)
      // if(reservaingenieria==""){
      //   reservaingenieria=item._id+","+item.iditemcompra+","+item.estado+","+item.cant+","+item.fecha+","+item.quien
      // }else{
      //   reservaingenieria=reservaingenieria+";"+item._id+","+item.iditemcompra+","+item.estado+","+item.cant+","+item.fecha+","+item.quien
      // }

      // let reservaingenieria0 = itemcompra.reservaingenieria
      // console.log("reservaingenieria>>>>>> ", reservaingenieria0)
      // let arrri = reservaingenieria0.split(";")

      // if(arrri[0].split(",").lenght==5){
      //       for(j=0;j<arrri.lenght;j++){
      //   let rs=arri[j].split(",")
      //   if (itemcompra.itemagregado)
      // }
    
  
  
    

   arr = req.body.string08.split(",")

  let array1 = []
  array1.push(arr[0])
  array1.push(arr[1])
  array1.push(arr[2])
  array1.push(arr[3])
  array1.push(arr[4])
  array1.push(arr[5])

  await Cotizacion.findByIdAndUpdate(req.params.id, {
    unidadnegocio: req.body.unidadnegocio,
    mercado: req.body.mercado,
    idorganizacion: req.body.idorganizacion,
    titulo: req.body.titulo,
    fvy: req.body.fvy,
    fvm: req.body.fvm,
    fvd: req.body.fvd,
    fey: req.body.fey,
    fem: req.body.fem,
    fed: req.body.fed,
    fechaentrega: req.body.fechaentrega,
    fechaventa: req.body.fechaventa,
    precioventa: req.body.precioventa,
    planpago: req.body.planpago,
    planentrega: req.body.planentrega,
    factura: req.body.factura,
    cobro: req.body.cobro,
    entrega: req.body.entrega,
    numero01: req.body.numero01,
    unidad: req.body.unidad,

     details:req.body.details,
     formapago:req.body.formapago,
     cotizacion:req.body.cotizacion,
    cotizacionadministracion: req.body.cotizacionadministracion,
    cotizacionproduccion: req.body.cotizacionproduccion,
    notaadministracionventa: req.body.notaadministracionventa,
    notaadministracion: req.body.notaadministracion,
    notaproduccionventa: req.body.notaproduccionventa,
    notaproduccion:req.body.notaproduccion,
    
    estado: req.body.estado,
    vendedor: req.body.vendedor,
    comision: req.body.comision,
    _idorganizacion: req.body._idorganizacion,
    idorganizacion: req.body.idorganizacion,
    nombreorganizacion: req.body.nombreorganizacion,
    items: req.body.items,
    files_upload: req.body.files_upload,
    itemagregadocant: req.body.itemagregadocant,
    itemagregadoestado: req.body.itemagregadoestado,
    indicatoragregadocant: req.body.indicatoragregadocant,
    costopropio: req.body.costopropio,
    costoarbol: req.body.costoarbol,
    string01: req.body.string01,
    string02: req.body.string02,
    string03: req.body.string03,
    string04: req.body.string04,
    string05: req.body.string05,
    string06: req.body.string06,
    string07: req.body.string07,
    string08: req.body.string08,
    string10: req.body.string10,
    string09: req.body.string09,
    string11: req.body.string11,
    array1: array1,
    /// string02 datos para armar pdf cotizacion
    /// string03 datos para distintas formas de mostrar esta pagina
    /// string04 estado
    /// string05 motivo
    /// string06 preciocotizado
    /// stringg07 texto adaptacion, retrabajo, desviacion
    /// string08 resumen pago, facturacion, entrega
    numero01: req.body.numero01,
    updatedAt: Date.now()
  });
  console.log('Estado:', req.body.estado);
  res.render('pages/09_cotizacion_resultado', {
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
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Eliminando Nota de Venta'
  };
  try {
    await Cotizacion.deleteOne({ _id: req.params.id });
    res.render('pages/09_cotizacion_resultado', {
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
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 20;
    let page = req.query.page || 1;
    let search = req.body.search || 'idcotizacion,-1';
    searchTerm = req.body.searchTerm;

    let string = searchTerm + ";" + search + ";" + page
    await User.findByIdAndUpdate(req.user._id, {
      cotizacionindex: string
    })


    console.log('search ordenam:', search);
    //////////////////////////////////
    let ordenamiento = search.split(',');
    var sort = { [ordenamiento[0]]: ordenamiento[1] };
    console.log('sort---:', sort);

    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////

    //////////////////////////////////
    let arr = searchTerm.split('+');
    let obj = [];
    let obj2 = [];
    let obj3 = [];
    let obj4 = [];
    let ii = 0;
    console.log('arr---:', arr);
    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Cotizacion.find({
        $and: [
          {
            $or: [
              { unidadnegocio: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { titulo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { entregado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { cobrado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idcotizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { mercado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { fechaventa: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { nombreorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { fechaentrega: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
          }
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
    cotizacion = obj4;
    //////////////////////////////////

    let count = cotizacion.lenght

    res.render('pages/09_cotizacion_index', {
      user: req.user,
      locals,
      cotizacion,
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
  let aux1 = ids.idcotizacion;
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.idcotizacion = aux.toString();
  let j = 5 - ids.idcotizacion.length;
  for (j; j > 0; j--) {
    ids.idcotizacion = '0' + ids.idcotizacion;
  }
  ids.idcotizacion = 'T' + ids.idcotizacion;
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    idcliente: ids.idcliente,
    idcotizacion: ids.idcotizacion,
    updatedAt: Date.now()
  });

  const cotizacion = {
    idcotizacion: ids.idcotizacion,
    unidadnegocio: req.body.unidadnegocio,
    mercado: req.body.mercado,
    idorganizacion: req.body.idorganizacion,
    titulo: req.body.titulo,
    fechaventa: req.body.fechaventa,
    fechaentrega: req.body.fechaentrega,
    planpago: 'Contraentrega,100,100,' + req.body.fechaentrega + ',,,,,,',
    planentrega: 'Entrega Nº 1,100,' + req.body.fechaentrega + ',,,,,,',
    factura: 'A,0,0,0,0,21 %,0,AAAA-MM-DD,S/C' + ',,,,,,',
    cobro: ',0,,0,0,0,0,AAAA-MM-DD,0,' + ',,,,,,',
    precioventa: req.body.precioventa,
    numero01: req.body.numero01,
    unidad: req.body.unidad,
    cotizacion: req.body.cotizacion,
    cotizacionadministracion: req.body.cotizacionadministracion,
    cotizacionproduccion: req.body.cotizacionproduccion,
    notaadministracionventa: req.body.notaadministracionventa,
    notaadministracion: req.body.notaadministracion,
    notaproduccionventa: req.body.notaproduccionventa,
    cotizacionproduccion: req.body.cotizacionproduccion,
    comision: 0,
    estado: req.body.estado,
    _idorganizacion: req.body._idorganizacion,
    idorganizacion: req.body.idorganizacion,
    nombreorganizacion: req.body.nombreorganizacion,
    items: req.body.items,
    costopropio: 0,
    costoarbol: 0,
    indicatoragregado: [''],
    indicatoragregadocant: '0',
    itemagregadoestado: 'vacio',
    itemagregado: [''],
    itemagregadocant: '0',
    string01: ''
  };
  try {
    const newCotizacion = new Cotizacion(cotizacion);
    await newCotizacion.save();
    const locals = {
      area: 'cotizacion',
      title: 'Verr datos organizacion',
      description: 'Free NodeJs User Management System'
    };
    res.redirect('./index');
  } catch (e) {
    console.log(e);
  }
};

exports.viewItem = async (req, res) => {
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const cliente = await Cliente.findOne({ _id: arrId[0] });
    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/09_cotizacion_view_item', {
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
  let arr = fecha.split('-');
  let fechasola = arr[2].slice(0, 2) + '-' + arr[1] + '-' + arr[0];
  return fechasola;
}

exports.select = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
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
    res.render('pages/09_cotizacion_item_select', {
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

exports.searchItem = async (req, res) => {
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let cotizacion = req.body.cotizacion;

    
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
    const count = clientes.lenght

    res.render('pages/09_cotizacion_item_select', {
      user: req.user,
      locals,
      clientes,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      cotizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.upregister = async (req, res) => {
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const organizacion = await Organizacion.findOne({ _id: arrId[1] });

    organizacion.personas.push(arrId[0]);

    await Organizacion.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        personas: organizacion.personas,
        updatedAt: Date.now()
      }
    );

    messages = 'Se ha creado el registo';
    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
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

exports.deleteItem = async (req, res) => {
  const messages = 'Registo de Organizacion Eliminado';
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const cotizacion = await Cotizacion.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = cotizacion.personas.filter((id) => id != arrId[0]);
    await Cotizacion.findByIdAndUpdate(
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

const zeroPad = (val) => {
  val.toString().padStart(2, '0');
  // Advertencia, padStart() -> ECMAScript 2017

  let odate = val;
  let year = odate.getFullYear();
  let month = zeroPad(odate.getMonth());
  let day = zeroPad(odate.getDate());
  let hour = zeroPad(odate.getHours());
  let mins = zeroPad(odate.getMinutes());

  return year + '/' + month + '/' + day;
};

exports.searchorganizacion = async (req, res) => {
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
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

    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Organizacion.find({
        $or: [
          { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { razonSocial: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { idorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { ciudadAdministracion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { ciudadPlantaIndustrial: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
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
    organizacion = obj4;
    //////////////////////////////////
    const count = await Organizacion.count();

    res.render('pages/09_cotizacion_organizacion_select', {
      user: req.user,
      locals,
      organizacion,
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

exports.ordenaritems = async (req, res) => {
  const ids = req.params.id;
  console.log('ordenar ' + ids);
  let arrId = ids.split(',');
  const locals = {
    area: 'itemcompra',
    title: 'Busqueda datos ',
    description: 'Free NodeJs User Management System',
    scroll: 0
  };
  try {
    let origen = arrId[0];
    let destino = arrId[1];
    let id = arrId[2];
    console.log('id ::', id);
    const cotizacion = await Cotizacion.findOne({ _id: id });

    console.log('cotizacion::', cotizacion);

    let arrcant = cotizacion.itemagregadocant.split(',');

    let arrestado = cotizacion.itemagregadoestado.split(',');
    let arrmotivo = cotizacion.string04.split(',');
    let arrefernecia = cotizacion.string05.split(',');
    let arrpreciocotizado = cotizacion.string06.split(',');
    let arrtexto = cotizacion.string07.split(';');

    let arrusuario = cotizacion.string10.split(',');
    let arrfecha = cotizacion.string09.split(',');





    let removed = cotizacion.itemagregado.splice(origen, 1);
    let removed1 = arrcant.splice(origen, 1);
    let removed2 = arrestado.splice(origen, 1);

    let removed3 = arrmotivo.splice(origen, 1);
    let removed4 = arrefernecia.splice(origen, 1);
    let removed5 = arrpreciocotizado.splice(origen, 1);
    let removed6 = arrtexto.splice(origen, 1);
    let removed7 = arrusuario.splice(origen, 1);
    let removed8 = arrfecha.splice(origen, 1);

    cotizacion.itemagregado.splice(destino, 0, removed[0]);
    arrcant.splice(destino, 0, removed1);
    arrestado.splice(destino, 0, removed2);

    arrmotivo.splice(destino, 0, removed3);
    arrefernecia.splice(destino, 0, removed4);
    arrpreciocotizado.splice(destino, 0, removed5);
    arrtexto.splice(destino, 0, removed6);
    arrusuario.splice(destino, 0, removed7);
    arrfecha.splice(destino, 0, removed8);

    let cont = cotizacion.itemagregadocant;

    cotizacion.itemagregadocant = '';
    for (let i = 0; i < arrcant.length; i++) {
      if (i == 0) {
        cotizacion.itemagregadocant = arrcant[i];
        cotizacion.itemagregadoestado = arrestado[i];
        cotizacion.string04 = arrmotivo[i];
        cotizacion.string05 = arrefernecia[i];
        cotizacion.string06 = arrpreciocotizado[i];
        cotizacion.string07 = arrtexto[i];
        cotizacion.string10 = arrusuario[i];
        cotizacion.string09 = arrfecha[i];
      } else {
        cotizacion.itemagregadocant = cotizacion.itemagregadocant + ',' + arrcant[i];
        cotizacion.itemagregadoestado = cotizacion.itemagregadoestado + ',' + arrestado[i];

        cotizacion.string04 = cotizacion.string04 + ',' + arrmotivo[i];
        cotizacion.string05 = cotizacion.string05 + ',' + arrefernecia[i];
        cotizacion.string06 = cotizacion.string06 + ',' + arrpreciocotizado[i];
        cotizacion.string07 = cotizacion.string07 + ';' + arrtexto[i];
        cotizacion.string10 = cotizacion.string10 + ',' + arrusuario[i];
        cotizacion.string09 = cotizacion.string09 + ',' + arrfecha[i];
      }
    }

    await Cotizacion.findByIdAndUpdate(
      { _id: id },
      {
        itemagregado: cotizacion.itemagregado,
        itemagregadocant: cotizacion.itemagregadocant,
        itemagregadoestado: cotizacion.itemagregadoestado,
        string04: cotizacion.string04,
        string05: cotizacion.string05,
        string06: cotizacion.string06,
        string07: cotizacion.string07,
        string09: cotizacion.string09,
        string10: cotizacion.string10,
        updatedAt: Date.now()
      }
    );

    res.redirect('../cotizacion/edit/' + id);
  } catch (error) {
    console.log(error);
  }
};

exports.viewitemagregado = async (req, res) => {
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemagregado = await Itemcompra.findOne({ _id: arrId[0] });

    const locals = {
      area: 'cotizacion',
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
  let arr = fecha.split('-');
  let fechasola = arr[2].slice(0, 2) + '-' + arr[1] + '-' + arr[0];
  return fechasola;
}

exports.select = async (req, res) => {
  const messages = 'mensaje';
  console.log('select ');
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
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

//////////////////////////////////////////////////////////////////
//////////  ITEM AGREGADOS   /////////////////////////////////////
//////////////////////////////////////////////////////////////////

exports.searchitemagregado = async (req, res) => {
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta ',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 30;
    let string=req.user.cotizacionsearchitemagregado
    console.log('req.body.searchTerm',req.body.searchTerm)
    let arrsearch=string.split(";")
    let searchTerm = req.body.searchTerm|| arrsearch[0]
    let page = req.body.page || arrsearch[2];
    let search = req.body.search || arrsearch[1]
  
    string=searchTerm+";"+search+";"+page
    console.log('string.....2.',string)
    await User.findByIdAndUpdate(req.user._id, {cotizacionsearchitemagregado:string  })
   
    
    let itemcompra = req.body.itemcompra;


    //////////////////////////////////
    let ordenamiento = search.split(',');
    var sort = { [ordenamiento[0]]: ordenamiento[1] };

    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
   
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
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
        ],
        $and: [{ hijo: 0 }]
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
    itemagregado = obj4;
    //////////////////////////////////

    const count = await Cotizacion.count();
    res.render('pages/09_cotizacion_itemagregado', {
      user: req.user,
      locals,
      itemagregado,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      itemcompra,
      search
    });
  } catch (error) {
    console.log(error);
  }
};

exports.upregisteritemagregado = async (req, res) => {
  try {
    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: 'Free NodeJs User Management System'
    };

    const ids = req.params.id;
    let arrId = ids.split(',');
    console.log('arrId', arrId);
    let repetido = 0;
    // busca la nota de venta//
    const cotizacion = await Cotizacion.findOne({ _id: arrId[1] });
    // console.log('Cant', cotizacion.itemagregadocant);
    ///verifica si el item a agregar está repetido
    for (let i = 0; i < cotizacion.itemagregado.length; i++) {
      if (cotizacion.itemagregado[i] == arrId[0]) {
        console.log('REPETIDO', cotizacion.itemagregado[i], arrId[0]);
        repetido = 1;
      }
    }
    let stock =
      parseInt(req.body.stock1) + parseInt(req.body.stock2) + parseInt(req.body.stock3) + parseInt(req.body.stock4);
    console.log('stock', stock);
    // busca el item a agregar  itemcompra
    var itemcompra = await Itemcompra.findOne({ _id: arrId[0] });
    // verifica sie tipo venta debe crear e insertar un hijo, si no inserta el item//
    if (itemcompra.tipoitem == 'Venta') {
      repetido = 0
      console.log('ITEM DE VENTA');
      //itemcompra1 es el hijo itemcompra es el padre
      let itemcompra1 = {
        nombre: itemcompra.nombre,
        observacion: itemcompra.observacion,
        stock: stock,
        iditemcompra: itemcompra.iditemcompra,
        tipoitem: itemcompra.tipoitem,
        rubroitem: itemcompra.rubroitem,
        stockminimo: itemcompra.stockminimo,
        unidad: itemcompra.unidad,
        mxunidad: itemcompra.mxunidad,
        m2xunidad: itemcompra.m2xunidad,
        m3xunidad: itemcompra.m3xunidad,
        kgxunidad: itemcompra.kgxunidad,
        lxunidad: itemcompra.lxunidad,
        stockcompras: itemcompra.stockcompras,
        stockrecepcion1: itemcompra.stockrecepcion1,
        stockrecepcionpos1: itemcompra.stockrecepcionpos1,
        stockincorporado: itemcompra.stockincorporado,
        stockrecepcion2: itemcompra.stockrecepcion2,
        stockrecepcionpos2: itemcompra.stockrecepcionpos2,
        stockreservado: itemcompra.stockreservado,
        stockdevolucion: itemcompra.stockdevolucion,
        stockdevolucionpos: itemcompra.stockdevolucionpos,
        stockdevuelto: itemcompra.stockdevuelto,
        stockdespacho: itemcompra.stockdespacho,
        stockdespachopos: itemcompra.stockdespachopos,

        stockacondicionamiento: itemcompra.stockacondicionamiento,
        stockproduccion: itemcompra.stockproduccion,
        stockreservado: itemcompra.stockreservado,
        stockentregado: itemcompra.stockentregado,
        stock1: itemcompra.stock1,
        stockpos1: itemcompra.stockpos1,
        stock2: itemcompra.stock2,
        stockpos2: itemcompra.stockpos2,
        stock3: itemcompra.stock3,
        stockpos3: itemcompra.stockpos3,
        stock4: itemcompra.stock4,
        stockpos4: itemcompra.stockpos4,
        details: itemcompra.details,
        cotizaciondetails: itemcompra.cotizaciondetails,
        cotizaciontitulo: itemcompra.cotizaciontitulo,
        ordencompradetails: itemcompra.ordencompradetails,
        ordencompratitulo: itemcompra.ordencompratitulo,
        tiendatitulo: itemcompra.tiendatitulo,
        tiendadetalle: itemcompra.tiendadetalle,
        tiendamaterial: itemcompra.tiendamaterial,
        tiendacantidad: itemcompra.tiendacantidad,
        tiendaplazo: itemcompra.tiendaplazo,
        files_upload: itemcompra.files_upload,
        itemagregadocant: itemcompra.itemagregadocant,
        itemagregadojunto: itemcompra.itemagregadojunto,
        indicatoragregadocant: itemcompra.indicatoragregadocant,
        costopropio: itemcompra.costopropio,
        costoarbol: itemcompra.costoarbol,
        vseccion: itemcompra.vseccion,
        vdiametro: itemcompra.vdiametro,
        vlongitud: itemcompra.vlongitud,
        vancho: itemcompra.vancho,
        valtura: itemcompra.valtura,
        vdimension: itemcompra.vdimension,
        vinclinacion: itemcompra.vinclinacion,
        vpendiente: itemcompra.vpendiente,
        vaccionamiento: itemcompra.vaccionamiento,
        vmando: itemcompra.vmando,
        vmotor: itemcompra.vmotor,
        vcapacidadproduccion: itemcompra.vcapacidadproduccion,
        vcapacidadutil: itemcompra.vcapacidadutil,
        vcapacidadtotal: itemcompra.vcapacidadtotal,
        ventrada: itemcompra.ventrada,
        vsalida: itemcompra.vsalida,
        vtension: itemcompra.vtension,
        vpotencia: itemcompra.vpotencia,
        vmaterial: itemcompra.vmaterial,
        vtratamiento: itemcompra.vtratamiento,
        vterminacion: itemcompra.vterminacion,
        vpeso: itemcompra.vpeso,
        cotizacionnota: itemcompra.cotizacionnota,
        contadorhijo: itemcompra.contadorhijo,
        hijo: itemcompra.hijo,
        hijos: itemcompra.hijos
      };
      itemcompra1.hijo = itemcompra.contadorhijo + 1;
      itemcompra.contadorhijo = itemcompra1.hijo;
      delete itemcompra1._id;
      itemcompra1.contadorhijo = 0;
      console.log(
        'ITEMCOMPRA1 ',
        itemcompra1._id,
        '-',
        itemcompra1.contadorhijo,
        '-',
        itemcompra1.hijo,
        '-',
        itemcompra1.hijos
      );
      var newItemcompra = new Itemcompra(itemcompra1);
      await newItemcompra.save();
      itemcompra.hijos = itemcompra.hijos + '-' + newItemcompra._id;
      console.log('new ID' + itemcompra.hijos);
      console.log('ITEMCOMPRA ', itemcompra.contadorhijo, '-', itemcompra.hijo, '-', itemcompra.hijos);
      await Itemcompra.findByIdAndUpdate(
        { _id: itemcompra._id },
        {
          hijos: itemcompra.hijos,
          contadorhijo: itemcompra.contadorhijo,
          itemagregado: itemcompra.itemagregado,
          itemagregadocant: itemcompra.itemagregadocant,
          updatedAt: Date.now()
        }
      );

      ////////////////////////////////////////////
      ////////////////////////////////////////////
      ///    inserta item en nota de venta     ///
      ////////////////////////////////////////////
      ////////////////////////////////////////////
      console.log('newitemcompra----', newItemcompra);
      if (repetido == 0) {
        cotizacion.itemagregado.push(newItemcompra._id);
        console.log('itemcompra.itemagregadocant ---**-', itemcompra.itemagregadocant);
        cotizacion.itemagregadocant = cotizacion.itemagregadocant + ',' + 0;
        cotizacion.itemagregadoestado = cotizacion.itemagregadoestado + ',' + "Edicion";
        cotizacion.string04 = cotizacion.string04 + ',' + 'Normal';
        cotizacion.string05 = cotizacion.string05 + ',' + '';
        cotizacion.string06 = cotizacion.string06 + ',' + 0;
        cotizacion.string07 = cotizacion.string07 + ';' + ',,';
        console.log('actualizando item agregado');
        await Cotizacion.findByIdAndUpdate(
          { _id: arrId[1] },
          {
            itemagregado: cotizacion.itemagregado,
            itemagregadocant: cotizacion.itemagregadocant,
            itemagregadoestado: cotizacion.itemagregadoestado,
            string04: cotizacion.string04,
            string05: cotizacion.string05,
            string06: cotizacion.string06,
            string07: cotizacion.string07,
            updatedAt: Date.now()
          }
        );

        messages = 'Se ha agregado un item de venta ';
      } else {
        messages = 'No se creó el registro. Registro repetido' + arrId[1] + ' ' + cotizacion.itemagregado;
      }
    } else {
      if (repetido == 0) {
        cotizacion.itemagregado.push(arrId[0]);
        cotizacion.itemagregadocant = cotizacion.itemagregadocant + ',' + 0;
        cotizacion.itemagregadoestado = cotizacion.itemagregadoestado + ',' + "Edicion";
        cotizacion.string04 = cotizacion.string04 + ',' + 'Normal';
        cotizacion.string05 = cotizacion.string05 + ',' + '';
        cotizacion.string06 = cotizacion.string06 + ',' + 0;
        cotizacion.string07 = cotizacion.string07 + ';' + ',,';
        console.log('actualizando item agregado');

        console.log('arrId[1] ' + arrId[0]);
        console.log('cotizacion.itemagregado ' + cotizacion.itemagregado);
        console.log('itemcompra.itemagregadocant ----', itemcompra.itemagregadocant);
        console.log('cotizacion.itemagregadocant ' + cotizacion.itemagregadocant);

        await Cotizacion.findByIdAndUpdate(
          { _id: arrId[1] },
          {
            itemagregado: cotizacion.itemagregado,
            itemagregadocant: cotizacion.itemagregadocant,
            itemagregadoestado: cotizacion.itemagregadoestado,
            string04: cotizacion.string04,
            string05: cotizacion.string05,
            string06: cotizacion.string06,
            string07: cotizacion.string07,
            updatedAt: Date.now()
          }
        );

        messages = 'Se ha creado el registo un item normal';
      } else {
        messages = 'No se creó el registro. Registro repetido';
      }
    }

    res.render('pages/09_cotizacion_resultado_itemagregado', {
      arrId,
      user: req.user,
      locals,
      cotizacion
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteitemagregado = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'cotizacion',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const cotizacion = await Cotizacion.findOne({ _id: arrId[1] });
    console.log('delete elemnto nº', arrId[2], cotizacion.itemagregado.length);
    let string04 = '0';
    let string05 = '0';
    let string06 = '0';
    let string07 = '0';
    let itemagregadocant = '0';
    let itemagregadoestado = '0';
    let arritemagregadocant = cotizacion.itemagregadocant.split(",");
    let arritemagregadoestado = cotizacion.itemagregadoestado.split(",");
    let arrstring04 = cotizacion.string04.split(",");
    let arrstring05 = cotizacion.string05.split(",");
    let arrstring06 = cotizacion.string06.split(",");
    let arrstring07 = cotizacion.string07.split(";");
    for (i = 1; i < cotizacion.itemagregado.length; i++) {
      if (i != (parseInt(arrId[2]) + 1)) {
        itemagregadocant = itemagregadocant + ',' + arritemagregadocant[i];
        itemagregadoestado = itemagregadoestado + ',' + arritemagregadoestado[i];
        string04 = string04 + ',' + arrstring04[i];
        string05 = string05 + ',' + arrstring05[i];
        string06 = string06 + ',' + arrstring06[i];
        string07 = string07 + ';' + arrstring07[i];
        console.log(itemagregadocant, itemagregadoestado, string04, string05, string06, string07)
      } else { console.log("Este no " + i) }

    }

    _id: arrId[1];
    const resultado = cotizacion.itemagregado.filter((id) => id != arrId[0]);
    await Cotizacion.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        itemagregado: resultado,
        itemagregadocant: itemagregadocant,
        itemagregadoestado: itemagregadoestado,
        string04: string04,
        string05: string05,
        string06: string06,
        string07: string07,
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
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });

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

//////////////////////////////////////////////////////////////////
//////////  INDICADORES AGREGADOS   //////////////////////////////
//////////////////////////////////////////////////////////////////

exports.searchindicator = async (req, res) => {
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta ',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let itemcompra = req.body.cotizacion;
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
      obj2 = await Indicator.find({
        $or: [
          { name: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { details: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { idindicator: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { tipo: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
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
    indicatoragregado = obj4;
    //////////////////////////////////

    const count = await Indicator.count();
    res.render('pages/09_cotizacion_indicatoragregado', {
      user: req.user,
      locals,
      indicatoragregado,
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

exports.upregisterindicator = async (req, res) => {
  try {
    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: 'Free NodeJs User Management System'
    };

    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido = 0;

    const itemcompra = await Cotizacion.findOne({ _id: arrId[1] });

    for (let i = 0; i < itemcompra.indicatoragregado.length; i++) {
      if (itemcompra.indicatoragregado[i] == arrId[0]) {
        repetido = 1;
      }
    }
    if (repetido == 0) {
      itemcompra.indicatoragregado.push(arrId[0]);
      itemcompra.indicatoragregadocant = itemcompra.indicatoragregadocant + ',' + 0;
      await Cotizacion.findByIdAndUpdate(
        { _id: arrId[1] },
        {
          indicatoragregado: itemcompra.indicatoragregado,
          indicatoragregadocant: itemcompra.indicatoragregadocant,
          updatedAt: Date.now()
        }
      );

      messages = 'Se ha creado el registo';
    } else {
      messages = 'No se creó el registro. Registro repetido';
    }

    res.render('pages/09_cotizacion_resultado_itemagregado', {
      arrId,
      user: req.user,
      locals,

      itemcompra
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteindicator = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Cotizacion.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = itemcompra.indicatoragregado.filter((id) => id != arrId[0]);
    await Cotizacion.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        indicatoragregado: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};

exports.editcantindicator = async (req, res) => {
  const messages = 'Item Eliminado';
  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Cotizacion.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = itemcompra.indicatoragregado.filter((id) => id != arrId[0]);
    await Itemcompra.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        indicatoragregado: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};

exports.cotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area: 'cotizacion',
      title: 'Notas de Venta',
      description: ''
    };
    let itemagregado = [];
    let indicatoragregado = [];
    cotizacion.updatedAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
    cotizacion.createdAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
    console.log('Organizacion:' + cotizacion._idorganizacion);
    const org = await Organizacion.findOne({ _id: ObjectId(cotizacion._idorganizacion) });

    console.log('Organizacion:...................' + cotizacion._idorganizacion);
    console.log('Organizacion:...................' + org);
    cotizacion.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
    let iaestado = cotizacion.itemagregadoestado;
    console.log('estado:::' + iaestado);
    let arrestado = iaestado.split(',');
    let iacant = cotizacion.itemagregadocant;
    let arrcant = iacant.split(',');
    cotizacion.idorganizacion = org.idorganizacion;
    for (let i = 1; i < cotizacion.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: cotizacion.itemagregado[i] });
      aux.estado = arrestado[i];
      aux.cant = arrcant[i];
      itemagregado.push(aux);

      console.log('Files Upload:' + cotizacion.files_upload);
    }
    cotizacion.itemagregado = itemagregado;

    res.render('pages/09_cotizacion_cotizacion2', {
      user: req.user,
      locals,
      cotizacion,
      locals,
      messages,
      org
    });
  } catch (error) {
    console.log(error);
  }
};

exports.pdfcotizacion = async (req, res) => {
  //imports
  console.log('Cotizaciones ' + req.params.id);
  //promisify
  const mkdir = util.promisify(fs.mkdir);
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const cotizacion = await Cotizacion.findOne({ _id: req.params.id });
  const messages = 'mensaje';
  // const messages = await req.consumeFlash('info');

  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: ''
  };
  let itemagregado = [];
  let indicatoragregado = [];
  cotizacion.updatedAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
  cotizacion.createdAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
  console.log('Organizacion:' + cotizacion._idorganizacion);
  const org = await Organizacion.findOne({ _id: ObjectId(cotizacion._idorganizacion) });

  console.log('Organizacion:...................' + cotizacion._idorganizacion);
  console.log('Organizacion:...................' + org);
  cotizacion.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
  let iaestado = cotizacion.itemagregadoestado;
  console.log('estado:::' + iaestado);
  let arrestado = iaestado.split(',');
  let iacant = cotizacion.itemagregadocant;
  let arrcant = iacant.split(',');
  cotizacion.idorganizacion = org.idorganizacion;
  for (let i = 1; i < cotizacion.itemagregado.length; i++) {
    let aux = await Itemcompra.findOne({ _id: cotizacion.itemagregado[i] });
    aux.estado = arrestado[i];
    aux.cant = arrcant[i];
    itemagregado.push(aux);

    console.log('Files Upload:' + cotizacion.files_upload);
  }
  cotizacion.itemagregado = itemagregado;

  async function render() {
    try {
      //create output directory
      await mkdir('dist', { recursive: true });
      console.log('Carpeta creada: dist ');
      //render ejs template to html string
      //pass pageModel in to render content

      var html = await ejs
        .renderFile('views/pages/09_cotizacion_cotizacion.ejs', {
          user: req.user,
          locals,
          cotizacion,
          locals,
          messages,
          org
        })
        .then((output) => output);
      //create file and write html
      await writeFile('public/dist/cotizacion.html', html, 'utf8');
    } catch (error) {
      console.log(error);
    }
    return html;
  }

  //  const browser = await puppeteer.launch();

  //  const page = await browser.newPage();

  //  await page.setContent(html);

  //  await page.pdf({ path: 'dist/example.pdf', format: 'A4' });

  //  await browser.close();

  //  console.log('Here your PDF!.');
  // ;

  const filetypemap = {
    jpg: 'image/jpg',
    png: 'image/png',
    jpg: 'image/jpg',
    svg: 'image/svg+xml'
  };

  function generatePdf() {
    const $ = cheerio.load(fs.readFileSync('public/dist/cotizacion.html'));
    $('img').each(function () {
      var original_src = $(this).attr('src');
      var file_extension = original_src.split('.').slice(-1)[0]; // extract file extension
      if (!filetypemap[file_extension]) {
        console.log("There is no mapping for file extension '" + file_extension + "'.");

        return;
      }
      var local_filename = 'public/' + original_src; // example for local path equalling src path
      // var local_filename = original_src.substring(3) // example for removing "../" from the beginning of the path
      console.log('File  ' + original_src);
      if (!fs.existsSync(local_filename)) {
        console.log('File does not exist: ' + local_filename);
        return;
      }
      var local_src =
        'data:' + filetypemap[file_extension] + ';base64,' + fs.readFileSync(local_filename).toString('base64');
      $(this).attr('src', local_src);
    });

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const cabecera = '<div></div>`';
      await page.goto('http://vps-3900364-x.dattaweb.com', { waitUntil: 'networkidle0' });
      await page.emulateMediaType('print');
      await page.setContent($.html());
      await page.pdf({
        path: 'public/dist/cotizacion.pdf',
        format: 'A4',
        margin: { top: '200px', right: '50px', bottom: '100px', left: '60px' },
        displayHeaderFooter: true,
        headerTemplate: cabecera,
        footerTemplate:
          '<div id="footer-template" style="font-size:12px !important; color:#808080; padding-left:80px"></span><span class="title"></span>EC-INGENIERIA - Camilo Aldao 58-Ruta Prov. Nº70 Km 71-Bella Italia (Sta.Fe)-Tel +54 3492 518881/301376 </span></div>'
      });
      await browser.close();
      console.log('PDF generated as example.pdf.');
    })();
  }

  let html = await render();

  generatePdf();

  console.log('PDF-2 generado');

  res.redirect('/dist/cotizacion.pdf');
};

exports.pdfcotizacion2 = async (req, res) => {
  //imports
  console.log('Cotizaciones PDF' + req.params.id);
  //promisify
  const mkdir = util.promisify(fs.mkdir);
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const cotizacion = await Cotizacion.findOne({ _id: req.params.id });
  const messages = 'mensaje';
  // const messages = await req.consumeFlash('info');

  const locals = {
    area: 'cotizacion',
    title: 'Notas de Venta',
    description: ''
  };
  let itemagregado = [];
  let indicatoragregado = [];
  cotizacion.updatedAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
  cotizacion.createdAtSH = fechaSinHora(cotizacion.updatedAt.toISOString());
  console.log('Organizacion:' + cotizacion._idorganizacion);
  const org = await Organizacion.findOne({ _id: ObjectId(cotizacion._idorganizacion) });

  // console.log('Organizacion:...................'+ cotizacion._idorganizacion)
  // console.log('Organizacion:...................'+ org)
  cotizacion.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
  let iaestado = cotizacion.itemagregadoestado;
  console.log('estado:::' + iaestado);
  let arrestado = iaestado.split(',');
  let iacant = cotizacion.itemagregadocant;
  let arrcant = iacant.split(',');
  cotizacion.idorganizacion = org.idorganizacion;
  for (let i = 1; i < cotizacion.itemagregado.length; i++) {
    let aux = await Itemcompra.findOne({ _id: cotizacion.itemagregado[i] });
    aux.estado = arrestado[i];
    aux.cant = arrcant[i];
    itemagregado.push(aux);

    console.log('Files Upload:' + cotizacion.files_upload);
  }
  cotizacion.itemagregado = itemagregado;

  async function render() {
    try {
      //create output directory
      await mkdir('dist', { recursive: true });
      console.log('Carpeta creada: dist ');
      //render ejs template to html string
      //pass pageModel in to render content

      var html = await ejs
        .renderFile('views/pages/09_cotizacion_cotizacion_1.ejs', {
          user: req.user,
          locals,
          cotizacion,
          locals,
          messages,
          org
        })
        .then((output) => output);
      //create file and write html
      await writeFile('public/dist/cotizacion.html', html, 'utf8');
    } catch (error) {
      console.log(error);
    }
    return html;
  }

  //  const browser = await puppeteer.launch();

  //  const page = await browser.newPage();

  //  await page.setContent(html);

  //  await page.pdf({ path: 'dist/example.pdf', format: 'A4' });

  //  await browser.close();

  //  console.log('Here your PDF!.');
  // ;

  const filetypemap = {
    jpg: 'image/jpg',
    png: 'image/png',
    jpg: 'image/jpg',
    svg: 'image/svg+xml'
  };

  function generatePdf() {
    const $ = cheerio.load(fs.readFileSync('public/dist/cotizacion.html'));
    $('img').each(function () {
      var original_src = $(this).attr('src');
      var file_extension = original_src.split('.').slice(-1)[0]; // extract file extension
      if (!filetypemap[file_extension]) {
        console.log("There is no mapping for file extension '" + file_extension + "'.");

        return;
      }
      var local_filename = 'public/' + original_src; // example for local path equalling src path
      // var local_filename = original_src.substring(3) // example for removing "../" from the beginning of the path
      console.log('File  ' + original_src);
      if (!fs.existsSync(local_filename)) {
        console.log('File does not exist: ' + local_filename);
        return;
      }
      var local_src =
        'data:' + filetypemap[file_extension] + ';base64,' + fs.readFileSync(local_filename).toString('base64');
      $(this).attr('src', local_src);
    });

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const cabecera =
        '<div style="display:flex;width:90%;font-size: 35px;padding-left:50px;;padding-bottom:10px;margin:auto;border-bottom: 1 px solid black;"><div ><img width="50px" src=' +
        logo_base_64 +
        ' style="width:100px;height:100px;"/></div>  <div style="width:100%;text-align:center"> <div style="padding-top: 30px"> COTIZACION</div>    </div>   <div style="width:25%;text-align:right"></div>  </div>`';
      await page.goto('http://vps-3900364-x.dattaweb.com', { waitUntil: 'networkidle0' });

      await page.emulateMediaType('print');
      await page.setContent($.html());
      await page.pdf({
        path: 'public/dist/cotizacion.pdf',
        format: 'A4',
        margin: { top: '200px', right: '50px', bottom: '100px', left: '60px' },
        displayHeaderFooter: true,
        headerTemplate: cabecera,
        footerTemplate:
          '<div id="footer-template" style="font-size:12px !important; color:#808080; padding-left:50px"></span><span class="title"></span>EC-INGENIERIA - Camilo Aldao 58-Ruta Prov. Nº70 Km 71-Bella Italia (Sta.Fe)-Tel +54 3492 518881/301376 --- Pagina: <span class="pageNumber"> </span> de <span class="totalPages"></span></div>'
      });
      await browser.close();
      console.log('PDF generated as example.pdf.');
    })();
  }

  let html = await render();
  generatePdf();

  console.log('PDF-2 generado');
  res.redirect('/dist/cotizacion.pdf');
};

/////////////////// PERSONAS //////////////
/////////////////// PERSONAS //////////////
/////////////////// PERSONAS //////////////
/////////////////// PERSONAS //////////////

exports.selectpersona = async (req, res) => {
  const messages = 'mensaje';
  console.log('select ');
  const locals = {
    area: 'nota de Venta',
    title: 'Nota de venta',
    description: 'Selecionar persona'
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

    res.render('pages/09_cotizacion_persona_select', {
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
