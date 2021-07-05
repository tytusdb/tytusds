class Costo {
    constructor() {
        this.successors = []
        this.id = 1
    }


    getKey(item) {
        let hash = 0
        if (typeof item === 'string') {
            for (let i = 0; i < item.length; i++) {
                hash += item.charCodeAt(i)
            }
        } else {
            hash = item
        }
        return hash
    }

    getData() {
        return this.successors
    }

    getId(item) {
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == item) {
                return this.successors[i].id
            }
        }
        return null
    }

    update(item, change) {
        var actualizado
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == item) {
                actualizado = this.successors[i].id
                this.successors[i].value = change
                continue
            }
            for (let j = 0; j < this.successors[i].edges.length; j++) {
                if (this.successors[i].edges[j] == item) {
                    this.successors[i].edges[j] = change
                    this.insercion(this.successors[i].edges)
                    continue
                }

            }
        }
        return actualizado
    }

    insercion(array) {
        for (let i = 1; i < array.length; i++) {
            let key = array[i].val
            let j = i - 1
            while (j >= 0 && this.getKey(array[j].val) > this.getKey(key)) {
                array[j + 1] = array[j]
                j = j - 1
            }
            array[j + 1] = key
        }
    }

    addNode(item, id) {
        let nodo = {
            value: item,
            id: id,
            edges: [],
        }
        this.successors.push(nodo)
        console.log(nodo)
    }

    existNode(item) {
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == item) {
                return true
            }
        }
        return false
    }

    deleteNode(item) {
        var eliminado
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == item) {
                eliminado = this.successors[i].id
                this.successors.splice(i, 1)
                continue
            }
            for (let j = 0; j < this.successors[i].edges.length; j++) {
                //console.log(this.successors[i].edges)
                if (this.successors[i].edges[j] == item) {
                    this.successors[i].edges.splice(j, 1)
                        // console.log(this.successors[i].edges)
                    this.insercion(this.successors[i].edges)
                    continue
                }

            }
        }
        return eliminado
    }

    addEdge(from, to, val) {
        //Obtenemos el nodo from
        let edg = {
            val: to,
            large: val
        }
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == from) {
                this.successors[i].edges.push(edg)
                this.insercion(this.successors[i].edges)
            }
        }
    }

    getSuccessors(item) {
        for (let i = 0; i < this.successors.length; i++) {
            if (item[0] == this.successors[i].value) {
                console.log(this.successors[i], "val")
                console.log(item, "item1")
                return [this.successors[i].edges[0].val, item[1] + parseInt(this.successors[i].edges[0].large)]
            }

        }
        return []
    }

    inc() {
        return this.id++
    }

    Ucs(start, end) {
        var list = [
            [start, 0]
        ];
        console.log(list)
        while (list.length > 0) {
            var current = list.shift();
            if (current[0] == end) {
                console.log("Solucion ", current);
                return current[1]
            }
            var temp = this.getSuccessors(current);
            console.log(temp, "temp")
            list = list.concat(temp)
            console.log(list, "lit")
            list = list.sort(function(a, b) { return a[1] - b[1] })
        }
        console.log("No se ha encontrado una ruta")
    }
}

function Exec() {
    let grafito = new Costo()

    //Agregamos los nodos
    grafito.addNode(1, 1)
    grafito.addNode(2, 2)
    grafito.addNode(3, 3)
    grafito.addNode(5, 5)

    //Agregamos los edges
    //1
    grafito.addEdge(1, 2, 10)
    grafito.addEdge(1, 3, 20)
    grafito.addEdge(2, 5, 2)
    grafito.addEdge(3, 5, 3)
    grafito.Ucs(1, 5)
}

Exec()