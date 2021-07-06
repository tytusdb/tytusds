
class Lista {
    constructor() {
        this.vertices=[];
    }
    insert(nodoi,nodof,val){
        let temp=this.vertices.find(x=>
            x.y==nodof
        )
        if (temp==undefined||temp==null){
            this.vertices.push(new Nodo(nodof,-1,nodof))
            temp=this.vertices[this.vertices.length-1]
        }
        temp=this.vertices.find(x=>
            x.y==nodoi
        )
        if (temp==undefined||temp==null){
            this.vertices.push(new Nodo(nodoi,-1,nodoi))
            temp=this.vertices[this.vertices.length-1]
        }

        if(temp.right==null){
            temp.right=new Nodo(val,nodof,nodoi)
            temp.right.left=temp;
        }else{
            temp=temp.right
            while (temp.right!=null&&nodof<temp.x){
                temp=temp.right;
            }
            if(temp.right==null&&nodof<temp.x){
                let nw=new Nodo(val,nodof,nodoi)
                temp.left.right=nw
                nw.left=temp.left
                nw.right=temp
                temp.left=nw
            }else
            if(temp.right==null){
                let nw=new Nodo(val,nodof,nodoi)
                temp.right=nw
                nw.left=temp;
            }else if(temp.right!=null&&nodof<temp.x){
                let nw=new Nodo(val,nodof,nodoi);
                nw.right=temp.right;
                nw.left=temp;
                temp.right=nw;
            }
        }
        this.vertices.sort(compareY);
    }

    show(){
        let res=document.getElementById("result")
        let x=25
        let y=200
        for (const key in this.vertices) {
            res.innerHTML+= `<div class="myDiv" style="top: ${y}px;left: ${x + 'px'}" id=${("n" + this.vertices[key].y)}>${this.vertices[key].y}</div><br />`;
            let temp=this.vertices[key]
            x+=300;
            let aux=temp
            let el=null
            let el2=null
            let id="n"+this.vertices[key].y;
            let id2=""
            while (temp.right!=null){
                temp=temp.right;
                id2=(aux.y+"n"+temp.x)
                res.innerHTML+= `<div class="myDiv" style="top: ${y}px;left: ${x + 'px'}" id=${id2}>${temp.x}</div><br />`;
                el=document.getElementById(id)
                el2=document.getElementById(id2)
                connect(el,el2,"red","10",temp.val)
                x+=300
                id=id2;
            }

            y+=75
            x=25
        }

    }


    busqueda(nodoi,nodof,tipo){
        if (tipo=="profundidad"){
            this.busquedaProfundidad(nodoi,nodof)
        }else if(tipo=="anchura"){
            this.busquedaAnchura(nodoi,nodof)
        }else{
            this.CostoUniforme(nodoi,nodof)
        }
    }

    async busquedaAnchura(nodoi,nodof){
        let l=[];
        let ini=this.vertices.find(x=>
            x.y==nodoi
        )
        var ant=null;
        l.push(ini);
        while (l.length!=0){
            let temp=l.pop();

            if (temp.y==nodof){
                let el=document.getElementById("a"+nodof.toString())
                await changeColorNode(el,"Yellow",500,"BY")
                await this.backtrace(nodoi,temp.y)
                return temp;
            }
            await this.generarSucesores(temp.y).then(
                async x =>{
                    for (const tempKey in x) {
                        let id="a"+temp.y+"a"+x[tempKey].y;
                        await changeColorLine(id,"Yellow",500);
                        l.unshift(x[tempKey])
                    }
                }
            )
            ant=temp;
        }
        return null
    }

    async busquedaProfundidad(nodoi,nodof){
        let ini=this.vertices.find(x=>
            x.y==nodoi
        )
        let l=[]
        var ant=null;
        l.push(ini)
        while (l.length!=0){
            let temp=l.shift();
            if(temp.pre!=-1){
                let id=("a"+temp.pre+"a"+temp.y)
                await changeColorLine(id,"Yellow",500)
            }
            if (temp.y==nodof){
                let el=document.getElementById("a"+nodof.toString())
                await changeColorNode(el,"Yellow",500,"BY")
                await this.backtrace(nodoi,temp.y)
                return temp;
            }
            if(temp.visita==0){
                await this.generarSucesores(temp.y).then(
                    x =>{
                        for (const tempKey in x) {
                            l.unshift(x[tempKey])
                        }
                    }
                )
                temp.visita++
            }
            ant=temp;
        }
        return null
    }

    recorrer(tipo){
        if (tipo=="profundidad"){
            this.recorridoProfundidad()
        }else if(tipo=="anchura"){
            this.recorridoAnchura()
        }
    }

    eliminar(nodo){
        for (const i in this.vertices) {
            let te=this.vertices[i]
            if(te.y==nodo){
                this.vertices.splice(i,1)
            }else {
                let aux=te;
                while(aux.right!=null&&nodo<aux.x){
                    aux=aux.right
                }
                if(aux.x==nodo&&aux.right==null){
                    aux.left.right=null
                }else if(aux.x==nodo&&aux.right!=null){
                    aux.right.left=aux.left
                    aux.left.right=aux.right
                }

            }
        }
    }

    actualizar(nodoi,nodof){
        for (const i in this.vertices) {
            if(this.vertices[i].y==nodoi){
                this.vertices[i].y=nodof
                this.vertices[i].val=nodof
            }
            let aux=this.vertices[i]
            while (aux.right!=null){
                aux=aux.right
                if(aux.x==nodoi){
                    aux.x=nodof
                }
                if(aux.y==nodoi){
                    aux.y=nodof
                }

            }
        }
    }

