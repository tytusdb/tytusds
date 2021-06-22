import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  constructor() { }
  contenido = "{ valores: \n";

  
  generador(){
    this.array.forEach(valor => this.contenido += valor +",\n");
  }

  descargarContenido(){
    this.generador();
    this.contenido += "}";
    console.log(this.contenido)
  }

  ngOnInit(): void {
  }

  code = '';
  array = [];
  texto = "";
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""
  
    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);  // se parse para obtener solo los datos
        data.valores.forEach(element => { // se pasa a un arreglo
          this.array.push(element)
        });
        this.array.forEach(el => console.log(el))
        this.selectionSort(this.array); //metood de ordenamiento
        console.log("Ordenado \n")
        this.array.forEach(el => console.log(el))
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }

  swap(myArr, indexOne, indexTwo){
    if( indexOne == indexTwo ){
      return myArr;
    }
    var tmpVal = myArr[indexOne];
    myArr[indexOne] = myArr[indexTwo];
    myArr[indexTwo] = tmpVal;
    return myArr;
  }

  selectionSort( myArr ){
    var size = myArr.length;
    for( var slot = 0; slot < size -1; slot ++ ){ // outer loop
      var smallest = slot;
      for( var check = slot + 1; check < size; check++ ){ // inner loop
        if( myArr[check] < myArr[smallest] ){
          smallest = check;
        }
      }
      this.swap( myArr, smallest, slot );
    }
    return myArr;
  }

}
