class Animation{
    constructor(id, x, y,disBtn,heightBtn){
        this.id = id
        this.x = x
        this.y = y
        this.disBtn = disBtn
        this.heightBtn = heightBtn
    }
    colocarObject(id, x, y){
        const p = document.getElementById(id)
        p.classList="animate__animated animate__zoomInDown"
        const sClone = p.cloneNode(true)
        p.parentNode.replaceChild(sClone, p) 
        sClone.style.posicion="absolute" 
        sClone.style.top=(y).toString()+"px"
        sClone.style.left=(x).toString()+"px"
    }
    createObject(id, element){
        const divInsert=document.getElementById("divInsert1");
        const objeto=document.createElement("button"); //Creacion del botón
        const texto=document.createTextNode(element);
        objeto.appendChild(texto);
        //Diseño del botón
        objeto.style.backgroundColor='rgb(30,144,255)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='15px'
        objeto.style.borderRadius="5px"
        objeto.id=id
        objeto.classList='animate__animated animate__rubberBand animate__slow'
        objeto.style.position="absolute"
        divInsert.appendChild(objeto)//Insertando el div en el Div principal        
    }
}

//module.exports = Animation;
//export { colocarObject, createObject,Animation};
