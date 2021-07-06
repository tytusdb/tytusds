class Major{
	matriz=[];
	arrreglo=[];
	constructor(i,j){
		this.i=i;
		this.j=j;
	}
	get_i=()=>{return this.i;}
	set_i=(i)=>{this.i=i;}
	get_j=()=>{return this.j;}
	set_j=(j)=>{this.j=j;}

	InicializarMatriz=()=>{
		this.matriz=[];
		this.arrreglo=[];
		let filas = this.get_i();
		let columnas = this.get_j();
		for(let i=0;i<filas;i++){
			let auxfila=[]
			for(let j=0;j<columnas;j++){
				auxfila.push(" ");
			}
			this.matriz.push(auxfila);
		}
	}
	InsertarDato=(i,j,dato)=>{
		if((i<this.get_i())&&(j<this.get_j())){
			this.matriz[i][j]=dato;
			console.log(this.matriz);
		}
	}
	ConvertirRowMajor=()=>{
		this.arrreglo=[];
		for(let i=0;i<this.get_i();i++){
			for(let j=0; j<this.get_j();j++){
				this.arrreglo.push(this.matriz[i][j]);
			}
		}
	}
	ConvertirColumnMajor=()=>{
		this.arrreglo=[];
		for(let j=0; j<this.get_j(); j++){
			for(let i=0; i<this.get_i(); i++){
				this.arrreglo.push(this.matriz[i][j]);
			}
		}
	}
	BuscarDatoRowMajor=(fila,columna)=>{
		let indice=-1;
		if((fila<this.get_i())&&(columna<this.get_j())){
			indice=(parseInt(this.get_j())*fila)+columna;
		}
		return indice;
	}
	BuscarDatoColumnMajor=(fila,columna)=>{
		let indice=-1;
		if((fila<this.get_i())&&(columna<this.get_j())){
			indice=(parseInt(this.get_i())*columna)+fila;
		}
		return indice;
	}
	EliminarDato=(fila,columna)=>{
		if((fila<this.get_i())&&(columna<this.get_j())){
			this.matriz[fila][columna]=" ";
		}
	}
	setData=()=>{
		var dotNode = [];
		var dotEdges = [];
		for(let i=0;i<this.arrreglo.length;i++){
			let etiqueta = "" + this.arrreglo[i];
			dotNode.push({id:i, label: etiqueta});
			if(i+1<=this.arrreglo.length){
				dotEdges.push({from:i, to:i+1, arrows: "to"});
			}
		}
		return [dotNode,dotEdges];
	}
	setDataNodes=()=>{
		var dotNode = [];
		var dotEdges = [];
		let contador=0;
		for(let i=0; i<this.get_i();i++){	
			for(let j=0; j<this.get_j();j++){
				console.log("i: "+i+" j: "+ j +this.matriz[i][j])
				let etiqueta = "" + this.matriz[i][j];
				dotNode.push({id:contador, label: etiqueta, level:i});
				contador++;
			}
		}
		
		for(let j=0; j<this.get_j() ;j++){
			let aux=0+j;
			for(let i=0; i<this.get_i();i++){
				if(i+1<this.get_i()){
					dotEdges.push({from:aux, to: aux+this.get_j(), color:{ opacity: 0.1 }})
				}
				aux=aux+this.get_j();
			}
		}
		
		return [dotNode,dotEdges];
	}
	generateJSONRowMajor=()=>{
    	var json = "{\n  \"categoria\": \"Estructura Compuesta\",\n  \"nombre\": \"Row Major\",\n  \"animacion\": 10,\n  \"m\": [\n\t"+this.i+",\n\t"+this.j+"\n  ],\n  \"valores\": [\n";
    	for(let i=0; i<this.matriz.length; i++){
    		for(let j=0; j<this.matriz[i].length; j++){
    			let esentero = true;
				let entero = parseInt(this.matriz[i][j]); 
				if(isNaN(entero)){
					esentero=false;
				}
				if(esentero==true){
					json = json + "   {\n\t\"indices\": [\n\t "+i+",\n\t "+j+"\n\t],";
					json = json + "\n\t\"valor\": "+this.matriz[i][j]+"\n   },\n";
				}else{
					if(this.matriz[i][j]!=" "){
						json = json + "   {\n\t\"indices\": [\n\t "+i+",\n\t "+j+"\n\t],";
						json = json + "\n\t\"valor\": "+ this.matriz[i][j] +"\"\n   },\n";
					}	
				}
    		}
    	}
    	json = json +"  ]\n}" 
    	return json;
    }
    generateJSONColumnMajor=()=>{
    	var json = "{\n  \"categoria\": \"Estructura Compuesta\",\n  \"nombre\": \"Column Major\",\n  \"animacion\": 10,\n  \"m\": [\n\t"+this.i+",\n\t"+this.j+"\n  ],\n  \"valores\": [\n";
    	for(let i=0; i<this.matriz.length; i++){
    		for(let j=0; j<this.matriz[i].length; j++){
    			let esentero = true;
				let entero = parseInt(this.matriz[i][j]); 
				if(isNaN(entero)){
					esentero=false;
				}
				if(esentero==true){
					json = json + "   {\n\t\"indices\": [\n\t "+i+",\n\t "+j+"\n\t],";
					json = json + "\n\t\"valor\": "+this.matriz[i][j]+"\n   },\n";
				}else{
					if(this.matriz[i][j]!=" "){
						json = json + "   {\n\t\"indices\": [\n\t "+i+",\n\t "+j+"\n\t],";
						json = json + "\n\t\"valor\": "+ this.matriz[i][j] +"\"\n   },\n";
					}	
				}
    		}
    	}
    	json = json +"  ]\n}" 
    	return json;
    }
}
export default Major;