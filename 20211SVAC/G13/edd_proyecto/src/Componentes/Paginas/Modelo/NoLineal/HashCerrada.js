class HashCerrada{
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
			this.arrreglo.push(-1);
		}
	}
	set_m=(m)=>{this.m=m;}
	get_m=()=>{return parseInt(this.m,10);}
	set_min=(min)=>{this.min=min}
	get_min=()=>{return this.min;}
	set_max=(max)=>{this.max=max;}
	get_max=()=>{return this.max;}
	get_numarreglo=(indice)=>{
		//let str = "Valor: " + this.arrreglo[indice];
		//console.log(str);
		return this.arrreglo[indice];
	}
	Imprimir=()=>{
		let linea="[";
		for(let i=0; i<this.get_m();i++){
			linea += " "+this.arrreglo[i];
		}
		let porcetaje = (this.insertados*100/this.get_m())+ "%";
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
	Rehashing=(tipo,modo)=>{
		if(((this.insertados*100)/this.get_m())>=this.get_max()){
			let aux = this.arrreglo;
			this.Imprimir();
			let m_anterior = this.get_m();
			this.set_m(this.insertados*100/this.get_min());
			this.InicializarArreglo();
			for(let i=0; i<m_anterior; i++){
				//console.log(aux[i]);
				if(aux[i]!=-1){
					if(tipo=="Division"){
						this.InsertarDivision(aux[i],modo);
					}else if(tipo=="Multiplicacion"){
						this.InsertarMultiplicacion(aux[i],modo);
					}else if(tipo=="Simple"){
						this.InsertarSimple(aux[i],modo);
					}
				}
			}
		}else{
			this.Imprimir();
		}
	}
	InsertarDivision=(k,modo)=>{
		let valordivision = this.FuncionDivision(k);
		if(modo=="Lineal"){
			while(this.arrreglo[valordivision]!=-1){
				valordivision = this.FuncionAcomodarLineal(valordivision);
			}
			this.arrreglo[valordivision]=k;
			this.insertados++;
		}else if(modo=="Cuadratica"){
			let contador=1;
			let nuevovalor=valordivision;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarCuadratica(valordivision,contador);
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}else if(modo=="Doble"){
			let h2 = this.FuncionSimple(k);
			let contador=1;
			let nuevovalor=valordivision;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarDoble(valordivision,contador,h2);
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}
		this.Rehashing("Division",modo);
	}
	InsertarSimple=(k,modo)=>{
		let valorsimple = this.FuncionSimple(k);
		if(modo=="Lineal"){
			while(this.arrreglo[valorsimple]!=-1){
				valorsimple = this.FuncionAcomodarLineal(valorsimple);
			}
			this.arrreglo[valorsimple]=k;
			this.insertados++; 
		}else if(modo=="Cuadratica"){
			let contador=1;
			let nuevovalor=valorsimple;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarCuadratica(valorsimple,contador);
				console.log(nuevovalor);
				console.log("VVV:"+contador)
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}else if(modo=="Doble"){
			let contador=1;
			let nuevovalor=valorsimple;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarDoble(valorsimple,contador,valorsimple);
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}
		this.Rehashing("Simple",modo);
	}
	InsertarMultiplicacion=(k,modo)=>{
		let valormultiplicacion= this.FuncionMultiplicacion(k);
		if(modo=="Lineal"){
			while(this.arrreglo[valormultiplicacion]!=-1){
				valormultiplicacion = this.FuncionAcomodarLineal(valormultiplicacion);
			}
			this.arrreglo[valormultiplicacion]=k;
			this.insertados++;
		}else if(modo=="Cuadratica"){
			let contador=1;
			let nuevovalor=valormultiplicacion;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarCuadratica(valormultiplicacion,contador);
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}else if(modo=="Doble"){
			let contador=1;
			let nuevovalor=valormultiplicacion;
			while(this.arrreglo[nuevovalor]!=-1){
				nuevovalor = this.FuncionAcomodarDoble(valormultiplicacion,contador,valormultiplicacion);
				contador++;
			}
			this.arrreglo[nuevovalor]=k;
			this.insertados++;
		}
		this.Rehashing("Multiplicacion",modo);
	}

	EliminarSimple=(k,modo)=>{
		if(modo=="Lineal"){
			let valorsimple = this.FuncionSimple(k);
			let eliminado=false;
			let i=0;
			while(eliminado==false){
				if(this.arrreglo[valorsimple]==k){
					this.arrreglo[valorsimple]=-1;
					this.insertados--;
					eliminado=true;
				}
				i++;
				if(i>=this.get_m()){
					eliminado=true;
				}
				valorsimple = this.FuncionAcomodarLineal(valorsimple);
			} 
		}else if(modo=="Cuadratica"){
			let valorsimple = this.FuncionSimple(k);
			let contador=1;
			let eliminado=false;
			let nuevovalor=valorsimple;
			let i=0;
			while(eliminado==false){
				if(this.arrreglo[nuevovalor]==k){
					this.arrreglo[nuevovalor]=-1;
					this.insertados--;
					eliminado=true;
				}
				i++;
				if(i>=this.get_m()){
					eliminado=true;
				}
				nuevovalor = this.FuncionAcomodarCuadratica(valorsimple,contador);
				contador++;
			}
		}else if(modo=="Doble"){
			let valorsimple = this.FuncionSimple(k);
			let eliminado=false;
			let contador=1;
			let i=0;
			let nuevovalor=valorsimple;
			while(eliminado==false){
				if(this.arrreglo[nuevovalor]==k){
					this.arrreglo[nuevovalor]=-1;
					this.insertados--;
					eliminado=true;
				}
				i++;
				if(i>=this.get_m()){
					eliminado=true;
				}
				nuevovalor = this.FuncionAcomodarDoble(valorsimple,contador,valorsimple);
				contador++;
			}
		}
		this.Rehashing("Simple",modo);
	}
	Buscar=(k,modo)=>{
		let indice=-1;
		if(modo=="Lineal"){
			let valorsimple = this.FuncionSimple(k);
			let encontrado=false;
			let i=0;
			while(encontrado==false){
				if(this.arrreglo[valorsimple]==k){
					indice=valorsimple;
					encontrado=true;
				}
				i++;
				if(i>=this.get_m()){
					encontrado=true;
				}
				valorsimple = this.FuncionAcomodarLineal(valorsimple);
			}
		}else if(modo=="Cuadratica"){
			let valorsimple = this.FuncionSimple(k);
			let contador=1;
			let encontrado=false;
			let nuevovalor=valorsimple;
			let i=0;
			while(encontrado==false){
				if(this.arrreglo[nuevovalor]==k){
					indice=nuevovalor;
					encontrado=true;
				}
				i++;
				if(i>=this.get_m()){
					encontrado=true;
				}
				nuevovalor = this.FuncionAcomodarCuadratica(valorsimple,contador);
				contador++;
			}
		}else if(modo=="Doble"){
			let valorsimple = this.FuncionSimple(k);
			let encontrado=false;
			let contador=1;
			let i=0;
			let nuevovalor=valorsimple;
			while(encontrado==false){
				if(this.arrreglo[nuevovalor]==k){
					indice=nuevovalor;
					encontrado=true;
				}
				i++;
				if(i>=this.get_m()){
					encontrado=true;
				}
				nuevovalor = this.FuncionAcomodarDoble(valorsimple,contador,valorsimple);
				contador++;
			}
		}
		this.Rehashing("Simple",modo);
		return indice;
	}
	Actualizar=(k,nuevo,modo,tipo)=>{
		if(modo=="Lineal"){
			let valorsimple = this.FuncionSimple(k);
			let actualizado=false;
			let i=0;
			while(actualizado==false){
				if(this.arrreglo[valorsimple]==k){
					if(tipo=="Simple"){
						this.arrreglo[valorsimple]=-1;
						this.insertados--;
						this.InsertarSimple(nuevo,modo);
					}else if(tipo=="Division"){
						this.arrreglo[valorsimple]=-1;
						this.insertados--;
						this.InsertarDivision(nuevo,modo);
					}else if(tipo=="Multiplicacion"){
						this.arrreglo[valorsimple]=-1;
						this.insertados--;
						this.InsertarMultiplicacion(nuevo,modo);
					}
					actualizado=true;
				}
				i++;
				if(i>=this.get_m()){
					actualizado=true;
				}
				valorsimple = this.FuncionAcomodarLineal(valorsimple);
			} 
		}else if(modo=="Cuadratica"){
			let valorsimple = this.FuncionSimple(k);
			let contador=1;
			let actualizado=false;
			let nuevovalor=valorsimple;
			let i=0;
			while(actualizado==false){
				if(this.arrreglo[nuevovalor]==k){
					if(tipo=="Simple"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarSimple(nuevo,modo);
					}else if(tipo=="Division"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarDivision(nuevo,modo);
					}else if(tipo=="Multiplicacion"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarMultiplicacion(nuevo,modo);
					}
					actualizado=true;
				}
				i++;
				if(i>=this.get_m()){
					actualizado=true;
				}
				nuevovalor = this.FuncionAcomodarCuadratica(valorsimple,contador);
				contador++;
			}
		}else if(modo=="Doble"){
			let valorsimple = this.FuncionSimple(k);
			let actualizado=false;
			let contador=1;
			let i=0;
			let nuevovalor=valorsimple;
			while(actualizado==false){
				if(this.arrreglo[nuevovalor]==k){
					if(tipo=="Simple"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarSimple(nuevo,modo);
					}else if(tipo=="Division"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarDivision(nuevo,modo);
					}else if(tipo=="Multiplicacion"){
						this.arrreglo[nuevovalor]=-1;
						this.insertados--;
						this.InsertarMultiplicacion(nuevo,modo);
					}
					actualizado=true;
				}
				i++;
				if(i>=this.get_m()){
					actualizado=true;
				}
				nuevovalor = this.FuncionAcomodarDoble(valorsimple,contador,valorsimple);
				contador++;
			}
		}
		this.Rehashing("Simple",modo);
	}

}