class Grafo{
	constructor(){
		this.comienzo=null;
		this.fin=null;
		this.vertices=[];
		this.matriz=[];
		this.lista=[];
	}
	set_comienzo=(dato)=>{
		this.comienzo=dato;
	}
	set_fin=(dato)=>{
		this.fin=dato;
	}
	get_comienzo=()=>{ return this.comienzo;}
	get_fin=()=>{ return this.fin;}
	AgregarArista=(inicio,fin,distancia)=>{
		let indice=this.Buscar(inicio);
		if(indice!=-1){
			this.vertices[indice][1].push([fin,distancia]);
		}
	}
	Insertar=(dato,aristas)=>{
		this.vertices.push([dato,aristas]);
	}
	Actualizar=(datoviejo,datonuevo,aristasnuevas)=>{
		let indice= this.Buscar(datoviejo);
		this.vertices[indice]=[datonuevo,[]];
	}
	Buscar=(dato)=>{
		let indice=-1;
		for(let i=0; i<this.vertices.length; i++){
			if(this.vertices[i][0]==dato){
				indice=i;
				return indice;
			}
		}
		return indice;
	}
	Eliminar=(dato)=>{
		for(let i=0; i<this.vertices.length; i++){
			if(this.vertices[i][0]==dato){
				this.vertices.splice(i,1);
			}
		}
	}
	getDataSetNoDirigido=()=>{
		let dotNode=[];
		let dotEdges=[];
		console.log(this.vertices);
		for(let i=0; i<this.vertices.length;i++){
			let etiqueta=""+ this.vertices[i][0];
			dotNode.push({id:i, label: etiqueta});
			if(this.vertices[i][1].length!=0){
				for(let j=0; j<this.vertices[i][1].length; j++){
					let indice=-1;
					indice = this.Buscar(this.vertices[i][1][j][0]);
					if(indice!=-1){
						let label= "" + this.vertices[i][1][j][1];
						dotEdges.push({from:i, to:indice, label: label});
					}
				}
			}
		}
		return [dotNode,dotEdges];
	}
	getDataSetDirigido=()=>{
		let dotNode=[];
		let dotEdges=[];
		console.log(this.vertices);
		for(let i=0; i<this.vertices.length;i++){
			let etiqueta=""+ this.vertices[i][0];
			dotNode.push({id:i, label: etiqueta});
			if(this.vertices[i][1].length!=0){
				for(let j=0; j<this.vertices[i][1].length; j++){
					let indice=-1;
					indice = this.Buscar(this.vertices[i][1][j][0]);
					if(indice!=-1){
						let label= ""+this.vertices[i][1][j][1];
						dotEdges.push({from:i, to:indice, label: label, arrows: "to"});
					}
				}
			}	
		}
		return [dotNode,dotEdges];
	}
	GenerarMatriz=()=>{
		for(let i=0; i<this.vertices.length; i++){
			let ingreso=[];
			for(let j=0; j<this.vertices.length; j++){
				ingreso.push(0);
			}
			this.matriz.push(ingreso);
		}
		for(let i=0; i<this.vertices.length; i++){
			if(this.vertices[i][1].length!=0){
				for(let j=0; j<this.vertices[i][1].length;j++){
					let indice = 0;
					indice = this.Buscar(this.vertices[i][1][j][0]);
					this.matriz[i][indice]=1;
				}
			}
		}
	}
	getDataSetMatriz=()=>{
		this.GenerarMatriz();
		let dotNode=[];
		let dotEdges=[];
		let contador=0;
		for(let i=0; i<this.vertices.length;i++){
			for(let j=0; j<this.vertices.length;j++){
				let etiqueta = "" + this.matriz[i][j];
				dotNode.push({id:contador, label: etiqueta, level:i});
				contador++;
			}
		}
		for(let j=0; j<this.vertices.length;j++){
			let aux=0+j;
			for(let i=0; i<this.vertices.length;i++){
				if((i+1)<this.vertices.length){
					dotEdges.push({from:aux, to: aux+this.vertices.length, color:{ opacity: 0.1 }})
				}
				aux=aux+this.vertices.length;
			}
		}
		return [dotNode, dotEdges];
	}
	getDataSetLista=()=>{
		let dotNode=[];
		let dotEdges=[];
		let contador=0;
		for(let i=0; i<this.vertices.length;i++){
			let etiqueta=""+ this.vertices[i][0];
			dotNode.push({id:contador, label: etiqueta, level:i});
			if((i+1)<this.vertices.length){
				dotEdges.push({from:contador, to: contador+1, color:{ opacity: 0.3 }});
			}
			contador++;
		}
		for(let i=0;i<this.vertices.length;i++){
			if(this.vertices[i][1].length!=0){
				for(let j=0; j<this.vertices[i][1].length; j++){
					if(j==0){
						let etiqueta=""+ this.vertices[i][1][j][0];
						dotNode.push({id:contador, label: etiqueta, level:i});
						dotEdges.push({from:i, to: contador, arrows: "to"});
						contador++;
					}else{
						let etiqueta=""+ this.vertices[i][1][j][0];
						dotNode.push({id:contador, label: etiqueta, level:i});
						dotEdges.push({from:contador-1, to: contador, arrows: "to"});
						contador++;
					}
				}
			}
		}
		return [dotNode,dotEdges];
	}
	RecorridoProfundidad=()=>{
		let ordencorrecto=[];
		let indice = -1;
		let auxiliar=[];
		indice = this.Buscar(this.comienzo);
		do{
			
			auxiliar.push(this.vertices[indice][0]);
			ordencorrecto.push(auxiliar.shift());
			for(let i=this.vertices[indice][1].length; i<0; i--){
				auxiliar.shift(this.vertices[indice][1][i][0]);
			}
			//indice

		}while(auxiliar!=[])
	}
	generateJSONMatriz=(dirigido)=>{
    	var json = "{\n  \"categoria\": \"Estructura No Lineal\",\n  \"nombre\": \"Grafo "+dirigido+"\",\n  \"almacenamiento\": \"Matriz\",\n  \"animacion\": 10,\n  \"valores\": [\n";
    	for(let i=0; i<this.vertices.length; i++){
    		let esentero = true;
			let entero = parseInt(this.vertices[i][0]); 
			if(isNaN(entero)){
				esentero=false;
			}
			if(esentero==true){
				json = json + "   {\n\t\"vertice\": "+this.vertices[i][0]+",";
			}else{
				json = json + "   {\n\t\"vertice\": \""+this.vertices[i][0]+"\",";
			}
    		json = json + "\n\t\"aristas\": [";
    		for(let j=0; j<this.vertices[i][1].length; j++){
    			let esentero2 = true;
				let entero2 = parseInt(this.vertices[i][1][j][0]); 
				if(isNaN(entero2)){
					esentero2=false;
				}
				if(esentero2==true){
					json = json + "\n\t  { \n\t  \"arista\": "+this.vertices[i][1][j][0]+",\n\t   \"distancia\": "+this.vertices[i][1][j][1]+"\n\t  },\n";
				}else{
					json = json + "\n\t  { \n\t  \"arista\": \""+this.vertices[i][1][j][0]+"\",\n\t   \"distancia\": "+this.vertices[i][1][j][1]+"\n\t  },\n";	
				}
    		}
    		json=json+" ]\n },\n";
    	}
    	json = json +"  ]\n}" 
    	return json;
    }
    generateJSONFila=(dirigido)=>{
    	var json = "{\n  \"categoria\": \"Estructura No Lineal\",\n  \"nombre\": \"Grafo "+dirigido+"\",\n  \"almacenamiento\": \"Lista\",\n  \"animacion\": 10,\n  \"valores\": [\n";
    	for(let i=0; i<this.vertices.length; i++){
    		let esentero = true;
			let entero = parseInt(this.vertices[i][0]); 
			if(isNaN(entero)){
				esentero=false;
			}
			if(esentero==true){
				json = json + "   {\n\t\"vertice\": "+this.vertices[i][0]+",";
			}else{
				json = json + "   {\n\t\"vertice\": \""+this.vertices[i][0]+"\",";
			}
    		json = json + "\n\t\"aristas\": [";
    		for(let j=0; j<this.vertices[i][1].length; j++){
    			let esentero2 = true;
				let entero2 = parseInt(this.vertices[i][1][j][0]); 
				if(isNaN(entero2)){
					esentero2=false;
				}
				if(esentero2==true){
					json = json + "\n\t  { \n\t  \"arista\": "+this.vertices[i][1][j][0]+",\n\t   \"distancia\": "+this.vertices[i][1][j][1]+"\n\t  },\n";
				}else{
					json = json + "\n\t  { \n\t  \"arista\": \""+this.vertices[i][1][j][0]+"\",\n\t   \"distancia\": "+this.vertices[i][1][j][1]+"\n\t  },\n";	
				}
    		}
    		json=json+" ]\n },\n";
    	}
    	json = json +"  ]\n}" 
    	return json;
    }
}
export default Grafo;