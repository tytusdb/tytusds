class Arbol {
    constructor(matriz, bit, izquierdo, derecho) {
        this.matriz = matriz
        this.bit = bit
        this.izquierdo = izquierdo
        this.derecho = derecho
    }
}

var recorridos = [];
var recorridoArbol = "";

class chuffman {

    huffman(entrada) {
        entrada = entrada.replace(/ /g, "_")
        //que caracteres contiene la entrada con cantidad
        let caracteres = [] // caracter[0] repetidos[1]
        let aux = []
        for (let i = 0; i < entrada.length; i++) {
            let otra = this.estaEnArray(caracteres, entrada[i])
            if (otra[0]) {
                caracteres[otra[1]][1]++
            } else {
                aux = [entrada[i], 1]
                caracteres.push(aux)
            }
        }

        //verificando si los caracteres son pares si no agregar uno fantasma
        let sumo = false
        if (caracteres.length % 2 != 0) {
            caracteres.push([-1, 100000000])
            sumo = true
        }

        //ordendando la lista caracteres de mayor a menor
        caracteres.sort((a, b) => a[1] - b[1])
        console.log("Letras Ordenadas")
        console.log(caracteres)
        //crear el arbol
        //ingresando los datos al arbol
        //pila de nodos
        let pila = []
        let a = 0
        for (let i = 0; i < caracteres.length; i++) {
            let auxiliar = new Arbol(caracteres[i], a, null, null)
            pila.push(auxiliar)
            if (a == 0) {
                a = 1
            } else {
                a = 0
            }
        }
        //unir nodos de par en par
        let pilaAux = []
        a = 0
        for (let i = 0; i < pila.length; i = i + 2) {
            pilaAux.push(new Arbol(["", pila[i].matriz[1] + pila[i + 1].matriz[1]], a, pila[i], pila[i + 1]))
            if (a == 0) {
                a = 1
            } else {
                a = 0
            }
        }
        pila = pilaAux
        while (pila.length != 1) {
            if (pila[0].matriz[1] <= pila[1].matriz[1]) {
                pila[0].bit = 0
                pila[1].bit = 1
            } else {
                pila[0].bit = 1
                pila[1].bit = 0
            }
            let auxiliar = new Arbol(["", pila[0].matriz[1] + pila[1].matriz[1]], "", pila[0], pila[1])
            pila.shift()
            pila[0] = auxiliar
        }

        console.log(pila[0])

        //IMPORTANTE!!!! SI SE VA A REALIZAR ALGO CON LA EXTRUCTURA DE ARBOL, HACERLO ABAJO DE ESTE TEXTO
        //DESPUES DE IMPIRMIR LOS RECORRIDSO EL ARBOL ES BORRADO

        //Recorriendo el arbol
        //guardando la tabla en Caracteres
        for (let index = 0; index < caracteres.length; index++) {
            this.recorrerArbol(pila[0])
        }
        let matrizRecorridos = []

        if (sumo == true) {
            let axu = []
            let axu2 = []
            for (let index = 0; index < recorridos.length - 1; index++) {
                axu.push(recorridos[index])
                axu2.push(caracteres[index])
            }
            caracteres = axu2
            recorridos = axu
        }

        matrizRecorridos.push(caracteres)
        matrizRecorridos.push(recorridos)

        return matrizRecorridos
        //this.PrintM2D(matrizRecorridos)
        //console.log("aaaaa");
        //console.log(matrizRecorridos);
        //Graficar(matrizRecorridos)
    }

    PrintM2D(nuevo) {
        let resultado = ""
        console.log("estoy imprimiendo");
        for (let i = 0; i < nuevo.length; i++) {
            console.log(nuevo[i]);
            for (let j = 0; j < nuevo[i].length; j++) {
                if (nuevo[i][j] != undefined) {
                    resultado += " - " + nuevo[i][j]
                } else {
                    resultado += " - _"
                }
            }
            resultado += "\n"
        }
        console.log(resultado)
    }

    Graficar(nuevo) {
        let grafica = ""
        grafica += "<table class=" + '"table table-primary table-bordered"' + ">"
        for (let i = 0; i < nuevo.length; i++) {
            grafica += "<tr>"
            for (let j = 0; j < nuevo[i].length; j++) {
                if (nuevo[i][j] != undefined) {
                    grafica += "<td>" + nuevo[i][j] + "</td>"
                } else {
                    grafica += "<td> </td>"
                }
            }
            grafica += "</tr>"
        }
        grafica += "</table>"
        console.log(grafica);
        return grafica
    }

    estaEnArray(arr, a) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == a) {
                return [true, i]
            }
        }
        return [false, 0]
    }



    recorrerArbol(nodo) {

        if (nodo.izquierdo != null) {
            recorridoArbol += nodo.bit
            this.recorrerArbol(nodo.izquierdo)
            if (nodo.izquierdo.derecho == null && nodo.izquierdo.izquierdo == null) {
                nodo.izquierdo = null
            }
            return 0
        }
        if (nodo.derecho != null) {
            recorridoArbol += nodo.bit
            this.recorrerArbol(nodo.derecho)
            if (nodo.derecho.derecho == null && nodo.derecho.izquierdo == null) {
                nodo.derecho = null
            }
            return 0
        }
        if (nodo.derecho == null && nodo.izquierdo == null) {
            recorridoArbol += nodo.bit
            recorridos.push(recorridoArbol)
            recorridoArbol = ""
            return 0
        }

    }

}






//let h = new chuffman;
//h.huffman("PABLO PAPA DE PABLITO")
export default chuffman

