class File {
    constructor(categoria,nombre,repeticion,animacion,valores) {
        this.categoria=categoria
        this.nombre=nombre
        this.repeticion=repeticion
        this.animacion=animacion
        this.valores=valores
    }
}
var file
var speed=5

class Nodo{
    constructor(val) {
        this.val=val
        this.izq=null
        this.der=null
        this.altura=0
        this.x=0
        this.y=0
    }
}
class AVL{
    constructor() {
        this.raiz=null
        this.valores=0
    }

    Max(valor1, valor2) {
        if (valor1 > valor2) return valor1;
        return valor2;
    }

    altura(nodo) {
        if (nodo == null) return -1;
        return nodo.altura;
    }

    insertar(valor) {
        this.raiz = this.add(valor, this.raiz);
        this.valores++
    }

    add(val,nodo){
        if (nodo == null) return new Nodo(val)
        else{
            if (val<nodo.val){
                nodo.izq=this.add(val,nodo.izq)
                if (this.altura(nodo.der)-(this.altura(nodo.izq))==-2){
                    if (val < nodo.izq.val) {
                        nodo = this.RotacionIzquierda(nodo);
                    } else {
                        nodo = this.RotacionDobleIzquierda(nodo);
                    }
                }
            }else if (val > nodo.val) {
                nodo.der = this.add(val, nodo.der);
                if (this.altura(nodo.der) - this.altura(nodo.izq) == 2) {
                    if (val > nodo.der.val) {
                        nodo = this.RotacionDerecha(nodo);
                    } else {
                        nodo = this.RotacionDobleDerecha(nodo);
                    }
                }
            }else {
                nodo.val=val;
            }
        }
        nodo.altura=this.Max(this.altura(nodo.izq),this.altura(nodo.der))+1
        return nodo
    }
    RotacionIzquierda(nodo){
        let aux = nodo.izq;
        nodo.izq = aux.der;
        aux.der = nodo;
        nodo.altura = this.Max(this.altura(nodo.der), this.altura(nodo.izq)) + 1;
        aux.altura = this.Max(this.altura(nodo.izq), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleIzquierda(nodo) {
        nodo.izq = this.RotacionDerecha(nodo.izq);
        return this.RotacionIzquierda(nodo);
    }

    RotacionDerecha(nodo) {
        var aux = nodo.der;
        nodo.der = aux.izq;
        aux.izq = nodo;
        nodo.altura = this.Max(this.altura(nodo.der), this.altura(nodo.izq)) + 1;
        aux.altura = this.Max(this.altura(nodo.der), nodo.altura) + 1;
        return aux;
    }

    RotacionDobleDerecha(nodo) {
        nodo.der = this.RotacionIzquierda(nodo.der);
        return this.RotacionDerecha(nodo);
    }

    graficar(){
        if (this.raiz!=null){
            document.getElementById("result").innerHTML=""
            let tx=(500*this.valores)/2
            let ty=1
            this.graficarNodo(this.raiz,tx,ty,500*(this.raiz.altura+1),null)
        }
    }

    graficarNodo(nodo,x,y,d,par){
        if (nodo!=null){
            nodo.x=x
            nodo.y=(y)*100
            document.getElementById("result").innerHTML+=
                `<div class="circle" style="top: ${nodo.y+"px"};left: ${nodo.x + 'px'}" id=${"a" + nodo.val}>${nodo.val}</div><br />`;
           if (nodo!==null&&par!==null){
               let f=document.getElementById("a"+par.val)
               let s=document.getElementById("a"+nodo.val)
               connect(f,s,"black","10")
           }
            this.graficarNodo(nodo.izq,(x-parseInt(d)/2),y+2,d/2,nodo)
            this.graficarNodo(nodo.der,(x+parseInt(d)/2),y+2,d/2,nodo)


        }
    }
    eliminarNodo(val){
       this.raiz=this.eliminar(this.raiz,val)
        this.graficar()
    }
    eliminar(nodo,val){
        if (nodo!==null){
           if (val<nodo.val){
               nodo.izq=this.eliminar(nodo.izq,val)
               if (this.altura(nodo.der) - this.altura(nodo.izq) <= -2) {
                   if (nodo.val > nodo.izq.val) {
                       nodo = this.RotacionIzquierda(nodo);
                   } else {
                       nodo = this.RotacionDobleIzquierda(nodo);
                   }
               }
               if (this.altura(nodo.der)-(this.altura(nodo.izq))>=2){
                   if (nodo.val < nodo.der.val) {
                       nodo = this.RotacionDerecha(nodo);
                   } else {
                       nodo = this.RotacionDobleDerecha(nodo);
                   }
               }
           }else if (val>nodo.val){
               nodo.der=this.eliminar(nodo.der,val)
               if (this.altura(nodo.der) - this.altura(nodo.izq) <= -2) {
                   if (nodo.val > nodo.izq.val) {
                       nodo = this.RotacionDerecha(nodo);
                   } else {
                       nodo = this.RotacionDobleDerecha(nodo);
                   }
               }
               if (this.altura(nodo.der)-(this.altura(nodo.izq))>=2){
                   if (nodo.val < nodo.der.val) {
                       nodo = this.RotacionIzquierda(nodo);
                   } else {
                       nodo = this.RotacionDobleIzquierda(nodo);
                   }
               }
           }else {
               if (nodo.izq !== null&& nodo.der !==null){
                   let temp=nodo.izq
                   while (temp.der!==null){
                       temp=temp.der
                   }
                   nodo.val=temp.val
                   nodo.izq=this.eliminarder(nodo.izq)
               }else if(nodo.izq!==null){
                   let temp=nodo.izq
                   while (temp.der!==null){
                       temp=temp.der
                   }
                   nodo.val=temp.val
                   nodo.izq=this.eliminarder(nodo.izq)
               }else if(nodo.der!==null){
                   let temp=nodo.der
                   while (temp.izq!==null){
                       temp=temp.izq
                   }
                   nodo.val=temp.val
                   nodo.der=this.eliminarizq(nodo.der)
               }else{
                   nodo=null
               }
           }
        }
        return nodo
    }
    eliminarizq(nodo){
        if (nodo.izq==null){
            nodo=null
        }else if (nodo.izq!==null){
            nodo.izq=this.eliminarizq(nodo.izq)
        }
       return nodo
    }
    eliminarder(nodo){
        if (nodo.der==null){
            nodo=null
        }else if (nodo.der!==null){
            nodo.der=this.eliminarder(nodo.der)
        }
        return nodo
    }

    toArray(){
        this.inOrden()
    }

    inOrden() {
        this.in_orden(this.raiz);
    }

    in_orden(nodo) {
        if (nodo != null) {
            this.in_orden(nodo.izq);
            avlarray.push(nodo.val)
            this.in_orden(nodo.der);
        }
    }

    update(a,b){
        this.eliminarNodo(parseInt(a))
        this.insertar(parseInt(b))
        this.graficar()
    }
}
let avlarray=[]


function movexy(x, y, i, speed) {
    return new Promise(resolve => {
        let element = document.getElementById("a" + i.toString());
        let posx = element.style.left;
        let posy = element.style.top;
        element.animate(
            [
                {
                    left: posx,
                    top: posy
                },
                {
                    left: x + "px",
                    top: y + "px"
                }
            ],
            {
                duration: speed,
                fill: "forwards"
            }
        );
        setTimeout(() => {
            element.style.animation = null;
            element.style.top = y + "px";
            element.style.left = x + "px";
            i.x=x
            i.y=y
            resolve()
        }, speed);
    });
}

function changeColor(id, color, speed) {
    return new Promise(resolve => {
        let element = document.getElementById("a" + id);
        element.style.animation = "colorChange" + color
            + speed / 1000 + "s" + "ease";
        setTimeout(() => {
            element.style.animation = null;
            element.style.borderColor = color;
            resolve()
        }, speed);
    });
}

function insert(dato,arbol){
    arbol.insertar(parseInt(dato))
    document.getElementById('result').innerHTML=""
    arbol.graficar()
}

window.addEventListener('load',function (){
    var upload=document.getElementById("loadedFile")
    if (upload)
    {
        upload.addEventListener('change', function() {
            if (upload.files.length > 0)
            {
                var reader = new FileReader(); // File reader to read the file
                // This event listener will happen when the reader has read the file
                reader.addEventListener('load', function() {
                    var result = JSON.parse(reader.result); // Parse the result into an object
                    file=new File(result.categoria,result.nombre,result.repeticion,result.animacion,result.valores)
                    if (isNaN(result.valores[0])){
                        for (const resultKey in result.valores) {
                            prb.insertar(result.valores[resultKey])
                        }
                    }else {
                        for (const resultKey in result.valores) {
                            prb.insertar(parseInt(result.valores[resultKey]))
                        }
                    }
                    prb.graficar()
                });

                reader.readAsText(upload.files[0]); // Read the uploaded file
            }
        });
    }
})

prb=new AVL()
function getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    var x1 = off1.left + off1.width;
    var y1 = off1.top + off1.height;
    var x2 = off2.left + off2.width;
    var y2 = off2.top;
    var caty=y2-y1
    var catx=x2-x1
    var length = Math.sqrt((Math.pow((catx),2) + (Math.pow((caty),2))));
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    document.getElementById("result").innerHTML += htmlLine;
}



function download(){
    file.valores=avlarray
    var jsonB=new Blob([JSON.stringify(file,null,4)],{ type: 'application/javascript;charset=utf-8' })
    var jsonlink=URL.createObjectURL(jsonB)
    var link=document.createElement("a")
    link.href=jsonlink
    link.download="[AVL].json"
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );
    document.body.removeChild(link);
}