function CostoUniforme(Grafo,NodoInicial,NodoFinal){
  //Grafo
  this.Grafo = Grafo;
  //Nodo Inicial
  this.NodoInicial = NodoInicial;
  //Nodo Final
  this.NodoFinal = NodoFinal;

  let lowestPaths=Object.assign({[NodoFinal]:Infinity},Grafo[NodoInicial])
  let lowestPathsParents={[NodoFinal]:null}
  for(let element in Grafo[NodoInicial]){
    lowestPathsParents[element]=NodoInicial;
  }
  //Nodos Visitados
  let NodosVisitados=[]
  //Nodos
  let node;
  node = findCheapest(lowestPaths,NodosVisitados)
    while(node){
        let path = lowestPaths[node];
        let NodosHijos = Grafo[node]
        for(let NodoHijo in NodosHijos){
            let newPath = path + NodosHijos[NodoHijo]
            if(!lowestPaths[NodoHijo]||lowestPaths[NodoHijo]>newPath){
                lowestPaths[NodoHijo]= newPath
                lowestPathsParents[NodoHijo]= node;
            }
        }
        NodosVisitados.push(node)
        node = findCheapest(lowestPaths,NodosVisitados)
    }
  let finalAnswer = [NodoFinal];
  let parent = lowestPathsParents[NodoFinal]
  while(parent!=NodoInicial){
      finalAnswer.unshift(parent)
      parent=lowestPathsParents[parent]
  }
  finalAnswer.unshift(NodoInicial)
  let MejorCamino ={
      Camino: finalAnswer,
      Costo: lowestPaths[NodoFinal]
  }
  return MejorCamino 
}

function findCheapest(lowestPaths,NodosVisitados){
    let nodes=Object.keys(lowestPaths)
    let lowestNodes=nodes.reduce((lowest,node)=>{
        if(lowest==null&&!NodosVisitados.includes(node)) lowest=node;
        if(lowestPaths[lowest]>lowestPaths[node]&&!NodosVisitados.includes(node)) lowest=node;
        return lowest
    },null)
    return lowestNodes
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