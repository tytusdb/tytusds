// 1 Matrices Dispersas
class CargaArchivo{
    constructor(){

    }
    leerMatriz(event,indexClase){
        var file = event.target.files[0];
        var reader = new FileReader();
        var doc
        reader.onload = function(e) {
        doc = JSON.parse(e.target.result);
          //console.log(doc)
            
        /*for (var k in doc.valores){
            let valores = k
            console.log(k)
            //console.log(valores.indices[0]+" "+valores.indices[1]+" val: "+valores.valor)
            //console.log(doc[key][k][0][0]+" "+doc[key][k][0][1]+ "valor: "+doc[key][k][1][0])
            //console.log(valores)
        }debugger
        for (var key in doc) {
            //console.log('name=' + key + ' value=' + doc[key]);
            if(key=='valores'){
                //console.log(doc[key].length)
                debugger
                let valores
                for (var k in doc[key]){
                    valores = doc[key][k]
                    console.log(valores.indices[0]+" "+valores.indices[1]+" val: "+valores.valor)
                    //console.log(doc[key][k][0][0]+" "+doc[key][k][0][1]+ "valor: "+doc[key][k][1][0])
                    //console.log(valores)
                }
            }
            else if(key=='nombre'){
                //nombre = doc[key]
                console.log(doc[key])
            }
            else if(key=='repeticion'){
                //repeticion = doc[key]
                console.log(doc[key])
            }
            else if(key=='animacion'){
                //animacion = doc[key]
                console.log(doc[key])
            }
            else if(key=='categoria'){
                //categoria = doc[key]
                console.log(doc[key])
            }
            //console.log(key)
        }*/
    }
    reader.readAsText(file);
    setTimeout(() => {
        const Animaciones= require('./Animaciones')
        let animate= new Animaciones()
        switch (indexClase) {
            case 1:
                const Matricesdisp= require('./Matricesdisp')
                var md= new Matricesdisp()
                for (var k in doc.valores){
                    md.insertar(doc.valores[k].valor,doc.valores[k].indices[0],doc.valores[k].indices[1])
                    //debugger
                }
                //md.imprimir_vertical()
                md.imprimir_horizontal()
                break;
        
            default:
                console.log("Indice indefinido")
                break;
        }
        
    }, 500);    
    }
}
module.exports = CargaArchivo