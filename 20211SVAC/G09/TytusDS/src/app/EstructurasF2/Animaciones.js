class Animaciones{
	constructor(){
		this.btns=[]
	}
	graficarMatriz(array){
		//debugger
		document.getElementById('DivInsert').innerHTML = '';
		for (let i = 0; i < array.length; i++) {
			if (array[i][0]) {
				//this.crearBoton("btn"+i.toString()+",0",array[i][0])

				this.crearColocar("btn"+i.toString()+",0",array[i][0],75*i,0)
			}
		}//debugger
		for (let j = 1; j < array[0].length; j++) {
			for (let i = 0; i < array.length; i++) {
				if (array[i][j]) {this.crearColocar("btn"+i.toString()+","+j.toString(),array[i][j],50*i,40*j)}
			}			
		}			
		
	}
	graficarMatrizUnaDimension(array){
		//debugger
		document.getElementById('DivInsert').innerHTML = '';
		let cont=0
		for (let i = 0; i < array.length; i++) {
			try {
				if (array[i][0]!=null) {
					this.crearColocar("btn"+i.toString()+",0",array[i],80*cont,0)
					cont++}
			} catch (e) {}
		}
	}
	crearColocar(id, contenido,x,y){
		this.crearBoton(id, contenido)
		let btn=this.seleccionar(id)
		btn.style.left=x.toString()+"px"
		btn.style.top=y.toString()+"px"
	}
	cambiarPosicion(id, x, y){
		let p=this.seleccionar(id)
		p.classList="animate__animated animate__zoomInDown"
        const sClone = p.cloneNode(true)
        p.parentNode.replaceChild(sClone, p) 
        //sClone.style.posicion="absolute" 
        sClone.style.top=y.toString()+"px"
        sClone.style.left=x.toString()+"px"
	}
	crearBoton(id, contenido){
        const divInsert=document.getElementById("DivInsert");
        const btn=document.createElement("button") //Creacion del botón
        const text=document.createTextNode(contenido)
        btn.appendChild(text)
        //Diseño del botón
        btn.style.backgroundColor='rgb(30,144,255)'
        btn.style.color='rgb(255,255,255)'
        btn.style.fontSize='15px'
        btn.style.borderRadius="5px"
        btn.id=id
        btn.classList='animate__animated animate__flipInY'
        btn.style.position="absolute"
        divInsert.appendChild(btn)//Insertando el div en el Div principal        
		this.btns.push(new BtnAnimate(id,contenido,btn.offsetHeight, btn.offsetWidth))
	}
	buscar(val){
		for (let i = 0; i < this.btns.length; i++) {
			if(this.btns[i].valor==val){
				return this.btns[i]
			}
		}
		return null
	}

	seleccionar(id){
		return document.getElementById(id)
	}
	animarTabla(array){
		//const table=document.getElementById("tAnimation")
		document.getElementById('tAnimation').innerHTML = '';
		let fila=[]
		for (let j = 0; j < array[0].length; j++) {
			fila=[]
			for (let i = 0; i < array.length; i++) {
				fila.push(array[i][j])
			}
			this.construirfila(fila,j+1)
		}

	}
	construirfila(fila, retardo){
		const table=document.getElementById("tAnimation")
		setTimeout(() => {
			var hilera = document.createElement("tr")
			for (let i = 0; i < fila.length; i++) {
				var celda = document.createElement("td");
				if (fila[i]) {
					var textoCelda = document.createTextNode(fila[i]);
					celda.appendChild(textoCelda);
				}
				hilera.appendChild(celda);
				celda.style.border="1px solid black"				
			}
			table.appendChild(hilera)
			hilera.classList="animate__animated animate__slideInDown"
		}, 600*retardo);
	}
	graficarArbol(raiz, id, x, y){
		if (raiz) {//debugger
			this.crearColocar(raiz.letra+id.toString(),raiz.letra,x,y)
			this.graficarArbol(raiz.izq,id-1,x-100,y+70)
			this.graficarArbol(raiz.der,id+1,x+50,y+50)
		}
		//else{return}
	}
	graficarMatrizDispersa(encabezado){

	}
	graficarGrafo(data, options){
		//document.getElementById('DivInsert').innerHTML = ''
		let container=document.getElementById('DivInsert')
		let vis=require('../../../node_modules/vis/dist/vis')
		let graf = new vis.Network(container, data, options)
		try {
			this.seleccionar(1).classList='animate__animated animate__slideInDown'
		} catch (error) {
			console.log(error)
		}
	}	
}
class BtnAnimate{
	constructor(id, valor, btnAlto, btnAncho, x, y){
		this.id = id
		this.valor = valor
		this.btnAlto = btnAlto
		this.btnAncho = btnAncho
		this.x = x
		this.y = y
	}
}

module.exports = Animaciones

/*function printNumbers() {
    //let i
	for (let i = 0; i < 10; i++) {
		setTimeout(
      function printer() {
	      console.log(i);
	    },
			100 * i
		);
	}
}
printNumbers()*/