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

    show() {
        let res = ""
        let display = document.getElementById("storage")
        let tempx = this.head.right;
        let tempy = this.head.down;
        res += "<tr>"
        res += "<td></td>"
        while (tempx != null) {
            res += "<th>" + tempx.val + "</th>"
            tempx = tempx.right
        }
        res += "</tr>"
        tempx = this.head.right
        while (tempy != null) {
            res += "<tr>";
            res += "<td>" + tempy.val + "</td>";
            tempx = this.head.right;
            let te = tempy.right
            while (tempx != null) {
                if (te == null) {
                    res += "<td>" + "x" + "</td>"
                } else if (te.x == tempx.x) {
                    res += "<td>" + te.val + "</td>"
                    if (te.right != null) {
                        te = te.right
                    }
                } else {
                    res += "<td>" + "x" + "</td>"
                }
                tempx = tempx.right
            }
            res += "</tr>";
            tempy = tempy.down
        }
        document.getElementById("result").innerHTML = ""
        display.innerHTML = res
    }

    eliminar(nodo) {
        let temp = this.head
        while (temp.down != null && temp.y != nodo) {
            temp = temp.down
        }
        if (temp.down == null && temp.y == nodo) {
            temp.up.down = null
        } else if (temp.down != null && temp.y == nodo) {
            temp.down.up = temp.up
            temp.up.down = temp.down
        }
        temp = this.head
        while (temp.right != null && temp.x != nodo) {
            temp = temp.right
        }
        if (temp.right == null && temp.x == nodo) {
            temp.left.right = null
        } else if (temp.right != null && temp.x == nodo) {
            temp.right.left = temp.left
            temp.left.right = temp.right
        }
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

    async RowMayor(){
        this.arreglo=[this.rows*this.columns]
        let y=this.head.down
        let x=null
        while (y!=null){
            x=y.right
            while (x!=null){
                let pos=1*(this.columns*(x.x)+(x.y))
                console.log(pos)
                this.arreglo[pos]=x
                let element=document.getElementById(x.x+"-"+x.y)
                await movexy((pos)*150,90,element,500)
                x=x.right
            }
            y=y.down
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