function CostoUniforme(Grafo,NodoInicial,NodoFinal){
  //Grafo
  this.Grafo = Grafo;
  //Nodo Inicial
  this.NodoInicial = NodoInicial;
  //Nodo Final
  this.NodoFinal = NodoFinal;

  let CaminoCorto=Object.assign({[NodoFinal]:Infinity},Grafo[NodoInicial])
  let CaminoCortoNodosPadres={[NodoFinal]:null}
  for(let element in Grafo[NodoInicial]){
    CaminoCortoNodosPadres[element]=NodoInicial;
  }
  //Nodos Visitados
  let NodosVisitados=[]
  //Nodos
  let Nodo;
  Nodo = findCheapest(CaminoCorto,NodosVisitados)
    while(Nodo){
        let Camino = CaminoCorto[Nodo];
        let NodosHijos = Grafo[Nodo]
        for(let NodoHijo in NodosHijos){
            let CaminoNuevo; 
            CaminoNuevo = Camino + NodosHijos[NodoHijo]
            if(!CaminoCorto[NodoHijo]||CaminoCorto[NodoHijo]>CaminoNuevo){
                CaminoCorto[NodoHijo]= CaminoNuevo
                CaminoCortoNodosPadres[NodoHijo]= Nodo;
            }
        }
        NodosVisitados.push(Nodo)
        Nodo = findCheapest(CaminoCorto,NodosVisitados)
    }
  let finalAnswer = [NodoFinal];
  let parent = CaminoCortoNodosPadres[NodoFinal]
  while(parent!=NodoInicial){
      finalAnswer.unshift(parent)
      parent=CaminoCortoNodosPadres[parent]
  }
  finalAnswer.unshift(NodoInicial)
  let MejorCamino ={
      Camino: finalAnswer,
      Costo: CaminoCorto[NodoFinal]
  }
  return MejorCamino 
}

function findCheapest(CaminoCorto,NodosVisitados){
    let Nodos=Object.keys(CaminoCorto)
    let NodoAuxiliar=Nodos.reduce((lowest,Nodo)=>{
        if(lowest==null&&!NodosVisitados.includes(Nodo)) lowest=Nodo;
        if(CaminoCorto[lowest]>CaminoCorto[Nodo]&&!NodosVisitados.includes(Nodo)) lowest=Nodo;
        return lowest
    },null)
    return NodoAuxiliar
}
  let Grafo={
    H: { M: 50, A: 30, O: 40},
    M: { A: 71, W: 33},
    A: { H: 30, O: 22},
    W: { A: 45,O: 65},
    C: {W: 65},
    O: {A: 22, F: 32},
    F: { H: 60, K: 77 },
    K: { W: 28, F: 77}
  }
  console.log(CostoUniforme(Grafo, 'H', 'K'));