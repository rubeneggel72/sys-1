const Indicator = require('../models/Indicator');
const Itemcompra = require('../models/Itemcompra');
const Ids = require('../models/Ids');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
  const messages = 'mensaje';
 
  const locals = {
    area:'indicator',
    title: 'NodeJs',
    description: 'Free NodeJs User Management System'
  };
  let searchTerm="";
  let perPage = 30;
  let page = req.query.page || 1;

  try {
    const indicators = await Indicator.aggregate([{ $sort: { idindicator: 1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Indicator.count() ;

    res.render('pages/06_indicator_index', {
      user: req.user,
      locals,
      indicators,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      searchTerm
    });
  } catch (error) {
    console.log(error);
  }
};



exports.addindicator = async (req, res) => {

  const locals = {
    area:'indicator',
    title: 'Agregando nuevo indicador',
    description: 'Free NodeJs User Management System'
  };
  res.render('pages/06_indicator_add', {
    user: req.user,
    locals
  });
};




exports.edit = async (req, res) => {
  try {
    const indicator = await Indicator.findOne({ _id: req.params.id });
    const messages = 'mensaje';
    // const messages = await req.consumeFlash('info');

    const locals = {
      area:'indicator',
      title: 'Edit indicator Data',
      description: 'Free NodeJs User Management System'
    };
    console.log('Edit:', indicator);
    res.render('pages/06_indicator_edit', {
      user: req.user,
      locals,
      indicator,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};


exports.editPost = async (req, res) => {
  const messages = 'Registo de Indicador Actualizado';

  const locals = {
    area:'indicator',
    title: 'Proceso actualización registro',
    description: '- Realizado'
  };
  try {
    await Indicator.findByIdAndUpdate(req.params.id, {
      idindicator: req.body.idindicator,
    name: req.body.name,
    tipo: req.body.tipo,
    valor: req.body.valor,
    details: req.body.details,
      updatedAt: Date.now()
    });
    res.render('pages/06_indicator_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteindicator = async (req, res) => {
  const messages = 'Registo de Indicador Eliminado';
  const locals = {
    area:'indicator',
    title: 'Proceso eliminación registro',
    description: '- Realizado'
  };
  try {
    console.log('delete:', req.params.id);
    await Indicator.deleteOne({ _id: req.params.id });
    res.render('pages/06_indicator_resultado', {
      user: req.user,
      locals,
      messages
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchindicator = async (req, res) => {
  const locals = {
    area:'indicator',
    title: 'Search indicator Data',
    description: 'Free NodeJs User Management System'
  };
  const messages = 'mensaje';
  try { 
    let perPage = 12;
    let page = req.query.page || 1;
    let searchTerm = req.body.searchTerm;
    
    let arr = searchTerm.split('+');
    let obj=[];
    let obj2=[];
     let indicators=[];
   
    for (let i=0;i<arr.length;i++){
    const searchNoSpecialChar = arr[i].replace(/[^a-zA-Z0-9 ]/g, '');
    console.log("searchNoSpecialChar:",searchNoSpecialChar); 
    console.log("Array elem:"+i+"-"+arr[i]); 
    search='idindicator,1';
 

  let ordenamiento = search.split(',');
  var sort = {[ordenamiento[0]]:ordenamiento[1]};
    obj2 =await Indicator.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { tipo: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { idindicator: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { details: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ]
    }).sort(sort);
   
    indicators = [...obj,...obj2]; 
    obj=indicators; 
    }


    var hash = {};
    indicators = indicators.filter(function(current) {
  var exists = !hash[current.id];
  hash[current.id] = true;
  return exists;
});
  
  
    console.log("indicators:",obj); 
    
      const count = await Indicator.count();
  
      res.render('pages/06_indicator_index', {
        user: req.user,
        locals,
        indicators,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
        searchTerm
      });
  } catch (error) {
    console.log(error);
  }
};


exports.postindicator = async (req, res) => {
  let searchTerm="";
  let ids = await Ids.findById("64ffb0d38fee698da0eb3713" )
  console.log(ids.indicator);
  let aux1=ids.idindicator
   aux1 = aux1.slice(1)
  let aux=parseInt(aux1);
  aux++;
  ids.idindicator=aux.toString()
  let j=3-ids.idindicator.length
  for(j;j>0;j--){
    ids.idindicator="0"+ids.idindicator
  }
  ids.idindicator="I"+ids.idindicator
  await Ids.findByIdAndUpdate('64ffb0d38fee698da0eb3713', {
  
    idindicator: ids.idindicator,
    iditemcompra: ids.iditemcompra,
    updatedAt: Date.now()
  });
  console.log("Update ids"+ids);
  const indicator = {
    idindicator:ids.idindicator,
    name: req.body.name,
    tipo: req.body.tipo,
    valor: req.body.valor,
    details: req.body.details,
 
  };
  try { 
   const newIndicator = new Indicator(indicator);
    await newIndicator.save();

    const locals = {
      area:'indicator',
      title: 'View indicator Data',
      description: 'Free NodeJs User Management System'
    };
    res.redirect('./index');
  } catch (e) {
    console.log(e);
    res.render('pages/06_indicator_add', { user: req.user });
  }
};

exports.updateitems = async (req, res) => {
  try { 
arr=[];
    let itemcompra = await Itemcompra.find({});
   
    
    for (i=0;i<itemcompra.length;i++){
     arr.push(itemcompra[i]._id)
        }
        // arr=["6629989784c287777ce17b91"]
    

        for (i=0;i<arr.length;i++){   
          let costoarbol=0
          let fpv=1
          let costoindicador=0
          let precioventa=0
itemcompra = await Itemcompra.findOne({_id:arr[i]});
arrcant=itemcompra.itemagregadocant.split(",")
for (j=1;j<itemcompra.itemagregado.length;j++){
   itemcompra1 = await Itemcompra.findOne({_id:itemcompra.itemagregado[j]});
  costoarbol=costoarbol+itemcompra1.costoarbol*arrcant[1]
}
console.log(itemcompra.iditemcompra)
arrcant=itemcompra.indicatoragregadocant.split(",")
for (j=1;j<itemcompra.indicatoragregado.length;j++){
  indicator1 = await Indicator.findOne({_id:itemcompra.indicatoragregado[j]});
  if (indicator1.tipo=="Factor precio venta"){ fpv=fpv*indicator1.valor*arrcant[j]}
   else{
     costoindicador=costoindicador+indicator1.valor*arrcant[j]
   }

precioventa=parseInt((costoarbol+costoindicador)*fpv*10)/10
costoarbol=parseInt((costoarbol+costoindicador)*10)/10

}

 console.log(arr[i],j,costoarbol,costoindicador,fpv,precioventa)
 await Itemcompra.findByIdAndUpdate(arr[i], {
  costopropio: costoindicador,
  costoarbol: costoarbol,
  numero01: precioventa,
  updatedAt: Date.now()
});
 costoarbol=0
        }

function getvalor(id){
  for (i=0;i<indicators.length;i++){
    if (indicators[i]._id==id) return indicators[i].valor
      }
}


 
     res.send (arr);
   } catch (e) {
     console.log(e);
     res.send(e)
   }
 };
