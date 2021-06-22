function ordBurburja(arreglo) {
    //let velocityAnimate=1000, tRetraso=1
    for (var i = (arreglo.length); i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(arreglo[j]>arreglo[j+1]){
                /*const posicionMenor= obtenerPosicion(arreglo[j+1])
                const posicionMayor= obtenerPosicion(arreglo[j])*/
                /*var tempBtMenor = arreglo[j+1]  
                var tempBtMayor = arreglo[j]
                tempBtMenor.dato=tempBtMayor.dato
                tempBtMayor.dato=arreglo[j+1].dato
                arreglo[j].x=tempBtn.x
                arreglo[j].y=tempBtn.x
                console.log(arreglo[j].dato+"  ",arreglo[j].x+ " Dato j")
                console.log(arreglo[j+1].dato+"  ",arreglo[j+1].x+ " Dato j+1")
                //arreglo[j+1].x=tempBtn2.x
                //arreglo[j+1].dato=tempBtn2.y
                console.log(tempBtMenor.dato,tempBtMenor.x+ "Dato menor")
                console.log(tempBtMayor.dato,tempBtMayor.x+ "Dato Mayor")
                arreglo[j] = tempBtMenor
                arreglo[j+1] = tempBtMayor
                animar(arreglo[j].dato,arreglo[j].x,arreglo[j].y,velocityAnimate*tRetraso)
                animar(arreglo[j+1].dato,arreglo[j+1].x,arreglo[j+1].y,velocityAnimate*tRetraso)*/
                /*console.log(arreglo[j])
                console.log(arreglo[j+1]+ "j+1")*/
                var temp = arreglo[j];
                arreglo[j] = arreglo[j+1]
                arreglo[j+1] = temp;
                //tRetraso++       
            }
            //console.log(arreglo[j]+" !=" +arreglo[j+1])
        }//tRetraso++
    }
    return arreglo;
}

class Boton{
    constructor(dato, x, y){
        this.dato=dato
        this.x=x
        this.y=y
    }
}
function crearColocar(array,valMax){
    //const divInsert=document.getElementById("divInsert1");
    for (var i = 0; i < (array.length); i++) {
        /*const objeto=document.createElement("button"); //Creacion del botón
        const texto=document.createTextNode(array[i]);
        
        objeto.appendChild(texto);
        //Diseño del botón
        objeto.style.backgroundColor='rgb(30,144,255)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='15px'
        objeto.style.color="black"
        objeto.style.borderRadius="5px"
        objeto.style.width="40px"
        objeto.style.height=((array[i]/valMax)*1000).toString()+"px"
        objeto.id="btn"+(array[i]).toString()
        objeto.classList='animate__animated animate__rubberBand animate__slow'*/
        /*divInsert.appendChild(objeto)//Insertando el div en el Div principal
        const posicion=document.getElementById(objeto.id)
        posicion.style.position="absolute"
        posicion.style.left=(40*(i)).toString()+"px"
        posicion.style.top="10px"*/

        const boton= new Boton(array[i],(40*(i)),50)
        console.log(array[i])
        array[i]=boton
        console.log(array[i])
    }
    return array
}
function animar(id, x, y, tiempoEspera){
    const  t= setInterval(whiles,tiempoEspera)
    function whiles(){
        const selecBtn = document.getElementById("btn"+id.toString())
        //selecBtn.classList="animate__animated animate__fadeIn animate__faster"
        const sClone = selecBtn.cloneNode(true)
        selecBtn.parentNode.replaceChild(sClone, selecBtn)
        sClone.style.posicion="absolute"
        sClone.style.left=x+"px"        
        sClone.style.top=y+"px"
        clearInterval(t)
    }
}

function urbuja(arreglo) {
    //let velocityAnimate=1000, tRetraso=1
    for (var i = (arreglo.length)-1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(parseInt(arreglo[j].dato)>parseInt(arreglo[j+1].dato)){
                var temp = arreglo[j].dato;
                arreglo[j].dato = arreglo[j+1].dato
                arreglo[j+1].dato = temp
                //tRetraso++       
            }
            //console.log(arreglo[j]+" !=" +arreglo[j+1])
        }//tRetraso++
    }
    return arreglo;
}

//console.log(ordBurburja([0,2,1,4,6,-1]))
//console.log(crearColocar([0,2,1,4,6,8]))

console.log(urbuja(crearColocar([0,6,8,2,1,4])))
