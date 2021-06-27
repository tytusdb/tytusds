//Funcion de Ordenamiento rapido
export default function ordRapido(arreglo){
    //Posible Arreglo de un solo dato
    if (arreglo.length === 1){
        return arreglo;
    }
    const pivote = arreglo[arreglo.length - 1]
    const partIzq = []
    const partDer = []
    //Iterador
    for (const el of arreglo.slice(0, arreglo.length - 1)){
        el.ASCII<pivote.ASCII ? partIzq.push(el) : partDer.push(el)
    }
    //Construccion de salida
    if(partIzq.length>0 && partDer.length > 0){
        return [ ...ordRapido(partIzq) , pivote , ...ordRapido(partDer)]
    } else if(partIzq.length> 0){
        return [...ordRapido(partIzq) , pivote]
    } else{
        return [pivote , ...ordRapido(partDer)]
    }
}