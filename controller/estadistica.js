const Estadistica = require('../models/estadistica');

exports.readItem = async (req, res) => {
    try {
        const workbook = xlsx.readFile('xls/itemcompra.xlsx');
        const sheet_name_list = workbook.SheetNames;

        let json = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });

        for (i = 0; i < result.length-1; i++) {
           
            let arrindicator= result[i].indicatoragregado.split(",")
            console.log('arrindicator',i,arrindicator)
            let indicatoragregado=[]
            for(j=0;j<arrindicator.length;j++){
                indicatoragregado.push(arrindicator[j])
                console.log('arrindicator',i,j,arrindicator[j])
            }
            console.log('arrindicator',i,j,indicatoragregado)
            const itemcompra = {

                nombre: result[i].nombre,
                observacion: result[i].observacion,
                iditemcompra: result[i].iditemcompra,
                tipoitem: result[i].tipoitem,
                rubroitem: result[i].rubroitem,
                unidad: result[i].unidad,
                mxunidad: result[i].mxunidad,
                m2xunidad: result[i].m2xunidad,
                m3xunidad: result[i].m3xunidad,
                kgxunidad: result[i].kgxunidad,
                lxunidad: result[i].lxunidad,
                string01: result[i].string01,
                details: result[i].details,
                cotizaciondetails: result[i].cotizaciondetails,
                cotizaciontitulo: result[i].cotizaciontitulo,
                ordencompradetails: result[i].ordencompradetails,
                ordencompratitulo: result[i].ordencompratitulo,
                tiendatitulo: result[i].tiendatitulo,
                tiendadetalle: result[i].tiendadetalle,
                tiendamaterial: result[i].tiendamaterial,
                tiendacantidad: result[i].tiendacantidad,
                tiendaplazo: result[i].tiendaplazo,
                indicatoragregado: indicatoragregado,
                indicatoragregadocant: result[i].indicatoragregadocant,
                costopropio: result[i].costopropio,
                costoarbol: result[i].costoarbol,
                numero01: result[i].numero01,
                vseccion: result[i].vseccion,
                vdiametro: result[i].vdiametro,
                vlongitud: result[i].vlongitud,
                vancho: result[i].vancho,
                valtura: result[i].valtura,
                vdimension: result[i].vdimension,
                vinclinacion: result[i].vinclinacion,
                vpendiente: result[i].vpendiente,
                vaccionamiento: result[i].vaccionamiento,
                vmando: result[i].vmando,
                vmotor: result[i].vmotor,
                vcapacidadproduccion: result[i].vcapacidadproduccion,
                vcapacidadutil: result[i].vcapacidadutil,
                vcapacidadtotal: result[i].vcapacidadtotal,
                ventrada: result[i].ventrada,
                vsalida: result[i].vsalida,
                vtension: result[i].vtension,
                vpotencia: result[i].vpotencia,
                vmaterial: result[i].vmaterial,
                vtratamiento: result[i].vtratamiento,
                vterminacion: result[i].vterminacion,
                vpeso: result[i].vpeso,
                cotizacionnota: result[i].cotizacionnota,
                stock: 0,
                stockminimo: 0,
                files_upload: "",
                contadorhijo: 0,
                hijo: 0,
                hijos: '',
                itemagregadojunto: '0',
                itemagregado: [''],
                itemagregadocant: '0',
                updatedAt: Date.now(),
                createdAt: Date.now()
            };
            let options = {upsert: true, new: true, setDefaultsOnInsert: true};



            // let aux = await Itemcompra.findOne({ 'iditemcompra': result[i].iditemcompra,'hijo':0 });
            // console.log("******** cant :",aux)
            // if (aux==null)aux=""
            // if (aux.length >0 ){
            //     const newItemcompra = new Itemcompra(itemcompra);
            //     await newItemcompra.save();
            // }else{
            
            
             await Itemcompra.findOneAndUpdate({'iditemcompra': result[i].iditemcompra,'hijo':0 }, itemcompra , options)

  }        res.send(result);
    }    catch (err) {
        console.log(err);
    }
}
