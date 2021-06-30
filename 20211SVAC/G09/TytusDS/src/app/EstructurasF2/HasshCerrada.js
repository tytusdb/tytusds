let checkBoxHashCerradaSimple = false;

class hash {
    hash(m, min,max) {
      this.m = m;
      this.min = min;
      this.max = max;
      this.areglo = []
      this.n = 0
      this.init()
    }

  init(){
      this.areglo = [this.m] //tendria que declarar INT
      //console.log("en init");
      for(var i=0; i<this.m; i++){
          this.areglo[i] = -1;
          //console.log(this.areglo[i])
      }
   }
   insertar(k){
     let i = this.division(k);
     //console.log(i);
     while(this.areglo[i] != -1){
         i = this.linear(i); 
     }
     this.areglo[i] = k
     //console.log(this.areglo[i])
     //console.log(this.areglo)
     this.n++; //numero de valores de la tabla hash hasta el momento
     console.log(this.n)
     this.rehashing()
     
   }
   rehashing(){
       console.log(this.areglo+"  "+ this.n/this.m)
       if((this.n*100/this.m)>=this.max){  
           //console.log(this.n*100/this.m)
           var temp = this.areglo
           //console.log(temp)
           var mprev = this.m
           console.log(this.n)
           console.log(this.min)
           this.m = this.n*100/this.min
           this.init()
           this.n = 0
           console.log(this.n)
           //console.log(this.areglo)
           for(var i=0; i<mprev; i++){
                if(temp[i]!=-1){
                    this.insertar(temp[i])
                }
           }
           
       }//console.log(this.areglo)


   }   
   
   division(k){
    return (k%(this.m))
   }
   linear(k){
       return ((k+1)%this.m)
   }
}

function checkHashCerradaSimple(){
    if(checkHashCerradaSimple == true){
        checkBoxHashCerradaSimple = false;
        console.log("cambiando chek "+ checkBoxHashCerradaSimple);
    }else{
        checkBoxHashCerradaSimple = true;
        console.log("cambioando chek "+ checkBoxHashCerradaSimple);
    }  
}
//let p = new hash();
//p.hash(5,20,80);
///p.insertar(5);
//p.insertar(10);
//p.insertar(15);
//p.insertar(17);
