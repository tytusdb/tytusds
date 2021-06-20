// Ordenamiento Rapido
function ordRapido(arreglo){
    if (arreglo.length ===1){
        return arreglo;
    }
    const pivote = arreglo[arreglo.length - 1]
    const partIzq = []
    const partDer = []
    for (const el of arreglo.slice(0, arreglo.length - 1)){
        el<pivote ? partIzq.push(el) : partDer.push(el)
    }
    for ( let i = 0; i<arreglo.length-1; i++){
        if(arreglo[i]<pivote){
            partIzq.push(arreglo[i])
        } else{
            partDer.push(arreglo[i])
        }
    }    
    //Llenado de arreglo
    if(partIzq.length>0 && partDer > 0){
        return [...ordRapido(partIzq),pivote,...ordRapido(partDer)]
    } else if(partIzq.length> 0){
        return [...ordRapido(partIzq),pivote]
    } else{
        return [pivote,...ordRapido(partDer)]
    }
}
