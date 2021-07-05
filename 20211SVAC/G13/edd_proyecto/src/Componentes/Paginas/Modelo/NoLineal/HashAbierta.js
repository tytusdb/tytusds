class HashAbierta{
	insertados=0;
	arrreglo=[];
	constructor(m, min, max){
		this.m = m;
		this.min = min;
		this.max = max;
		this.InicializarArreglo();
	}
	ConvertirString=(cadena)=>{
		let result=0;
		for(let i=0;i<cadena.length;i++){
			result+=cadena.charCodeAt(i);
		}
		return result;
	}
	ConvertirArreglo=(arreglo)=>{
		let nuevoarreglo=[]
		for(let i=0;i<arreglo.length;i++){
			let result=0;
			for(let j=0;j<arreglo[i].length;j++){
				result+=arreglo[i].charCodeAt(j);
			}
			nuevoarreglo.push(result);
		}
		return nuevoarreglo;
	}
	InicializarArreglo=()=>{
		this.insertados=0;
		this.arrreglo=[];
		let tamanio = this.get_m();
		for(let i=0;i<tamanio;i++){
			this.arrreglo.push([-1]);
		}
	}
	Capacidad=()=>{
		let raro=0;
		for(let i=0; i<this.get_sizearreglo() ;i++){
			let aux = [ -1 ];
			if(this.arrreglo[i]==-1){
				raro= raro + 1;
			}
		}
		let ocupado= this.get_sizearreglo()-raro;
		return ocupado;
	}
	get_sizearreglo=()=>{
		return this.arrreglo.length;
	}
	set_m=(m)=>{this.m=m;}
	get_m=()=>{return this.m;}
	set_min=(min)=>{this.min=min}
	get_min=()=>{return this.min;}
	set_max=(max)=>{this.max=max;}
	get_max=()=>{return this.max;}
	get_numarreglo=(indice)=>{
		return this.arrreglo[indice];
	}
	Imprimir=()=>{
		let linea="[";
		for(let i=0; i<this.get_m();i++){
			linea += " "+this.arrreglo[i];
		}
		let porcetaje = (this.Capacidad()*100/this.get_m())+ "%";
		linea+=" ]"+porcetaje;
		console.log(linea);
	}
	FuncionDivision = (k) =>{
		return ( k % this.get_m() );
	}
	FuncionSimple = (k)=>{
		let reducido = parseInt(k);
		let retorno=0;
		while(reducido>=1){
			reducido = reducido/2;
		}
		retorno= Math.round( reducido * parseInt(this.m));
		if(parseInt(retorno)==this.get_m()){
			retorno=parseInt(retorno)-1;
		}
		return (parseInt(retorno));
	}
	FuncionMultiplicacion=(k)=>{
		let a = 0.1625277911;
		return (Math.round(this.get_m()*((a*k)%1)));
	}
	Rehashing=(tipo)=>{
		if(((this.Capacidad()*100)/this.get_m())>=this.get_max()){
			let aux = this.arrreglo;
			this.Imprimir();
			let m_anterior = this.get_m();
			this.set_m(this.Capacidad()*100/this.get_min());
			this.InicializarArreglo();
			for(let i=0; i<m_anterior; i++){
				console.log(aux[i]);
				if(aux[i]!=-1){
					if(tipo=="Division"){
						console.log("Division reh"+aux[i]);
						for(let j=0;j<aux[i].length;j++){
							let esono = typeof aux[i][j];
							if(esono=="string"){
								let etiqueta=""+aux[i][j];
								this.InsertarDivision(aux[i][j]);
							}else if(esono=="number"){
								this.InsertarDivision(parseInt(aux[i][j]));
							}
						}
					}else if(tipo=="Multiplicacion"){
						for(let j=0;j<aux[i].length;j++){
							let esono = typeof aux[i][j];
							if(esono=="string"){
								let etiqueta=""+aux[i][j];
								this.InsertarMultiplicacion(aux[i][j]);
							}else if(esono=="number"){
								this.InsertarMultiplicacion(parseInt(aux[i][j]));
							}
						}
					}else if(tipo=="Simple"){
						for(let j=0;j<aux[i].length;j++){
							let esono = typeof aux[i][j];
							if(esono=="string"){
								let etiqueta=""+aux[i][j];
								this.InsertarSimple(aux[i][j]);
							}else if(esono=="number"){
								this.InsertarSimple(parseInt(aux[i][j]));
							}
						}
					}
				}
			}
		}else{
			this.Imprimir();
		}
	}
	InsertarDivision=(k)=>{
		console.log("Aqui");
		let esono = typeof k;
		console.log(typeof k);
		let valordivision=0;
		if(esono=="string"){
			valordivision = parseInt(this.FuncionDivision(this.ConvertirString(k)));
		}else if(esono=="number"){
			valordivision = this.FuncionDivision(parseInt(k));
		}
		console.log("Convertido: "+valordivision);
		if(this.arrreglo[valordivision]!=-1){
			this.arrreglo[valordivision].push(k);
			//this.arrreglo[valordivision] = valordearreglo.push(k);
			this.insertados++;
		}else{
			this.arrreglo[valordivision]=[k];
			this.insertados++;
		}
		this.Rehashing("Division");
	}
	InsertarSimple=(k)=>{
		let esono = typeof k;
		let valorsimple=0;
		if(esono=="string"){
			valorsimple = parseInt(this.FuncionSimple(this.ConvertirString(k)));
		}else if(esono=="number"){
			valorsimple = this.FuncionSimple(parseInt(k));
		}
		if(this.arrreglo[valorsimple]!=-1){
			this.arrreglo[valorsimple].push(k);
			//let valordearreglo = this.arrreglo[valorsimple];
			//this.arrreglo[valorsimple] = valordearreglo.push(k);
			this.insertados++;
		}else{
			this.arrreglo[valorsimple]=[k];
			this.insertados++;
		}
		this.Rehashing("Simple");
	}
	InsertarMultiplicacion=(k)=>{
		let esono = typeof k;
		let valormultiplicacion=0;
		if(esono=="string"){
			valormultiplicacion = parseInt(this.FuncionMultiplicacion(this.ConvertirString(k)));
		}else{
			valormultiplicacion = this.FuncionMultiplicacion(k);
		}
		if(this.arrreglo[valormultiplicacion]!=-1){
			this.arrreglo[valormultiplicacion].push(k);
			//this.arrreglo[valormultiplicacion] = valordearreglo.push(k);
			this.insertados++;
		}else{
			this.arrreglo[valormultiplicacion]=[k];
			this.insertados++;
		}
		this.Rehashing("Multiplicacion");
	}

	EliminarSimple=(k)=>{
		let esono = typeof k;
		let valorsimple=0;
		if(esono=="string"){
			valorsimple = parseInt(this.FuncionSimple(this.ConvertirString(k)));
		}else{
			valorsimple = this.FuncionSimple(k);
		}
		if(this.arrreglo[valorsimple]!=-1){
			if(this.arrreglo[valorsimple].length>1){
				for(let i=0;i<this.arrreglo[valorsimple].length;i++){
					if(this.arrreglo[valorsimple][i]==k){
						let auxarreglo = this.arrreglo[valorsimple];
						auxarreglo.splice(i,1);
						this.arrreglo[valorsimple] = auxarreglo;
						this.insertados--;
						break;
					}
				}
			}else{
				this.arrreglo[valorsimple]=[-1];
				this.insertados--;
			}
		}
		this.Rehashing("Simple");
	}
	EliminarDivision=(k)=>{
		let esono = typeof k;
		let valordivision=0;
		if(esono=="string"){
			valordivision = parseInt(this.FuncionDivision(this.ConvertirString(k)));
		}else{
			valordivision = this.FuncionDivision(k);
		}
		if(this.arrreglo[valordivision]!=-1){
			if(this.arrreglo[valordivision].length>1){
				for(let i=0;i<this.arrreglo[valordivision].length;i++){
					if(this.arrreglo[valordivision][i]==k){
						let auxarreglo = this.arrreglo[valordivision];
						auxarreglo.splice(i,1);
						this.arrreglo[valordivision] = auxarreglo;
						this.insertados--;
						break;
					}
				}
			}else{
				this.arrreglo[valordivision]=[-1];
				this.insertados--;
			}
		}
		this.Rehashing("Division");
	}
	EliminarMultiplicacion=(k)=>{
		let esono = typeof k;
		let valormultiplicacion=0;
		if(esono=="string"){
			valormultiplicacion = parseInt(this.FuncionMultiplicacion(this.ConvertirString(k)));
		}else{
			valormultiplicacion = this.FuncionMultiplicacion(k);
		}
		if(this.arrreglo[valormultiplicacion]!=-1){
			if(this.arrreglo[valormultiplicacion].length>1){
				for(let i=0;i<this.arrreglo[valormultiplicacion].length;i++){
					if(this.arrreglo[valormultiplicacion][i]==k){
						let auxarreglo = this.arrreglo[valormultiplicacion];
						auxarreglo.splice(i,1);
						this.arrreglo[valormultiplicacion] = auxarreglo;
						this.insertados--;
						break;
					}
				}
			}else{
				this.arrreglo[valormultiplicacion]=[-1];
				this.insertados--;
			}
		}
		this.Rehashing("Multiplicacion");
	}

	BuscarSimple=(k)=>{
		let indice=-1;
		let segundoindice=0;
		let esono = typeof k;
		let valorsimple=0;
		if(esono=="string"){
			valorsimple = parseInt(this.FuncionSimple(this.ConvertirString(k)));
		}else{
			valorsimple = this.FuncionSimple(k);
		}
		if(this.arrreglo[valorsimple]!=-1){
			if(this.arrreglo[valorsimple].length>1){
				for(let i=0;i<this.arrreglo[valorsimple].length;i++){
					if(this.arrreglo[valorsimple][i]==k){
						indice=valorsimple;
						segundoindice=i;
					}
				}
			}else{
				indice=valorsimple;
			}
		}
		this.Rehashing("Simple");
		return [indice,segundoindice];
	}
	BuscarDivision=(k)=>{
		let indice=-1;
		let segundoindice=0;
		let esono = typeof k;
		let valordivision=0;
		if(esono=="string"){
			valordivision = parseInt(this.FuncionDivision(this.ConvertirString(k)));
		}else{
			valordivision = this.FuncionDivision(k);
		}
		if(this.arrreglo[valordivision]!=-1){
			if(this.arrreglo[valordivision].length>1){
				for(let i=0;i<this.arrreglo[valordivision].length;i++){
					if(this.arrreglo[valordivision][i]==k){
						indice=valordivision;
						segundoindice=i;
					}
				}
			}else{
				indice=valordivision;
			}
		}
		this.Rehashing("Division");
		return [indice,segundoindice];
	}
	BuscarMultiplicacion=(k)=>{
		let indice=-1;
		let segundoindice=0;
		let esono = typeof k;
		let valormultiplicacion=0;
		if(esono=="string"){
			valormultiplicacion = parseInt(this.FuncionMultiplicacion(this.ConvertirString(k)));
		}else{
			valormultiplicacion = this.FuncionMultiplicacion(k);
		}
		if(this.arrreglo[valormultiplicacion]!=-1){
			if(this.arrreglo[valormultiplicacion].length>1){
				for(let i=0;i<this.arrreglo[valormultiplicacion].length;i++){
					if(this.arrreglo[valormultiplicacion][i]==k){
						indice=valormultiplicacion;
						segundoindice=i;
					}
				}
			}else{
				indice=valormultiplicacion;
			}
		}
		this.Rehashing("Multiplicacion");
		return [indice,segundoindice];
	}

	Actualizar=(k,nuevo,tipo)=>{
		if(tipo=="Simple"){
			let esono = typeof k;
			let valorsimple=0;
			if(esono=="string"){
				valorsimple = parseInt(this.FuncionSimple(this.ConvertirString(k)));
			}else{
				valorsimple = this.FuncionSimple(k);
			}
			if(this.arrreglo[valorsimple]!=-1){
				if(this.arrreglo[valorsimple].length>1){
					for(let i=0;i<this.arrreglo[valorsimple].length;i++){
						if(this.arrreglo[valorsimple][i]==k){
							let auxarreglo = this.arrreglo[valorsimple];
							auxarreglo.splice(i,1);
							this.arrreglo[valorsimple] = auxarreglo;
							this.insertados--;
							this.InsertarSimple(nuevo);
						}
					}
				}else{
					this.arrreglo[valorsimple]=[-1];
					this.insertados--;
					this.InsertarSimple(nuevo);
				}
			}
			this.Rehashing("Simple");
		}else if(tipo=="Division"){
			let esono = typeof k;
			let valordivision=0;
			if(esono=="string"){
				valordivision = parseInt(this.FuncionDivision(this.ConvertirString(k)));
			}else{
				valordivision = this.FuncionDivision(k);
			}

			if(this.arrreglo[valordivision]!=-1){
				if(this.arrreglo[valordivision].length>1){
					for(let i=0;i<this.arrreglo[valordivision].length;i++){
						if(this.arrreglo[valordivision][i]==k){
							let auxarreglo = this.arrreglo[valordivision];
							auxarreglo.splice(i,1);
							this.arrreglo[valordivision] = auxarreglo;
							this.insertados--;
							this.InsertarDivision(nuevo);
						}
					}
				}else{
					this.arrreglo[valordivision]=[-1];
					this.insertados--;
					this.InsertarDivision(nuevo);
				}
			}
			this.Rehashing("Division");
		}else if(tipo=="Multiplicacion"){
			let esono = typeof k;
			let valormultiplicacion=0;
			if(esono=="string"){
				valormultiplicacion = parseInt(this.FuncionMultiplicacion(this.ConvertirString(k)));
			}else{
				valormultiplicacion = this.FuncionMultiplicacion(k);
			}
			if(this.arrreglo[valormultiplicacion]!=-1){
				if(this.arrreglo[valormultiplicacion].length>1){
					for(let i=0;i<this.arrreglo[valormultiplicacion].length;i++){
						if(this.arrreglo[valormultiplicacion][i]==k){
							let auxarreglo = this.arrreglo[valormultiplicacion];
							auxarreglo.splice(i,1);
							this.arrreglo[valormultiplicacion] = auxarreglo;
							this.insertados--;
							this.InsertarMultiplicacion(nuevo);
						}
					}
				}else{
					this.arrreglo[valormultiplicacion]=[-1];
					this.insertados--;
					this.InsertarMultiplicacion(nuevo);
				}
			}
			this.Rehashing("Multiplicacion");
		}
		
	}
	setDataSet = () => { // Esto Genera los nodos de Vis.
		var dotNode = [];
		var dotEdges = [];
		let contador = 0
		for(let i=0;i<this.get_sizearreglo();i++){
			dotNode.push({id:i, label: "/", level:0});
			if(i+1<this.arrreglo.length){
				dotEdges.push({from:i, to:i+1, arrows: "to"});
			}
			contador++;
		}
		console.log(contador);
		for(let i=0;i<this.get_sizearreglo();i++){
			if(this.arrreglo[i]!=-1){
				if(this.arrreglo[i].length>1){
					for(let j=0;j<this.arrreglo[i].length;j++){
						if(j==0){
							let etiqueta=""+this.arrreglo[i][j];
							dotNode.push({id:contador, label: etiqueta, level:j+1});
							dotEdges.push({from:i, to:contador, arrows: "to"});
							contador++;
							if((j+1)<=this.arrreglo[i].length){
								let etiqueta=""+this.arrreglo[i][j+1];
								dotNode.push({id:contador, label: etiqueta, level:j+2});
								dotEdges.push({from:contador-1, to:contador, arrows: "to"});
								contador++;
							}
						}else{
							if((j+1)<this.arrreglo[i].length){
								let etiqueta=""+this.arrreglo[i][j+1];
								dotNode.push({id:contador, label: etiqueta, level:j+2});
								dotEdges.push({from:contador-1, to:contador, arrows: "to"});
								contador++;
							}
						}	
						
					}
					//contador++;
				}else{
					let etiqueta=""+this.arrreglo[i][0];
					dotNode.push({id:contador, label: etiqueta, level:1});
					dotEdges.push({from:i, to:contador, arrows: "to"});
					contador++
				}
			}
		}

        return [dotNode,dotEdges];

    } 

}
export default HashAbierta;