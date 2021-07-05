class Hamming{

	constructor(){
		this.listaDatos =[];
		this.tabla = [];
		this.filaEncode = [];
		this.resultado = []; //Est es una cadena.
		this.nivel = 1;
	}

	encode = (text) => { // Inicio de codificacion
		var size  = text.length; //Obteniendo el tamaño del binario.

		var i = 0;
		while(i<size){
			this.listaDatos.push(text.charAt(i)); // Se descompone la variable y se guarda.
			i++;
		}
		
		i = 0;
		var tempSize = 1;
		this.tabla.push({id:"Datos:", dato:null, Nivel:parseInt(this.nivel)});
		this.resultado.push({id:"Resultado:", dato:null, Nivel:parseInt(this.nivel)});
		while(i<size){	
			if(this.potencia(i+1)==(i+1)){
				this.tabla.push({id:"p"+String(i+1), dato:null, Nivel:parseInt(this.nivel)});
				this.resultado.push({id:"p"+String(i+1), dato:null, Nivel:parseInt(this.nivel)});
				size++;	
			}else{
				this.tabla.push({id:"d"+String(tempSize), dato:this.listaDatos[tempSize-1], Nivel:parseInt(this.nivel)});
				this.resultado.push({id:"d"+String(tempSize), dato:this.listaDatos[tempSize-1], Nivel:parseInt(this.nivel)});
				tempSize++;
			}
			i++;
		}		
		this.nivel ++;

		var sizeFila = 0;
		// ----------------------------------------------
		// INICIA LA CODIFICACION DE FILAS DE p1, p2, etc.
		// ----------------------------------------------
		this.tabla.forEach(element => { 
			if(element.id.charAt(0)=="p"){
				this.filaEncode.push({id:"P"+element.id.charAt(1), dato:null, Nivel:this.nivel});
				let aux = this.llenarTabla(size, element.id.charAt(1), this.nivel);
				this.update(element.id, aux, this.nivel)
				this.nivel++;
			} 
		});

		var tempResultado;
		i = 0;
		while(i<this.resultado.length){
			var j = 0;
			while(j<this.filaEncode.length){
				if(this.resultado[i].id == this.filaEncode[j].id && this.filaEncode[j].dato != null){
					this.resultado[i].dato = this.filaEncode[j].dato 
					this.resultado[i].Nivel = this.nivel
				}

				if(this.resultado[i].id == "Resultado:"){
					this.resultado[i].Nivel = this.nivel
				}
				j++;
			}
			i++;
		}
	}

	llenarTabla = (size, saltos, nivel) =>{
		var i = 1;
		var valor = null;
		var estado = true;
		var moverse = 0;
		console.log("Cantidad: "+size+" Move: "+saltos+" Nivel: "+nivel)
		while(i<=size){
			let temp = this.search(i);
			if(saltos<=i){
				if(moverse<saltos && estado == true){
					
					if(temp.id.charAt(0)=="p"){
						this.filaEncode.push({id:temp.id, dato:null, Nivel:parseInt(nivel)});
					}else{
						if(valor == null){
							valor = temp.dato;
						}else{
							// ----------------------------------------------
							// SE COMPARA EL VALOR CON EL ID EN LA TABLA XOR.
							// ----------------------------------------------
							if(temp.dato == 1 && valor == 1){ valor = 0; }
							else if(temp.dato == 1 && valor == 0){ valor = 1; }
							else if(temp.dato == 0 && valor == 1){ valor = 1; }
							else if(temp.dato == 0 && valor == 0){ valor = 0;  }
						}
						this.filaEncode.push({id:temp.id, dato:temp.dato, Nivel:parseInt(nivel)});
					}
					moverse++;
					if(moverse==saltos){
						estado=false
					}
				}else{
					moverse--;
					if(moverse==0){
						estado=true;	
					}else{
						estado=false;
					}
					this.filaEncode.push({id:temp.id, dato:null, Nivel:parseInt(nivel)});
				}	
			}else{
				this.filaEncode.push({id:temp.id, dato:null, Nivel:parseInt(nivel)});
			}
			i++;
		}
		return valor;
	}


	search = (posicion) =>{
		var i = 0;
		var aux = null;
		while(i<this.tabla.length){
			aux = this.tabla[i]
			if(posicion==i){
				return aux
			}		
			i++;
		}
		return false
	}

	update = (id, cambio, nivel) => {
		var i = 0;
		var aux = null;
		while(i<this.filaEncode.length){
			if(this.filaEncode[i].id==id && this.filaEncode[i].Nivel == nivel){
				this.filaEncode[i].dato=String(cambio);
			}		
			i++;
		}
		return false

	}

	potencia = (size) => {
		var i = 0 ;
		while(i<size){
			if(2**i == size){
				return 2**i
			}
			i++;
		}
		return null
	}


	 setNodesDataSet = () => { // Esto Genera los nodos de Vis.

        var dot = [];
        var i = 0;
        var nodoId = 0;


        i=0
        while(i<this.tabla.length){
        	if(this.tabla[i].dato!=null){

        		dot.push({id:nodoId, label:String(this.tabla[i].dato)+"\n"+String(this.tabla[i].id), level:this.tabla[i].Nivel});
	        }else{
        	dot.push({id:nodoId, label:String(this.tabla[i].id), level:this.tabla[i].Nivel});
	        }
        	i++;
        	nodoId++;
        }
       	i = 0;
        while(i<this.filaEncode.length){
        	if(this.filaEncode[i].id.charAt(0)=="P"){
        		dot.push({id:nodoId, label:this.filaEncode[i].id, level:this.filaEncode[i].Nivel});
        	}else{
	        	if(this.filaEncode[i].dato == null){
	        		dot.push({id:nodoId, label:" ", level:this.filaEncode[i].Nivel});
	        	
	        	}else{
	        		dot.push({id:nodoId, label:String(this.filaEncode[i].dato), level:this.filaEncode[i].Nivel});
	        	}
	        }
        	i++;
        	nodoId++;
        }
        i = 0;
        while(i<this.resultado.length){
        	if(this.resultado[i].id == "Resultado:"){
        		dot.push({id:nodoId, label:String(this.resultado[i].id), level:this.resultado[i].Nivel});
        	}else{
        		dot.push({id:nodoId, label:String(this.resultado[i].dato), level:this.resultado[i].Nivel});
        	}
        	
        	i++;
        	nodoId++;
        }
        return dot;

    }

    getNodeDataSet = (lista, id, nivel) => {
    	var i = 0
    	var nodoId = 0;
    	while(i<this.tabla.length){
        	i++;
        	nodoId++;
        }
       	i = 0;
        while(i<this.filaEncode.length){
        	
        	if(lista[i].id == id && lista[i].Nivel == nivel){
        		return nodoId;
        	}
        	i++;
        	nodoId++;
        }

        i = 0;
        while(i<this.resultado.length){
        	i++;
        	nodoId++;
        }

    	return false
    } 


    setEdgesDataSet = () => {
    	var i = 0
    	var dot = [];
    	var nodoId = 0;
    	while(i<this.tabla.length){
        	if(this.tabla[i+1]!=null){
        		dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        	}
        	let temp = this.getNodeDataSet(this.filaEncode, this.tabla[i].id, this.tabla[i].Nivel+1)
        	if(temp!=null){
        		dot.push({from:nodoId, to:temp, arrows: "to"});
        	}
        	
        	i++;
        	nodoId++;
        }
       	i = 0;
        while(i<this.filaEncode.length){
        	if(this.filaEncode[i+1]!=null && this.filaEncode[i].Nivel == this.filaEncode[i+1].Nivel){
        		dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        	}
        	let temp = this.getNodeDataSet(this.filaEncode, this.filaEncode[i].id, this.filaEncode[i].Nivel+1)
        	if(temp!=null){
        		dot.push({from:nodoId, to:temp, arrows: "to"});
        	}
        	i++;
        	nodoId++;
        }
        i = 0;
        while(i<this.resultado.length){
        	if(this.resultado[i+1]!=null && this.resultado[i].Nivel == this.resultado[i+1].Nivel){
        		dot.push({from:parseInt(nodoId), to:parseInt(nodoId+1), arrows: "to"});
        		
        	}
        	let temp = this.getNodeDataSet(this.filaEncode, this.resultado[i].id, this.resultado[i].Nivel-1)	
        	if(temp!=null){
        		dot.push({from:temp, to:nodoId, arrows: "to"});
        	}
        	i++;
        	nodoId++;
        }
        

        
        return dot;


    }

    generateJSON = () => {

    	var json ="";
    	console.log(this.resultado)
    	var i = 0;
    	while(i<this.resultado.length){
    		if(this.resultado[i].id != "Resultado:"){
    			console.log("_>"+this.resultado[i].dato)
    			json = json + String(this.resultado[i].dato)	
    		}
    		i++;
    	}
    	console.log(json)
    	return json
    }


}
export default Hamming;
// module.exports = Hamming;