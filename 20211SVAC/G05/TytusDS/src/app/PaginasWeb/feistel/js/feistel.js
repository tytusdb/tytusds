class feistel{
  constructor(cadena,key,Niteraciones) {
    this.cadena=cadena;
    this.key=key.split('');
    this.Niteraciones=Niteraciones;
    this.iteraciones=[];
    this.resultado=""
  }
  //llenar con nuevos datos
  IngDatos(cadena,key,Niteraciones){
    this.cadena=cadena;
    this.key=key.split('');
    this.Niteraciones=Niteraciones;
  }
  Cifrar(){
    let n=0;
    this.iteraciones=[];
    let izquierda=[];
    let derecha=[];
    let EspBlanco=[]
    let w,k,f=[];
    //RELLENAR IZQUIERDA
    for(let i=0;i<(Math.round(this.cadena.length/2));i++){
      izquierda.push(this.cadena[i])
    }
    //RELLENAR DERECHA
    for(let i=Math.round(this.cadena.length/2);i<this.cadena.length;i++){
      derecha.push(this.cadena[i])
    }
    //ESPACIO EN BLANCO
    for(let i=0;i<(Math.round(this.cadena.length/2));i++){
      EspBlanco.push('');
    }
    //CICLO DE ITERACIONES
    for (let i=0;i<this.Niteraciones;i++){
      //1. INGRESAR LA CONCATENACION DE IZQ+DER:
      w=[`W${n}`]
      this.iteraciones.push(w.slice().concat(izquierda.slice().concat(derecha.slice())));

      //2. INGRESAR ESPACIO (columnas sin utilizar) MAS KEY:
      k=[`K${n}:`]
      this.iteraciones.push(EspBlanco.concat(k.slice().concat(this.key.slice())));

      //SE GUARDA LA PRINCIPAL DERECHA EN ESTE AUX DERECHA
      let AuxDerecha=derecha.slice();

      //XOR PARTE DERECHA Y KEY:
      derecha=[]
      for(let i=0;i<AuxDerecha.length;i++){
        derecha.push(this.xor(AuxDerecha[i],this.key[i]));
      }
      let AuxXor=derecha.slice();
      f=[`F${n}:`]
      //3. INGRESAR ESPACIO MAS PRIMER XOR:
      this.iteraciones.push(EspBlanco.concat(f.slice().concat(derecha.slice())));

      derecha=[]
      //XOR ENTRE PARTE IZQUIERDA Y EL XOR ANTERIOR:
      for(let i=0;i<AuxXor.length;i++){
        derecha.push(this.xor(AuxXor[i],izquierda[i]));
      }

      //4. INGRESAR ESPACIO MAS SEGUNDO XOR:
      this.iteraciones.push(EspBlanco.concat([""].slice().concat(derecha.slice())));

     //LA DERECHA AHORA PASA A SER LA IZQUIERDA
      izquierda=AuxDerecha.slice();
      //EL XOR ENTRE LA PARTE IZQUIERDA Y EL XOR ANTERIOR PASA A SER LA PARTE DERECHA
      derecha=derecha.slice();
      //HACER UN SHIFT DERECHO A LA KEY
      this.shiftD();
      n+=1;
    }
    w=[`W${n}`]
    //5. POR ULTIMO INGRESAR EL RESULTADO:
    this.iteraciones.push(w.slice().concat(izquierda.slice().concat(derecha.slice())));
   this.resultado=this.resString(izquierda.concat(derecha));
  }

  resString(lista){
    let resultado='';
    for(let i in lista){
      resultado+=lista[i];
    }
    return resultado;
  }


  shiftD(){
    let Pvalor=this.key[0];
    this.key.shift();
    this.key.push(Pvalor);
  }
  xor(valor1,valor2){
    if(valor1!=valor2){
      return "1";
    }else{
      return "0";
    }
  }

}

module.exports = feistel;
