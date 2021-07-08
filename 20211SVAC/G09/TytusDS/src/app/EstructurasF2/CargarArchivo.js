// 1 Matrices Dispersas
// 2 Rowmajor
// 3 Colmajor
// 4 Estructuras compuestas
class CargaArchivo{
    constructor(){
        this.Matriz=[]
        this.aristas=[]
        this.vertices=[]
    }
    leerMatriz(event,indexClase, variante){
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
        /*this.Matriz=[]
        for (var k in doc.valores){
            this.Matriz.push({valor:doc.valores[k].valor, x:doc.valores[k].indices[0], y:doc.valores[k].indices[1]})
            //md.insertar(doc.valores[k].valor,doc.valores[k].indices[0],doc.valores[k].indices[1])
        }debugger*/
    }
    reader.readAsText(file);
    //var Matriz=[]
    setTimeout(() => {
        const Animaciones= require('./Animaciones')
        let animate= new Animaciones()
        
        switch (indexClase) {
            case 1:
                /*const Matricesdisp= require('./Matricesdisp')
                let md= new Matricesdisp()*/
                this.Matriz=[]
                for (var k in doc.valores){
                    this.Matriz[k]={valor:doc.valores[k].valor, x:doc.valores[k].indices[0], y:doc.valores[k].indices[1]}
                }
                break;
            case 2:
                /*const RowColMayor= require('./rowColMayor') 
                debugger
                var rc= new RowColMayor()*/
                let Matriz= new Array(doc.m[0])
                for (let i = 0; i < Matriz.length; i++) {
                    Matriz[i]= new Array(doc.m[1])
                }
                for (let k in doc.valores){
                    Matriz[doc.valores[k].indices[0]][doc.valores[k].indices[1]]=doc.valores[k].valor
                }
                this.Matriz=Matriz
                animate.graficarMatriz(Matriz)
                /*setTimeout(() => {
                    if (variante=="row") {
                        animate.graficarMatrizUnaDimension(rc.convertRowmayor(Matriz))
                    } else {
                        animate.graficarMatrizUnaDimension(rc.convertColmayor(Matriz))
                    }                    
                }, 1000);*/
                break;
            default:
                console.log("Indice indefinido")
                break;
        }
        //return Matriz
    }, 500);    
    }
    returnMatriz(){
        return this.Matriz
    }
    addMatriz(array){this.Matriz=array}

    leerGrafo(event, indexClase){
        var file = event.target.files[0];
        var reader = new FileReader();
        var doc
        reader.onload = function(e) {doc = JSON.parse(e.target.result);};
        reader.readAsText(file);
        setTimeout(() => {//debugger
            this.aristas=[];this.vertices=[]
            for (let k in doc.valores){
                for (const key in doc.valores[k].aristas) {
                    if (!this.vertices.includes(doc.valores[k].vertice)) {
                    this.vertices.push(doc.valores[k].vertice)
                    }
                    this.aristas.push({vertice: doc.valores[k].vertice, arista:doc.valores[k].aristas[key].arista, distancia: doc.valores[k].aristas[key].distancia})
                }
                if(doc.valores[k].aristas.length==0){
                    this.vertices.push(doc.valores[k].vertice)
                }
            }            
        }, 500);
    }
    returnGrafo(){
        return{vertices:this.vertices, aristas:this.aristas}
    }
}
module.exports = CargaArchivo