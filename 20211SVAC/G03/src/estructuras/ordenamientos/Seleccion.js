export default function Seleccion(arr){
    
    let menor, posicion, tmp
    for (let index = 0; index < arr.length-1; index++) {
         menor = arr[index]
         posicion = index;
        for (let y = index+1; y < arr.length; y++) {
            
            if(arr[y].ASCII< menor.ASCII){
                menor = arr[y]
                posicion = y
            }
            
        }
  
        if(posicion != index){
            tmp = arr[index]
            arr[index] = arr[posicion];
            arr[posicion] = tmp;
        }
  
    }
    
    return arr
  }