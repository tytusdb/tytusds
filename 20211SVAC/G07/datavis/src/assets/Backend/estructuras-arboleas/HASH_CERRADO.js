class hash{
    constructor(m,max,min,fun,test){
        this.tabla = new Array(m);
        this.min = min;
        this.max = max;
        this.m = m;
        this.fun = fun;
        this.test = test;
        this.size = 0;
        this.letra = "";
        this.inicializar();
    }

    inicializar(){
        for (let i = 0; i < this.tabla.length; i++) {
             this.tabla[i] = "-1";
            
        }
    }

    simple(){
        let k = 0.5567;
        return k * this.m;
    }

    division(k){
        return k % this.m;
    }

    multiplicacion(k){
        const A = 0.6180;
        return this.m*((k*A) % 1);
    }

    lineal(k){
        return ((k+1) % this.m);
    }

    cuadratica(k,i){
        return ((k+i) % this.m);
    }

    doble(k,i){
        return (((k % this.m) + i * (7-(k % 7))) % this.m);
    }

    rehash(){
        
        let maximo = this.size*100/this.m;
        if(maximo>=this.max){
            console.log("rehash")
            let temp = [];
            for (let k = 0; k < this.tabla.length; k++) {
                temp.push(this.tabla[k]);  
            }
            this.m = this.size*100/this.min;
            this.tabla.length = this.m;
            this.inicializar();
            this.size = 0;
            for (let j = 0; j < temp.length; j++) {
               if(temp[j]!="-1"){
                   this.insertar(temp[j]);
               }
            }
        }
    }

    imprimir(){
        console.log(this.tabla);
    }
    // ValorPos(dato: any){
	// 	let valor = 0
	// 	if(typeof dato === 'string'){
	// 		for(let j = 0; j < dato.length; j++){
	// 			valor += dato.charCodeAt(j)
	// 		}
	// 	} else {
	// 		valor = dato
	// 	}
	// 	return valor
	// }

    verificacionDato(valor){
        let dato = 0;
        if(typeof valor === "string"){
            for (let j = 0; j < valor.length; j++) {
               dato += valor.charCodeAt(j);
            }
        }else{
            dato = valor;
            return dato;
        }
        return dato;
    }

    buscar(valor){
        let calc = this.verificacionDato(valor);
        
        if(this.func == "Simple" && this.test =="Lineal"){
            
        }else if(this.func == "Simple" && this.test =="Cuadratica"){

        }else if(this.func == "Simple" && this.test =="Doble"){

        }else if(this.func == "Div" && this.test =="Lineal"){

        }else if(this.func == "Div" && this.test =="Cuadratica" ){

        }else if(this.func == "Div" && this.test =="Doble" ){

        }else if(this.func == "Multi" && this.test =="Lineal" ){

        }else if(this.func == "Multi" && this.test =="Cuadratica" ){

        }else if(this.func == "Multi" && this.test =="Doble" ){

        }
    }

    insertar(valor){
        let calculo = this.verificacionDato(valor);
        if(this.fun == "Simple" && this.test=="Lineal"){
            let res = Math.trunc(this.simple());
            while(this.tabla[res]!="-1"){
                res = this.lineal(res);
            }
            this.tabla[res] = valor;
            this.size++;
            this.rehash();

        }else if(this.fun == "Simple" && this.test=="Cuadratica"){
            let r;
            let res = Math.trunc(this.simple());
            let iteracion = 0;

            do{
                let j = Math.pow(iteracion,2);
                r = this.cuadratica(res,j);
                iteracion++;
            }while(this.tabla[r]!="-1");
            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();
            
        }else if(this.fun == "Simple" && this.test=="Doble"){
            let r;
            let res = Math.trunc(this.simple());
            let iteracion = 0;
            do{
                r = this.doble(res,iteracion);
                iteracion++;
            }while(this.tabla[r]!="-1");
            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();

        }else if(this.fun == "Div" && this.test=="Lineal"){
            let res = this.division(calculo);
            while(this.tabla[res]!="-1"){
                res = this.lineal(res); 
            }
                this.tabla[res] = valor;
                this.size++;
                this.rehash();

        }else if(this.fun == "Div" && this.test=="Cuadratica"){
            let r;
            let res = this.division(calculo);
            let iteracion = 0;

            do{
                
                let j = Math.pow(iteracion,2);
                r = this.cuadratica(res,j);
                iteracion++;
                
            }while(this.tabla[r]!="-1");
            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();

        }else if(this.fun == "Div" && this.test=="Doble"){
            let r;
            let res = this.division(calculo);
            let iteracion = 0;
            do{
                r = this.doble(res,iteracion);
                iteracion++;
            }while(this.tabla[r]!="-1");
            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();

        }else if(this.fun == "Multi" && this.test=="Lineal"){
            let res =Math.trunc(this.multiplicacion(calculo));
            while(this.tabla[res]!="-1"){
                res = this.lineal(res); 
            }
            this.tabla[res] = valor;
            this.size++;
            this.rehash();

        }else if(this.fun == "Multi" && this.test=="Cuadratica"){
            let r;
            let res = Math.trunc(this.multiplicacion(calculo));
            let iteracion = 0;
            do{
                
                let j = Math.pow(iteracion,2);
                r = this.cuadratica(res,j);
                iteracion++;
                
            }while(this.tabla[r]!="-1");

            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();
        }else if(this.fun == "Multi" && this.test=="Doble"){
            let r;
            let res = Math.trunc(this.multiplicacion(calculo));
            let iteracion = 0;
            do{
                r = this.doble(res,iteracion);
                iteracion++;
            
            }while(this.tabla[r]!="-1");
            iteracion=0;
            this.tabla[r] = valor;
            this.size++;
            this.rehash();
        }
        }
}

let h = new hash(10,80,20,"Div","Lineal");
h.insertar("hola");
h.imprimir()
h.insertar(0);
h.imprimir()
h.insertar("pies");
h.imprimir()


