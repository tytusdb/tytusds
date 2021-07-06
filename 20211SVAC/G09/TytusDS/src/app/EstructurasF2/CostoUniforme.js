const { __esModule } = require("vis");

class CostoUniforme{
  constructor(){
      this.DatoNodo = [];
      this.id = 1;
  }

  ObtenerDato(){
      return this.DatoNodo
  }

  ObtenerId(DatoActual){
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].value == DatoActual){
              return this.DatoNodo[i].id
          }
      }
      return null
  }

  getKey(DatoActual){
      let hash = 0
      if(typeof DatoActual === 'string'){
          for(let i = 0; i < DatoActual.length; i++){
              hash += DatoActual.charCodeAt(i)
          }
      } else {
          hash = DatoActual
      }
      return hash
  }

  Insertar(array){
      for(let i = 1; i < array.length; i++){
          let keyCompare = array[i].Vertices
          let key = array[i]
          let j = i-1
          while(j>=0 && this.getKey(array[j].Vertices) > this.getKey(keyCompare)){
              array[j+1] = array[j]
              j = j-1
          }
          array[j+1] = key
      }
  }

  InsertarDistancia(array){
      for(let i = 1; i < array.length; i++){
          let keyCompare = array[i].distanciaVertice
          let key = array[i]
          let j = i-1
          while(j>=0 && this.getKey(array[j].distanciaVertice) > this.getKey(keyCompare)){
              array[j+1] = array[j]
              j = j-1
          }
          array[j+1] = key
      }
  }

  AgregarNodo(DatoActual){
      let nodo = {
          Vertices: DatoActual,
          id: this.id++,
          Aristas: []
      }
      this.DatoNodo.push(nodo)
  }

  EliminarNodo(DatoActual){
      var eliminado
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].Vertices == DatoActual){
              eliminado = this.DatoNodo[i].id
              this.DatoNodo.splice(i, 1);
              break
          }
      }
      for(let i = 0; i < this.DatoNodo.length; i++){
          for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
              if(this.DatoNodo[i].Aristas[j].Vertices == DatoActual){
                  this.DatoNodo[i].Aristas.splice(j, 1);
                  break
              }
          }
      }
      return eliminado
  }

  ActualizarNodo(DatoActual, NuevoDato){
      var actualizado
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].Vertices == DatoActual){
              actualizado = this.DatoNodo[i].id
              this.DatoNodo[i].Vertices = NuevoDato;
              break
          }
      }
      for(let i = 0; i < this.DatoNodo.length; i++){
          for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
              if(this.DatoNodo[i].Aristas[j].Vertices == DatoActual){
                  this.DatoNodo[i].Aristas[j].Vertices = NuevoDato;
                  this.Insertar(this.DatoNodo[i].Aristas)
                  break
              }
          }
      }
      return actualizado
  }

  AgregarVertice(from, to, distanciaVertice){
      let arista = {
          Vertices: to,
          distanciaVertice: distanciaVertice
      }
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].Vertices == from){
              this.DatoNodo[i].Aristas.push(arista)
              this.Insertar(this.DatoNodo[i].Aristas)
          }
      }
  }

  getDatoNodo(DatoActual, distanciaVertice){
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(DatoActual == this.DatoNodo[i].Vertices){
              let temporal = []
              for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
                  let arista = Object.assign({}, this.DatoNodo[i].Aristas[j]);
                  arista.distanciaVertice = arista.distanciaVertice + distanciaVertice
                  temporal.push(arista)
              }
              return temporal
          }
      }
      return []
  }

  CostoUniformeBuscar(Inicio, Final){
      let recorrido = []
      let realInicio = {
          Vertices: Inicio,
          distanciaVertice: 0,
          VerticeDestino: null
      }
      let listaNodo = [realInicio]
      while (listaNodo.length > 0){
          var current = listaNodo.shift();
          console.log("VerticeDestino: " + current.Vertices + ", Distancia Acumulada: " + current.distanciaVertice)
          if (current.Vertices == Final) {
              console.log("Vertice Encontrado:")
              console.log(current)
              let temporal = current
              while(temporal != null){
                  recorrido.push(this.ObtenerId(temporal.Vertices))
                  temporal = temporal.VerticeDestino
              }
              recorrido.reverse()
              return {recorrido: recorrido, distancia: current.distanciaVertice, encontrado: true}
          }
          var hijos = this.getDatoNodo(current.Vertices, current.distanciaVertice);
          var auxiliar = []
          hijos.forEach(val =>{
              console.log(current.Vertices + "->" + val.Vertices)
              let hijo = {
                  Vertices: val.Vertices,
                  distanciaVertice: val.distanciaVertice,
                  VerticeDestino: current
              }
              auxiliar.push(hijo)
          })
          listaNodo = auxiliar.concat(listaNodo);
          this.InsertarDistancia(listaNodo)
      }
      let temporal = current
      while(temporal != null){
          recorrido.push(this.ObtenerId(temporal.Vertices))
          temporal = temporal.VerticeDestino
      }
      recorrido.reverse()
      return {recorrido: recorrido, distancia: current.distanciaVertice, encontrado: false}
  }

  recorrerCostoUniforme(Inicio, Final){
      let recorrido = []
      let recorridoIds = []
      let realInicio = {
          Vertices: Inicio,
          distanciaVertice: 0,
          VerticeDestino: null
      }
      let listaNodo = [realInicio]
      while (listaNodo.length > 0){
          var current = listaNodo.shift();
          if(recorrido.includes(current.Vertices)) continue
          recorrido.push(current.Vertices)
          recorridoIds.push(this.ObtenerId(current.Vertices))
          console.log("Vertice Destino: " + current.Vertices + ", Distancia Acumulada: " + current.distanciaVertice)
          var hijos = this.getDatoNodo(current.Vertices, current.distanciaVertice);
          var auxiliar = []
          hijos.forEach(val =>{
              console.log(current.Vertices + "->" + val.Vertices)
              let hijo = {
                  Vertices: val.Vertices,
                  distanciaVertice: val.distanciaVertice,
                  VerticeDestino: current
              }
              auxiliar.push(hijo)
          })
          listaNodo = auxiliar.concat(listaNodo);
          this.InsertarDistancia(listaNodo)
      }
      return {recorrido: recorridoIds, distancia: current.distanciaVertice, encontrado: false}
  }

  recorrerPrim(Inicio){
      let recorrido = []
      let recorridoIds = []
      console.log("PROFUNDIDAD:")
      let realInicio = {
          Vertices: Inicio,
          distanciaVertice: 0
      }
      var listaNodo = [realInicio];
      while (listaNodo.length > 0){
          var current = listaNodo.shift();
          if(recorrido.includes(current.Vertices)) continue
          recorrido.push(current.Vertices)
          recorridoIds.push(this.ObtenerId(current.Vertices))
          console.log("Nodo: " + current.Vertices + ", Distancia: " + current.distanciaVertice)
          var auxiliar = this.getDatoNodo(current.Vertices);
          listaNodo = listaNodo.concat(auxiliar);
          this.InsertarDistancia(listaNodo)
      }
      return {recorrido: recorridoIds, encontrado: false}
  }

  VerificarExisteNodo(DatoActual){
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].Vertices == DatoActual){
              return true
          }
      }
      return false
  }

  VerificarExisteArista(from, to){
      for(let i = 0; i < this.DatoNodo.length; i++){
          if(this.DatoNodo[i].Vertices == from){
              for(let j = 0; j < this.DatoNodo[i].Aristas.length; j++){
                  if(this.DatoNodo[i].Aristas[j].Vertices == to){
                      return true
                  }
              }
          }
      }
      return false
  }

  MostrarGrafo(){
      console.log(this.DatoNodo)
  }
  cambiarDatoNodo(datos){
    this.DatoNodo=datos
  }
  returnValores(){
      return this.DatoNodo
  }
  graficarGrafo(){
    const Animaciones= require('./Animaciones')
    let ani=new Animaciones()
    ani.graficarGrafo(this.convertNodo(this.DatoNodo),{autoResize: true,
        height: '100%',
        width: '100%'})
}
    convertNodo(array){
        //let Nodos=[]
        let nodes = []
        let edges = []
        debugger
        for (let i = 0; i < array.length; i++) {
            nodes.push({id: array[i].Vertices, label: array[i].Vertices.toString()})
            try {
                for (let j = 0; j < array[i].Aristas.length; j++) {
                    edges.push({from: array[i].Vertices, to: array[i].Aristas[j], length: 50})
                }
            } catch (error) {console.log(error)}
        }
        return {nodes: nodes, edges:edges}
    }  
}
module.exports= CostoUniforme