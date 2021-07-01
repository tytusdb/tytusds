class RowColMayor{
    constructor(){
        this.matriz=null
    }
    convertRowmayor(array){
        this.matriz=[]
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                this.matriz[i*array[0].length+j]=array[i][j]
            }
        }
        return this.matriz
    }
    convertColmayor(array){
        this.matriz=[]
        for (let j = 0; j < array[0].length; j++) {
            for (let i = 0; i < array.length; i++) {
                this.matriz[j*array[0].length+i]=array[i][j]
            }
        }
        return this.matriz
    }    
}

let a = new RowColMayor()

function convertRow(matriz) {
    a.convertRowmayor(matriz)
}
function convertCol(matriz) {
    a.convertColmayor(matriz)
}
//convertRow([[0,1,2],[3,4,5],[6,7,8]])
//convertCol([[0,1,2],[3,4,5],[6,7,8]])