    async recorridoProfundidad(){
        let ini=this.vertices[0]
        let pila=[];
        var ant=null;
        pila.unshift(ini);
        while (pila.length!=0){
            let temp=pila.shift();
            let el=document.getElementById("a"+temp.y)
            if(temp.pre!=-1){
                let id=("a"+temp.pre+"a"+temp.y)
                await changeColorLine(id,"Yellow",500)
            }
            await changeColorNode(el,"Yellow",500,"BY")
            if (temp.visita==0){
                await this.generarSucesores(temp.y).then(
                    x =>{
                        for (const tempKey in x) {
                            pila.unshift(x[tempKey])
                        }
                    }
                )
                temp.visita++
            }
            ant=temp;
        }
    }


    async generarSucesores(nodo){
        let t=this.vertices.find(x=>
            x.y==nodo
        )
        let res=[];
        let id;
        if (t!=null){
            t=t.right
            while(t!=null){
                let temp=this.vertices.find(x=>
                    x.y==t.x)
                if (temp!=null){
                    temp.pre=nodo;
                    res.push(temp)
                }
                t=t.right;
            }
        }
        //res.sort(compareNumbers)

        return res
    }

    async CostoUniforme(nodoi,nodof){
        let l=[]
        let res=0
        var ant=null;
        var init=this.vertices.find(x=>
            x.y==nodoi
        )
        if (init!=null){
            l.push(init.right)
        }
        while (l.length!=0){
            let temp=l.pop();
            if (temp.y==nodof){
                let el=document.getElementById("a"+nodof.toString())
                await changeColorNode(el,"Yellow",500,"BY")
                await this.backtrace(nodoi,temp.y)
                return temp;
            }
            if(temp.visita==0){
                await this.generarSucesoresCosto(temp.y).then(
                    async x =>{
                        for (const tempKey in x) {
                            if(temp.y!=x[tempKey].y){
                                let id="a"+temp.y+"a"+x[tempKey].y;
                                await changeColorLine(id,"Yellow",500);
                            }
                            l.unshift(x[tempKey])
                        }
                    }
                )
                temp.visita++
            }
            l.sort(compareCosts)
            l.reverse()
            ant=temp;
        }
        return null
    }

    async backtrace(nodoi,nodoR){
        let a=this.vertices.find(x=>
            x.y==nodoR
        )
        let aux=null;
        while (a.y!==nodoi){
            aux=this.vertices.find(x=>x.y==a.pre)
            if (aux.y!=a.y){
                let id="a"+aux.y+"a"+a.y
                await changeColorLine(id,"Blue",500)
            }
            a=aux
        }
    }

    async generarSucesoresCosto(nodo){
        let t=this.vertices.find(x=>
            x.y==nodo
        )
        let res=[];
        if (t!=null){
            t=t.right
            while(t!=null){
                let tem=this.vertices.find(x=>x.y==t.x)
                tem.val=t.val
                tem.pre=nodo;
                res.push(tem)
                t=t.right;
            }
        }
        res.sort(compareCosts)
        return res
    }



    async recorridoAnchura(){
        let ini=this.vertices[0]
        let pila=[];
        var ant=null;
        pila.unshift(ini);
        while (pila.length!=0){
            let temp=pila.pop();
            let el=document.getElementById("a"+temp.y)
            if(temp.pre!=-1){
                let id=("a"+temp.pre+"a"+temp.y)
                await changeColorLine(id,"Yellow",500)
            }
            await changeColorNode(el,"Yellow",500,"BY")
            if (temp.visita==0){
                await this.generarSucesores(temp.y).then(
                    x =>{
                        for (const tempKey in x) {
                            pila.unshift(x[tempKey])
                        }
                    }
                )
                temp.visita++
            }
            ant=temp;
        }
    }

    Graph(){
        let res=""
        let tempx=this.vertices[0].right
        let tempy=this.vertices[0]
        let x=45;
        let y=150;
        let n=0
        for(let key in this.vertices){
            res+=`<div class="circle" style="top: ${y+"px"};left: ${x + 'px'}" id=${"a" + this.vertices[key].val}>${this.vertices[key].val}</div><br />`;
            n++;
            x+=250
            if(n==2){
                y+=250;
                x=45
                n=0;
            }
        }
        document.getElementById("result").innerHTML=res
        tempy=this.vertices
        for (let key in tempy)
        {
            let te=tempy[key]
            while (te!=null){
                te=te.right
                if (te==null){

                }else
                if (te.x!=-1){
                    let a=document.getElementById("a"+te.y);
                    let b=document.getElementById("a"+te.x);
                    if (a!=null&&b!=null){
                        connect(a,b,"red","10",te.val)
                    }
                }
            }
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

function connect(div2, div1,color,thickness,val) { // draw a line connecting elements
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
    htmllinecontainer+="<label style='color: black position: absolute;left: "+(length/2)+"px; top: 14px'>"+val+"</label>"
    htmllinecontainer+= "<div id='h"+id+"' style='width: 0; height: 0; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-left: 20px solid "+color+"; padding:0px; margin:0px; position:absolute; left:" + length + "px; ' >";
    htmllinecontainer+= "</div>";
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

function compareNumbers(a, b) {
    return a - b;
}

function compareY(a,b){
    if (a.y < b.y) {
        return -1;
    } else if (a.y > b.y) {
        return 1;
    } else
        return 0;
}
function compareCosts(a,b){
    return a.val-b.val;
}

function valComparison(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else
        return 0;
}