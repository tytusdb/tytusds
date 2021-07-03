class Hamming{
    constructor(){
        this.tabla = [];
    }

    cargar(datos){
        let tamanio = datos.length;
        let contadorPotencia = 1 ;
        let potencia = 1;
/*se resta la potencia y el contador de numeros de potencia para encontrar
un tamaño adecuado de arreglo para realizar la tabla*/
        while((potencia-contadorPotencia)<= tamanio){
            potencia *=2;
            contadorPotencia ++;
        }
        let tamArreglo = (contadorPotencia-1) + tamanio;
/*Inicializamos dos encabezados por defecto, uno que sera el resultado final
y otro que sera la referencia de que dato y que potencia estamos usando */
        let cabezaDatos = [];
        let cabeza = [];
        let refPotencia = 1;
        let contadorCadena = 0;
        for(let i = 0; i<= tamArreglo; i++){
            if(i == 0){
                cabezaDatos[0] = "Palabra";
            }else if(i == refPotencia){
                cabezaDatos[i] = ""
                refPotencia *=2;
            }else{
                cabezaDatos[i] = datos.charAt(contadorCadena);
                contadorCadena++;
            }
        }
        refPotencia = 1;
        let p ="p";
        let d = "d";
        let contPotencia = 1;
        let contArreglo = 1;
        

        for(let i = 0; i<= tamArreglo; i++){
            if(i == 0){
                cabeza[0] = "Datos";
            }else if(i == refPotencia){
                cabeza[i] = "p" + contPotencia;
                contPotencia *=2;
                refPotencia *=2;
            }else{
                cabeza[i] = "d" + contArreglo;
                contArreglo ++;                
            }

        }
// Se agregan los encabezados a la tabla;
        this.tabla.push(cabezaDatos);
        this.tabla.push(cabeza);
        
        this.ObtenerHamming(contadorPotencia-1,tamArreglo)
        console.table(this.tabla)
        
        
    }










}