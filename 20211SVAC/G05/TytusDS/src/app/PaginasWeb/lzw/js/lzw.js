class Lzw{
  constructor() {
    this.text;
    this.diccionario=[];
    this.iteraciones=[]
    this.codigo=""
  }
  set settext(texto){
    this.text=texto
  }
  Gcodigo(){

    //w,k,wk,agregaraldiccionario: ingreso al diccionario con el index donde se posicionara,salida
    this.codigo="";
    this.diccionario=[];

    let w="",k;
    let n=0;
    this.Rdic();
    //HABRA N ITERACIONES POR LOS N CARACTERES DE LA CADENA DE TEXTO
    for(let i in this.text){
      let  iteracion=[];

      //PARA LA PRIMERA ITERACION
      k=this.text[i];
      //----------------------------------------------
      iteracion.push(this.gEspacio(w));
      iteracion.push(this.gEspacio(k));

      //----------------------------------------------
      //SI SE ENCUENTRA LA CONCATENACION DE WK W PASA A SER W+K
      if(this.Buscar(w+k)==true){
          iteracion.push(this.gEspacio(w)+this.gEspacio(k));
          w=w+k;
         //wk
          iteracion.push("");//Agregar al diccionario
          iteracion.push("");//salida
          //SI NO SE ENCUENTRA W+K SE AGREGA EL INDEX DE W AL CODIGO DE COMPRENSION
      }else{
        this.diccionario.push(w+k)
        iteracion.push(this.gEspacio(w)+this.gEspacio(k));//wk
        iteracion.push(`${this.gEspacio(w)+this.gEspacio(k)} ${this.diccionario.indexOf(w+k)}`);//Agregar al diccionario
        iteracion.push(`${this.diccionario.indexOf(w)}`);//salida
        this.codigo+=`${this.diccionario.indexOf(w)}-`
        w=k;
      }
      this.iteraciones.push(iteracion.slice());
    }
    //POR ULTIMO SE AGREGA EL  INDEX DE W AL FINALIZAR EL RECORRIDO
    let  iteracion=[];
    this.codigo+=`${this.diccionario.indexOf(w)}`
    iteracion.push(w);//w
    iteracion.push("");//l
    iteracion.push("");//wk
    iteracion.push("");//Agregar al diccionario
    iteracion.push(`${this.diccionario.indexOf(w)}`);//salida
    this.iteraciones.push(iteracion.slice());
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
  //CONVERTIR LOS ESPACIOS EN GUIONES MENORES _
  gEspacio(palabra){
    if(palabra==" "){
      palabra="_"
    }
    return palabra
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
