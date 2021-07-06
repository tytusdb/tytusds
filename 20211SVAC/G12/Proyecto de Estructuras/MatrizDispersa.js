class File {
    constructor(categoria,nombre,animacion,valores) {
        this.categoria=categoria
        this.nombre=nombre
        this.almacenamiento=animacion
        this.valores=valores
    }
}
var file;
var speed;

class Nodo {
    constructor(val,x,y) {
        this.val=val
        this.x=x;
        this.y=y;
        this.down=null;
        this.right=null;
        this.left=null;
        this.up=null;
    }
}

class Matriz {
    constructor() {
        this.head = new Nodo(-1,-1,-1);
        this.arreglo=[];
        this.rows=0;
        this.columns=0;
        this.vals=0
    }

    addColumn(val) {
        this.columns++
        let y=this.head
        let aux = new Nodo(val, val, -1)
        if (y.right == null) {
            y.right = aux;
            aux.left = y;
        } else {
            let te = y.right;
            while (te.right != null && te.x < aux.x) {
                te = te.right;
            }
            if (te.right == null) {
                if(te.x>aux.x){
                    aux.left=te.left
                    aux.right=te
                    te.left.right=aux
                }else{
                    te.right = aux;
                    aux.left = te;
                }
            } else if (te.x > aux.x) {
                let temporal = te.left
                aux.left=te.left
                aux.right=te
                te.left.right=aux
                te.left=aux
            }
        }
    }

    addRow(val) {
        this.rows++
        let x=this.head
        let aux = new Nodo(val, -1, val)
        if (x.down == null) {
            x.down = aux;
            aux.up = x;
        } else {
            let te = x.down
            while (te.down != null && te.y < aux.y) {
                te = te.down
            }
            if (te.down == null) {
                if(te.y>aux.y){
                    aux.up=te.up
                    aux.down=te
                    te.up.down=aux
                    te.up=aux
                }else{
                    te.down = aux;
                    aux.up = te;
                }
            } else if (te.y > aux.y) {
                let temporal = te.up
                aux.up=te.up
                aux.down=te
                te.up.down=aux
                te.up=aux
            }
        }
    }

    getx(val) {
        let temp
        temp = this.head.right
        if (temp == null) {
            return null
        } else {
            while (temp.right != null && temp.x != val) {
                temp = temp.right
            }
            if (temp.x == val) {
                return temp
            }
            return null
        }
    }

    gety(val) {
        let temp
        temp = this.head.down
        if (temp == null) {
            return null
        } else {
            while (temp.down != null && temp.y != val) {
                temp = temp.down
            }
            if (temp.y == val) {
                return temp
            }
            return null
        }
    }

    search(xe,ye){
        let x=this.getx(parseInt(xe))
        let y=this.gety(parseInt(ye))
        if(x!=null&&y!=null){
            while (x.down!=null&&x.y!=ye){
                x=x.down
            }
            if(x.y==ye){
                return x
            }
            return null
        }
        return null
    }

    async buscarValor(val){
        let x=this.head.right
        let y=this.head.down
        while (y!=null){
            x=y.right
            while(x!=null){
                if(x.val==val){
                    let id=x.x+"-"+x.y
                    let elem=document.getElementById(id)
                    await changeColorNode(elem,"yellow",500,"BY")
                   return x
                }
                x=x.right
            }
            y=y.down
        }
        return null
    }

    insert(xe, ye, distancia) {
        this.vals++
        let s=this.search(xe,ye)
        if(s!=null){
            s.val+="\n"+distancia
            return
        }
        xe=parseInt(xe);
        ye=parseInt(ye);
        let x;
        let y;
        x = this.getx(xe);
        y = this.gety(ye);
        if (x == null) {
            this.addColumn(xe);
        }
        if (y == null) {
            this.addRow(ye);
        }
        x = this.getx(xe);
        y = this.gety(ye);
        let aux = new Nodo(distancia, xe, ye)
        if (x.down == null) {
            x.down = aux;
            aux.up = x;
        } else {
            let te = x.down
            while (te.down != null && te.y < aux.y) {
                te = te.down
            }
            if (te.down == null) {
                if(te.y>aux.y){
                    aux.up=te.up
                    aux.down=te
                    te.up.down=aux
                    te.up=aux
                }else{
                    te.down = aux;
                    aux.up = te;
                }
            } else if (te.y > aux.y) {
                aux.up=te.up
                aux.down=te
                te.up.down=aux
                te.up=aux
            }
        }

        if (y.right == null) {
            y.right = aux;
            aux.left = y;
        } else {
            let te = y.right;
            while (te.right != null && te.x < aux.x) {
                te = te.right;
            }
            if (te.right == null) {
                if(te.x>aux.x){
                    aux.left=te.left
                    aux.right=te
                    te.left.right=aux
                    te.left=aux
                }else{
                    te.right = aux;
                    aux.left = te;
                }
            } else if (te.x > aux.x) {
                aux.left=te.left
                aux.right=te
                te.left.right=aux
                te.left=aux
            }
        }
    }

    eliminar(xe,ye) {
        let x=this.getx(parseInt(xe))
        let y=this.gety(parseInt(ye))
        if(x!=null&&y!=null){
            while (x.down!=null&&x.y!=ye){
                x=x.down
            }
            if(x.y==ye){
                x.left.right=x.right
                if(x.right!=null){
                    x.right.left=x.left
                }
                x.up.down=x.down
                if(x.down!=null){
                    x.down.up=x.up
                }
            }
            return null
        }
        return null
    }


    actualizar(nodoi, nodof) {
        let x = this.getx(nodoi);
        let y = this.gety(nodoi);
        if (x != null) {
            x.val = nodof
            while (x != null) {
                x.x = nodof
                x = x.down
            }
        }
        if (y != null) {
            y.val = nodof
            while (y != null) {
                y.y = nodof
                y = y.right
            }
        }
    }

