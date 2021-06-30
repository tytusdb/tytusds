function CostoUniforme(Grafo,NodoInicial,NodoFinal){
  //Grafo
  this.Grafo = Grafo;
  //Nodo Inicial
  this.NodoInicial = NodoInicial;
  //Nodo Final
  this.NodoFinal = NodoFinal;
 //Camino Corto
  let CaminoCorto;
  //Camino Padres (Corto)
  let CaminoCortoNodosPadres;
  //dato del grafo
  let dato;
  //Nodos Visitados
   let NodosVisitados=[]
  //Nodos
   let Nodo;

  CaminoCorto=Object.assign({[NodoFinal]:Infinity},Grafo[NodoInicial])
  CaminoCortoNodosPadres={[NodoFinal]:null}
  for(dato in Grafo[NodoInicial]){
    CaminoCortoNodosPadres[dato]=NodoInicial;
  }
 
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
  let FinalGrafo = [NodoFinal];
  let NodoPadre = CaminoCortoNodosPadres[NodoFinal]
  while(NodoPadre!=NodoInicial){
      FinalGrafo.unshift(NodoPadre)
      NodoPadre=CaminoCortoNodosPadres[NodoPadre]
  }
  FinalGrafo.unshift(NodoInicial)
  let MejorCamino ={
      Camino: FinalGrafo,
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

////Prueba de Costo Uniforme
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