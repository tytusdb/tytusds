
export class LZW{
   diccionario = [];    
    W = [];
    K = [];
    WK = [];
    Salida = [];
    contador=0;

    iniciarValores(cadena){
        for (let index = 0; index < cadena.length; index++) {
            let k = cadena.charAt(index);
            if(k==" "){
                k="_"
            }
            //console.log("valor  ", k)
            let a = this.validarExistencia(k.toLowerCase())
            console.log("valor retornado ", a)
            if (a==0) {
                
            }else{
                let datos={
                    valor:k.toLowerCase(),
                    indice:this.contador
                }
                console.log(datos)
                this.diccionario.push(datos)
                
                this.contador++
            }
        }
        console.log(this.diccionario)
    }
    LeerCadena(cadena){
        let w=""
        let wk=""
        for (let index = 0; index < cadena.length; index++) {
            let k = cadena.charAt(index);
            if(k==" "){
                k="_"
            }
            wk=w+k
            k=k.toLowerCase();
            wk =wk.toLowerCase()
            this.K.push(k)
            this.W.push(w)
            this.WK.push(wk.toLowerCase())
            console.log("valor ingresado en w "+w)
            console.log("valor ingresado en K "+k)
            
            console.log("valor ingresado en wk "+wk)
            let a = this.validarExistencia(wk)
            console.log("valor retornado ", a)
            if (a==0) {
                w= wk
               
                this.diccionario.push("")   
                this.Salida.push("")          
            }else{
                let datos={
                    valor:wk,
                    indice:this.contador
                }     
                this.diccionario.push(datos)
                let obtener = this.obtenerSalida(w)
                this.Salida.push(obtener)
                this.contador++
              //  console.log("valor ingresado en diccionario"+datos)
                w= k;  

            }
                                     
        }
        this.K.push("")
        this.W.push(w)
        this.WK.push("")
        let obtener = this.obtenerSalida(w)
        this.Salida.push(obtener)
        console.log(this.diccionario)
      //  console.log(this.K)
      this.eliminaralores()
      console.log(this.diccionario)
      console.log(this.Salida)
    }

    obtenerSalida(w){
        for (let index = 0; index < this.diccionario.length; index++) {
            if (this.diccionario[index]==null) {
                continue
            }
            if (this.diccionario[index].valor == w) {
                return this.diccionario[index].indice
            }
            
        }
    }

    eliminaralores(){
        let totalw= this.W.length
        
        console.log("totalw ", totalw)
        
        for (let index = 0; index < this.diccionario.length; index++) {
            let totalD= this.diccionario.length
            if (totalw-1==totalD) {
                return
            }
            this.diccionario.shift();
            console.log("totalD ", totalD)
        }

    }

    validarExistencia(dato){

       console.log("dato a buscar,", dato)
       for (let index = 0; index < this.diccionario.length; index++) {
            //console.log("valor", this.diccionario[index].valor)
            
                if (this.diccionario[index]==null) {
                    continue
                }
                if (this.diccionario[index].valor==dato) {
                    return 0
                }
              
         
            
       }
       
        return 1
    }

    imprimir(){
        for (let index = 0; index < this.diccionario.length; ) {
            for (let index1 = 0; index1 < this.W.length; ) {
                for (let index2 = 0; index2 < this.K.length; ) {
                    for (let index3 = 0; index3 < this.WK.length; index3++) {
                        for (let index4 = 0; index4 < this.Salida.length; index4++) {
                            console.log("w: ",this.W[index4])
                            console.log("k: ",this.K[index4])
                            console.log("wk: ",this.WK[index4])
                            console.log("diccionario: ",this.diccionario[index4])
                            console.log("salida: ",this.Salida[index4])
                            index++
                            index2++
                            index3++
                        }
                        
                    }
                    
                }
                
            }
            
        }
    }
}