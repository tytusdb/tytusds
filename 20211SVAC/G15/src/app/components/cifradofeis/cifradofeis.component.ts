import { Component, OnInit } from '@angular/core';
import { cifrado } from 'src/app/helpers/CifradoFeisfel/cifrado';

@Component({
  selector: 'app-cifradofeis',
  templateUrl: './cifradofeis.component.html',
  styleUrls: ['./cifradofeis.component.css']
})
export class CifradofeisComponent implements OnInit {
  nombre:any
  llave:any
  entrada:any
  probando:cifrado
  fileName = '';
  data={
    left:[],
    right:[],
    key:[],
    xor:[]
}
 
  constructor() { }

  ngOnInit(): void {
    
   // const area = document.getElementById('textarea') as HTMLTextAreaElement;
     //area.value = 'Some value';
     //document.getElementById("textarea").innerHTML = area.value;
  }
  imprimir(){
    let dto =""
    let total
    for (let index = 0; index < this.data.key.length; ) {
      for (let index1 = 0; index1 < this.data.key.length; ) {
        for (let index2 = 0; index2 < this.data.key.length; index2++) {
          for (let index3 = 0; index3 < this.data.xor.length; index3++) {
            dto = dto+"LEFT: "+this.data.left[index2] +" | "+"\n"
            dto = dto+"DER : "+ this.data.right[index2] +"\n"
            dto= dto+"------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"+"\n"
            dto= dto + "               KEY:  | " + this.data.key[index2] +"\n"
            dto= dto + "               F():    | " + this.data.xor[index2] +"\n"
            dto= dto + "                         | " + this.data.left[index2] +"\n"
            dto= dto+"------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"+"\n"
            console.log(this.data.key[0].length)
            console.log(this.data.xor[0].length)
            index++
            index1++
            index2++
            total=index2
          }
          
        }
       
      }
         
    } 
    let final = this.data.left[total]
    let finalR = this.data.right[total]
    dto = dto+"CIFRADO FEISTEL: "+"\n"
    dto = dto+"LEFT: "+final+" | "+"\n"
    dto = dto+"DER : "+ finalR +"\n"
    document.getElementById("textareaResultado").innerHTML = dto;
  }

  cifrado(){
    const area = document.getElementById('textarea') as HTMLTextAreaElement;
    var p1 = area.value
    console.log(p1)
    this.probando = new cifrado(this.nombre);
    this.probando.metodoAscii(p1)
    this.probando.DividirBinario();
    this.probando.obtenerllave(this.llave);
    this.probando.corregirTamanoKey()
    this.probando.imprimir()
    this.probando.cifrado();
    this.data= this.probando.data
    console.log(this.data)
    this.imprimir();

  }

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
  link.download = "CifradoFeisfel.txt";
  var info = "text/json;charset=utf-8," + encodeURIComponent(data);
  link.href = "data:" + info;
  link.click();
  link.remove()
}

generarJSON() {
  let dto =""
  let total
  for (let index = 0; index < this.data.key.length; ) {
    for (let index1 = 0; index1 < this.data.key.length; ) {
      for (let index2 = 0; index2 < this.data.key.length; index2++) {
        for (let index3 = 0; index3 < this.data.xor.length; index3++) {
          dto = dto+" LEFT: "+this.data.left[index2] +" | "
          dto = dto+"DER : "+ this.data.right[index2] 
          dto= dto + "               KEY:  | " + this.data.key[index2] 
          dto= dto + "               F():    | " + this.data.xor[index2] 
          dto= dto + "                         | " + this.data.left[index2] 
          console.log(this.data.key[0].length)
          console.log(this.data.xor[0].length)
          index++
          index1++
          index2++
          total=index2
        }
        
      }
     
    }
       
  } 
  let final = this.data.left[total]
  let finalR = this.data.right[total]
  dto = dto+" CIFRADO FEISTEL: "
  dto = dto+"LEFT: "+final+" | "
  dto = dto+"DER : "+ finalR 
  return JSON.stringify(dto)
}


}
