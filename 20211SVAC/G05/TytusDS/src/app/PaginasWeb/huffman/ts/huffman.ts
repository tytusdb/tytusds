import { NodoHuffman } from './nodo-huffman';
export class AlgoritmoHuffman{
    arbol: NodoHuffman = new NodoHuffman();
    constructor() {}
    identificarCaracteres(cadena: string): any {
        let arr = cadena.split("");
        let caracteres: any = [];
        for (let x = 0; x < arr.length; x++) {
            let repetido = false;
            for (let y = 0; y < caracteres.length; y++) {
                if (arr[x] === caracteres[y].caracter) {
                    repetido = true;
                    caracteres[y].repeticiones++;
                }
            }
            if (!repetido) {
                caracteres.push({caracter: arr[x], repeticiones: 1});
            }
        }
        return this.ordenar(caracteres);
    }

    ordenar(caracteres: any[]): any[] {
        for (let x = 0; x < caracteres.length - 1; x++) {
            let menor = x;
            for(let j = x + 1; j < caracteres.length; j++) {
                if (caracteres[menor].repeticiones > caracteres[j].repeticiones) menor = j;
            }
            let aux = caracteres[menor];
            caracteres[menor] = caracteres[x];
            caracteres[x] = aux;
        }
        return caracteres;
    }

    algoritmo(caracteres: any[]): any {
        let i = 1;
        let aux: any = {};
        let afuera: any = [];
        while (i < caracteres.length) {
            let cabeza = new NodoHuffman();
            if (i === 1) {
                let izq = new NodoHuffman(caracteres[i-1]);
                izq.caracter = caracteres[i-1].caracter;
                izq.codigo = '0';
                izq.suma = caracteres[i-1].repeticiones;
                
                let der = new NodoHuffman(caracteres[i]);
                der.caracter = caracteres[i].caracter;
                der.codigo = '1';
                der.suma = caracteres[i].repeticiones;
                
                cabeza.izquierda = izq;
                cabeza.derecha = der;
                cabeza.suma = izq.suma + der.suma;
                aux = cabeza;
                i++;
            }else {
                if (aux.suma <= caracteres[i].repeticiones) {
                    let izq = new NodoHuffman();
                    izq.caracter = caracteres[i].caracter;
                    izq.codigo = '0';
                    izq.suma = caracteres[i].repeticiones;

                    cabeza.izquierda = izq;
                    cabeza.derecha = aux;
                    cabeza.suma = cabeza.izquierda.suma + cabeza.derecha.suma;

                    aux = cabeza;
                }else {
                    afuera.push(caracteres[i]);
                }
                i++;
            }
        }
        console.log(aux);
        console.log(afuera);
    }
}