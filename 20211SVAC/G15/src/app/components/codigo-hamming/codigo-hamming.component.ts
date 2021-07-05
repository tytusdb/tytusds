import { NumberSymbol, SlicePipe } from '@angular/common';
import { Binary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-codigo-hamming',
    templateUrl: './codigo-hamming.component.html',
    styleUrls: ['./codigo-hamming.component.css']
})
export class CodigoHammingComponent implements OnInit {

    filas: number
    columnas: number
    separar: any
    paridad: any
    input1: any
    entrada: any
    salida: any
    fileName = ""
    error: any
    activo: boolean

    constructor() { }

    ngOnInit(): void {
    }

    codigohamming() {
        
        this.salida =  " PROCESO " + "\n"
        const isVerifyBit = n => n == 1 || Math.log2(n) % 1 == 0;
        const createParity = input => {
            let hamming = '';

            let preHamming = '';
            let used = 0;
            const finalLength = input.length + Math.log2(input.length) + 1;
            this.columnas = finalLength
            console.log(finalLength)
            for (let i = 0; i < finalLength; i++) {
                preHamming += isVerifyBit(i + 1) ? 0 : input[used++];
            }
            console.log(preHamming)


            for (let i = 0; i < preHamming.length; i++) {
                const pos = i + 1;
                if (!isVerifyBit(pos)) {
                    hamming += preHamming[i];
                    continue;
                }

                let count = 0;
                for (let j = i; j < preHamming.length; j += 2 * pos) {
                    const slice = preHamming.slice(j, j + pos);
                    console.log("------------couent")
                    var proceso = "D" + j + " " + slice
                    console.log("D" + j + " " + slice)
                    this.salida = this.salida + " " + " "  + proceso + "\n"
                    this.paridad = slice
                    for (let k = 0; k < slice.length; k++)
                        count += Number(slice[k]);
                    
                }
                this.filas = pos
                console.log(this.filas)
                hamming += `${count % 2}`
            }

            console.log('Input:  ', input);
            console.log('Hamming:', hamming)
            this.salida = this.salida +  " Codigo de Hamming es: " + hamming
            this.separar = hamming.split("")
            console.log(this.separar)
            // console.log("chequeando errrores de paridad de " + hamming )
        }

        console.log('-----------------------------------------------------');
        const area = document.getElementById('contenttarget') as HTMLTextAreaElement;
        this.input1 = area.value
        //this.input1 = this.entrada;
        console.log(this.input1)
        document.getElementById('resultado')
        console.log('>> Gerando código hamming para:', this.input1, '(N1)');
        createParity(this.input1);
        console.log('');

        // const input2 = '1001101';
        // console.log('>> Gerando código hamming para:', input2, '(N2)');
        // createParity(input2);

        // console.log('-----------------------------------------------------');
        // const hammingCorreto = '011010110010';
        // console.log('>>> Verificando integridade para:', hammingCorreto, '(N1, Correto)');
        // checkParity(hammingCorreto);
        // console.log('');


        // console.log('');

        // console.log('');

        // const hammingIncorreto2 = '01111010101';
        // console.log('>>> Verificando paridade para', hammingIncorreto2, '(N2 Errado, quinto bit invertido)');
        // checkParity(hammingIncorreto2);
        // console.log('-----------------------------------------------------');
        //   }
    }

    crear() {
        var codigo = this.input1
        var codigoseparar = this.input1.split("")
        var col = codigoseparar.length
        var filas = 1
        var tabla = "<table align=\"center\"background = \"\" border=\"1\">";

        tabla += "<tr><td></td>";

        for (let j = 0; j < codigoseparar.length; j++) {
            tabla += "<td class=\"fila_par\">" + codigoseparar[j] + "</td>";
        }
        tabla += "</tr>";

        for (let i = 0; i < filas; i++) {
            tabla += "<tr>";
            tabla += "<td>" + (i + 1) + "</td>";
            for (let j = 0; j < col; j++) {
                tabla += "<td>" + "</td>";

            }

            tabla += "</tr>";
        }
        tabla += "</table>";
        document.getElementById("resultado").innerHTML = tabla;
    }

    crear2() {
        document.getElementById("resultado").innerHTML = "";
    }

    getFile(event) {
        const input = event.target
        if ('files' in input && input.files.length > 0) {
            this.placeFileContent(document.getElementById('contenttarget'), input.files[0])
        }
    }

    placeFileContent(target, file) {
        this.readFileContent(file).then(content => {
            target.value = content
        }).catch(error => console.log(error))

    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.onload = (event) => {
                resolve(event.target.result.toString())
                var cadena = document.getElementById('contenttarget').textContent;
            }
            reader.onerror = reject;
            reader.readAsText(file);

        })

    }

    limpiar() {
        this.entrada = ""
        this.salida = ""

    }

    convertirBit() {
        let convertir = 0;
        for (let index = 0; index < this.entrada.length; index++) {
            convertir += this.entrada.charCodeAt(index);

        }
        this.salida = convertir;
        return convertir;

    }

    verificarParidad() {


        const isVerifyBit = n => n == 1 || Math.log2(n) % 1 == 0;
        const checkParity = binary => {
            const errors = [];

            for (let i = 0; i < binary.length; i++) {
                const pos = i + 1;
                if (!isVerifyBit(pos)) continue;
                let count = 0;
                for (let j = i; j < binary.length; j += 2 * pos) {
                    const slice = binary.slice(j, j + pos);
                    for (let k = 0; k < slice.length; k++)
                        count += Number(slice[k]);
                }
                if (count % 2) {
                    errors.push(pos);
                }
            }

            const flip = i => binary.slice(0, i) + (binary[i] == '0' ? '1' : '0') + binary.slice(i + 1, binary.length);

            console.log('Bits de paridad con errores:', errors);
            console.log('Input:                     ', binary);
            if (errors.length)
                console.log('Binario correcto:', flip(errors.reduce((ac, it) => ac + it) - 1));


            if (errors === null ){
                this.error = "NO HAY ERRORES CON EL CODIGO DE HAMMGIN " + binary
            } else {
                var conError = "Bits de paridad con errores: " + errors + "\n"
                var noBinario = "Input:                     " + binary + "\n"
                if (errors.length)
                    console.log('Binario correcto:', flip(errors.reduce((ac, it) => ac + it) - 1));
                var correcion = "Binario Correcto: " + flip(errors.reduce((ac, it) => ac + it) - 1)
                this.error = conError + noBinario + correcion
            }
        };

        checkParity(this.salida);
        const hammingCorreto2 = '01110010101';
        console.log('>>> Verificando integridade para:', hammingCorreto2, '(N2, Correto)');
        checkParity(hammingCorreto2);

        const hammingIncorreto = '011010110011';
        console.log('>>> Verificando paridade para', hammingIncorreto, '(N1 Errado, último bit invertido)');
        checkParity(hammingIncorreto);

    }

    limpiarerror() {
        this.error = ""
    }

    generarJSON1() {
        let data = this.generarJSON()
        var link = document.createElement("a");
        link.download = "hamming.txt";
        var info = "text/json;charset=utf-8," + encodeURIComponent(data);
        link.href = "data:" + info;
        link.click();
        link.remove()
      }
      
      generarJSON() {
        const area = document.getElementById('resultado') as HTMLTextAreaElement;
        var p1 = area.value
      
      
        return JSON.stringify(p1)
      }
}
