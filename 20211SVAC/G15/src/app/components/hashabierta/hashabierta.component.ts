import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HashAbierta } from 'src/app/helpers/HashAbierta/HashAbierta';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-hashabierta',
  templateUrl: './hashabierta.component.html',
  styleUrls: ['./hashabierta.component.css']
})
export class HashabiertaComponent implements OnInit {
  nombre: any
  datoBuscar: number|string
  datoEliminar: any
  datoAntiguo: number|string
  datoNuevo: number|string
  vector1X=25
  vector1y=25
  vector1textox=65
  vector1textoy=70
  svg1
  contexto
  fileName= ""
  almacenar={
    key:[],
    nombre:[],
    coordex:[],
    coordey:[]

  }
  datos={
    enX:0,
    enY:0
  }
  modificado=false
  hashabierta: HashAbierta
  velocidad: number = 0.5
  simple: boolean = false
  multiplicacion: boolean = false
  division: boolean = true
  prueba=[]
  m
  min
  max

  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    //this.hashabierta = new HashAbierta(13, 30, 35)
   // this.imprimirconsole();

  }
  eliminar(){
    
    if (!isNaN(this.datoEliminar)) {
      let valors
       if (this.funcionRealizar()== 0) {
        valors = this.hashabierta.funcionSimple(this.datoEliminar)
       }
       else if(this.funcionRealizar()== 1){
         valors = this.hashabierta.funcionMultiplicacion(this.datoEliminar)
       }
       else if(this.funcionRealizar()== 2){
          valors = this.hashabierta.funcionDivision(this.datoEliminar)
      }
      this.hashabierta.eliminar(this.datoEliminar,valors);
      console.log("obteniendo indice:",valors)
      for (let index = 0; index < this.almacenar.nombre.length; index++) {
        console.log("entrando al primer for")
        if (this.almacenar.nombre[index]== valors) {
          
          if (this.almacenar.key[index]==this.datoEliminar) {
            console.log("correctox2")
            this.eliminarnodo(this.almacenar.coordex[index],this.almacenar.coordey[index])
            delete(this.almacenar.nombre[index])
            delete(this.almacenar.key[index])
            delete(this.almacenar.coordex[index])
            delete(this.almacenar.coordey[index])
            console.log(this.almacenar.key)
            Swal.fire({
              target: document.getElementById('form-modal'),
              icon: 'success',
              title: ':)',
              text: `Se Elimino el dato ${this.datoEliminar} `
            })
            this.datoEliminar = ""
            return 
          }
          
        }
        
      }
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'success',
        title: ':(',
        text: `No se econtro el dato ${this.datoEliminar} `
      })
      this.datoEliminar = ""
       
    }
    else{
      let valors
       if (this.funcionRealizar()== 0) {
        valors=this.hashabierta.funcionSimple(this.hashabierta.metodoAscii(this.datoEliminar))
       }
       else if(this.funcionRealizar()== 1){
        valors=this.hashabierta.funcionMultiplicacion(this.hashabierta.metodoAscii(this.datoEliminar))
       }
       else if(this.funcionRealizar()== 2){
        valors=this.hashabierta.funcionDivision(this.hashabierta.metodoAscii(this.datoEliminar))
      }
      this.hashabierta.eliminar(this.datoEliminar,valors);
      console.log("obteniendo indice:",valors)
      for (let index = 0; index < this.almacenar.nombre.length; index++) {
        console.log("entrando al primer for")
        if (this.almacenar.nombre[index]== valors) {
          
          if (this.almacenar.key[index]==this.datoEliminar) {
            console.log("correctox2")
            this.eliminarnodo(this.almacenar.coordex[index],this.almacenar.coordey[index])
            delete(this.almacenar.nombre[index])
            delete(this.almacenar.key[index])
            delete(this.almacenar.coordex[index])
            delete(this.almacenar.coordey[index])
            console.log(this.almacenar.key)
            Swal.fire({
              target: document.getElementById('form-modal'),
              icon: 'success',
              title: ':)',
              text: `Se Elimino el dato ${this.datoEliminar} `
            })
            this.datoEliminar = ""
            return 
          }
          
        }
        
      }
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'success',
        title: ':(',
        text: `No se econtro el dato ${this.datoEliminar} `
      })
      this.datoEliminar = ""
      
    }
    
  }

  modificar(){
    for (let index = 0; index < this.almacenar.key.length; index++) {  
      if (this.almacenar.key[index]==this.datoAntiguo) {
         // console.log("antes", this.almacenar.key[index] )
          this.almacenar.key[index]=this.datoNuevo
          this.hashabierta.modificar(this.datoAntiguo,this.datoNuevo)
        //  console.log("despues", this.almacenar.key[index] )
          this.contexto.clearRect(this.almacenar.coordex[index]+115, this.almacenar.coordey[index]-45, 90, 90);
          this.contexto.fillStyle = "#FFB6C1"
          this.contexto.fillRect(this.almacenar.coordex[index]+115,this.almacenar.coordey[index]-45,90,90);
          this.writeTextSegundovector(this.almacenar.nombre[index], this.almacenar.key[index])
          Swal.fire({
            target: document.getElementById('form-modal'),
            icon: 'success',
            title: ':)',
            text: `Se Modifico el dato ${this.datoAntiguo} a ${this.datoNuevo}` 
          })
          this.datoNuevo = ""
          this.datoAntiguo =""

          return ;
      }   
    }

  }

  eliminarnodo(coorx, coory){
    this.contexto.clearRect(coorx+90,coory-45,120,90)
    var angle = 180; // Degree
    length =  150;
    let x2 = (coorx+220) + Math.cos(Math.PI * angle / 180) * length;
    let y2 = coory + Math.sin(Math.PI * angle / 180) * length;
    this.contexto.moveTo(coorx+220, coory);
    this.contexto.lineTo(x2, y2);
    this.contexto.stroke();
  }
   imprimirconsole(){
       
      /* this.hashabierta.insertar("10", "10")
       this.hashabierta.insertar("13", "13")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("Keila"), "Keila")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("raTa"), "raTa")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("Emiliano"), "Emiliano")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("arTa"), "arTa")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("Welmann"), "Welmann")
       this.hashabierta.insertar(this.hashabierta.metodoAscii("Tara"), "Tara")*/

       this.prueba = this.hashabierta.imprimir();
       console.log("imprimo prueba ",this.prueba)

       //this.hashabierta.imprimir();

   }
   InsertarButton(){
     if (!isNaN(this.nombre)) {
      let valor 
       if (this.funcionRealizar()== 0) {
        valor = this.hashabierta.funcionSimple(this.nombre)
       }
       else if(this.funcionRealizar()== 1){
         valor = this.hashabierta.funcionMultiplicacion(this.nombre)
       }
       else if(this.funcionRealizar()== 2){
          valor = this.hashabierta.funcionDivision(this.nombre)
      }
      
      this.hashabierta.insertar(this.nombre, this.nombre,valor)
      for (let index = 0; index < this.almacenar.nombre.length; index++) {
        if (this.almacenar.nombre[index]==valor) {
          console.log("indice", this.almacenar.nombre[index], "llave", this.almacenar.key[index])
          let valors = this.almacenar.nombre[index]
          for (let index1 = index;  index<this.almacenar.nombre.length ; index1++) {
            if (this.almacenar.nombre[index1]==valors+1) {
              console.log("indice", this.almacenar.nombre[index1-1], "llave", this.almacenar.key[index1-1])
              this.almacenardatos(this.nombre, valor, this.almacenar.coordex[index1-1]+150, this.almacenar.coordey[index1-1])
              this.drawSegundoVectorB(valor,this.nombre,this.almacenar.coordex[index1-1]+150,this.almacenar.coordey[index1-1])
              this.nombre="";
              return null
            }
            
          }
         
        }
        
      }     
       
     }
     else{
      let valor 
      if (this.funcionRealizar()== 0) {
        valor = this.hashabierta.funcionSimple(this.hashabierta.metodoAscii(this.nombre))
      }
      else if(this.funcionRealizar()== 1){
        valor = this.hashabierta.funcionMultiplicacion(this.hashabierta.metodoAscii(this.nombre))
      }
      else if(this.funcionRealizar()== 2){
        valor = this.hashabierta.funcionDivision(this.hashabierta.metodoAscii(this.nombre))
     }
      
      this.hashabierta.insertar(this.hashabierta.metodoAscii(this.nombre), this.nombre,valor)
      console.log(valor)
      let datofinal = this.almacenar.key.length
      for (let index = 0; index < this.almacenar.nombre.length; index++) {
        if (this.almacenar.nombre[index]==valor) {
          console.log("indice", this.almacenar.nombre[index], "llave", this.almacenar.key[index])
          let valors = this.almacenar.nombre[index]
          for (let index1 = index;  index<this.almacenar.nombre.length ; index1++) {
            if (this.almacenar.nombre[index1]==valors+1) {
              console.log("indice", this.almacenar.nombre[index1-1], "llave", this.almacenar.key[index1-1])
              this.almacenardatos(this.nombre, valor, this.almacenar.coordex[index1-1]+150, this.almacenar.coordey[index1-1])
              this.drawSegundoVectorB(valor,this.nombre,this.almacenar.coordex[index1-1]+150,this.almacenar.coordey[index1-1])
              this.nombre="";
              return null
            }
            
          }
         
        }
        
      }
      
      
     }

   }

   buscarDato(){

      for (let index = 0; index < this.almacenar.key.length; index++) {  
        if (this.almacenar.key[index]==this.datoBuscar) {
            console.log(this.almacenar.key[index])
            this.contexto.lineWidth = 4;
            this.contexto.strokeStyle = "#00f";//color del cuadro
            this.contexto.strokeRect(this.almacenar.coordex[index]+115, this.almacenar.coordey[index]-45, 90, 90);
            //this.contexto.fillRect(this.vector1X,this.vector1y,90,90);
            Swal.fire({
              target: document.getElementById('form-modal'),
              icon: 'success',
              title: ':)',
              text: `Se econtro el dato ${this.datoBuscar} `
            })
            this.datoBuscar = ""

            return index;
        }   
      }
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la Tabla`
      })
      this.datoBuscar = ""
      return null;
   }

   draw() {
    const canvas = document.getElementById('cuerpoDraw') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    this.contexto=ctx
    let datos=""
    //obtener valores para Dibujar el primer Vector
    this.prueba.forEach (listaPrincipal =>{
      if (listaPrincipal != null) {
          datos =""
          listaPrincipal.listaprincipal.forEach(listadelistas => {
            this.drawJSON(listaPrincipal.indice,listadelistas.key);                     
          });    
      }
      else{
          this.drawJSON(null,null);
      }
  })
  this.Recorrerlista();

  }

  drawJSON(dato,key){
   // for (let index = 0; index < this.prueba.length; index++) {
     let esta=false
     let valorx=0;
     let valory=0;
     for (let index = 0; index < this.almacenar.nombre.length; index++) {
       if(this.almacenar.nombre[index]==dato){
          valorx=this.almacenar.coordex[index]
          valory = this.almacenar.coordey[index]
          esta=true
       } 
     }
      if(esta==true){
        if(dato!=null){
          this.almacenardatos(key,dato,valorx+150,valory)//para guardar las coordenadas de un valor         
        }      
        esta=false
      }
      else{
        this.contexto.fillStyle = "#FFB6C1";//color del cuadro
        this.contexto.fillRect(this.vector1X,this.vector1y,90,90);//coordenada del cuadro
        this.WriteText(key, dato)
        this.vector1y=this.vector1y+120

      }
  }
  drawSegundoVectorB(indice,dato,coorx,coory){
    let x = coorx
    let y = coory
    x=x+115
    //PARA DIBUJAR LA FLECHA  
    this.drawArrowhead(this.contexto,x,y,1.5708)
    this.drawArrowBody(this.contexto,x-10,y)
    //PARA DIBUJAR EL CUADRO  
    let x2 = coorx
    y = y-45
    x2 = x2+150
    this.contexto.fillStyle = "#FFB6C1";//color del cuadro
    this.contexto.fillRect(x,y,90,90);//coordenada del cuadro  */
    this.writeTextSegundovector(indice,dato);

  }
  drawsegundoVector(indice,dato){
   //para obtener las coordeenadas de donde sera ubicada
   // console.log(this.datos)
    let x = this.datos.enX
    let y = this.datos.enY
    x=x+115
    //PARA DIBUJAR LA FLECHA  
    this.drawArrowhead(this.contexto,x,y,1.5708)
    this.drawArrowBody(this.contexto,x-10,y)
    //PARA DIBUJAR EL CUADRO  
    let x2 = this.datos.enX
    y = y-45
    x2 = x2+150
    this.contexto.fillStyle = "#FFB6C1";//color del cuadro
    this.contexto.fillRect(x,y,90,90);//coordenada del cuadro  */
    this.writeTextSegundovector(indice,dato);

  }

  Recorrerlista(){ // para obtener los valores del segundo vector 
    this.prueba.forEach (listaPrincipal =>{
      if (listaPrincipal != null) {
         // datos =""
          listaPrincipal.listaprincipal.forEach(listadelistas => {            
              console.log("veo el dato",listadelistas.key)
              this.buscarindice(listaPrincipal.indice, listadelistas.key)             
          });
  
      }

  })
  }
  buscarindice(indice,dato){ // buscar indice para obtener coordenadas para dibujar el segundo vector
    //console.log("veo dato a almacenar", this.almacenar)
    console.log("este es el dato", dato)
    for (let index = 0; index < this.almacenar.key.length; index++) {
         console.log("dato almacenado", this.almacenar.nombre[index])
         console.log("imprimo indice", indice)
          if (this.almacenar.key[index]==dato) {
            console.log("entre al if")
            this.datos.enX = this.almacenar.coordex[index]
            this.datos.enY =this.almacenar.coordey[index]
            this.drawsegundoVector(indice, dato);
            
            //return dato
          }
        
              
    }
  }
  writeTextSegundovector(indice, dato){
    console.log("dato a entrar", dato)
    for (let index = 0; index < this.almacenar.key.length; index++) {
       if (this.almacenar.key[index]==dato) {
        this.contexto.textAlign="center";
        this.contexto.font="10pt Verdana";
        this.contexto.fillStyle = "black";
        this.contexto.fillText(dato,this.almacenar.coordex[index]+150,this.almacenar.coordey[index]);//ingresar texto y coordenadas
       }
      
    }

  }

   WriteText(key, dato){
      //PARA COLOCAR TEXTO DEL PRIMER VECTOR
      this.contexto.textAlign="center";
      this.contexto.font="10pt Verdana";
      this.contexto.fillStyle = "black";
      this.contexto.fillText(dato,this.vector1textox,this.vector1textoy);//ingresar texto y coordenadas
      //console.log("dato a imprimir", dato)
      if(dato!=null){
        this.almacenardatos(key,dato,this.vector1textox,this.vector1textoy)//para guardar las coordenadas de un valor
        
      }
    
      //COORDENADAS  TEXTO para que se mueva 
      this.vector1textoy=this.vector1textoy + 120
   }
   //metodo para dibujar la linea de la flecha
   drawArrowBody(ctx, x1, y1){
    var angle = 180; // Degree
    length =  65;
    let x2 = x1 + Math.cos(Math.PI * angle / 180) * length;
    let y2 = y1 + Math.sin(Math.PI * angle / 180) * length;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

   }
   //Este Metodo Es para dibujar el triangulo de la Flecha
   drawArrowhead(ctx, x,y,radians){ //x es ancho, y altura de la posicion, radians los angulos en radianes de como va la flecha
    ctx.save();
    ctx.beginPath();//inicio
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(15,20);//gordura
    ctx.lineTo(-15,20);//gordura
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}

  almacenardatos(key,dato, coorx, coory){ //guardar datos para saber sus coordenadas
    this.almacenar.key.push(key)
    this.almacenar.nombre.push(dato)
    this.almacenar.coordex.push(coorx)
    this.almacenar.coordey.push(coory)

    console.log("nombre", this.almacenar.nombre, "coordenadax", this.almacenar.coordex, "coordenaday", this.almacenar.coordey)
  }

  funcionRealizar(){
    if (this.simple) {
       return 0
    }
    else if(this.multiplicacion){
       return 1
    }
    else if(this.division){
       return 2
    }

  }
  changesimple() {
    if (this.simple) {
      this.multiplicacion = false
      this.division = false
    
    }

  }
  changemultiplicacion() {
    if (this.multiplicacion) {
      this.simple = false
      this.division = false
    }

  }

  changedivision() {
    if (this.division) {
      this.simple = false
      this.multiplicacion = false
    }

  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.m = data.m
      this.min = data.minimo
      this.max = data.maximo
      data = data.valores
      this.hashabierta = new HashAbierta(this.m, this.min, this.max)
      if (isNaN(data.valores)) {
        
      }
      
      for (let i = 0; i < data.length; i++) {  
        if (!isNaN(data[i])) {
          console.log("es numero")
            let valors
          if (this.funcionRealizar()== 0) {
            valors = this.hashabierta.funcionSimple(data[i])
          }
          else if(this.funcionRealizar()== 1){
            valors = this.hashabierta.funcionMultiplicacion(data[i])
          }
          else if(this.funcionRealizar()== 2){
              valors = this.hashabierta.funcionDivision(data[i])
          }
          this.hashabierta.insertar(data[i],data[i],valors) 
        }
        else{
          let valors
          if (this.funcionRealizar()== 0) {
            valors = this.hashabierta.funcionSimple(this.hashabierta.metodoAscii(data[i]))
          }
          else if(this.funcionRealizar()== 1){
            valors = this.hashabierta.funcionMultiplicacion(this.hashabierta.metodoAscii(data[i]))
          }
          else if(this.funcionRealizar()== 2){
              valors = this.hashabierta.funcionDivision(this.hashabierta.metodoAscii(data[i]))
          }
          this.hashabierta.insertar(this.hashabierta.metodoAscii(data[i]),data[i],valors)
        }
      } 
      this.imprimirconsole();
      this.draw()
      console.log(this.almacenar)
      


    }
  }

  async processFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
      reader.onerror = reject;

      reader.readAsText(file);
    })
  }
  generarJSON1() {
    let data = this.generarJSON()
    var link = document.createElement("a");
    link.download = "HashAbierta.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  generarJSON() {
    let vector=[]
    vector = this.hashabierta.imprimir();
    let data = {
      categoria: "Estructura No Lineal",
      nombre: "Tabla Hash Abierta",
      m: this.m,
      minimo: this.min,
      maximo: this.max,
      valores: []
      
    }

    let datos =""
    vector.forEach (listaPrincipal =>{
        if (listaPrincipal != null) {
            datos =""
            listaPrincipal.listaprincipal.forEach(listadelistas => {
                
                datos +=listadelistas.key+","
                
            });
            data.valores.push("Indice:"+ listaPrincipal.indice+ " Datos:"+ datos)
        }

    })

    

    return JSON.stringify(data)
}


}
