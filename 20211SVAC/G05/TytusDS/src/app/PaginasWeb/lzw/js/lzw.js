class Lzw{
  constructor() {
    this.text;
    this.diccionario=[];
    this.codigo=""
  }
  set settext(texto){
    this.text=texto
  }
  Gcodigo(){
    this.codigo="";
    this.diccionario=[];
    let w="",k;
    let n=0;
    this.Rdic();
    //HABRA N ITERACIONES POR LOS N CARACTERES DE LA CADENA DE TEXTO
    for(let i in this.text){
      //PARA LA PRIMERA ITERACION
      k=this.text[i];
      //SI SE ENCUENTRA LA CONCATENACION DE WK W PASA A SER W+K
      if(this.Buscar(w+k)==true){
          w=w+k;
          //SI NO SE ENCUENTRA W+K SE AGREGA EL INDEX DE W AL CODIGO DE COMPRENSION
      }else{
        this.diccionario.push(w+k)
        this.codigo+=`${this.diccionario.indexOf(w)}-`
        w=k;
      }
    }
    //POR ULTIMO SE AGREGA EL  INDEX DE W AL FINALIZAR EL RECORRIDO
    this.codigo+=`${this.diccionario.indexOf(w)}`
  }
  //RELLENAR EL DICCIONARIO CON EL ABECEDARIO DE LA CADENA DE TEXTO
  Rdic(){
    let existe;
    for(let i in this.text){
      existe=this.Buscar(this.text[i])
      if(existe==false){
        this.diccionario.push(this.text[i])
      }
    }
  }
  //BUSCAR EL CARACTER EN EL DICCIONARIO PARA SABER SI EXISTE
  Buscar(valor){
    let existe=false
    for(let i=0;i<this.diccionario.length;i++){
      if(valor==this.diccionario[i]){
        existe=true;
        break;
      }
    }
    return existe;
  }
}

module.exports = Lzw;
