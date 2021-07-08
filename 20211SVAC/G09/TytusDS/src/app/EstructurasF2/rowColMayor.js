const ani= require('./Animaciones')
class RowColMayor{
    constructor(){
        this.matriz=[]
        this.Animacion= new ani()
        this.id=0
    }
    convertRowmayor(array){
        this.matriz=[]
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                if (array[i][j]) {
                    this.matriz[i*array[0].length+j]=array[i][j]
                }
            }
        }
        return this.matriz
    }
    convertColmayor(array){
        this.matriz=[]
        for (let j = 0; j < array[0].length; j++) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][j]) {
                    this.matriz[j*array[0].length+i]=array[i][j]
                }
            }
        }
        return this.matriz
    }
    returnMatriz(){
        return this.matriz
    }
    returnValores(){
        let val="["
        for (let i = 0; i < this.matriz.length; i++) {
            if (this.matriz[i]) {
                val+=this.matriz[i]+","
            }
        }
        val=val.substring(0,val.length-1)+"]"
        return val        
    }
    insertar(text){
        this.matriz.push(text)
        this.Animacion.animateAdd(this.id,text)
        this.id++
        //this.graficar()
    }
    delete(text){
        let dat= this.search(text)
        if (dat.existe) {
            this.matriz.splice(dat.indice,1)
            this.Animacion.animateDelete(this.Animacion.buscar(text).id)
        }else{console.log("No existe el dato")}
    }
    search(text){
        for (let i = 0; i < this.matriz.length; i++) {
            this.Animacion.animateBuscar(this.Animacion.buscar(text).id,i)
            if (text==this.matriz[i]) {
                return {existe: true, indice: i}
            }
        }
        return {existe: false, indice: -1}
    }
    actualizar(textReplace, textNew){
        let dat=this.search(textReplace)
        if (dat.existe) {
            this.matriz[dat.indice]=textNew
        } else {
            console.log("No existe el Dato")
        }
    }
    imprimir(){
        console.log(this.matriz)
    }        
    graficar(){
        //let vis=require('../../../vis-4.21.0/dist/vis')
        //let vis=require('../../../node_modules/vis/dist/vis')
        /*var nodes = new vis.DataSet([
        ]);*/        
        let nodes = [];

        // Create a data table with links.
        let edges = [];

        nodes.push({id: 1, label: 'Get HTML'});
        nodes.push({id: 2, label: 'Using SVG'});
        edges.push({from: 1, to: 2, length: 100});

        // create a network
        var container = document.getElementById("DivInsert")

        //var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};
        //network = new vis.Network(container, data, options);
        let garf = new vis.Network(container, data, {});        
    }
}
module.exports = RowColMayor