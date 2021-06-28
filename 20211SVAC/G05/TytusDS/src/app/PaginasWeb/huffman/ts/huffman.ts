export class AlgoritmoHuffman{
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
        let filas = [];
        let char = caracteres;
        for (let x = 0; x < caracteres.length; x++) {
            if (x % 2 === 0) {
                caracteres[x]['binario'] = "0";
            } else {
                caracteres[x]['binario'] = "1";
            }
        }
        for (let x = 0; x < caracteres.length; x++) {
            if (x % 2 === 0) {
                if (caracteres[x + 1] !== undefined) {
                    
                }
            }
        }
    }
}