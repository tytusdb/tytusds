class Hamming{
    constructor(){
        this.tabla = [];
        this.dato = null;
        this.ecriptado = null;
    }

    cargar(datos){
        this.tabla = []
        this.dato = datos
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

     ObtenerHamming(Potencia,tamArreglo){
        let potenciaIndice = 1;// Sirve para denominar los simbolos P de cada arreglo
        for(let i =0;  i<Potencia; i++){
            let arregloNuevo = [];            
            let refPotencia =1;// Sirve como referencia de las posiciones de cada potencia en la tabla
            let contadorPares = 0;
            
            for(let j =0; j<= tamArreglo; j++){
                if(j == 0){
                    arregloNuevo[0] = "p" + potenciaIndice;
                }else if(j == potenciaIndice){                    
                    let contadorUnos = 0 // cuenta el numero de unos                    
                    let contadorInsercion = j /* donde se colocan los valores
                    dependiendo de que fila de la tabla se lea*/
                    while(contadorInsercion<= tamArreglo){
                        let contadorRelleno = 0
                        while(contadorRelleno < potenciaIndice){
                            if(contadorInsercion <= tamArreglo){
                                arregloNuevo[contadorInsercion]= this.tabla[0][contadorInsercion];
                                
                                if(this.tabla[0][contadorInsercion] == "1"){
                                    contadorUnos++;                                
                                }                                                            
                            }
                            contadorRelleno++;
                            contadorInsercion++;                            
                        }
                        contadorInsercion += potenciaIndice;
                    }
                    if(contadorUnos%2 == 0){
                        arregloNuevo[j]= this.tabla[0][j] ="0";                         
                    }else{
                        arregloNuevo[j]= this.tabla[0][j] ="1";
                        
                    }                  
                }    
                

            }
            refPotencia *= 2;
            potenciaIndice *=2
            this.tabla.push(arregloNuevo);
        }

        let resultado = "";

        for (let x = 1; x < this.tabla[0].length; x++) {
            resultado += this.tabla[0][x]
            
        }

        this.ecriptado = resultado

    }
    
    graficarencabezados(){
        let arregloencabeazados = []


        arregloencabeazados = this.tabla[0]

        return arregloencabeazados
    }

    graficardatos(){
        let arregloDatos = []

        for (let x = 1; x < this.tabla.length; x++) {
            
            arregloDatos.push(this.tabla[x])
            
        }
        return arregloDatos
    }

    guardar(){
        let resultado = "";

        for (let x = 1; x < this.tabla[0].length; x++) {
            resultado += this.tabla[0][x]
            
        }

        return resultado
    }
    
    }

    export default Hamming;