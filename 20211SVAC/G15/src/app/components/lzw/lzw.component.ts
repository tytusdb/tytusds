import { Component, OnInit } from '@angular/core';
import { LZW } from 'src/app/helpers/LZW/LZW';

@Component({
  selector: 'app-lzw',
  templateUrl: './lzw.component.html',
  styleUrls: ['./lzw.component.css']
})
export class LZWComponent implements OnInit {
  groups=[]
  k=[]
  w=[]
  kw=[]
  diccionario=[]
  salida=[]
  probando:LZW
  fileName = '';

  constructor() { }

  ngOnInit(): void {
    this.probando = new LZW();
    this.probando.iniciarValores("Pablo papa de pablito");
    this.probando.LeerCadena("Pablo papa de pablito")
    this.w=this.probando.W
    this.k=this.probando.K
    this.kw=this.probando.WK
    for (let index = 0; index < this.probando.diccionario.length; index++) {
      if(this.probando.diccionario[index]==""){
        this.diccionario.push("")
      }else{
        this.diccionario.push(this.probando.diccionario[index].valor+" "+this.probando.diccionario[index].indice)
      
      }
     
    }
    //this.diccionario=this.probando.diccionario
    this.salida=this.probando.Salida
    console.log(this.diccionario)

  }
  cifrado(){}
  getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        this.placeFileContent(document.getElementById('textarea'), input.files[0])
       
        
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
            //var cadena = document.getElementById('contenttarget').textContent;
        }
        reader.onerror = reject;
        reader.readAsText(file);

    })

}

generarJSON1() {
  let data = this.generarJSON()
  var link = document.createElement("a");
  link.download = "LZW.txt";
  var info = "text/json;charset=utf-8," + encodeURIComponent(data);
  link.href = "data:" + info;
  link.click();
  link.remove()
}

generarJSON() {
  let dto =""


  return JSON.stringify(dto)
}


}