    async insertarArreglo(pos,val){
        pos=parseInt(pos)
        this.arreglo.splice(pos,0,new Nodo(val,-1,-1))
        document.getElementById("result").innerHTML+=`<div id="${"a"+pos}" class="nodo" style="left: ${0}px; top: 90px">${val}</div>`
        let elem=document.getElementById("a"+pos)
        await movexy((pos*150),90,elem,500)
    }

    GraficarArreglo(){
        let res=""
        for (const i in this.arreglo) {
            if(this.arreglo[i]!=null){
                res+=`<div class="nodo" style="top:90px;left:${i*150}px  ">${this.arreglo[i].val}</div>`
            }
        }
    }

    Graficar(){
        let y=this.head
        let x=this.head
        let res=""
        document.getElementById("result").innerHTML=""

        while (y!=null){
            if(y!=this.head){
                res+=`<div id="${y.x}-${y.y}" class="nodoH" style="left: ${200}px;top: ${200*(y.y+2)}px">${y.val}</div>`
            }
            x=y.right
            while (x!=null){
                if(x.y==-1){
                    res+=`<div id="${x.x}-${x.y}" class="nodoH" style="left: ${200*(x.x+2)}px;top: 200px">${x.val}</div>`
                }else {
                    res+=`<div id="${x.x}-${x.y}" class="nodo" style="left: ${200*(x.x+2)}px;top: ${200*(x.y+2)}px">${x.val}</div>`
                }
                x=x.right
            }
            y=y.down
        }
        document.getElementById("result").innerHTML=res
        y=this.head
        x=this.head
        while (y!=null){

            if(y!=this.head&&y.down!=null){
                let id1=y.x+"-"+y.y;
                let id2=y.down.x+"-"+y.down.y;
                let a=document.getElementById(id1)
                let b=document.getElementById(id2)
                connect(a,b,"Black","10")
            }

            x=y
            while (x!=null){
                if(x.right!=null){
                    let id1=x.x+"-"+x.y;
                    let id2=x.right.x+"-"+x.right.y;
                    let a=document.getElementById(id1)
                    let b=document.getElementById(id2)
                    if(a!=null&&b!=null){
                        connect(a,b,"Black","10")
                    }
                }
                if(x.down!=null){
                    let id1=x.x+"-"+x.y;
                    let id2=x.down.x+"-"+x.down.y;
                    let a=document.getElementById(id1)
                    let b=document.getElementById(id2)
                    if(a!=null&&b!=null){
                        connect(a,b,"Black","10")
                    }
                }
                x=x.right
            }
            y=y.down
        }

    }

    async RowMajor(){
        this.arreglo=[this.rows*this.columns]
        let y=this.head.down
        let x=null
        while (y!=null){
            x=y.right
            while (x!=null){
                let pos=((this.columns*(parseInt(x.y)))+(x.x))
                console.log(pos)
                this.arreglo[pos]=x
                let element=document.getElementById(x.x+"-"+x.y)
                await movexy((pos)*150,90,element,500)
                x=x.right
            }
            y=y.down
        }

    }
    async ColumnMajor(){
        this.arreglo=[this.rows*this.columns]
        let x=this.head.right
        let y=null
        while (x!=null){
            y=x.down
            while (y!=null){
                let pos=1*((this.rows*(y.x))+(y.y))
                console.log(pos)
                this.arreglo[pos]=y
                let element=document.getElementById(y.x+"-"+y.y)
                await movexy((pos)*150,90,element,500)
                y=y.down
            }
            x=x.right
        }

    }

}
function getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left ,
        top: rect.top ,
        width: rect.width ,
        height: rect.height
    };
}

function connect(div2, div1,color,thickness) { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    var x1 = off1.left +off1.width/2;
    var y1 = off1.top +off1.height/2 ;
    var x2 = off2.left  +off2.width/2;
    var y2 = off2.top +off2.height/2;
    var caty=y2-y1
    var catx=x2-x1
    var length = Math.sqrt((Math.pow((catx),2) + (Math.pow((caty),2))));
    length=length
    var cx = ((x1 + x2) / 2) - (length / 2)+37;
    var cy = ((y1 + y2) / 2) - (thickness / 2)-37;
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    let id=div2.id+div1.id
    var htmllinecontainer = "<div id=\""+id+"\" style='padding:0px; margin:0px; height:" + 60 + "px; background-color:" + "transparent" + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + (length-74) + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    htmllinecontainer+="\n"
    htmllinecontainer+= "<div id='h"+id+"' style='width: 0; height: 0; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-left: 20px solid "+color+"; padding:0px; margin:0px; position:absolute; left:" + (length-90) + "px;top: "+15+"px ' ></div>";
    htmllinecontainer+= "<div style='width: 0; height: 0; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-right: 20px solid "+color+"; padding:0px; margin:0px; position:absolute; left:" +0+ "px;top: "+15+"px ' >";
    htmllinecontainer+= "</div>";
    var htmlLine = "<div id='l"+id+"' style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left: 0px; top: 30px;   width:" + (length-80) + "px; ' />";
    document.getElementById("result").innerHTML += htmllinecontainer;
    document.getElementById(id).innerHTML += htmlLine;
}

function movexy(x, y, i, speed) {
    return new Promise(resolve => {
        let element = i
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

            resolve()
        }, speed);
    });
}
function changeColorNode(element, color, speed,code) {
    return new Promise(resolve => {
        element.style.animation = "colorChange" + code
            + speed / 1000 + "s" + "ease";
        setTimeout(() => {
            element.style.animation = null;
            element.style.backgroundColor = color;
            element.style.color="black"
            resolve()
        }, speed);
    });
}
