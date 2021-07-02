class File {
    constructor(categoria,nombre,almacenamiento,animacion,valores) {
        this.categoria=categoria
        this.nombre=nombre
        this.almacenamiento=almacenamiento
        this.animacion=animacion
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
        this.right=null;
    }
}

class Matriz{
    constructor() {
        this.head=new Nodo(0);
    }

    addColumn(val){
        let temp
        temp=this.head.right
        if (temp==null){
            let nw=new Nodo(val,val,0);
            this.head.right=nw;
            nw.left=this.head
        }else {
            while (temp.right!=null&&temp.val<val){
                temp=temp.right;
            }
            if (temp.right==null&&temp.val<val){
                let nw=new Nodo(val,val,0);
                temp.right=nw;
                nw.left=temp;
            }else if(temp.right==null&&temp.val>val){
                let nw=new Nodo(val,val,0);
                this.head.right=nw;
                nw.left=this.head;
                nw.right=temp;
                temp.left=nw;
            }
            else if(temp.right!=null&&temp.val!=val){
                let aux=temp.right;
                let nw=new Nodo(val,val,0);
                temp.right=nw;
                nw.right=aux;
                aux.left=nw;
                nw.left=temp;
            }
        }
    }

    addRow(val){
        let temp
        temp=this.head.down
        if (temp==null){
            let nw=new Nodo(val,0,val);
            this.head.down=nw;
            nw.up=this.head;
        }else {
            while (temp.down!=null&&temp.val<val){
                temp=temp.down;
            }
            if (temp.down==null&&temp.val<val){
                let nw=new Nodo(val,0,val);
                temp.down=nw;
                nw.up=temp;
            }
            else if(temp.down==null&&temp.val>val){
                let nw=new Nodo(val,0,val);
                this.head.down=nw;
                nw.up=this.head;
                nw.down=temp;
                temp.up=nw;
            }
            else if(temp.down!=null&&temp.val!=val){
                let aux=temp.down;
                let nw=new Nodo(val,0,val);
                temp.down=nw;
                nw.down=aux;
                aux.up=nw;
                nw.up=temp;
            }
        }
    }

    getx(val){
        let temp
        temp=this.head.right
        if (temp==null){
            return null
        }else{
            while(temp.right!=null&&temp.val!=val){
                temp=temp.right
            }
            if (temp.val==val){
                return temp
            }
            return null
        }
    }

    gety(val){
        let temp
        temp=this.head.down
        if (temp==null){
            return null
        }else{
            while(temp.down!=null&&temp.val!=val){
                temp=temp.down
            }
            if (temp.val==val){
                return temp
            }
            return null
        }
    }

    insert(nodoi,nodof,distancia){
        let x;
        let y;
        let t;
        let t2;
        x=this.getx(nodof);
        y=this.gety(nodoi);
        t=this.gety(nodof);
        t2=this.getx(nodoi);
        if (x==null){
            this.addColumn(nodof);

        }
        if (y==null){
            this.addRow(nodoi);

        }
        if (t==null){
            this.addRow(nodof)
        }
        if (t2==null){
            this.addColumn(nodoi)
        }
        x=this.getx(nodof);
        y=this.gety(nodoi);
        let aux=new Nodo(distancia,nodof,nodoi)
        if (x.down==null){
            x.down=aux;
            aux.up=x;
        }else {
            let te=x.down
            while (te.down!=null&&te.y<aux.y){
                te=te.down
            }
            if(te.down==null){
                te.down=aux;
                aux.up=te;
            }else if(te.y<aux.y){
                let temporal=te.down
                te.down=aux;
                aux.down=temporal;
                temporal.up=aux;
                aux.up=te;
            }
        }

        if (y.right==null){
            y.right=aux;
            aux.left=y;
        }else {
            let te=y.right;
            while (te.right!=null&&te.x<aux.x){
                te=te.right;
            }
            if(te.right==null){
                te.right=aux;
                aux.left=te;
            }else if(te.x<aux.x){
                let temporal=te.right
                te.right=aux;
                aux.right=temporal;
                temporal.left=aux;
                aux.left=te;
            }
        }

    }

