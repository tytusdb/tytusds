class dataNode{
    constructor(value){
        this.value= value;
    }
}
class hashNode{
    constructor(hash){
        this.hash = hash;
        this.left = null;
        this.right = null;
    }
}


class hashtree{

    constructor(){
        this.tophash= null;
        this.bloque =[];
    }
    insertar(cadena){
        this.bloque.push(new dataNode(cadena));
    }
    crearArbol(lista){
        this.tophash = new hashNode(0);
        this._crearArbol(this.tophash,lista)
    }
    _crearArbol(tmp,lista){
        if(lista>0){
            tmp.left = new hashNode(0);
            tmp.right = new hashNode(0);
            this._crearArbol(tmp.left, exp-1);
            this._crearArbol(tmp.right, exp-1);
        }
    }

    gethash(tmp,n){
        if(tmp!= null){
            this.gethash(tmp.left,n);
            this.gethash(tmp.right,n);

            if(tmp.left == null && tmp.right == null){
                tmp.left = this.bloque[n-index--];
                tmp.hash = hashvalue(tmp.left.value);
            }
        } else{
            tmp.hash = (this.hashvalue(tmp.left.hash)+this.hashvalue(tmp.right.hash));
        }
    }
    hashvalue(cadena){

    }
    auth(){
        var exp = 1;
        while(Math.pow(2, exp)<this.bloque.length){
            exp+=1;
        }
        for(var i = this.bloque.length;i<Math.pow(2,exp);i++){
            this.bloque.push(new dataNode(i*10));
        }
        index= Math.pow(2,exp);
        this.crearArbol(exp);
        this.gethash(this.tophash,Math.pow(2,exp));
        
    }
    





}