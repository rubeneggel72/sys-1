const Itemcompra = require('../models/Itemcompra');
const Indicator = require('../models/Indicator');
const Tipoitem = require('../models/Tipoitem');
const User = require('../models/User');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');






exports.homepage = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'itemcompra',
    title: 'Lista de Item (compra/producto)',
    description: 'Items ',
    scroll:0
  };
  let perPage = 30;
  string=req.user.itemcompraindex
  let arrsearch=string.split(";")
  let searchTerm = arrsearch[0]
  let page = req.query.page || arrsearch[2];
  let search =arrsearch[1]

  try {

 //////////////////////////////////
 let ordenamiento = search.split(',');
 var sort = {[ordenamiento[0]]:ordenamiento[1]};
 console.log("sort---:",sort)
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
     $and:[{hijo:0},

     
     {$or: [
      
       { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { observacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { iditemcompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { tipoitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
     ]}]
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

  let itemcompra1 = obj4;
    //////////////////////////////////
    const count = itemcompra1.length;
    console.log("count "+count)
    obj4=[]
    
    for (ii=0;ii<count;ii++){
      console.log("ii "+ii,count)
    itemcompra=itemcompra1[ii]
     
    
    itemcompra.stock =parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4)+parseInt(itemcompra.stockrecepcion1)+parseInt(itemcompra.stockrecepcion2)+parseInt(itemcompra.stockacondicionamiento);
    ///reserva ingenieria
    let sr=0
    let s1=0
    let res1=itemcompra.reservaingenieria.split(";")||[",,,,"]
    //console.log("res Ing ",res1)
    let reserva=[]
    let entregadocliente=[]
     if(res1==''){
      //reserva.push("No hay reservas")
     // entregadocliente.push("No hay entregas a Clientes")
     reserva.push("")
     entregadocliente.push("")
      }
      else{
    for(i=0;i<res1.length;i++){
     
      let r=res1[i].split(",")
      //console.log("ov  ",r[1],parseInt(r[1].slice(1, 5)))
      if(parseInt(r[1].slice(1, 5))>0){
     // reserva.push(r[1]+"-Cant: "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )

      s1=s1+(parseFloat(r[3])-parseFloat(r[2]))
        
      //reserva.push(r[1]+"-Cant: "+r[2]+" de "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
     // entregadocliente.push(r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
      //console.log('res venta '+res1)
      let x="  "
        if(r[7]!=undefined){
         
        if(r[7].length>23){r[7]=(r[7].slice(0,6)+"..."+r[7].slice(r[7].length-12,r[7].length))} 
        }
        


      if(parseFloat(r[2])!='0'){reserva.push(r[2]+" - "+r[1]+"-"+r[7]   )}
      
      if((parseFloat(r[3])-parseFloat(r[2]))!=0){
        entregadocliente.push((parseFloat(r[3])-parseFloat(r[2]))+" - "+r[1]+ "-"+r[7])
      }
     // entregadocliente.push(x+r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[7])

      sr=sr+parseFloat(r[2])
    }
    }
    }
    itemcompra.reservado=reserva
    itemcompra.entregadocliente=entregadocliente
    itemcompra.stockreservado=sr
    itemcompra.stockentregado=s1
    let sentr=s1
        ///proceso de compra
         res1=itemcompra.procesocompra.split(";")||[",,,,"]
       // console.log("res1 ",res1)
         reserva=[]
         let recibidocompra=[]
         s1=0
         let x="  "
        if(res1==''){
          reserva.push("")
          recibidocompra.push("")
          //reserva.push("No hay procesos de Compras")
          //recibidocompra.push("No hay recep.de Compras")
          }
          else{
           
          for(i=0;i<res1.length;i++){
         // console.log("res ",res1[i])
          let r=res1[i].split(",")
          s1=s1+parseFloat(r[3])

          if(r[7]!=undefined){
         
            if(r[7].length>23){r[7]=(r[7].slice(0,6)+"..."+r[7].slice(r[7].length-12,r[7].length))} 
            }

          if(r[2]!='0'){reserva.push(r[2]+" - "+r[1]+ "-"+r[7])}
          
          if((parseFloat(r[3])-parseFloat(r[2]))!=0){
            recibidocompra.push((parseFloat(r[3])-parseFloat(r[2]))+" - "+r[1]+ "-"+r[7])
          }
          
        }
        }
    
        itemcompra.comprado=reserva
        itemcompra.recibidocompr=recibidocompra
        obj4.push(itemcompra)
      }

itemcompra=obj4





    // const itemcompra = await Itemcompra.aggregate([{ $sort: { createdAt: -1 } },{
    //   $match : {
    //   hijo : 0
    //   }
    // },])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();
    // const count = await Itemcompra.count();
    res.render('pages/03_itemcompra_index', {
      user: req.user,
      locals,
      itemcompra,
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



exports.homepage1 = async (req, res) => {
  const messages = 'mensaje';
  const locals = {
    area: 'itemcompra',
    title: 'Lista de Item (compra/producto)',
    description: 'Items ',
    scroll:0
  };
  let perPage = 30;
  string=req.user.itemcompraindex
  let arrsearch=string.split(";")
  let searchTerm = arrsearch[0]
  let page = req.query.page || arrsearch[2];
  let search =arrsearch[1]

  try {

 //////////////////////////////////
 let ordenamiento = search.split(',');
 var sort = {[ordenamiento[0]]:ordenamiento[1]};
 console.log("sort---:",sort)
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
     $and:[{hijo:0},

     
     {$or: [
      
       { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { observacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { iditemcompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { tipoitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
       { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
     ]}]
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
 itemcompra = obj4;
 //////////////////////////////////

 const count = itemcompra.length;






    // const itemcompra = await Itemcompra.aggregate([{ $sort: { createdAt: -1 } },{
    //   $match : {
    //   hijo : 0
    //   }
    // },])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();
    // const count = await Itemcompra.count();
    res.render('pages/03_itemcompra_index', {
      user: req.user,
      locals,
      itemcompra,
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
  const locals = {
    area: 'itemcompra',
    title: 'Nuevo Item (compra/producto)',
    description: 'Free NodeJs User Management System',
    scroll:0
  };

let tipoitem = await Tipoitem.find({});
  res.render('pages/03_itemcompra_add', {
    user: req.user,
    locals,
    tipoitem
  });
};

exports.clone = async (req, res) => {
  console.log('Clone');
  const itemcompra = await Itemcompra.findOne({ _id: req.params.id });
 
  let ids = await Ids.findById('64ffb0d38fee698da0eb3713');
  searchTerm = '';
  let aux1 = ids.iditemcompra;
  console.log('ID.', aux1);
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.iditemcompra = aux.toString();
  let j = 5 - ids.iditemcompra.length;
  for (j; j > 0; j--) {
    ids.iditemcompra = '0' + ids.iditemcompra;
  }
  ids.iditemcompra = 'C' + ids.iditemcompra;
  console.log('ID. nuevo', ids.iditemcompra);
  console.log('_ID', itemcompra._id);
  

 
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    iditemcompra: ids.iditemcompra, 
    
    updatedAt: Date.now()
  });
  if (itemcompra.trazabilidad==undefined){itemcompra.trazabilidad=false}
 const nuevoitemcompra={
  trazabilidad:itemcompra.trazabilidad,
  nombre:'CLONADO-'+itemcompra.nombre,
  observacion: itemcompra.observacion,
  stock: itemcompra.stock,
  iditemcompra: ids.iditemcompra,
  tipoitem: itemcompra.tipoitem,
  rubroitem: itemcompra.rubroitem,
  stockminimo:itemcompra.stockminimo,
  unidad: itemcompra.unidad,
  mxunidad: itemcompra.mxunidad,
  m2xunidad: itemcompra.m2xunidad,
  m3xunidad: itemcompra.m3xunidad,
  kgxunidad: itemcompra.kgxunidad,
  lxunidad: itemcompra.lxunidad,
  stockcompras: itemcompra.stockcompras,
  stockrecepcion1:itemcompra.stockrecepcion1,
  stockrecepcionpos1:itemcompra.stockrecepcionpos1,
  stockincorporado: itemcompra.stockincorporado,
  stockrecepcion2:itemcompra.stockrecepcion2,
  stockrecepcionpos2:itemcompra.stockrecepcionpos2,
  stockreservado:itemcompra.stockreservado,
  stockdevolucion:itemcompra.stockdevolucion,
  stockdevolucionpos:itemcompra.stockdevolucionpos,
  stockdevuelto:itemcompra.stockdevuelto,
  stockdespacho:itemcompra.stockdespacho,
  stockdespachopos:itemcompra.stockdespachopos,

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
  tiendatitulo: itemcompra. tiendatitulo,
  tiendadetalle: itemcompra.tiendadetalle,
  tiendamaterial: itemcompra.tiendamaterial,
  tiendacantidad: itemcompra.tiendacantidad,
  tiendaplazo: itemcompra.tiendaplazo,
  files_upload: itemcompra.files_upload,
  itemagregado:itemcompra.itemagregado,
  itemagregadocant: itemcompra.itemagregadocant,
  itemagregadojunto: itemcompra.itemagregadojunto,
  indicatoragregado:itemcompra.indicatoragregado,
  indicatoragregadocant:itemcompra.indicatoragregadocant,
  costopropio:itemcompra.costopropio,
  costoarbol:itemcompra.costoarbol,
  vseccion:itemcompra. vseccion,
    vdiametro:itemcompra.vdiametro ,
    vlongitud:itemcompra.vlongitud ,
    vancho:itemcompra.vancho ,
    valtura:itemcompra.valtura ,
    vdimension:itemcompra.vdimension ,
    vinclinacion:itemcompra.vinclinacion ,
    vpendiente:itemcompra.vpendiente ,
    vaccionamiento:itemcompra.vaccionamiento,
    vmando:itemcompra. vmando,
    vmotor:itemcompra.vmotor,
    vcapacidadproduccion:itemcompra.vcapacidadproduccion,
    vcapacidadutil:itemcompra.vcapacidadutil,
    vcapacidadtotal:itemcompra.vcapacidadtotal,
    ventrada:itemcompra.ventrada,
    vsalida:itemcompra.vsalida,
    vtension:itemcompra.vtension,
    vpotencia:itemcompra.vpotencia,
    vmaterial:itemcompra.vmaterial,
    vtratamiento:itemcompra.vtratamiento,
    vterminacion:itemcompra.vterminacion,
    vpeso:itemcompra.vpeso,
    cotizacionnota:itemcompra.cotizacionnota,
  updatedAt: Date.now(),
  createdAt: Date.now()

}

console.log('_IDnuevo', nuevoitemcompra);
console.log('iditemcompra', nuevoitemcompra.iditemcompra);
  
try {
  const newItemcompra = new Itemcompra(nuevoitemcompra);
  await newItemcompra.save();
  const locals = {
    area: 'itemcompra',
    title: 'Nuevo de Item (compra/producto)',
    description: 'Free NodeJs User Management System',
    scroll:0
  };
  console.log('return index');
  res.redirect('../index');
} catch (e) {
  console.log(e);
}
};


exports.view = async (req, res) => {
  try {
    const itemcompra = await Itemcompra.findOne({ _id: req.params.id });
    const tipoitem = await Tipoitem.find({});
    const messages = '';
    itemagregado = [];
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto)',
      description: 'Free NodeJs User Management System',
      scroll:0
    };

    itemcompra.updatedAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.createdAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.stock =
      parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4);
    iacant = itemcompra.itemagregadocant;
    let arrcant = iacant.split(',');
    console.log('ITAGCANT' + iacant);
    console.log('ITAGCANT -array' + arrcant);
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: itemcompra.itemagregado[i] });
      aux.cant = arrcant[i];
      itemagregado.push(aux);

      console.log('AUX:' + aux.cant);
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
    console.log("_id:"+req.params.id)
    const messages = '';
    itemagregado = [];
    indicatoragregado = [];
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto)',
      description: 'Free NodeJs User Management System',
      scroll:0
    };
    if(itemcompra.reservaingenieria==undefined){itemcompra.reservaingenieria=""}
    if(itemcompra.procesocompra==undefined){itemcompra.procesocompra=""}
    if(itemcompra.recibidocompra==undefined){itemcompra.recibidocompra=""}
    if(itemcompra.reservaordentrabajo==undefined){itemcompra.reservaordentrabajo=""}
    if(itemcompra.stockentregado==undefined){itemcompra.stockentregado=0}
  
   
  
    itemcompra.updatedAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.createdAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.stock =parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4)+parseInt(itemcompra.stockrecepcion1)+parseInt(itemcompra.stockrecepcion2)+parseInt(itemcompra.stockacondicionamiento);
    ///reserva ingenieria
    let sr=0
    let s1=0
    let res1=itemcompra.reservaingenieria.split(";")||[",,,,"]
    console.log("res Ing ",res1)
    let reserva=[]
    let entregadocliente=[]
     if(res1==''){
      reserva.push("No hay reservas")
      entregadocliente.push("No hay entregas a Clientes")
      }
      else{
    for(i=0;i<res1.length;i++){
     
      let r=res1[i].split(",")
      console.log("ov  ",r[1],parseInt(r[1].slice(1, 5)))
      if(parseInt(r[1].slice(1, 5))>0){
     // reserva.push(r[1]+"-Cant: "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )

      s1=s1+(parseFloat(r[3])-parseFloat(r[2]))
        
      //reserva.push(r[1]+"-Cant: "+r[2]+" de "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
     // entregadocliente.push(r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
      console.log('res venta '+res1)
      let x="  "
      if(parseFloat(r[2])=='0'){x='X '}else{x=" "}
      reserva.push(x+r[1]+"-Cant: "+r[2]+" de "+r[3]+"-"+r[7]   )
 
      entregadocliente.push(x+r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[7])

      sr=sr+parseFloat(r[2])
    }
    }
    }
    itemcompra.reservado=reserva
    itemcompra.entregadocliente=entregadocliente
    itemcompra.stockreservado=sr
    itemcompra.stockentregado=s1
    let sentr=s1
        ///proceso de compra
         res1=itemcompra.procesocompra.split(";")||[",,,,"]
        console.log("res1 ",res1)
         reserva=[]
         let recibidocompra=[]
         s1=0
         let x="  "
        if(res1==''){
          reserva.push("No hay procesos de Compras")
          recibidocompra.push("No hay recep.de Compras")
          }
          else{
           
          for(i=0;i<res1.length;i++){
          console.log("res ",res1[i])
          let r=res1[i].split(",")
          s1=s1+parseFloat(r[3])
          let preciounitario=parseInt(parseFloat(r[4])/parseFloat(r[3])*100)/100
          if(r[2]=='0'){x="X "}else{x=" "}
          reserva.push(x+r[1]+"-Cant: "+r[2]+" de "+r[3]+'-'+preciounitario+ " usd/u-"+ "-"+r[5]+"-"+r[7])
          recibidocompra.push(r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+preciounitario+ " usd/u-"+r[5]+ "-"+r[7])
        }
        }
    
        itemcompra.comprado=reserva
        itemcompra.recibidocompr=recibidocompra
      //  itemcompra.stock1=s1-sentr
  //  console.log('s1 '+s1+'s1 '+sentr+'s1-sentr '+s1-sentr)
    
    iacant = itemcompra.itemagregadocant;
    iajunto = itemcompra.itemagregadojunto;
    console.log('ITAGCANT' + iacant);
    console.log('ITAGCANT' + iajunto);
    let arrcant = iacant.split(',');
    let arrjunto = iajunto.split(',');
    console.log('ITAGCANT -array' + arrcant);
    console.log('ITAGCANT -array' + arrjunto);
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: itemcompra.itemagregado[i] });
      aux.cant = arrcant[i];
      aux.junto = arrjunto[i];
      itemagregado.push(aux);
    }
    
    itemcompra.itemagregado = itemagregado;
    console.log('ITAG junto ' +  itemcompra.itemagregado.junto);
    iacant = itemcompra.indicatoragregadocant;
    arrcant = iacant.split(',');
    console.log('ITAGCANT' + iacant);
    console.log('ITAGCANT -array' + arrcant);
    let date = new Date()


   


    for (let i = 1; i < itemcompra.indicatoragregado.length; i++) {
      console.log('indicator agregado ' + itemcompra.indicatoragregado[i]);
      let aux = await Indicator.findOne({ _id: itemcompra.indicatoragregado[i] });
      console.log('AUX ' + aux);
      aux.cant = arrcant[i];
      indicatoragregado.push(aux);
    }
    console.log('INDICATOR AGREGADO ' + indicatoragregado);
    itemcompra.indicatoragregado = indicatoragregado;

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

exports.edititemhijo = async (req, res) => {
  try {
     let arr = req.params.id.split(',');
     console.log("EDIT item hijo ",arr );
    const itemcompra = await Itemcompra.findOne({ _id: arr[0] });
    console.log('PASO 1')
    const notaventaid=arr[1]
    const tipoitem = await Tipoitem.find({});
    console.log('PASO 2')
    const messages = '';
    itemagregado = [];
    indicatoragregado = [];
    const locals = {
      area: 'itemcompra',
      title: 'Edicion de Item (compra/producto)',
      description: 'Free NodeJs User Management System',
      scroll:0
    };

    itemcompra.updatedAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.createdAtSH = fechaSinHora(itemcompra.updatedAt.toISOString());
    itemcompra.stock =
      parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4);
    iacant = itemcompra.itemagregadocant;
    iajunto = itemcompra.itemagregadojunto;
   
    let arrcant = iacant.split(',');
    let arrjunto = iajunto.split(',');
    
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      let aux = await Itemcompra.findOne({ _id: itemcompra.itemagregado[i] });
      if (arrjunto[i]==""){arrjunto[i]="Suelto"}
      aux.cant = arrcant[i];
      aux.junto = arrjunto[i];
      itemagregado.push(aux);
    }
    console.log('PASO 3')
    itemcompra.itemagregado = itemagregado;
    iacant = itemcompra.indicatoragregadocant;
    arrcant = iacant.split(',');
    for (let i = 1; i < itemcompra.indicatoragregado.length; i++) {
      let aux = await Indicator.findOne({ _id: itemcompra.indicatoragregado[i] });
      console.log('AUX ' + aux);
      aux.cant = arrcant[i];
      indicatoragregado.push(aux);
    }
    console.log('PASO 4')
    itemcompra.indicatoragregado = indicatoragregado;
    res.render('pages/03_itemcompra_edit_hijo', {
      user: req.user,
      locals,
      itemcompra,
      locals,
      messages,
      tipoitem,
      notaventaid
      
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
    description: '- Realizado',
    scroll:0
  };
  try {

    console.log(req.body);
    let stock =
    parseInt(req.body.stock1) + parseInt(req.body.stock2) + parseInt(req.body.stock3) + parseInt(req.body.stock4);
    console.log('trazabilidad:', req.body.trazabilidad);

    await Itemcompra.findByIdAndUpdate(req.params.id, {
   

      trazabilidad:req.body.trazabilidad,
      nombre: req.body.nombre.replaceAll(",",'').replaceAll(";",''),
      observacion: req.body.observacion.replaceAll(",",'').replaceAll(";",''),
      stock: stock,
      iditemcompra: req.body.iditemcompra,
      tipoitem: req.body.tipoitem,
      rubroitem: req.body.rubroitem,
      stockminimo: req.body.stockminimo,
      unidad: req.body.unidad,
      mxunidad: req.body.mxunidad,
      m2xunidad: req.body.m2xunidad,
      m3xunidad: req.body.m3xunidad,
      kgxunidad: req.body.kgxunidad,
      lxunidad: req.body.lxunidad,
      stockcompras: req.body.stockcompras,
      stockrecepcion1:req.body.stockrecepcion1,
      stockrecepcionpos1:req.body.stockrecepcionpos1,
      stockincorporado: req.body.stockincorporado,
      stockrecepcion2:req.body.stockrecepcion2,
      stockrecepcionpos2:req.body.stockrecepcionpos2,
      stockreservado:req.body.stockreservado,
      stockdevolucion:req.body.stockdevolucion,
      stockdevolucionpos:req.body.stockdevolucionpos,
      stockdevuelto:req.body.stockdevuelto,
      stockdespacho:req.body.stockdespacho,
      stockdespachopos:req.body.stockdespachopos,

      stockacondicionamiento: req.body.stockacondicionamiento,
      stockproduccion: req.body.stockproduccion,
      stockreservado: req.body.stockreservado,
      stockentregado: req.body.stockentregado,
      stock1: req.body.stock1,
      stockpos1: req.body.stockpos1,
      stock2: req.body.stock2,
      stockpos2: req.body.stockpos2,
      stock3: req.body.stock3,
      stockpos3: req.body.stockpos3,
      stock4: req.body.stock4,
      stockpos4: req.body.stockpos4,
      string01: req.body.string01,
      details: req.body.details,
      cotizaciondetails: req.body.cotizaciondetails,
      cotizaciontitulo: req.body.cotizaciontitulo,
      ordencompradetails: req.body.ordencompradetails,
      ordencompratitulo: req.body.ordencompratitulo,
      tiendatitulo: req.body. tiendatitulo,
      tiendadetalle: req.body.tiendadetalle,
      tiendamaterial: req.body.tiendamaterial,
      tiendacantidad: req.body.tiendacantidad,
      tiendaplazo: req.body.tiendaplazo,
      files_upload: req.body.files_upload,
      itemagregadocant: req.body.itemagregadocant,
      itemagregadojunto: req.body.itemagregadojunto,
      indicatoragregadocant:req.body.indicatoragregadocant,
      costopropio:req.body.costopropio,
      costoarbol:req.body.costoarbol,
      numero01:req.body.numero01,
      vseccion:req.body. vseccion,
        vdiametro:req.body.vdiametro ,
        vlongitud:req.body.vlongitud ,
        vancho:req.body.vancho ,
        valtura:req.body.valtura ,
        vdimension:req.body.vdimension ,
        vinclinacion:req.body.vinclinacion ,
        vpendiente:req.body.vpendiente ,
        vaccionamiento:req.body.vaccionamiento,
        vmando:req.body. vmando,
        vmotor:req.body.vmotor,
        vcapacidadproduccion:req.body.vcapacidadproduccion,
        vcapacidadutil:req.body.vcapacidadutil,
        vcapacidadtotal:req.body.vcapacidadtotal,
        ventrada:req.body.ventrada,
        vsalida:req.body.vsalida,
        vtension:req.body.vtension,
        vpotencia:req.body.vpotencia,
        vmaterial:req.body.vmaterial,
        vtratamiento:req.body.vtratamiento,
        vterminacion:req.body.vterminacion,
        vpeso:req.body.vpeso,
        cotizacionnota:req.body.cotizacionnota,
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
exports.editPostHijo = async (req, res) => {
  const messages = 'Registo  Actualizado';
  const locals = {
    area: 'itemcompra',
    title: 'Edicion de Item (compra/producto)',
    description: '- Realizado',
    scroll:0
  };
  try {
   
    let arr = req.params.id.split(',');

    
    console.log('editPostHijo:1'+arr);

    let stock =
      parseInt(req.body.stock1) + parseInt(req.body.stock2) + parseInt(req.body.stock3) + parseInt(req.body.stock4);
      console.log('editPostHijo:2'+req.params._id);

    await Itemcompra.findByIdAndUpdate(arr[0], {
     
     
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
      m3xunidad: req.body.m3xunidad,
      kgxunidad: req.body.kgxunidad,
      lxunidad: req.body.lxunidad,
      stockcompras: req.body.stockcompras,
      stockrecepcion1:req.body.stockrecepcion1,
      stockrecepcionpos1:req.body.stockrecepcionpos1,
      stockincorporado: req.body.stockincorporado,
      stockrecepcion2:req.body.stockrecepcion2,
      stockrecepcionpos2:req.body.stockrecepcionpos2,
      stockreservado:req.body.stockreservado,
      stockdevolucion:req.body.stockdevolucion,
      stockdevolucionpos:req.body.stockdevolucionpos,
      stockdevuelto:req.body.stockdevuelto,
      stockdespacho:req.body.stockdespacho,
      stockdespachopos:req.body.stockdespachopos,

      stockacondicionamiento: req.body.stockacondicionamiento,
      stockproduccion: req.body.stockproduccion,
      stockreservado: req.body.stockreservado,
      stockentregado: req.body.stockentregado,
      stock1: req.body.stock1,
      stockpos1: req.body.stockpos1,
      stock2: req.body.stock2,
      stockpos2: req.body.stockpos2,
      stock3: req.body.stock3,
      stockpos3: req.body.stockpos3,
      stock4: req.body.stock4,
      stockpos4: req.body.stockpos4,
      details: req.body.details,
      cotizaciondetails: req.body.cotizaciondetails,
      cotizaciontitulo: req.body.cotizaciontitulo,
      ordencompradetails: req.body.ordencompradetails,
      ordencompratitulo: req.body.ordencompratitulo,
      tiendatitulo: req.body. tiendatitulo,
      tiendadetalle: req.body.tiendadetalle,
      tiendamaterial: req.body.tiendamaterial,
      tiendacantidad: req.body.tiendacantidad,
      tiendaplazo: req.body.tiendaplazo,
      files_upload: req.body.files_upload,
      itemagregadocant: req.body.itemagregadocant,
      itemagregadojunto: req.body.itemagregadojunto,
      indicatoragregadocant:req.body.indicatoragregadocant,
      costopropio:req.body.costopropio,
      costoarbol:req.body.costoarbol,
      numero01:req.body.numero01,
      vseccion:req.body. vseccion,
        vdiametro:req.body.vdiametro ,
        vlongitud:req.body.vlongitud ,
        vancho:req.body.vancho ,
        valtura:req.body.valtura ,
        vdimension:req.body.vdimension ,
        vinclinacion:req.body.vinclinacion ,
        vpendiente:req.body.vpendiente ,
        vaccionamiento:req.body.vaccionamiento,
        vmando:req.body. vmando,
        vmotor:req.body.vmotor,
        vcapacidadproduccion:req.body.vcapacidadproduccion,
        vcapacidadutil:req.body.vcapacidadutil,
        vcapacidadtotal:req.body.vcapacidadtotal,
        ventrada:req.body.ventrada,
        vsalida:req.body.vsalida,
        vtension:req.body.vtension,
        vpotencia:req.body.vpotencia,
        vmaterial:req.body.vmaterial,
        vtratamiento:req.body.vtratamiento,
        vterminacion:req.body.vterminacion,
        vpeso:req.body.vpeso,
        cotizacionnota:req.body.cotizacionnota,
      updatedAt: Date.now()
    });
    
    console.log('editPostHijo:3 notaventaid:'+arr[1]);
 res.render('pages/03_itemcompra_resultado_hijo', {
  user: req.user,
  locals,
  messages,
  notaventaid:arr[1]
 
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
    description: '- Realizado',
    scroll:0
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
    description: 'Free NodeJs User Management System',
    scroll:0
  };
  const messages = 'mensaje';
  try {
    let perPage = 30;
    let page = req.query.page || 1;
    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    let searchTerm = req.body.searchTerm;
    let nhijo='0'
    let search = req.body.search ||'iditemcompra,-1';

    

 
    let string=searchTerm+";"+search+";"+page
    await User.findByIdAndUpdate(req.user._id, {itemcompraindex:string
    })





    console.log("search ordenam:",search)
    //////////////////////////////////
    let ordenamiento = search.split(',');
    var sort = {[ordenamiento[0]]:ordenamiento[1]};
    console.log("sort---:",sort)
    let arr = searchTerm.split('+');
    let obj = [];
    let obj2 = [];
    let obj3 = [];
    let obj4 = [];
    let ii = 0;
    let arr1=[]
    itemcompra1=[]
    for (ii = 0; ii < arr.length; ii++) {
    if(arr[ii]=="XXXX"){
      var cantdistinta0=true
      console.log("XXXX",ii)
    }else{
      arr1.push(arr[ii])

    }
    }
    arr=arr1



    for (ii = 0; ii < arr.length; ii++) {
      obj3 = [];
      // const searchNoSpecialChar = arr[ii].replace(/[^a-zA-Z0-9 ]/g, '');
      const searchNoSpecialChar = arr[ii];
      obj2 = await Itemcompra.find({
        $and:[{hijo:0},

        
        {$or: [
         
          { nombre: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { observacion: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { iditemcompra: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { tipoitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
        ]}]
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
    if(cantdistinta0){
      for(i=0;i<obj4.length;i++){
        if ((obj4[i].stock1!=0)||(obj4[i].stockentregado!=0)||(obj4[i].stockreservado!=0)|| ( obj4[i].stockcompras!=0)){
          itemcompra1.push(obj4[i])
        }
      }
    }else{itemcompra1=obj4}
    /////////////////////////////////
    // FIN algoritmo de busqueda;
    ///////////////////////////////////
    
    //////////////////////////////////
    const count = itemcompra1.length;
    console.log("count "+count)
    obj4=[]
    
    for (ii=0;ii<count;ii++){
      console.log("ii "+ii,count)
    itemcompra=itemcompra1[ii]
     
    
    itemcompra.stock =parseInt(itemcompra.stock1) + parseInt(itemcompra.stock2) + parseInt(itemcompra.stock3) + parseInt(itemcompra.stock4)+parseInt(itemcompra.stockrecepcion1)+parseInt(itemcompra.stockrecepcion2)+parseInt(itemcompra.stockacondicionamiento);
    ///reserva ingenieria
    let sr=0
    let s1=0
    let res1=itemcompra.reservaingenieria.split(";")||[",,,,"]
    //console.log("res Ing ",res1)
    let reserva=[]
    let entregadocliente=[]
     if(res1==''){
      //reserva.push("No hay reservas")
     // entregadocliente.push("No hay entregas a Clientes")
     reserva.push("")
     entregadocliente.push("")
      }
      else{
    for(i=0;i<res1.length;i++){
     
      let r=res1[i].split(",")
      //console.log("ov  ",r[1],parseInt(r[1].slice(1, 5)))
      if(parseInt(r[1].slice(1, 5))>0){
     // reserva.push(r[1]+"-Cant: "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )

      s1=s1+(parseFloat(r[3])-parseFloat(r[2]))
        
      //reserva.push(r[1]+"-Cant: "+r[2]+" de "+r[3]+"-"+r[4]+  "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
     // entregadocliente.push(r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[5]+  "-"+r[6]+ "-"+r[7]   )
      //console.log('res venta '+res1)
      let x="  "
        if(r[7]!=undefined){
         
        if(r[7].length>23){r[7]=(r[7].slice(0,6)+"..."+r[7].slice(r[7].length-12,r[7].length))} 
        }
        


      if(parseFloat(r[2])!='0'){reserva.push(r[2]+" - "+r[1]+"-"+r[7]   )}
      
      if((parseFloat(r[3])-parseFloat(r[2]))!=0){
        entregadocliente.push((parseFloat(r[3])-parseFloat(r[2]))+" - "+r[1]+ "-"+r[7])
      }
     // entregadocliente.push(x+r[1]+"-Cant: "+(parseFloat(r[3])-parseFloat(r[2]))+ "-"+r[7])

      sr=sr+parseFloat(r[2])
    }
    }
    }
    itemcompra.reservado=reserva
    itemcompra.entregadocliente=entregadocliente
    itemcompra.stockreservado=sr
    itemcompra.stockentregado=s1
    let sentr=s1
        ///proceso de compra
         res1=itemcompra.procesocompra.split(";")||[",,,,"]
       // console.log("res1 ",res1)
         reserva=[]
         let recibidocompra=[]
         s1=0
         let x="  "
        if(res1==''){
          reserva.push("")
          recibidocompra.push("")
          //reserva.push("No hay procesos de Compras")
          //recibidocompra.push("No hay recep.de Compras")
          }
          else{
           
          for(i=0;i<res1.length;i++){
         // console.log("res ",res1[i])
          let r=res1[i].split(",")
          s1=s1+parseFloat(r[3])

          if(r[7]!=undefined){
         
            if(r[7].length>23){r[7]=(r[7].slice(0,6)+"..."+r[7].slice(r[7].length-12,r[7].length))} 
            }

          if(r[2]!='0'){reserva.push(r[2]+" - "+r[1]+ "-"+r[7])}
          
          if((parseFloat(r[3])-parseFloat(r[2]))!=0){
            recibidocompra.push((parseFloat(r[3])-parseFloat(r[2]))+" - "+r[1]+ "-"+r[7])
          }
          
        }
        }
    
        itemcompra.comprado=reserva
        itemcompra.recibidocompr=recibidocompra
        obj4.push(itemcompra)
      }

itemcompra=obj4


    res.render('pages/03_itemcompra_index', {
      user: req.user,
      locals,
      itemcompra,
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
  console.log('ID.', aux1);
  aux1 = aux1.slice(1);
  let aux = parseInt(aux1);
  aux++;
  ids.iditemcompra = aux.toString();
  let j = 5 - ids.iditemcompra.length;
  for (j; j > 0; j--) {
    ids.iditemcompra = '0' + ids.iditemcompra;
  }
  ids.iditemcompra = 'C' + ids.iditemcompra;
  console.log('ID.', ids.iditemcompra);
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
    iditemcompra: ids.iditemcompra,
    updatedAt: Date.now()
  });

  const itemcompra = {
    nombre: req.body.nombre, 
    observacion: req.body.observacion, 
    stock: 0,
    iditemcompra: ids.iditemcompra,
    tipoitem: req.body.tipoitem,
    rubroitem: req.body.rubroitem,
    stockminimo: req.body.stockminimo,
    unidad: req.body.unidad,
    mxunidad: req.body.mxunidad,
    m2xunidad: req.body.m2xunidad,
    m3xunidad: req.body.m3xunidad,
    kgxunidad: req.body.kgxunidad,
    lxunidad: req.body.lxunidad,
    tiendatitulo: req.body. tiendatitulo,
    tiendadetalle: req.body.tiendadetalle,
    tiendamaterial: req.body.tiendamaterial,
    tiendacantidad: req.body.tiendacantidad,
    tiendaplazo: req.body.tiendaplazo,
  
    
    details: req.body.details,
    cotizaciondetails: req.body.cotizaciondetails,
    cotizaciontitulo: req.body.cotizaciontitulo,
    ordencompradetails: req.body.ordencompradetails,
    ordencompratitulo: req.body.ordencompratitulo,
    files_upload: req.body.files_upload,
    costopropio:0,
    costoarbol:0,
    numero01:0,
    contadorhijo: 0,
    hijo:0,
    hijos:'',
    indicatoragregado: [''],
    indicatoragregadocant: '0',
    itemagregadojunto:'0',
    itemagregado: [''],
    itemagregadocant: '0',
    vseccion:"",
        vdiametro:"",
        vlongitud:"",
        vancho:"",
        valtura:"",
        vdimension:"",
        vinclinacion:"",
        vpendiente:"",
        vaccionamiento:"",
        vmando:"",
        vmotor:"",
        vcapacidadproduccion:"",
        vcapacidadutil:"",
        vcapacidadtotal:"",
        ventrada:"",
        vsalida:"",
        vtension:"",
        vpotencia:"",
        vmaterial:"",
        vtratamiento:"",
        vterminacion:"",
        vpeso:"",
        cotizacionnota:"",
        updatedAt: Date.now(),
        createdAt: Date.now()
  };
  console.log(itemcompra);
  try {
    const newItemcompra = new Itemcompra(itemcompra);
    await newItemcompra.save();
    const locals = {
      area: 'itemcompra',
      title: 'Nuevo de Item (compra/producto)',
      description: 'Free NodeJs User Management System',
      scroll:0
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
      description: 'Free NodeJs User Management System',
      scroll:0
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
    description: 'Free NodeJs User Management System',
    scroll:0
  };


  let perPage = 30;
  string=req.user.itemcompraindex
  let arrsearch=string.split(";")
  let searchTerm = arrsearch[0]
  let page = req.query.page || arrsearch[2];
  let search =arrsearch[1]




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
exports.ordenaritems= async (req, res) => {
  const ids = req.params.id;
    let arrId = ids.split(',');
  const locals = {
    area: 'itemcompra',
    title: 'Busqueda datos ',
    description: 'Free NodeJs User Management System',
    scroll:0
  };
  try {
  console.log("ordenar items: "+  ( req.body))
  let origen = arrId[0] ;
  let destino = arrId[1];
  let id = arrId[2];

  const itemcompra = await Itemcompra.findOne({ _id: id });
  let arrcant = itemcompra.itemagregadocant.split(',');
  let arrjunto = itemcompra.itemagregadojunto.split(',');
   let removed = itemcompra.itemagregado.splice(origen, 1); 
   
   let removed1 = arrcant.splice(origen, 1); 
   let removed2 = arrjunto.splice(origen, 1); 
   itemcompra.itemagregado.splice(destino, 0,removed[0] )
   arrcant.splice(destino, 0,removed1 )
   arrjunto.splice(destino, 0,removed2 )
  let cont =itemcompra.itemagregadocant
  itemcompra.itemagregadocant=""
  itemcompra.itemagregadojunto=""
  for(let i=0;i<arrcant.length;i++){
    
if (i==0){itemcompra.itemagregadocant=arrcant[i]
          itemcompra.itemagregadojunto=arrjunto[i]
}
else{
  itemcompra.itemagregadocant=itemcompra.itemagregadocant+","+arrcant[i]
  itemcompra.itemagregadojunto=itemcompra.itemagregadojunto+","+arrjunto[i]
}
    
  }
 
  await Itemcompra.findByIdAndUpdate(
    { _id: id },
    {
      itemagregado: itemcompra.itemagregado,
      itemagregadocant: itemcompra.itemagregadocant,
      itemagregadojunto: itemcompra.itemagregadojunto,
      updatedAt: Date.now()
    })
    console.log("update orden: "+ id)
  res.redirect('../itemcompra/edit/' + id);
}  catch (error) {
  console.log(error);
}
};




exports.searchitemagregado = async (req, res) => {
  const locals = {
    area: 'itemcompra',
    title: 'Busqueda datos ',
    description: 'Free NodeJs User Management System',
    scroll:0
  };
  const messages = 'mensaje';
  
  try {
    
    let perPage = 30;
    let string=req.user.itemcomprasearchitemagregado
    console.log('req.body.searchTerm',req.body.searchTerm)
    let arrsearch=string.split(";")
    let searchTerm = req.body.searchTerm|| arrsearch[0]
    let page = req.body.page || arrsearch[2];
    let search = req.body.search || arrsearch[1]
  
    string=searchTerm+";"+search+";"+page
    console.log('string.....2.',string)
    await User.findByIdAndUpdate(req.user._id, {itemcomprasearchitemagregado:string  })

    let itemcompra = req.body.itemcompra;

    //////////////////////////////////
    let ordenamiento = search.split(',');
    var sort = {[ordenamiento[0]]:ordenamiento[1]};
    console.log("sort---:",sort)
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
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
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
    itemagregado = obj4;
    //////////////////////////////////

    const count = itemcompra.length;
    res.render('pages/03_itemcompra_itemagregado', {
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

exports.upregister = async (req, res) => {
  try {
    const locals = {
      area: 'itemcompra',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System',
      scroll:0
    };
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido = 0;

    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('ic-lenght' + itemcompra.itemagregado.length);
    for (let i = 0; i < itemcompra.itemagregado.length; i++) {
      console.log('IF :' + itemcompra.itemagregado[i] + '---' + arrId[0]);
      if (itemcompra.itemagregado[i] == arrId[0]) {
        repetido = 1;
      }
    }
    if (repetido == 0) {
      itemcompra.itemagregado.push(arrId[0]);
      itemcompra.itemagregadocant = itemcompra.itemagregadocant + ',' + 1;
      await Itemcompra.findByIdAndUpdate(
        { _id: arrId[1] },
        {
          itemagregado: itemcompra.itemagregado,
          itemagregadocant: itemcompra.itemagregadocant,
          updatedAt: Date.now()
        }
      );

      messages = 'Se ha creado el registo';
    } else {
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
    description: '- Realizado',
    scroll:0
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
    description: '- Realizado',
    scroll:0
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.itemagregado);
 
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
    area: 'itemcompra',
    title: 'Busqueda indicadores ',
    description: 'Free NodeJs User Management System',
    scroll:0
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
    res.render('pages/03_itemcompra_indicatoragregado', {
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
      area: 'itemcompra',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System',
      scroll:0
    };
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido = 0;

    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('ic-lenght' + itemcompra.itemagregado.length);
    for (let i = 0; i < itemcompra.indicatoragregado.length; i++) {
      console.log('IF :' + itemcompra.indicatoragregado[i] + '---' + arrId[0]);
      if (itemcompra.indicatoragregado[i] == arrId[0]) {
        repetido = 1;
      }
    }
    if (repetido == 0) {
      itemcompra.indicatoragregado.push(arrId[0]);
      itemcompra.indicatoragregadocant = itemcompra.indicatoragregadocant + ',' + 0;
      await Itemcompra.findByIdAndUpdate(
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

exports.deleteindicator = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado',
    scroll:0
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.indicatoragregado);
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

exports.editcantindicator = async (req, res) => {
  const messages = 'Item Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado',
    scroll:0
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.indicatoragregado);
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

/////////////// ITEM AGREGADO HIJO////////////////////////////


exports.searchitemagregadohijo = async (req, res) => {
  const locals = {
    area: 'itemcompra',
    title: 'Busqueda datos ',
    description: 'Free NodeJs User Management System',
    scroll:0
  };
  const messages = 'mensaje';
  
  try {
    let perPage = 30;
    let string=req.user.itemcomprasearchitemagregado
    console.log('req.body.searchTerm',req.body.searchTerm)
    let arrsearch=string.split(";")
    let searchTerm = req.body.searchTerm|| arrsearch[0]
    let page = req.body.page || arrsearch[2];
    let search = req.body.search || arrsearch[1]
  
 string=searchTerm+";"+search+";"+page
 console.log('string.....2.',string)
      await User.findByIdAndUpdate(req.user._id, {itemcomprasearchitemagregado:string
      })

   
    let itemcompra =req.body.itemcompra;
    let notaventaid = req.body.notaventaid;
    
    //////////////////////////////////
    let ordenamiento = search.split(',');
    var sort = {[ordenamiento[0]]:ordenamiento[1]};
    console.log("sort---:",sort)
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
          { rubroitem: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
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
    itemagregado = obj4;
    //////////////////////////////////

   let count = itemcompra.length;
    res.render('pages/03_itemcompra_itemagregado_hijo', {
      user: req.user,
      locals,
      itemagregado,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm,
      itemcompra,
      notaventaid,
      search
    });
  } catch (error) {
    console.log(error);
  }
};

exports.upregisterhijo = async (req, res) => {
  try {
    const locals = {
      area: 'itemcompra',
      title: 'Ver datos persona',
      description: 'Free NodeJs User Management System',
      scroll:0
    };
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    let repetido = 0;
    let notaventaid=arrId[2]
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    
    for (let i = 1; i < itemcompra.itemagregado.length; i++) {
      
      if (itemcompra.itemagregado[i] == arrId[0]) {
        repetido = 1;
      }
    }
    if (repetido == 0) {
      itemcompra.itemagregado.push(arrId[0]);
      itemcompra.itemagregadocant = itemcompra.itemagregadocant + ',' + 1;
      await Itemcompra.findByIdAndUpdate(
        { _id: arrId[1] },
        {
          itemagregado: itemcompra.itemagregado,
          itemagregadocant: itemcompra.itemagregadocant,
          updatedAt: Date.now()
        }
      );

      messages = 'Se ha creado el registo';
    } else {
      messages = 'No se creó el registro. Registro repetido';
    }

    res.render('pages/03_itemcompra_resultado_itemagregado_hijo', {
      arrId,
      user: req.user,
      locals,
      notaventaid,
      iditemcompra:arrId[1]
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteitemagregadohijo = async (req, res) => {
  const messages = 'Iten Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado',
    scroll:0
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    const notaventaid =  arrId[2] ;
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

    console.log('../edititemhijo/' + arrId[1]+','+arrId[2])
    res.redirect('../edititemhijo/' + arrId[1]+','+arrId[2]);
  } catch (error) {
    console.log(error);
  }
};

exports.editcantitemagregadohijo = async (req, res) => {
  const messages = 'Item Eliminado';
  const locals = {
    area: 'itemcompra',
    title: 'Proceso eliminación registro',
    description: '- Realizado',
    scroll:0
  };
  try {
    console.log('up register' + req.params.id);
    const ids = req.params.id;
    let arrId = ids.split(',');
    const itemcompra = await Itemcompra.findOne({ _id: arrId[1] });
    console.log('view Ids ', arrId);
    console.log('view personas', itemcompra.itemagregado);
 
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