class Graph {
    constructor() {
        this.successors = []
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
            let key = array[i]
            let j = i - 1
            while (j >= 0 && this.getKey(array[j]) > this.getKey(key)) {
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
            edges: []
        }
        this.successors.push(nodo)
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

    addEdge(from, to) {
        //Obtenemos el nodo from
        for (let i = 0; i < this.successors.length; i++) {
            if (this.successors[i].value == from) {
                this.successors[i].edges.push(to)
                this.insercion(this.successors[i].edges)
            }
        }
    }

    getSuccessors(item) {
        for (let i = 0; i < this.successors.length; i++) {
            if (item == this.successors[i].value) {
                return this.successors[i].edges
            }
        }
        return []
    }

    depth(start, end) {
        var list = [start];
        var res = []
        while (list.length > 0) {
            var current = list.shift();
            res.push(current)
                //console.log("current", current)
            if (current == end) {
                //console.log("Lo encontramos");
                return res
            }
            var temp = this.getSuccessors(current);
            //console.log("temp", temp)
            temp.reverse()
            list = temp.concat(list);
            ///console.log("list", list)
        }
        console.log("No se ha encontrado una ruta")
    }
}
