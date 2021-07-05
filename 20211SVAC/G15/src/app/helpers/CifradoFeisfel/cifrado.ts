export class cifrado{
    public EnBinario=""
    public KeyBinario=""
    public  binarioK=""
    public  funcion=""
    data={
        left:[],
        right:[],
        key:[],
        xor:[]
    }
    Left=""
    Right=""
    ronda=0;
    totalRonda:number
    constructor(totalRonda){
        this.totalRonda=totalRonda
    }
     //obtener daatos de llave
    obtenerllave(key){
        let convertir=0;
        for (let index = 0; index < key.length; index++) {
            console.log("datoLLaveKey",key[index])
            convertir = key.charCodeAt(index);  
            this.pasarABinarioK(convertir)     
                 
        }       
        return convertir;
    }
    //pasa a ascci texto
    metodoAscii(dato){

        let convertir=0;
        let binario=0
        for (let index = 0; index < dato.length; index++) {
            console.log("dato",dato[index])
            binario =dato.charCodeAt(index)
            this.pasarABinario(binario)
            convertir += dato.charCodeAt(index);
            
        }
        console.log(convertir)
       
        return convertir;
    }

    //pasar llave a binario
    pasarABinarioK(dato){
        
        let binario = dato.toString(2)

        console.log("binario por letraK", binario)
        this.binarioK+="0"+binario
        console.log("binario de key", this.binarioK)
    }
    
    //pasar ttexto a binario
    pasarABinario(dato){
        
        let binario = dato.toString(2)

        console.log("binario por letra", binario)
        this.EnBinario+="0"+binario
        console.log("binario", this.EnBinario)
    }
    
    //igualarr tamano de llave
    corregirTamanoKey(){
        while (this.binarioK.length!=this.Right.length) {
            this.binarioK="0"+this.binarioK
            if (this.binarioK.length==this.Right.length) {
                console.log("tamanoKey",this.binarioK.length)
                console.log("tamanoRight",this.Right.length)
                console.log("binario Key",this.binarioK )
                return 
            }
            
        }       

    }
    
    //obtener lef y right
    DividirBinario(){
        let total= this.EnBinario.length
        console.log("total",total)
        let dividido= Math.round(total/2)
        console.log("dividido",dividido)
        for (let index = 0; index < dividido; index++) {
            this.Left +=this.EnBinario[index]
            
        }
        console.log("left",this.Left)

        for (let index = dividido; index < total; index++) {
            this.Right +=this.EnBinario[index]
            
        }
        console.log("Right",this.Right)
    }

    metodoXor(dato1, dato2){
        //console.log("entre")
        let temp = "" 
          
        for (let index = 0; index < dato1.length; index++) {
           if (dato1[index]== dato2[index]) {
               temp += "0"
           }else{
               temp += "1"
           }
            
        }     
      //  console.log("Resultado de Xor",temp) 
        this.funcion=temp;

        
      //  console.log("Resultado de Xor",this.funcion) 
        return temp 
    }
    imprimir(){
       // this.corregirTamanoKey();
        //console.log("Izquierda" +  "| Derecha")
        //console.log("-----------------------Ronda"+this.ronda)
        console.log(this.Left +"|"+  this.Right)
        this.data.left.push(this.Left)
        this.data.right.push(this.Right)

    } 
    imprimir1(){
        console.log("                    |"+  this.binarioK)
        console.log("                    |"+  this.funcion)
        console.log("                    |"+  this.Left)
        this.data.key.push(this.binarioK)
        this.data.xor.push(this.funcion)
      //  this.data.left.push(this.Left)
    }

    cifrado(){
        this.metodoXor(this.Right, this.binarioK)    
        if(this.ronda>this.totalRonda){
            return
        }else if(this.ronda<this.totalRonda){
           // this.imprimir();
            this.rondas();
        }
    }
    rondas(){
        if(this.totalRonda<this.ronda){
            let aux=this.Left
            this.Left=this.Right
            this.Right=this.metodoXor(this.funcion,aux)
            return
        }else if(this.totalRonda>this.ronda){
            this.imprimir1();
            this.ronda++
            let aux=this.Left
            this.Left=this.Right 
            this.Right=this.metodoXor(this.funcion,aux)
            this.imprimir();
            this.correccionKey();
            
        }
        
       
       // this.imprimir();

    }
    correccionKey(){
        let nuevallave=[]
        let dato=""
        let tamno = this.binarioK.length
       // console.log("tamano",tamno)
        let final = this.binarioK.substr(this.binarioK.length -1)
       // console.log("inicio", final) 
        let inicio = this.binarioK.charAt(0)
        for (let index = 0; index < this.binarioK.length; index++) {
            let aux = this.binarioK.charAt(index)
            nuevallave.push(aux)
            
        }
       // console.log("vieja llave"+nuevallave.length)
       
        nuevallave.shift()
        //console.log("vieja llave"+nuevallave)
        nuevallave.push(inicio)
       // console.log("vieja llave"+nuevallave)
        for (let index = 0; index < nuevallave.length; index++) {
              dato+=nuevallave[index];
            
        }
     //   console.log("nueva llave"+dato)
        //console.log("nueva llave"+dato.length)
        this.binarioK=dato
        this.cifrado()
       // this.imprimir();
       // this.rondas()
    }
    

}