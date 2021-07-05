class RowColMayor{
    constructor(){
        this.matriz=[]
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
    }
    delete(text){
        let dat= this.search(text)
        if (dat.existe) {
            this.matriz.splice(dat.indice,1)
        }else{console.log("No existe el dato")}
    }
    search(text){
        for (let i = 0; i < this.matriz.length; i++) {
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
        /*for (let i = 0; i < this.matriz.length; i++) {
            if (this.matriz[i]) {
                console.log()
            }
        }*/
    }        
}
/*
let a = new RowColMayor()

function convertRow(matriz) {
    a.convertRowmayor(matriz)
}
function convertCol(matriz) {
    a.convertColmayor(matriz)
}
*/
module.exports = RowColMayor
//convertRow([[0,1,2],[3,4,5],[6,7,8]])
//convertCol([[0,1,2],[3,4,5],[6,7,8]])