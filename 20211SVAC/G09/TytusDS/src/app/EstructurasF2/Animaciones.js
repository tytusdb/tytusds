class Animaciones{
	constructor(){}
	graficarMatriz(array){
		for (let i = 0; i < array.length; i++) {
			this.crearColocar("btn"+i.toString()+",0",array[i][0],50*i,20)
		}
		for (let i = 1; i < array.length; i++) {
			for (let j = 1; j < array.length; j++) {
				this.crearColocar("btn"+i.toString()+","+j.toString(),array[i][j],50*i,20*i)
			}			
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
	}

	seleccionar(id){
		return document.getElementById(id)
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