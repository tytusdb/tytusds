class HashAbierta{
	insertados=0;
	arrreglo=[];
	constructor(m, min, max){
		this.m = m;
		this.min = min;
		this.max = max;
		this.InicializarArreglo();
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
	get_m=()=>{return parseInt(this.m,10);}
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
		let reducido = k;
		while(reducido>1){
			reducido = Math.round(reducido/2);
		}
		let retorno= Math.round(reducido * this.get_m());
		if(retorno==this.get_m()){
			retorno=retorno-1;
		}
		return (retorno);
	}
	FuncionMultiplicacion=(k)=>{
		let a = 0.1625277911;
		return (Math.round(this.get_m()*((a*k)%1)));
	}
	FuncionAcomodarLineal=(k,i)=>{
		return ((k + 1) % this.get_m() );
	}
	FuncionAcomodarCuadratica=(k,i)=>{
		return ((k+(i*i)) % this.get_m());
	}
	FuncionAcomodarDoble=(h1,i,h2)=>{	
		return ((h1+i*h2) % this.get_m());
	}
	Rehashing=(tipo)=>{
		if(((this.Capacidad()*100)/this.get_m())>=this.get_max()){
			let aux = this.arrreglo;
			this.Imprimir();
			let m_anterior = this.get_m();
			this.set_m(this.Capacidad()*100/this.get_min());
			this.InicializarArreglo();
			for(let i=0; i<m_anterior; i++){
				//console.log(aux[i]);
				if(aux[i]!=[-1]){
					if(tipo=="Division"){
						this.InsertarDivision(aux[i]);
					}else if(tipo=="Multiplicacion"){
						this.InsertarMultiplicacion(aux[i]);
					}else if(tipo=="Simple"){
						this.InsertarSimple(aux[i]);
					}
				}
			}
		}else{
			this.Imprimir();
		}
	}
	InsertarDivision=(k)=>{
		let valordivision = this.FuncionDivision(k);
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
		let valorsimple = this.FuncionSimple(k);
		if(this.arrreglo[valorsimple]!=-1){
			this.arrreglo[valorsimple].push(k);
			//this.arrreglo[valorsimple] = valordearreglo.push(k);
			this.insertados++;
		}else{
			this.arrreglo[valorsimple]=[k];
			this.insertados++;
		}
		this.Rehashing("Simple");
	}
	InsertarMultiplicacion=(k)=>{
		let valormultiplicacion= this.FuncionMultiplicacion(k);
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
		let valorsimple = this.FuncionSimple(k);
		if(this.arrreglo[valorsimple]!=-1){
			if(this.arrreglo[valorsimple].length>1){
				for(let i=0;i<this.arrreglo[valorsimple].length;i++){
					if(this.arrreglo[valorsimple][i]==k){
						let auxarreglo = this.arrreglo[valorsimple];
						auxarreglo.splice(i,1);
						this.arrreglo[valorsimple] = auxarreglo;
						this.insertados--;
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
		let valordivision = this.FuncionDivision(k);
		if(this.arrreglo[valordivision]!=-1){
			if(this.arrreglo[valordivision].length>1){
				for(let i=0;i<this.arrreglo[valordivision].length;i++){
					if(this.arrreglo[valordivision][i]==k){
						let auxarreglo = this.arrreglo[valordivision];
						auxarreglo.splice(i,1);
						this.arrreglo[valordivision] = auxarreglo;
						this.insertados--;
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
		let valormultiplicacion = this.FuncionMultiplicacion(k);
		if(this.arrreglo[valormultiplicacion]!=-1){
			if(this.arrreglo[valormultiplicacion].length>1){
				for(let i=0;i<this.arrreglo[valormultiplicacion].length;i++){
					if(this.arrreglo[valormultiplicacion][i]==k){
						let auxarreglo = this.arrreglo[valormultiplicacion];
						auxarreglo.splice(i,1);
						this.arrreglo[valormultiplicacion] = auxarreglo;
						this.insertados--;
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
		let valorsimple = this.FuncionSimple(k);
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
		let valordivision = this.FuncionDivision(k);
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
		let valormultiplicacion = this.FuncionMultiplicacion(k);
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
			let valorsimple = this.FuncionSimple(k);
			if(this.arrreglo[valorsimple]!=-1){
				if(this.arrreglo[valorsimple].length>1){
					for(let i=0;i<this.arrreglo[valorsimple].length;i++){
						if(this.arrreglo[valorsimple][i]==k){
							let auxarreglo = this.arrreglo[valorsimple];
							auxarreglo.splice(i,1);
							this.arrreglo[valorsimple] = auxarreglo;
							this.insertados--;
							this.InsertarSimple(k);
						}
					}
				}else{
					this.arrreglo[valorsimple]=[-1];
					this.insertados--;
					this.InsertarSimple(k);
				}
			}
			this.Rehashing("Simple");
		}else if(tipo=="Division"){
			let valordivision = this.FuncionDivision(k);
			if(this.arrreglo[valordivision]!=-1){
				if(this.arrreglo[valordivision].length>1){
					for(let i=0;i<this.arrreglo[valordivision].length;i++){
						if(this.arrreglo[valordivision][i]==k){
							let auxarreglo = this.arrreglo[valordivision];
							auxarreglo.splice(i,1);
							this.arrreglo[valordivision] = auxarreglo;
							this.insertados--;
							this.InsertarDivision(k);
						}
					}
				}else{
					this.arrreglo[valordivision]=[-1];
					this.insertados--;
					this.InsertarDivision(k);
				}
			}
			this.Rehashing("Division");
		}else if(tipo=="Multiplicacion"){
			let valormultiplicacion = this.FuncionMultiplicacion(k);
			if(this.arrreglo[valormultiplicacion]!=-1){
				if(this.arrreglo[valormultiplicacion].length>1){
					for(let i=0;i<this.arrreglo[valormultiplicacion].length;i++){
						if(this.arrreglo[valormultiplicacion][i]==k){
							let auxarreglo = this.arrreglo[valormultiplicacion];
							auxarreglo.splice(i,1);
							this.arrreglo[valormultiplicacion] = auxarreglo;
							this.insertados--;
							this.InsertarMultiplicacion(k);
						}
					}
				}else{
					this.arrreglo[valormultiplicacion]=[-1];
					this.insertados--;
					this.InsertarMultiplicacion(k);
				}
			}
			this.Rehashing("Multiplicacion");
		}
		
	}

}