    show(){
        let res=""
        let display=document.getElementById("storage")
        let tempx=this.head.right;
        let tempy=this.head.down;
        res+="<tr>"
        res+="<td></td>"
        while(tempx!=null){
            res+="<th>"+tempx.val+"</th>"
            tempx=tempx.right
        }
        res+="</tr>"
        tempx=this.head.right
        while (tempy!=null){
            res+="<tr>";
            res+="<td>"+tempy.val+"</td>";
            tempx=this.head.right;
            let te=tempy.right
            while (tempx!=null){
                if(te==null){
                    res+="<td>"+"x"+"</td>"
                }else
                if (te.x==tempx.x){
                    res+="<td>"+te.val+"</td>"
                    if (te.right!=null){
                        te=te.right
                    }
                }else {
                    res+="<td>"+"x"+"</td>"
                }
                tempx=tempx.right
            }
            res+="</tr>";
            tempy=tempy.down
        }
        display.innerHTML=res
    }

    Graph(){
        let res=""
        let tempx=this.head.right;
        let tempy=this.head.down;
        let x=45;
        let y=150;
        let n=0
        while(tempy!=null){
            res+=`<div class="circle" style="top: ${y+"px"};left: ${x + 'px'}" id=${"a" + tempy.val}>${tempy.val}</div><br />`;
            tempy=tempy.down;
            n++;
            x+=250
            if(n==2){
                y+=250;
                x=45
                n=0;
            }
        }
        document.getElementById("result").innerHTML+=res
        tempy=this.head.down;
        while (tempy!=null){
            tempx=this.head.right
            let te=tempy.right;
            while (tempx!=null){
                if (te==null){

                }else
                if (te.x==tempx.val){
                    let a=document.getElementById("a"+te.y);
                    let b=document.getElementById("a"+te.x);
                    if (a!=null&&b!=null){
                        connect(a,b,"red","10")
                    }
                    te=te.right
                }
                tempx=tempx.right
            }
            tempy=tempy.down
        }

    }

    async busquedaAnchura(nodoi,nodof){
       let l=[]
       l.push(nodoi)
       while (l.length!=0){
           let temp=l.pop();
           if (temp==nodof){
               let el=document.getElementById("a"+nodof.toString())
               await changeColorNode(el,"Yellow",500,"BY")
               return temp;
           }
           let s;
           await this.generarSucesores(temp).then(
               x =>{
                   for (const tempKey in x) {
                       l.unshift(x[tempKey])
                   }
               }
           )

       }
       return null
    }

    async busquedaProfundidad(nodoi,nodof){
        let l=[]
        l.push(nodoi)
        while (l.length!=0){
            let temp=l.shift();
            if (temp==nodof){
                let el=document.getElementById("a"+nodof.toString())
                await changeColorNode(el,"Yellow",500,"BY")
                return temp;
            }
            let s;
            await this.generarSucesores(temp).then(
                x =>{
                    for (const tempKey in x) {
                        l.unshift(x[tempKey])
                    }
                }
            )

        }
        return null
    }

    async generarSucesores(nodo){
        let t=this.gety(nodo);
        let res=[];
        let id;
        if (t!=null){
            t=t.right
            while(t!=null){
                res.push(t.x)
                id="a"+nodo.toString()+"a"+t.x.toString();
                await changeColorLine(id,"Yellow",500)
                t=t.right;
            }
        }
      return res
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
    var x1 = off1.left + off1.width/2;
    var y1 = off1.top + off1.height/2;
    var x2 = off2.left + off2.width/2;
    var y2 = off2.top+off2.width/2;
    var caty=y2-y1
    var catx=x2-x1
    var length = Math.sqrt((Math.pow((catx),2) + (Math.pow((caty),2))));
    length=length-150
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    let id=div2.id+div1.id
    var htmllinecontainer = "<div id=\""+id+"\" style='padding:0px; margin:0px; height:" + 60 + "px; background-color:" + "transparent" + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    htmllinecontainer+="\n"
    htmllinecontainer+= "<div id='h"+id+"' style='width: 0; height: 0; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-left: 20px solid "+color+"; padding:0px; margin:0px; position:absolute; left:" + (length) + "px; ' />";
    var htmlLine = "<div id='l"+id+"' style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left: 0px; top: 14px;   width:" + length + "px; ' />";
    document.getElementById("result").innerHTML += htmllinecontainer;
    document.getElementById(id).innerHTML += htmlLine;
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

function changeColorLine(id, color, speed) {
    return new Promise(resolve => {
        let element=document.getElementById("l"+id);
        let element2=document.getElementById("h"+id);
        element.style.animation = "colorChange" + color
            + speed / 1000 + "s" + "ease";
        element2.style.animation = "colorChange" + color
            + speed / 1000 + "s" + "ease";
        setTimeout(() => {
            element.style.animation = null;
            element.style.backgroundColor = color;
            resolve()
        }, speed);
    });
}