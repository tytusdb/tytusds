class Nodo{
    constructor(data, next){
        this.data = data;
        this.next = next;
    }
}
class ListaSimple{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    
    add(data){

        var objeto=document.createElement("button");
        var divInsert=document.getElementById("divInsert");
        var texto=document.createTextNode(data);
        objeto.appendChild(texto);
        objeto.style.backgroundColor='rgb(25, 25, 112)'
        objeto.style.color='rgb(255,255,255)'
        objeto.style.fontSize='60px'
        objeto.style.borderRadius="5px"
        objeto.style.boxShadow="0 9px black"
        objeto.id("btn1")
        //objeto.classList.add("animate__backInLeft")
        divInsert.appendChild(objeto)
        
        var objet= document.getElementById("btn1")
        objet.classList.add("animate__backInLeft")

    const newNodo = new Nodo(data, null);
    if(this.head){        
        let current = this.head;
        while(current.next){
        current = current.next;
        }
        current.next = newNodo;
    }else{
        this.head = newNodo
    }
    this.size++
    }
delete(data){
    let aux = this.head
    let aux2
    if(data==aux.data){this.head=aux.next 
        return}
    while(aux != null){
        aux2=aux.next;
        console.log(aux.data+"  "+aux2.data)
        if(aux2.data==data){  
        aux2=aux2.next
        aux.next=aux2
        this.size--
        break
    }   
    else{
        aux=aux.next}
    }
}
refresh(dataActual,dataFinal){
    let aux = this.head
    while (aux.next != null) {
        if (aux.data==dataActual) {
        aux.data=dataFinal
        return
        }
        aux=aux.next
    }
    }

search(data){
    let aux = this.head
    while (aux.next != null) {
        if (aux.data==data) {
        return true
        }   
        aux=aux.next
    }return false
    }

cargar(data){/*
    fetch(data).then(resp => resp.json)
    .then(objetos =>{
        objetos.array.forEach(objeto => {
            //console.log(objeto) 
        });
    })*/
}

guardar(){}

print(){
    var valores = []
        let aux = this.head;
        while (aux != null) {
            valores.push(aux.data);
            aux = aux.next;
        }
        return valores;
    }
}

const listSimple = new ListaSimple();

function lsimpleAdd(data){
listSimple.add(data);
return listSimple.print()
}

function lsimpleDelete(data){
listSimple.delete(data);
}
function lsimpleRefresh(data1,data2){
listSimple.refresh(data1,data2); 
}
function lsimpleSearch(data){
return listSimple.search(data); 
}
function lsimpleCargar(data){
listSimple.cargar(data);
}
function lsimpleGuardar(data){
listSimple.guardar();
}
function lsimplePrint(){return print()}