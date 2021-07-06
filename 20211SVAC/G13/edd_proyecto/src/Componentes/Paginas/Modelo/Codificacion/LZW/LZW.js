class LZW {

    constructor(){
        this.kw = [];
        this.tokens = [];
        this.tk_id = 0;
        this.tabla = []
        this.nivel = 1;
        this.resultado = '';
        this.resultadoDecode = null;
    }

    encode = (cadena , key) => {

        this.kw = [] ;
        var dato = (cadena + "").split(""); // k Se convierte en la cadena..
        this.tokens = []
        this.tk_id = 0;
        var i = 0;
        var ascii = key;
        while(i<dato.length){
            if(this.search(dato[i]) == false){
                this.tokens.push({id:String(dato[i]), token:parseInt(this.tk_id)});
                this.tk_id ++;
            }
            i++;
        }
        var salida = [];
        var k = dato[0];
        this.tabla.push({w:" ", k:k, wK:String(k), dic:" ", salida:" " ,nivel:this.nivel})
        this.nivel ++; 
        var w = k;   // p
        

        for(var i=1;i<dato.length;i++){
            k = dato[i] // A
            
            if(this.searchDic(String(w)+String(k))==false){ // AP
                this.tabla.push({w:w, k:k, wK:String(w+k), dic:String(w+k)+" "+this.tk_id,salida:ascii,nivel:this.nivel})
                this.nivel ++;

                salida.push(w.length > 1 ? this.kw[w] : w.charCodeAt(0));
                this.tokens.push({id:String(w)+String(k), token:parseInt(this.tk_id)})
                this.kw[String(w)+String(k)] = ascii
                this.kw.push({id:String(w)+String(k), token:this.tk_id, salida:ascii})
                this.tk_id++;
                w = k;
                ascii++;
            }else{
                this.tabla.push({w:w, k:k, wK:String(w+k), dic:" ", salida: " ", nivel:this.nivel})
                this.nivel ++;

                w += k
            }

        }
        this.tabla.push({w:w, k:" ", wK:String(w), dic:" ", salida: " ", nivel:this.nivel})
        this.nivel ++;
        salida.push(w.length > 1 ? this.kw[w] : w.charCodeAt(0));
        
        for (var i=0; i<salida.length; i++) {
            salida[i] = String.fromCharCode(salida[i]);
            
        }
        this.resultado = salida.join("")
        return salida.join("")


    }

    decode(key) {
        var texto = this.resultado
        var diccionario = {};
        var dato = (texto + "").split("");
        var temp = dato[0];
        var regresoFrase = temp;
        var salida = [temp];
        var ascii = key;
        var palabbra;
        for (var i=1; i<dato.length; i++) {
            var aux = dato[i].charCodeAt(0);
            if (aux < key) {
                palabbra = dato[i];
            }
            else {
               palabbra = diccionario[aux] ? diccionario[aux] : (regresoFrase + temp);
            }
            salida.push(palabbra);
            temp = palabbra.charAt(0);
            diccionario[ascii] = regresoFrase + temp;
            ascii++;
            regresoFrase = palabbra;
        }
        this.resultado = salida.join("")
        return this.resultado;
    }





    search = (dato) => {
        var i = 0;
        while(i<this.tokens.length){
            if(this.tokens[i].id == dato){
                return true
            }
            i++;
        }
        return false
    }

    searchDic = (dato) => {
    for(var i=0;i<this.kw.length;i++){
        if(this.kw[i].id == dato){
            return true;
        }
    }
    return false;
    }

    // Grafica
    setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        var dot = [];
        var i = 0;
        var nodoId = 0;
        dot.push({id:nodoId, label:"w", level:0});
        nodoId++;
        dot.push({id:nodoId, label:"k", level:0});
        nodoId++;
        dot.push({id:nodoId, label:"wK", level:0});
        nodoId++;
        dot.push({id:nodoId, label:"Agregar a Diccionario", level:0});
        nodoId++;
        dot.push({id:nodoId, label:"Salida", level:0});
        nodoId++;
        while(i<this.tabla.length){
            dot.push({id:nodoId, label:String(this.tabla[i].w), level:this.tabla[i].nivel});
            nodoId++;
            dot.push({id:nodoId, label:String(this.tabla[i].k), level:this.tabla[i].nivel});
            nodoId++;
            dot.push({id:nodoId, label:String(this.tabla[i].wK), level:this.tabla[i].nivel});
            nodoId++;
            dot.push({id:nodoId, label:String(this.tabla[i].dic), level:this.tabla[i].nivel});
            nodoId++;
            dot.push({id:nodoId, label:String(this.tabla[i].salida), level:this.tabla[i].nivel});
            nodoId++;
            i++;
        }
        dot.push({id:nodoId, label:this.resultado, level:this.nivel});
        nodoId++;
        if(this.resultadoDecode!=null){
            dot.push({id:nodoId, label:this.resultadoDecode, level:parseInt(this.nivel+1)});    
        }
        
        return dot;

    }


    setEdgesDataSet = () => {
        var dot = [];
        var i = 0;
        var nodoId = 0;
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
        nodoId++;
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        nodoId++;
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        nodoId++;
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        nodoId++;
        dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
        nodoId++;
        while(i<this.tabla.length){
            
            if(this.tabla[i+1]!=null){
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                nodoId++;

            }else{
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
                nodoId++;
                dot.push({from:parseInt(nodoId), to:parseInt(nodoId+5), arrows: "to"});
                nodoId++;
            }
            i++;
        }
        dot.push({from:parseInt(nodoId-1), to:parseInt(nodoId), arrows: "to"});
        nodoId++;
        if(this.resultadoDecode!=null){
            dot.push({from:parseInt(nodoId-1), to:parseInt(nodoId), arrows: "to"});
        }
        
        return dot;

    }

    generateJSON = () => {
        return String(this.resultado)
    }

}
export default LZW;
// module.exports = LZW;

