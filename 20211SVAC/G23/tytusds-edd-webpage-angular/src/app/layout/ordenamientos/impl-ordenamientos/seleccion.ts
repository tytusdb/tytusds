export default class SeleccionImpl{
    datosIniciales:any[]
    datosOrdenados:any[]
    constructor(datos:any[]){
        this.datosIniciales = datos
        this.ordenarDatosSeleccion()
    }
    ordenarDatosSeleccion(){
        for( let j = 0; j < this.datosIniciales.length; j++ ){
            let i  = j
            let iMin = j
            for( ++i; i <this.datosIniciales.length;i ++ ){
                (this.datosIniciales[i] < this.datosIniciales[iMin]) && (iMin = i )
            }
            [this.datosIniciales[j],this.datosIniciales[iMin]] = [this.datosIniciales[iMin],this.datosIniciales[j]]
        }
    }
}