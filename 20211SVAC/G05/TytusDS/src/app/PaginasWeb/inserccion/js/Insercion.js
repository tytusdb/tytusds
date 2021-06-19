class insercion{


inser(ele) {
    for (let i=1; i<ele.length; i++){
        let x=i-1;
        let y=i;
        let datos=ele[i];
        while(x>=0 && ele[x]>datos){
            ele[y] = ele[x];
            x--;
            y--;
        }
        ele[y]=datos;
    }
}

}
const stack = new insercion();
const arreglo=[5,4,8,5,2];
stack.inser(arreglo)
console.log(arreglo);