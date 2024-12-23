const Ordencompra = require('../models/Ordencompra');
const Organizacion = require('../models/Organizacion');
const Itemcompra = require('../models/Itemcompra');
const nodemailer = require("nodemailer");

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
    area: 'ordencompra',
    title: '',
    description: 'Lista de '
  };
  //let search = 'idordencompra,-1';

  // let searchTerm = '';
  let perPage = 30;
  // let page = req.query.page || 1;
  string = req.user.ordencompraindex
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

    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Ordencompra.find({
        $and: [
          {
            $or: [
              { unidadnegocio: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { titulo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { entregado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { cobrado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idordencompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
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
    ordencompra = obj4;
    //////////////////////////////////

    let count = ordencompra.length




    // let ordencompra = await Ordencompra.aggregate([{ $sort: { createdAt: -1 } }])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();
    // const count = await Ordencompra.count();

    res.render('pages/08_ordencompra_index', {
      user: req.user,
      locals,
      ordencompra,
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
    area: 'ordencompra',
    title: '',
    description: 'Nueva Nota de Venta'
  };
  res.render('pages/08_ordencompra_add', {
    user: req.user,
    locals,
    organizacion
  });
};

exports.selectorganizacion = async (req, res) => {
  const locals = {
    area: 'ordencompra',
    title: '',
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


    if (search == undefined) {
      search = 'idorganizacion,-1';
    }

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

    res.render('pages/08_ordencompra_organizacion_select', {
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
    area: 'ordencompra',
    title: '',
    description: 'Lista de Ordenes de Venta'
  };
  res.render('pages/08_ordencompra_add', {
    user: req.user,
    locals,
    organizacion
  });
};

exports.view = async (req, res) => {
  try {
    const ordencompra = await Ordencompra.findOne({ _id: req.params.id });

    const locals = {
      area: 'ordencompra',
      title: '',
      description: ''
    };
    ordencompra.updatedAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
    ordencompra.createdAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());

    res.render('pages/08_ordencompra_view', {
      user: req.user,
      locals,
      ordencompra
    });
  } catch (error) {
    console.log(error);
  }
};



exports.edit = async (req, res) => {
  try {



    const proxyUrl = "https://dolarapi.com/v1/dolares";
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const cambio = await response.json();





    const ordencompra = await Ordencompra.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area: 'ordencompra',
      title: '',
      description: ''
    };
    if (ordencompra.array2.length == 0) {
      ordencompra.array2.push(cambio[0].venta)
      ordencompra.array2.push(cambio[0].compra)
      ordencompra.array2.push(cambio[0].fechaActualizacion)

    }

    if ((ordencompra.entrega == "") || (ordencompra.entrega == undefined)) { ordencompra.entrega = ',,0,AAAA-MM-DD,,,,,,00000000,,,,,,,,,,,,' }




    if (ordencompra.string10 == "") {
      let string10 = ""
      for (let i = 1; i < ordencompra.itemagregado.length; i++) {
        string10 = string10 + ","
      }
      ordencompra.string10 = string10
    }
    if (ordencompra.string09 == "") {
      let string09 = ""
      for (let i = 1; i < ordencompra.itemagregado.length; i++) {
        string09 = string09 + ","
      }
      ordencompra.string09 = string09
    }

    let date = new Date()
    let fecha = ""
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10) { month = "0" + month }
    if (day < 10) { day = "0" + day }
    fecha = year + "-" + month + "-" + day
    if (ordencompra.array1.length == 0) { ordencompra.array1 = [0, 0, 0, 0, 0, 0] }
    if (ordencompra.string02 == '') {
      ordencompra.string02 = 'T-1,,P-2,false,false,false,false,,,,,';
    }
    if (ordencompra.itemagregadoestado == undefined) {
      ordencompra.itemagregadoestado = '';
    }
    let persona = [];
    let itemagregado = [];
    let organizacionagregado = [];
    ordencompra.updatedAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
    ordencompra.createdAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());

    const org = await Organizacion.findOne({ _id: ObjectId(ordencompra._idorganizacion) });

    for (let i = 0; i < org.personas.length; i++) {
      let per = await Cliente.findOne({ _id: ObjectId(org.personas[i]) });

      persona.push(per);

    }



    ordencompra.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
    let iaestado = ordencompra.itemagregadoestado;
    let iamotivo = ordencompra.string04;
    let iarefernecia = ordencompra.string05;
    let iapreciocotizado = ordencompra.string06;

    let pdfpedidocotizacion = ordencompra.pdfpedidocotizacion || "";
    let pdfordencompra = ordencompra.pdfordencompra || "";
    ordencompra.pdfpedidocotizacion = pdfpedidocotizacion
    ordencompra.pdfordencompra = pdfordencompra
    let iatexto = ordencompra.string07;
    let iausuario = ordencompra.string10;
    let iafecha = ordencompra.string09;

    let arrestado = iaestado.split(',');
    let iacant = ordencompra.itemagregadocant;
    let arrcant = iacant.split(',');
    if (ordencompra.itemagregadoentregadocant == undefined) { ordencompra.itemagregadoentregadocant = iacant }
    let iaecant = ordencompra.itemagregadoentregadocant;
    let arrecant = iaecant.split(',');

    let arrmotivo = iamotivo.split(',');
    let arrefernecia = iarefernecia.split(',');
    let arrpreciocotizado = iapreciocotizado.split(',');
    let arrtexto = iatexto.split(';');
    let arrusuario = iausuario.split(',');
    let arrfecha = iafecha.split(',');


    ordencompra.idorganizacion = org.idorganizacion;

    for (let i = 1; i < ordencompra.itemagregado.length; i++) {
      console.log("arrtexto1 "+i+"--"+"/"+ordencompra.itemagregado[i])
      let aux = await Itemcompra.findOne({ _id: ordencompra.itemagregado[i] });
  
      let arrtexto1 = arrtexto[i].split(',');
      console.log("arrtexto1 "+i+"--"+"/"+ordencompra.itemagregado[i]+"-"+aux.iditemcompra +"--"+arrtexto1,arrcant[i])
     aux.textoadaptacion ="";
     console.log("arrtexto1[0] "+arrtexto1[0])
      aux.textoretrabajo = "";
      aux.textodesviacion = "";
      aux.estado = "a";
      aux.cant = arrcant[i];
      aux.ecant = arrecant[i];
      aux.motivo = arrmotivo[i];
      aux.referencia = arrefernecia[i];
      aux.preciocotizado = arrpreciocotizado[i];
      aux.usuario = arrusuario[i];
      aux.fecha = arrfecha[i];

      itemagregado.push(aux);
    }
    ordencompra.itemagregado = itemagregado;
    iacant = ordencompra.organizacionagregadocant || '0';
    arrcant = iacant.split(',');

    for (let i = 1; i < ordencompra.organizacionagregado.length; i++) {
      let aux = await Organizacion.findOne({ _id: ordencompra.organizacionagregado[i] });
      aux.estado = arrestado[i];
      aux.cant = arrcant[i];
      organizacionagregado.push(aux);
    }

    ordencompra.organizacionagregado = organizacionagregado;

    res.render('pages/08_ordencompra_edit', {
      user: req.user,
      locals,
      ordencompra,
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
    area: 'ordencompra',
    title: '',
    description: 'Actualizando Nota de Venta'
  };
  try {

    const ordencompra0 = await Ordencompra.findOne({ _id: req.params.id });
    let arr0 = ordencompra0.itemagregado

    let arritemagregadocant = req.body.itemagregadocant.split(",")
    let arrpreciocompra = req.body.string06.split(",")
    let itemagregadoentregadocant = "0"
    let arritemagregadoestado = req.body.itemagregadoestado.split(",")
    let arritemagregadofecha = req.body.string09.split(",")
    let arritemagregadoquien = req.body.string10.split(",")
    let todaslasentrega = req.body.entrega.split(';')




    let reservaingenieria = ""

    for (i = 1; i < arr0.length; i++) {
      cie = []
      let ce = 0
      let cant = 0
      let nv = {}
      var matrix = [
        []
      ];
      nv._id = ordencompra0._id
      nv.nombreorganizacion = ordencompra0.nombreorganizacion.split("(")[0]
      nv.idordencompra = ordencompra0.idordencompra
      nv.estado = arrpreciocompra[i]
      nv.cant = arritemagregadocant[i]
      nv.fecha = req.body.fechaventa
      nv.quien = req.body.vendedor

      let res = ""
      let itemcompra = await Itemcompra.findOne({ _id: arr0[i] });
      let res0 = itemcompra.procesocompra

      for (ent = 0; ent < todaslasentrega.length; ent++) {
        let arrentregas = todaslasentrega[ent].split(',')

        arent = arrentregas[5].split('$_%')

        for (ent1 = 0; ent1 < arent.length; ent1++) {
          arent1 = arent[ent1].split('*-*')
          if ((arent1[2] == itemcompra.iditemcompra) && (arent1[3] == itemcompra.hijo)) {
            ce = ce + parseFloat(arent1[0])
            cie.push(parseFloat(arent1[0]))
           // console.log('SI coincidencia' + arent1[2] + '-' + arent1[0] + '--- ' + i + '-' + ent1 + '-' + ent + '=' + ce)
          }
        }
      }

    //  console.log('recibido ' + itemcompra.iditemcompra + '-' + ce + '--' + cie)
      if (itemagregadoentregadocant == "") {
        itemagregadoentregadocant = "" + (parseFloat(ce))
      } else[
        itemagregadoentregadocant = itemagregadoentregadocant + "," + (parseFloat(ce))
      ]

      res = nv._id + "," + nv.idordencompra + "," + (parseFloat(nv.cant) - parseFloat(ce)) + "," + parseFloat(nv.cant) + ',' + nv.estado + "," + nv.fecha + "," + nv.quien + "," + nv.nombreorganizacion
     
      if (res0 != "") {
        res = res + ";" + res0
      }
      arrres1 = res.split(";")
      //calcula cantidad
      res = arrres1[0]
      //  cant=parseFloat(arrres.split(",")[2])
      for (j = 1; j < arrres1.length; j++) {
        if (arrres1[j].includes(nv._id, 0)) { console.log("TRUE") }
        else {
       
          res = res + ";" + arrres1[j];
          // if (nv.estado.includes("Aprobado",0) ) {cant=cant+parseFloat(arrres1[j].split(",")[2])}
        }
      }

      cant = 0
      arrres = res.split(";")
      for (j = 0; j < arrres.length; j++) {
        if (arrres[j].split(",")[3])
          // if (arrres[j].split(",")[3].includes('Aprob'))
          cant = cant + parseFloat(arrres[j].split(",")[2])
        // if (nv.estado.includes("Aprobado",0) )
      }


      let itemcompra0 = await Itemcompra.findOne({ _id: arr0[i] })
      let lotes = ""
      let hijo = itemcompra0.hijo
      let iditemcompra = itemcompra0.iditemcompra
      let cantordencompra = nv.cant
        idnv = nv.idordencompra
      let nv1 = idnv.slice(1, 6).toString()

      let nv2 = iditemcompra.slice(1, 6).toString()
      let nv3 = hijo.toString()
      //completa 3 cifras para nº hijo
      let nv3l = nv3.length
      for (nvi = 0; nvi < (3 - nv3l); nvi++) {
        nv3 = "0" + nv3
      }

      let text = ""

      nv = '1' + nv1 + nv2 + nv3
      nvtext = '1-' + nv1 + '-' + nv2 + '-' + nv3

    

      let arrlotes = lotes.split(";")
      let nvs = ""
      for (k = 0; k < cie.length; k++) {
        console.log('Arr ' + k, nvtext)
          if (cie[k] != undefined) {
          let nv5 = "" + k
          for (nvi = 0; nvi < (2 - nv5.length); nvi++) {
            nv5 = "0" + nv5
          }
           nvs = parseInt(nv + nv5).toString(36).toUpperCase()

          text = text + ';' + nvs + ',' + cie[k]
        }
        for(l=0;l<arrlotes.length;l++){
          
          let arr1lotes = arrlotes[l].split(",")
          if(arr1lotes[0]== nvs){
            text=text+';' + nvs + ',' + cie[k]
          }else{
            text=text+';' +arrlotes[0]
          }

        }
        

      }
      
         if (text[0]==";"){text=text.slice(1)}
      text=text.replace(";;",";")
      if (text[text.length-1]==";"){text=text.slice(0,text.length-1)}
           let arrtext=text.split(";")
  
      let arr1text=""
     
      for (let m=0;m<arrtext.length;m++){
           arr1text=arrtext[m].split(",")
        matrix[[m, 0]]= arr1text[0]
        matrix[[m, 1]]= arr1text[1]
        
      }
    console.log("matrix entregas ",matrix, matrix.length)
    console.log('text...>>'+text)
     lotes = itemcompra0.lote
        // for (let m=0;m<arrtext.length;m++){
        //   lotes=matrix[[m, 0]]+','+matrix[[m, 1]]+';'
        // }
       
               
      if(itemcompra.lote!=""){
        console.log('A-lotes!="" ',lotes, iditemcompra,)
        for (let m=0;m<arrlotes.length;m++){
          arr1lotes=arrlotes[m].split(",")
          for (let n=0;n<matrix.length;n++){
            console.log('B-'+m,n,arr1lotes[0],matrix[[n,0]])

        if(arr1lotes[0]!=matrix[[n,0]]){
          text=text+arr1lotes[0]+','+arr1lotes[1]+';'
          console.log('c-lotes==""  text='+text,m,n)
        }
        }

      }
    }
      
      text.slice(0,lotes.length-1)
      console.log("matrix lotes ",text)
        
      let aux3=0
      if(itemcompra0.tipoitem="Provisto")
        {
          arrprco=itemcompra0.procesocompra.split(";")
          for (ia=0;ia<arrprco.length;ia++){
            arrprcoaux=arrprco[ia].split(",")
            console.log('arrprcoaux '+arrprcoaux)
            if(aux3<parseFloat(arrprcoaux[4])){
             
              aux3=parseInt(parseFloat(arrprcoaux[4])/parseFloat(arrprcoaux[4])*100)/100
            }
          }
        }
        console.log('Aux3 '+aux3)

     



      itemcompra = await Itemcompra.findOneAndUpdate({ _id: arr0[i] }, { procesocompra: res, stockcompras: cant, lote:text});
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



    await Ordencompra.findByIdAndUpdate(req.params.id, {
      itemagregadoentregadocant: itemagregadoentregadocant,
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
      numero01: req.body.numero01,
      unidad: req.body.unidad,
      cambio: req.body.cambio,
      ordencompraadministracion: req.body.ordencompraadministracion,
      ordencompraproduccion: req.body.ordencompraproduccion,
      notaadministracionventa: req.body.notaadministracionventa,
      notaadministracion: req.body.notaadministracion,
      notaproduccionventa: req.body.notaproduccionventa,
      ordencompraproduccion: req.body.ordencompraproduccion,

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
      entrega: req.body.entrega,
      organizacionagregadocant: req.body.organizacionagregadocant,
      // costopropio: req.body.costopropio,
      // costoarbol: req.body.costoarbol,
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

/// actualizar stock de items agregados
notaventa=await Ordencompra.findOne({ _id:req.params.id})
let cntr=0
let cnte=0
let cntr1=0
let cnte1=0
  console.log("ITEM AGREGADO:"+notaventa.itemagregado.length)
  for (i=1;i<notaventa.itemagregado.length;i++){
    itemcompra = await Itemcompra.findOne({ _id: notaventa.itemagregado[i]})
    console.log('i='+i+"---"+itemcompra.iditemcompra)
    //console.log('res Ing='+itemcompra.reservaingenieria)
    
    let resing=itemcompra.reservaingenieria.split(";")
   
    
    console.log('res Ing Length='+resing.length)
    console.log(resing)
    cntr=0  
      cnte=0 
    for(j=0;j<resing.length;j++)
     
    {  
      if(resing!=""){
        let aux2=resing[j].split(",")
        let ov=aux2[1]
        let ov1=ov.slice(1)
        let ov2=parseInt(ov1)
        console.log(ov2,aux2[2],aux2[3])
        if(ov2>=3100){
          console.log("ok") 
           cntr=cntr+parseFloat(aux2[2])
        cnte=cnte+parseFloat(aux2[3])
      }
      
      }
     
      
    }

    console.log('CANT ing='+cntr)
    console.log('CANT entreg='+cnte)
  
 resing=itemcompra.procesocompra.split(";")
   
    
  console.log('proc Compra Length='+resing.length)
  console.log(resing)
  cntr1=0  
    cnte1=0 
  for(j=0;j<resing.length;j++)
   
  {  
    if(resing!=""){
    let aux2=resing[j].split(",")
    let ov=aux2[1]
    let ov1=ov.slice(1)
    let ov2=parseInt(ov1)
    console.log(ov2,aux2[2],aux2[3])
    if(ov2>=0){
      console.log("ok") 
       cntr1=cntr1+parseFloat(aux2[2])
    cnte1=cnte1+parseFloat(aux2[3])
    }
   
  }
  }

  console.log('CANT1 compr='+cntr)
  console.log('CANT1  compra entreg='+cnte)
  console.log("R Ing",cntr,"---Entr a cliente:",cnte-cntr,"---proc compra:",cntr1,"---en Almacen:",(cnte1-cntr1))
  await Itemcompra.findOneAndUpdate({ _id: notaventa.itemagregado[i]},{
    stockcompras:cntr1,
    stockentregado:cnte-cntr,
    stock1:(cnte1-cntr1)-(cnte-cntr),
    stockreservado:cntr

  })


}
/// fin actualizar stock de items agregados



    res.render('pages/08_ordencompra_resultado', {
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
    area: 'ordencompra',
    title: '',
    description: 'Eliminando Nota de Venta'
  };
  try {
    await Ordencompra.deleteOne({ _id: req.params.id });
    res.render('pages/08_ordencompra_resultado', {
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
    area: 'ordencompra',
    title: '',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 20;
    let page = req.query.page || 1;
    let search = req.body.search || 'idordencompra,-1';
    searchTerm = req.body.searchTerm;

    let string = searchTerm + ";" + search + ";" + page
    await User.findByIdAndUpdate(req.user._id, {
      ordencompraindex: string
    })



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
      const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      obj2 = await Ordencompra.find({
        $and: [
          {
            $or: [
              { unidadnegocio: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { titulo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { entregado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { cobrado: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
              { idordencompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
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
    ordencompra = obj4;
    //////////////////////////////////

    let count = ordencompra.lenght

    res.render('pages/08_ordencompra_index', {
      user: req.user,
      locals,
      ordencompra,
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
  let aux1 = ids.idordencompra;
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.idordencompra = aux.toString();
  let j = 5 - ids.idordencompra.length;
  for (j; j > 0; j--) {
    ids.idordencompra = '0' + ids.idordencompra;
  }
  ids.idordencompra = 'S' + ids.idordencompra;
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    idcliente: ids.idcliente,
    idordencompra: ids.idordencompra,
    updatedAt: Date.now()
  });

  const ordencompra = {
    idordencompra: ids.idordencompra,
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
    ordencompra: req.body.ordencompra,
    ordencompraadministracion: req.body.ordencompraadministracion,
    ordencompraproduccion: req.body.ordencompraproduccion,
    notaadministracionventa: req.body.notaadministracionventa,
    notaadministracion: req.body.notaadministracion,
    notaproduccionventa: req.body.notaproduccionventa,
    ordencompraproduccion: req.body.ordencompraproduccion,
    comision: 0,
    estado: req.body.estado,
    _idorganizacion: req.body._idorganizacion,
    idorganizacion: req.body.idorganizacion,
    nombreorganizacion: req.body.nombreorganizacion,
    items: req.body.items,
    costopropio: 0,
    costoarbol: 0,
    organizacionagregado: [''],
    organizacionagregadocant: '0',
    itemagregadoestado: 'vacio',
    itemagregado: [''],
    itemagregadocant: '0',
    string01: ''
  };
  try {
    const newOrdencompra = new Ordencompra(ordencompra);
    await newOrdencompra.save();
    const locals = {
      area: 'ordencompra',
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
      area: 'ordencompra',
      title: '',
      description: 'Free NodeJs User Management System'
    };
    res.render('pages/08_ordencompra_view_item', {
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
    area: 'ordencompra',
    title: '',
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
    res.render('pages/08_ordencompra_item_select', {
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
    area: 'ordencompra',
    title: '',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let ordencompra = req.body.ordencompra;


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

    res.render('pages/08_ordencompra_item_select', {
      user: req.user,
      locals,
      clientes,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      ordencompra
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
      area: 'ordencompra',
      title: '',
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
    area: 'ordencompra',
    title: '',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = ordencompra.personas.filter((id) => id != arrId[0]);
    await Ordencompra.findByIdAndUpdate(
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
    area: 'ordencompra',
    title: '',
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

    res.render('pages/08_ordencompra_organizacion_select', {
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
    const ordencompra = await Ordencompra.findOne({ _id: id });

    console.log('ordencompra::', ordencompra);

    let arrcant = ordencompra.itemagregadocant.split(',');

    let arrestado = ordencompra.itemagregadoestado.split(',');
    let arrmotivo = ordencompra.string04.split(',');
    let arrefernecia = ordencompra.string05.split(',');
    let arrpreciocotizado = ordencompra.string06.split(',');
    let arrtexto = ordencompra.string07.split(';');

    let arrusuario = ordencompra.string10.split(',');
    let arrfecha = ordencompra.string09.split(',');





    let removed = ordencompra.itemagregado.splice(origen, 1);
    let removed1 = arrcant.splice(origen, 1);
    let removed2 = arrestado.splice(origen, 1);

    let removed3 = arrmotivo.splice(origen, 1);
    let removed4 = arrefernecia.splice(origen, 1);
    let removed5 = arrpreciocotizado.splice(origen, 1);
    let removed6 = arrtexto.splice(origen, 1);
    let removed7 = arrusuario.splice(origen, 1);
    let removed8 = arrfecha.splice(origen, 1);

    ordencompra.itemagregado.splice(destino, 0, removed[0]);
    arrcant.splice(destino, 0, removed1);
    arrestado.splice(destino, 0, removed2);

    arrmotivo.splice(destino, 0, removed3);
    arrefernecia.splice(destino, 0, removed4);
    arrpreciocotizado.splice(destino, 0, removed5);
    arrtexto.splice(destino, 0, removed6);
    arrusuario.splice(destino, 0, removed7);
    arrfecha.splice(destino, 0, removed8);

    let cont = ordencompra.itemagregadocant;

    ordencompra.itemagregadocant = '';
    for (let i = 0; i < arrcant.length; i++) {
      if (i == 0) {
        ordencompra.itemagregadocant = arrcant[i];
        ordencompra.itemagregadoestado = arrestado[i];
        ordencompra.string04 = arrmotivo[i];
        ordencompra.string05 = arrefernecia[i];
        ordencompra.string06 = arrpreciocotizado[i];
        ordencompra.string07 = arrtexto[i];
        ordencompra.string10 = arrusuario[i];
        ordencompra.string09 = arrfecha[i];
      } else {
        ordencompra.itemagregadocant = ordencompra.itemagregadocant + ',' + arrcant[i];
        ordencompra.itemagregadoestado = ordencompra.itemagregadoestado + ',' + arrestado[i];

        ordencompra.string04 = ordencompra.string04 + ',' + arrmotivo[i];
        ordencompra.string05 = ordencompra.string05 + ',' + arrefernecia[i];
        ordencompra.string06 = ordencompra.string06 + ',' + arrpreciocotizado[i];
        ordencompra.string07 = ordencompra.string07 + ';' + arrtexto[i];
        ordencompra.string10 = ordencompra.string10 + ',' + arrusuario[i];
        ordencompra.string09 = ordencompra.string09 + ',' + arrfecha[i];
      }
    }

    await Ordencompra.findByIdAndUpdate(
      { _id: id },
      {
        itemagregado: ordencompra.itemagregado,
        itemagregadocant: ordencompra.itemagregadocant,
        itemagregadoestado: ordencompra.itemagregadoestado,
        string04: ordencompra.string04,
        string05: ordencompra.string05,
        string06: ordencompra.string06,
        string07: ordencompra.string07,
        string09: ordencompra.string09,
        string10: ordencompra.string10,
        updatedAt: Date.now()
      }
    );

    res.redirect('../ordencompra/edit/' + id);
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
      area: 'ordencompra',
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
    area: 'ordencompra',
    title: '',
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
    area: 'ordencompra',
    title: ' ',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 30;
    let string = req.user.ordencomprasearchitemagregado
    console.log('req.body.searchTerm', req.body.string)
    let arrsearch = string.split(";")
    let searchTerm = req.body.searchTerm || arrsearch[0]
    let page = req.body.page || arrsearch[2];
    let search = req.body.search || arrsearch[1]

    string = searchTerm + ";" + search + ";" + page
    console.log('string.....2.', string)
    await User.findByIdAndUpdate(req.user._id, { ordencomprasearchitemagregado: string })


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

    const count = await Ordencompra.count();
    res.render('pages/08_ordencompra_itemagregado', {
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
      area: 'ordencompra',
      title: '',
      description: 'Free NodeJs User Management System'
    };

    const ids = req.params.id;
    let arrId = ids.split(',');
    console.log('arrId', arrId);
    let repetido = 0;
    // busca la nota de venta//
    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });
    // console.log('Cant', ordencompra.itemagregadocant);
    ///verifica si el item a agregar está repetido
    for (let i = 0; i < ordencompra.itemagregado.length; i++) {
      if (ordencompra.itemagregado[i] == arrId[0]) {
        console.log('REPETIDO', ordencompra.itemagregado[i], arrId[0]);
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
        organizacionagregadocant: itemcompra.organizacionagregadocant,
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
        ordencompra.itemagregado.push(newItemcompra._id);
        console.log('itemcompra.itemagregadocant ---**-', itemcompra.itemagregadocant);
        ordencompra.itemagregadocant = ordencompra.itemagregadocant + ',' + 0;
        ordencompra.itemagregadoestado = ordencompra.itemagregadoestado + ',' + "Edicion";
        ordencompra.string04 = ordencompra.string04 + ',' + 'Normal';
        ordencompra.string05 = ordencompra.string05 + ',' + '';
        ordencompra.string06 = ordencompra.string06 + ',' + 0;
        ordencompra.string07 = ordencompra.string07 + ';' + ',,';
        console.log('actualizando item agregado');
        await Ordencompra.findByIdAndUpdate(
          { _id: arrId[1] },
          {
            itemagregado: ordencompra.itemagregado,
            itemagregadocant: ordencompra.itemagregadocant,
            itemagregadoestado: ordencompra.itemagregadoestado,
            string04: ordencompra.string04,
            string05: ordencompra.string05,
            string06: ordencompra.string06,
            string07: ordencompra.string07,
            updatedAt: Date.now()
          }
        );

        messages = 'Se ha agregado un item de venta ';
      } else {
        messages = 'No se creó el registro. Registro repetido' + arrId[1] + ' ' + ordencompra.itemagregado;
      }
    } else {
      if (repetido == 0) {
        ordencompra.itemagregado.push(arrId[0]);
        ordencompra.itemagregadocant = ordencompra.itemagregadocant + ',' + 0;
        ordencompra.itemagregadoestado = ordencompra.itemagregadoestado + ',' + "Edicion";
        ordencompra.string04 = ordencompra.string04 + ',' + 'Normal';
        ordencompra.string05 = ordencompra.string05 + ',' + '';
        ordencompra.string06 = ordencompra.string06 + ',' + 0;
        ordencompra.string07 = ordencompra.string07 + ';' + ',,';
        console.log('actualizando item agregado');

        console.log('arrId[1] ' + arrId[0]);
        console.log('ordencompra.itemagregado ' + ordencompra.itemagregado);
        console.log('itemcompra.itemagregadocant ----', itemcompra.itemagregadocant);
        console.log('ordencompra.itemagregadocant ' + ordencompra.itemagregadocant);

        await Ordencompra.findByIdAndUpdate(
          { _id: arrId[1] },
          {
            itemagregado: ordencompra.itemagregado,
            itemagregadocant: ordencompra.itemagregadocant,
            itemagregadoestado: ordencompra.itemagregadoestado,
            string04: ordencompra.string04,
            string05: ordencompra.string05,
            string06: ordencompra.string06,
            string07: ordencompra.string07,
            updatedAt: Date.now()
          }
        );

        messages = 'Se ha creado el registo un item normal';
      } else {
        messages = 'No se creó el registro. Registro repetido';
      }
    }

    res.render('pages/08_ordencompra_resultado_itemagregado', {
      arrId,
      user: req.user,
      locals,
      ordencompra
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteitemagregado = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'ordencompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });
    console.log('delete elemnto nº', arrId[2], ordencompra.itemagregado.length);
    let string04 = '0';
    let string05 = '0';
    let string06 = '0';
    let string07 = '0';
    let itemagregadocant = '0';
    let itemagregadoestado = '0';
    let arritemagregadocant = ordencompra.itemagregadocant.split(",");
    let arritemagregadoestado = ordencompra.itemagregadoestado.split(",");
    let arrstring04 = ordencompra.string04.split(",");
    let arrstring05 = ordencompra.string05.split(",");
    let arrstring06 = ordencompra.string06.split(",");
    let arrstring07 = ordencompra.string07.split(";");
    for (i = 1; i < ordencompra.itemagregado.length; i++) {
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
    const resultado = ordencompra.itemagregado.filter((id) => id != arrId[0]);
    await Ordencompra.findByIdAndUpdate(
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
    area: 'ordencompra',
    title: '',
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
//////////  ORGANIZACIONES AGREGADOS   //////////////////////////////
//////////////////////////////////////////////////////////////////

exports.searchorganizacion = async (req, res) => {
  const locals = {
    area: 'ordencompra',
    title: ' ',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try {
    let perPage = 50;
    let page = req.query.page || 1;
    let ordencompra = req.body.ordencompra;
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
      obj2 = await Organizacion.find(
        {
          $and: [
            {
              $or: [
                { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { indicator: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { idorganizacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { ciudadAdministracion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { rubro: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
              ]
            },
            { proveedor: "on" }
          ]
        }

      );
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
    organizacionagregado = obj4;
    //////////////////////////////////

    const count = await Organizacion.count();
    res.render('pages/08_ordencompra_organizacionagregado', {
      user: req.user,
      locals,
      organizacionagregado,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      ordencompra
    });
  } catch (error) {
    console.log(error);
  }
};

exports.upregisterorganizacion = async (req, res) => {
  try {
    const locals = {
      area: 'ordencompra',
      title: '',
      description: 'Free NodeJs User Management System'
    };

    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido = 0;

    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });

    for (let i = 0; i < ordencompra.organizacionagregado.length; i++) {
      if (ordencompra.organizacionagregado[i] == arrId[0]) {
        repetido = 1;
      }
    }
    if (repetido == 0) {
      ordencompra.organizacionagregado.push(arrId[0]);
      ordencompra.organizacionagregadocant = ordencompra.organizacionagregadocant + ',' + 0;
      await Ordencompra.findByIdAndUpdate(
        { _id: arrId[1] },
        {
          organizacionagregado: ordencompra.organizacionagregado,
          organizacionagregadocant: ordencompra.organizacionagregadocant,
          updatedAt: Date.now()
        }
      );

      messages = 'Se ha creado el registo';
    } else {
      messages = 'No se creó el registro. Registro repetido';
    }

    res.render('pages/08_ordencompra_resultado_itemagregado', {
      arrId,
      user: req.user,
      locals,

      ordencompra
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteorganizacion = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'ordencompra',
    title: '',
    description: '- Realizado'
  };
  try {
    const ids = req.params.id;
    let arrId = ids.split(',');
    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = ordencompra.organizacionagregado.filter((id) => id != arrId[0]);
    await Ordencompra.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        organizacionagregado: resultado,
        updatedAt: Date.now()
      }
    );
    res.redirect('../edit/' + arrId[1]);
  } catch (error) {
    console.log(error);
  }
};

exports.editcantorganizacion = async (req, res) => {
  const messages = 'Item Eliminado';
  const locals = {
    area: 'ordencompra',
    title: '',
    description: '- Realizado'
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const ordencompra = await Ordencompra.findOne({ _id: arrId[1] });

    _id: arrId[1];
    const resultado = ordencompra.organizacionagregado.filter((id) => id != arrId[0]);
    await Itemcompra.findByIdAndUpdate(
      { _id: arrId[1] },
      {
        organizacionagregado: resultado,
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
    const ordencompra = await Ordencompra.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area: 'ordencompra',
      title: '',
      description: ''
    };
    let itemagregado = [];
    let organizacionagregado = [];
    ordencompra.updatedAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
    ordencompra.createdAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
    console.log('Organizacion:' + ordencompra._idorganizacion);
    const org = await Organizacion.findOne({ _id: ObjectId(ordencompra._idorganizacion) });

    console.log('Organizacion:...................' + ordencompra._idorganizacion);
    console.log('Organizacion:...................' + org);
    ordencompra.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
    let iaestado = ordencompra.itemagregadoestado;
    console.log('estado:::' + iaestado);
    let arrestado = iaestado.split(',');
    let iacant = ordencompra.itemagregadocant;
    let arrcant = iacant.split(',');
    ordencompra.idorganizacion = org.idorganizacion;
    for (let i = 1; i < ordencompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: ordencompra.itemagregado[i] });
      aux.estado = arrestado[i];
      aux.cant = arrcant[i];
      itemagregado.push(aux);

      console.log('Files Upload:' + ordencompra.files_upload);
    }
    ordencompra.itemagregado = itemagregado;

    res.render('pages/08_ordencompra_cotizacion2', {
      user: req.user,
      locals,
      ordencompra,
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

  const ordencompra = await Ordencompra.findOne({ _id: req.params.id });
  const messages = 'mensaje';
  // const messages = await req.consumeFlash('info');

  const locals = {
    area: 'ordencompra',
    title: '',
    description: ''
  };
  let itemagregado = [];
  let organizacionagregado = [];
  ordencompra.updatedAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
  ordencompra.createdAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
  console.log('Organizacion:' + ordencompra._idorganizacion);
  const org = await Organizacion.findOne({ _id: ObjectId(ordencompra._idorganizacion) });

  console.log('Organizacion:...................' + ordencompra._idorganizacion);
  console.log('Organizacion:...................' + org);
  ordencompra.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
  let iaestado = ordencompra.itemagregadoestado;
  console.log('estado:::' + iaestado);
  let arrestado = iaestado.split(',');
  let iacant = ordencompra.itemagregadocant;
  let arrcant = iacant.split(',');
  ordencompra.idorganizacion = org.idorganizacion;
  for (let i = 1; i < ordencompra.itemagregado.length; i++) {
    let aux = await Itemcompra.findOne({ _id: ordencompra.itemagregado[i] });
    aux.estado = arrestado[i];
    aux.cant = arrcant[i];
    itemagregado.push(aux);

    console.log('Files Upload:' + ordencompra.files_upload);
  }
  ordencompra.itemagregado = itemagregado;

  async function render() {
    try {
      //create output directory
      await mkdir('dist', { recursive: true });
      console.log('Carpeta creada: dist ');
      //render ejs template to html string
      //pass pageModel in to render content

      var html = await ejs
        .renderFile('views/pages/08_ordencompra_cotizacion.ejs', {
          user: req.user,
          locals,
          ordencompra,
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
  console.log('Pedido de Cotizaciones PDF' + req.params.id);
  //promisify
  const mkdir = util.promisify(fs.mkdir);
  const readFile = util.promisify(fs.readFile);
  const writeFile = util.promisify(fs.writeFile);

  const ordencompra = await Ordencompra.findOne({ _id: req.params.id });
  const messages = 'mensaje';
  // const messages = await req.consumeFlash('info');

  const locals = {
    area: 'ordencompra',
    title: '',
    description: ''
  };




  let itemagregado = [];
  let organizacionagregado = [];
  ordencompra.updatedAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
  ordencompra.createdAtSH = fechaSinHora(ordencompra.updatedAt.toISOString());
  console.log('Organizacion:' + ordencompra._idorganizacion);
  const org = await Organizacion.findOne({ _id: ObjectId(ordencompra._idorganizacion) });

  // console.log('Organizacion:...................'+ ordencompra._idorganizacion)
  // console.log('Organizacion:...................'+ org)
  ordencompra.nombreorganizacion = org.razonsocial + '(' + org.nombre + ')';
  let iaestado = ordencompra.itemagregadoestado;
  console.log('estado:::' + iaestado);
  let arrestado = iaestado.split(',');
  let iacant = ordencompra.itemagregadocant;
  let arrcant = iacant.split(',');
  ordencompra.idorganizacion = org.idorganizacion;
  for (let i = 1; i < ordencompra.itemagregado.length; i++) {
    let aux = await Itemcompra.findOne({ _id: ordencompra.itemagregado[i] });
    aux.estado = arrestado[i];
    aux.cant = arrcant[i];
    itemagregado.push(aux);

    console.log('Files Upload:' + ordencompra.files_upload);
  }
  ordencompra.itemagregado = itemagregado;

  async function render() {
    try {
      //create output directory
      await mkdir('dist', { recursive: true });
      console.log('Carpeta creada: dist ');
      //render ejs template to html string
      //pass pageModel in to render content

      var html = await ejs
        .renderFile('views/pages/08_ordencompra_cotizacion_1.ejs', {
          user: req.user,
          locals,
          ordencompra,
          locals,
          messages,
          org
        })
        .then((output) => output);
      //create file and write html
      await writeFile('public/dist/pedidocotizacion.html', html, 'utf8');
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
    const $ = cheerio.load(fs.readFileSync('public/dist/pedidocotizacion.html'));
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
        ' style="width:100px;height:100px;"/></div>  <div style="width:100%;text-align:center"> <div style="padding-top: 30px"> PEDIDO DE COTIZACION</div>    </div>   <div style="width:25%;text-align:right"></div>  </div>`';
      await page.goto('http://vps-3900364-x.dattaweb.com', { waitUntil: 'networkidle0' });

      await page.emulateMediaType('print');
      await page.setContent($.html());
      await page.pdf({
        path: 'public/dist/pedidocotizacion_$_' + ordencompra.idordencompra + '.pdf',
        format: 'A4',
        margin: { top: '200px', right: '50px', bottom: '100px', left: '60px' },
        displayHeaderFooter: true,
        headerTemplate: cabecera,
        footerTemplate:
          '<div id="footer-template" style="font-size:12px !important; color:#808080; padding-left:50px"></span><span class="title"></span>EC-INGENIERIA - Camilo Aldao 58-Ruta Prov. Nº70 Km 71-Bella Italia (Sta.Fe)-Tel +54 3492 518881/301376 --- Pagina: <span class="pageNumber"> </span> de <span class="totalPages"></span></div>'
      });
      await browser.close();
      console.log('PDF generated as example.pdf.');
      await Ordencompra.findOneAndUpdate({ _id: ordencompra._id }, { pdfpedidocotizacion: '/dist/pedidocotizacion_$_' + ordencompra.idordencompra + '.pdf' });
    })();
  }

  let html = await render();
  generatePdf();

  console.log('PDF-2 generado');
  res.redirect('../edit/' + ordencompra._id);

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

    res.render('pages/08_ordencompra_persona_select', {
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



exports.enviarpedidocotizacion = async (req, res) => {
  const messages = 'mensaje';
  console.log('select ');
  const locals = {
    area: 'nota de Venta',
    title: 'Nota de venta',
    description: 'Selecionar persona'
  };

  try {
    console.log('enviar pedido cotizaciones por mail' + req.params.id);
    //promisify


    const ordencompra = await Ordencompra.findOne({ _id: req.params.id });

    console.log('Usuario' + req.user.name);
    console.log('ordencompra.pdfordencompra ' + '/Code/sys-1/public' + ordencompra.pdfpedidocotizacion)
    let transporter = nodemailer.createTransport({
      host: 'c1891836.ferozo.com',
      port: 465,
      secure: true,
      auth: {
        user: req.user.mailuser,
        pass: req.user.mailpass
      }
    })



    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: req.user.mailfrom, // sender address
        to: "rubeneggel@gmail.com", // list of receivers
        attachments: [{   // filename and content type is derived from path
          path: '/Code/sys-1/public' + ordencompra.pdfpedidocotizacion
        },],
        subject: "Pedido de cotización " + ordencompra.idordencompra, // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);


  } catch (error) {
    console.log(error);
  }
};






