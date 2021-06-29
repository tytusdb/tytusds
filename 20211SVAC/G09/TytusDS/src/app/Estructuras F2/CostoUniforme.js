function CostoUniforme (Grafo, NodoInicial, NodoFinal) {
    // Grafo
    this.Grafo = Grafo
    // Nodo inicial
    this.NodoInicial = NodoInicial
    // Nodo final
    this.NodoFinal = NodoFinal
    // Costo de cada nodo
    this.costoNodo = []
    // Costo de nodo raíz
    this.costoNodo[NodoInicial] = 0
    // Nodo previo
    this.previous = []
    // Objeto con los nodos marcados como visitados
    this.NodosVisitados = {}
    // Objeto que nos permitira el ordenamiento de los nodos
    this.OrdenarNodo = new MinHeap()
    for (var v = 0; v < Grafo.length; ++v) {
      (v !== NodoInicial)
      ? this.costoNodo[v] = Number.POSITIVE_INFINITY
      : this.costoNodo[v]
      this.OrdenarNodo.insert(v, this.costoNodo[v])
    }
    // Nodo padre
    this.NodoPadre = undefined
    // Numero de nodos del padre
    this.neighbors = undefined
    // Ultimo nodo abierto
    this.R = undefined
    // Nodo hijo actual
    this.currentNeighbor = undefined
    // Falso mientras no se encuentre el nodo objetivo
    this.complete = false
  }
  
  CostoUniforme.prototype = {
    constructor: CostoUniforme,
    // Función de cada paso del algoritmo
    step: function () {
      if (this.complete) {
        return true
      }
      // Asignación de nodo padre
      if (this.NodoPadre === undefined) {
        /* Validación del nodo que su costo no sea 0,
         valor infinito o sea un estado objetivo. */
        if (this.OrdenarNodo.size() === 0 ||
            this.OrdenarNodo.peekMin().key === Number.POSITIVE_INFINITY ||
            this.OrdenarNodo.peekMin().value === this.NodoFinal
        ) {
          // Si alguna se cumple el estado de busqueda finaliza
          this.complete = true
          return true
        }
        // Se asigna el nodo con menor costo
        this.NodoPadre = this.OrdenarNodo.extractMin().value
        // Marcar nodo padre como visitado
        this.NodosVisitados[this.NodoPadre] = true
        // Valor numero de nodos del padre sin definir
        this.neighbors = undefined
        // Ultimo nodo abierto no definido
        this.R = undefined
        // Nodos hijo actual no definido
        this.currentNeighbor = undefined
        // La busqueda debe continuar
        return false
      }
      if (this.neighbors === undefined) {
        // Creación de numero de nodos hijos
        this.neighbors = []
        // Validación que el nodo sea correcto
        for (var R = 0; R < this.Grafo.length; ++R) {
          if (R in this.NodosVisitados || R === this.NodoPadre ||
            this.Grafo[this.NodoPadre][R] === Number.POSITIVE_INFINITY
          ) {
            continue
          }
          // Agregamos los nodos hijos
          this.neighbors.push(R)
        }
        // Grafo aún no finalizado
        return false
      }
      // visitar todos los nodos hijos
      (this.currentNeighbor === undefined)
      // no esta definido se asigna el nodo 0
      ? this.currentNeighbor = 0
      // es distinto se agrega 1
      : this.currentNeighbor += 1
      // En caso de que nodo hijo sea ultimo
      if (this.currentNeighbor === this.neighbors.length) {
        // Nodo padre igual a no definido
        this.NodoPadre = undefined
        // nodos padre no definido
        this.neighbors = undefined
        // Estado aún no finalizado
        return false
      }
      // Se asigna nodo abierto
      this.R = this.neighbors[this.currentNeighbor]
      // Se calcula el costo del nodo padre al nodo hijo visitado
      var alt = this.dist[this.NodoPadre] + this.G[this.NodoPadre][this.R]
      // Validación que el nodo sea el de menor costo
      if (alt < this.dist[this.R]) {
        this.dist[this.R] = alt
        this.previous[this.R] = this.NodoPadre
        this.B.decreaseKey(this.R, alt)
      }
      // Estado del grafo aún sin terminar
      return false
    },
    // Función para encontrar el camino mas corto
    shortestPath: function () {
      var nodes = []
      var edges = []
      // Si nodo el valor del nodo final es distinto a infinito
      if (this.dist[this.NodoFinal] !== Number.POSITIVE_INFINITY) {
        var NodoAuxiliar = this.NodoFinal
        nodes.push(NodoAuxiliar)
        while (true) {
          // Recorremos del nodo objetivo al nodo raíz
          var prevNode = this.previous[NodoAuxiliar]
          edges.push({src: NodoAuxiliar, dst: prevNode})
          NodoAuxiliar = prevNode
          nodes.push(prevNode)
          if (NodoAuxiliar === this.NodoInicial) {
            // si el nodo actual es nodo raíz finalizar while
            break
          }
        }
      }
      // Regresamos todas las aristas y los nodos asi como la distancia
      return {edges: edges, nodes: nodes, distance: this.costoNodo[this.NodoFinal]}
    }
  }