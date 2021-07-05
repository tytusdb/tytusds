import CodHamming from "../components/Hamming/Hamming";

class cHamming{
    hamming(entrada) {
        let matriz = [];
        let aux = ["D", "p", "p", "d", "p", "d", "d", "d", "p", "d", "d", "d", "d", "d", "d", "d", "p", "d", "d", "d", "d"];
        let cont = 0;
        let p1matriz = [];
        let p2matriz = [];
        let p4matriz = [];
        let p8matriz = [];
        let p16matriz = [];
        //colocando los datos en la posicion correspondiente
        for (let i = 1; i <= 21; i++) {
            if (aux[i] == "d") {
                matriz[i] = entrada[cont];
                cont++;
            }
        }
        //llenado la fila P1 con los valores correspondientes de uno en uno
        for (let i = 1; i <= 21; i = i + 2) {
            if (aux[i] == "d") {
                p1matriz[i] = matriz[i];
            }
        }
        //sumando la cantidad de unos y ceros de la fila 
        let suma = 0;
        for (let i = 1; i <= 21; i++) {
            if (p1matriz[i] != undefined) {
                suma += parseInt(p1matriz[i]);
            }
        }
        //verificando que la suma de unos es par o impar para el numero de paridad
        if (suma % 2 != 0) {
            p1matriz[1] = 1
        } else {
            p1matriz[1] = 0
        }
        //llenado la fila P2 con los valores correspondientes de dos en dos
        for (let i = 2; i <= 21; i = i + 4) {
            for (let extra = 0; extra < 2; extra++) {
                if (matriz[i + extra] != undefined) {
                    p2matriz[i + extra] = matriz[i + extra];
                }
            }
        }
        //sumando la cantidad de unos y ceros de la fila 
        suma = 0;
        for (let i = 1; i <= 21; i++) {
            if (p2matriz[i] != undefined) {
                suma += parseInt(p2matriz[i]);
            }
        }
        //verificando que la suma de unos es par o impar para el numero de paridad
        if (suma % 2 != 0) {
            p2matriz[2] = 1
        } else {
            p2matriz[2] = 0
        }
    
        //llenado la fila P4 con los valores correspondientes de cuatro en cuatro
        for (let i = 4; i <= 21; i = i + 8) {
            for (let extra = 0; extra < 4; extra++) {
                if (matriz[i + extra] != undefined) {
                    p4matriz[i + extra] = matriz[i + extra];
                }
            }
        }
        //sumando la cantidad de unos y ceros de la fila 
        suma = 0;
        for (let i = 1; i <= 21; i++) {
            if (p4matriz[i] != undefined) {
                suma += parseInt(p4matriz[i]);
            }
        }
        //verificando que la suma de unos es par o impar para el numero de paridad
        if (suma % 2 != 0) {
            p4matriz[4] = 1
        } else {
            p4matriz[4] = 0
        }
    
    
        //llenado la fila P8 con los valores correspondientes de ocho en ocho
        for (let i = 8; i <= 21; i = i + 16) {
            for (let extra = 0; extra < 8; extra++) {
                if (matriz[i + extra] != undefined) {
                    p8matriz[i + extra] = matriz[i + extra];
                }
            }
        }
        //sumando la cantidad de unos y ceros de la fila 
        suma = 0;
        for (let i = 1; i <= 21; i++) {
            if (p8matriz[i] != undefined) {
                suma += parseInt(p8matriz[i]);
            }
        }
        //verificando que la suma de unos es par o impar para el numero de paridad
        if (suma % 2 != 0) {
            p8matriz[8] = 1
        } else {
            p8matriz[8] = 0
        }
    
        //llenado la fila P16 con los valores correspondientes de diesiceis en diesiceis
        for (let i = 16; i <= 21; i = i + 32) {
            for (let extra = 0; extra < 16; extra++) {
                if (matriz[i + extra] != undefined) {
                    p16matriz[i + extra] = matriz[i + extra];
                }
            }
        }
    
        //sumando la cantidad de unos y ceros de la fila 
        suma = 0;
        for (let i = 1; i <= 21; i++) {
            if (p16matriz[i] != undefined) {
                suma += parseInt(p16matriz[i]);
            }
        }
        //verificando que la suma de unos es par o impar para el numero de paridad
        if (suma % 2 != 0) {
            p16matriz[16] = 1
        } else {
            p16matriz[16] = 0
        }
    
        //inicializando indices iniciales
        matriz[0] = "Bit "
        aux[0] = "Dat "
        p1matriz[0] = "P1   "
        p2matriz[0] = "P2   "
        p4matriz[0] = "P4   "
        p8matriz[0] = "P8   "
        p16matriz[0] = "P16 "
    
        let nuevo = [matriz, aux, p1matriz, p2matriz, p4matriz, p8matriz, p16matriz];
        console.log("Datos debug");
        console.log("Tamaño del codigo: " + entrada.length)
        //ubicacion del ultimo elemento de bit
        let indiceultimo = 0
        for (let i = 0; i < matriz.length; i++) {
            if (matriz[i] != undefined) {
                indiceultimo = i
            }
    
        }
        indiceultimo++
        console.log("ubicacion del ultimo elemento bit: " + indiceultimo)
        //capando el resultado hasta el ultimo resultado
        nuevo = [matriz]
        nuevo = [matriz.slice(0, indiceultimo), aux.slice(0, indiceultimo), p1matriz.slice(0, indiceultimo), p2matriz.slice(0, indiceultimo), p4matriz.slice(0, indiceultimo), p8matriz.slice(0, indiceultimo), p16matriz.slice(0, indiceultimo)];
        //contando las columnas que se necesitaran
        let indiceColumn = 0
        for (let i = 0; i < nuevo.length; i++) {
            for (let j = 0; j < nuevo[i].length; j++) {
                if(nuevo[i][j]=="0" || nuevo[i][j]=="1"){
                    indiceColumn = i+1
                    break
                }
            }
        }
        return nuevo.splice(0,indiceColumn)
    }


    PrintM2D(nuevo) {
        let resultado = ""
        for (let i = 0; i < nuevo.length; i++) {
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

    Graficar(nuevo){
        let grafica = ""
        grafica+="<table class=" + '"table table-primary"' + ">"
        for (let i = 0; i < nuevo.length; i++) {
            grafica+="<tr>"
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
        return grafica
    }

}

//let h = new cHamming;
//console.log(h.Graficar(h.hamming("010010011010011")));



export default cHamming;
