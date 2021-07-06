import { Component, OnInit } from '@angular/core';
var tiempo;
@Component({
  selector: 'app-hamming',
  templateUrl: './hamming.component.html',
  styleUrls: ['./hamming.component.css']
})
export class HammingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  resultadoCifrado = "";


  getString(data){
    
    var byte = [];
    for(var i = 0; i<data.length;i++){
        var char = data.charCodeAt(i).toString(2);
        byte.push(char);
        
    }
    console.log(byte);  
    this.getHamming(byte);
  }
  getBit(data){
    var byte = data.split("");
    this.getHamming(byte);
    

  }

  getHamming(bytes){
      console.log("Get hamming: "+bytes);
      
    var retstr= "";
    var table = document.getElementById("tablehm");
    var row = document.createElement("tr");
    var datacells = document.getElementById("datos");
    var valuecells = document.getElementById("valores");
    var str = ""
    for(var i = 0; i<bytes.length; i++){
        str +=bytes[i];
    }
    var i = 1;
    var j = 0;
    console.log("Byte: "+str);
    
    while(j<str.length){
        
        if(this.ispower(i)){
            retstr+="p";
            i++;


            var cell = document.createElement("th");
            cell.innerHTML=""
            datacells.appendChild(cell);
            

        }else{
            retstr+=str[j];
            j++;
            i++;
            if(str[j]!=undefined){
                var cell = document.createElement("th");
                cell.innerHTML=str[j]
                datacells.appendChild(cell);
            }
            
        }
        // else if(i==0){

        //     var paridad=0;
        //     for (let k = 0; k < bytes.length; k+=2) {
        //         if (bytes[bytes.length-k]==1){
        //             paridad++;
        //         }
        //     }
        //     if(paridad%2!=0){
        //         retstr.push("1");
        //         i++;
        //     }

        // }else{
        //    retstr.push(bytes[j]); 
        //    j++;
        //    i++;
        // }


    }
    //   1 101 00011011 00
    // 0011101000011011100

    // 1101000110110001110
    var parityindex="";
    var potencia = 0;
    for (let i = 0; i < retstr.length; i++) {

        if(retstr.charAt(i)=="p"){

            var row = document.createElement("tr");
            var cell = document.createElement("th");
            cell.innerHTML = "P"+String(Math.pow(2,potencia));
            potencia++;
            row.appendChild(cell);
           

            var paridad = 0;
            var datosrow = [];

            for (let k = i; k < retstr.length; k+=2*(i+1)) {
                
                for (let l = 0; l < i+1; l++) {
                    
                    if(retstr[k+l]=="1"){
                        paridad++;
                        
                        
                    }
                    datosrow[k+l] = retstr[k+l];
                    
                    
                    
                }
                
            }
            
            
            var bandera;
            if(paridad%2!=0){
                parityindex+="1"
                console.log("cambio 1: "+retstr[i]);
                bandera = true;
            }else{
                parityindex+="0"
                console.log("cambio 0: "+retstr[i]);
                bandera = false;
            }

            for(var k = 0; k<19;k++){
                var innercell = document.createElement("th");
                if(datosrow[k]=="p"){
                    if(bandera){
                        innercell.innerHTML = "1";
                    }else{
                        innercell.innerHTML = "0";
                    }
                }else if(datosrow[k]!=undefined){
                    innercell.innerHTML = datosrow[k];
                   
                }else{
                    innercell.innerHTML = "";
                    
                }
                row.appendChild(innercell);
            }
            valuecells.appendChild(row);

        }else if (retstr[i]!=undefined){
            parityindex+=retstr[i];
        }

    }
    var last = document.createElement("tr");
    var firstcell = document.createElement("th");
    cell.innerHTML = "Resultado";
    last.appendChild(cell);
    for(var m = 0; m<parityindex.length-1;m++){
        var datacell = document.createElement("th");
        datacell.innerHTML = parityindex[m];
        last.appendChild(datacell);

    }
    valuecells.appendChild(last);
    document.getElementById("code").innerHTML = parityindex;
    this.resultadoCifrado = parityindex;
     
    
  }
  ispower(n){
    var i = 0;
    while(true){
        if(Math.pow(2,i)==n){
            console.log(n);
            
            return true;
        }else if(Math.pow(2,i)>n){
            return false;
        }
        i++;
    }
  }
  async anihumming(data){


  }
  texto = "";

  abrir (eve: any){
    let a =eve.target.files[0]
    

    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        this.texto=String(resultado)
        console.log(this.texto)
      }
      reader.readAsText(a)

      this.getHamming(this.texto.split(""));
    }
      
  }
  descargarContenido(){
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.resultadoCifrado);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.txt');
    downloader.click();
  }
}
