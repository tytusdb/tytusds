var matriz=[];
var xx;
var yy;

class Nodo{
    constructor(valor1,valor2,valor3){
        this.dato1=valor1;
        this.dato2=valor2;
        this.dato3=valor3;
        this.posterior=null;
        this.ant=null
    }
}


class lista{
    constructor(){
        this.cuno=null;
        this.cfin=null;
        this.ctamaño=0;
    }
    insertar(valor1,valor2,valor3){
        let nodo = new Nodo(valor1,valor2,valor3)
        nodo.dato1=valor1;
        nodo.dato2=valor2;
        nodo.dato3=valor3;
        if(this.cuno==null){
            this.cuno=nodo;
            this.cfin=nodo
            }else{
            nodo.posterior=this.cuno;
            this.cuno=nodo;}
            this.ctamaño++
    }

    eliminar(valor){
        let actual = this.cuno;
        let anterior = null;

        if (this.cuno!=null){
            do{
                if(actual.dato3==valor){
                    if(actual==this.cuno){
                      this.cuno=this.cuno.posterior;
                }else{
                  anterior.posterior=null;
                  this.cfin=anterior;
                  } 
                } 
                anterior=actual;
                actual=actual.posterior;
                }while(actual!=null);
                this.ctamaño--
                }
         }

         modificar(actual,nuevo){
            let aux = this.cuno;
        if (this.cuno!=null){
            do{
                if(aux.dato3==actual){
                    aux.dato3=nuevo; 
                console.log("modi")}
                console.log(aux.dato3+"    l  "+actual)
                aux=aux.posterior;
                }while(aux!=null);}
                
                console.log("no modi")
        
            }
   
    buscar(actual){
        let aux = this.cuno;
    if (this.cuno!=null){
        do{
            if(aux.dato3==actual){
                aux.dato3=nuevo;
            break; }
            aux=aux.posterior;
            }while(aux!=null);}
    
        }



}

const c = new lista();



class row{
    constructor(){}
       
    agregar(x,y,valor){
        c.insertar(x,y,valor);
        console.log("hhh");
    }

    matriz(x,y){
        xx=x;
        yy=y;
        console.log("hhh");
    }

    tabla(){
    var ele= document.getElementById("tabla");
    while (ele.firstChild) {ele.removeChild(ele.firstChild);}   
    matriz=[];
    var r=(parseInt(xx)+1)*(parseInt(yy)+1);
    var contador=0;
    var conx=0;
    var cony=0;
    var aux1=c.cuno;
    do{var bandera=true;
        var aux=c.cuno;
        do{
            if(aux.dato1==conx && aux.dato2==cony){
                matriz.push(aux.dato3);
                bandera=false;
                break;
            }
            aux=aux.posterior;
        }while(aux!=null);
     if(cony==yy){ cony=-1; conx++;}
     cony++;  contador++;
    if(bandera==true){matriz.push("nulo");}

    }while(contador<r)
    console.log(matriz)
    }





             imprimir2(){
                var vx=0;
                let h=matriz;
                let h1=matriz;
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                th.innerHTML =" ";
                tr.appendChild(th);
                do{
                    var th = document.createElement("th");
                    th.innerHTML =vx;
                    tr.appendChild(th);
                    th.style.textAlign="center";
                    th.style.border="5px solid";
                    vx++;
                }while(vx<=yy);
                document.getElementById("tabla").appendChild(tr);
                var aux=0;
                var ca=" ";
                var l=0;
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                    th.innerHTML =aux;
                    tr.appendChild(th);
                    th.style.textAlign="center";
                    th.style.border="5px solid";
                    th.style.backgroundColor="black";
    
                var th = document.createElement("th");
                for(var ii=0; ii<matriz.length; ii++){
                    ca+=" "+matriz[ii];
                    var th = document.createElement("th");
                    th.innerHTML =matriz[ii];
                    tr.appendChild(th);
                    th.style.textAlign="center";
                    th.style.border="1px solid";
                    if(l==yy){
                        console.log(ca)
                        ca=""
                        l=-1;
                        document.getElementById("tabla").appendChild(tr);
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        
                    if(aux<xx){
                        aux++;
                    th.innerHTML =aux;
                    tr.appendChild(th);
                    th.style.textAlign="center";
                    th.style.border="5px solid";
                    }
                       
                    }
                    l++; }
                document.getElementById("tabla").appendChild(tr);
                var elem=document.getElementById("tabla").appendChild(tr);
                elem.style.background = 'white';
                elem.style.borderCollapse="collapse";
                elem.style.width="70%";
                elem.style.backgroundColor="#ffffff";
                elem.style.color="black";
                elem.style.margin="0px auto";
                elem.style.textAlign="center";
                elem.style.border="1px solid";
                 }

    mapeo(vx,vy){
        let b="";
        let arr=[];
        var r=((parseInt(vx))*(parseInt(yy)+1))+(parseInt(vy))
        for(var ii=0; ii<matriz.length; ii++){
            b+=ii+" "
            if(ii==r){
                let str = b;
                arr = str.split(' '); 
                return arr;
            }
        }  


    }

    
    verificar(vx,vy){
        var r=((parseInt(vx))*(parseInt(yy)+1))+(parseInt(vy))
        for(var ii=0; ii<matriz.length; ii++){
            if(ii==r){
                var j=""+ii;
                return j;
            }
        }  


    }

    mapeo1(){
        let b="";
        let arr=[];
        for(var ii=0; ii<matriz.length; ii++){
            b+=ii+" "
           
        }  
        let str = b;
                arr = str.split(' '); 
                return arr;


    }

            vector(){
                var co=0;
                var co2=0;
                let ldatos=[];
                let nodos=[]
                let punteros=[]
                nodos.push({id:"-1", label: "vector 1D",shape:'box' , color:{
                    border:"white",background:"green"
                  }}); 
                  var ii=0;
                  punteros.push({from: "-1", to: ii, label:ii.toString() });
                for(var ii=0; ii<matriz.length; ii++){
                    var m=(parseInt(ii)+1);
                    if(co<=yy){nodos.push({id:ii, label: matriz[ii],shape:'box', color:{
                        border:"white",background:"#F98323"
                      }});  co2=0; }
                    else{nodos.push({id:ii, label: matriz[ii],shape:'box'}); 
                    co2++;
                    if(co2>yy){co=-1}
                }
                    co++;
                    
                    if(ii<matriz.length){
                        punteros.push({from: ii, to: m, label:m.toString() });
                    }
                    
                }
                ldatos.push(nodos)
                ldatos.push(punteros)
                return ldatos;
            }


    eliminar(vx,vy){
        var r=((parseInt(vx))*(parseInt(yy)+1))+(parseInt(vy))
        for(var ii=0; ii<matriz.length; ii++){
            if(ii==r){
                c.eliminar(matriz[ii]);
            }

        }
        
    }

    modificar(vx,vy,nuevo){
        var r=((parseInt(vx))*(parseInt(yy)+1))+(parseInt(vy))
        for(var ii=0; ii<matriz.length; ii++){
            if(ii==r){
                c.modificar(matriz[ii],nuevo);
            }

        }
    }
    
   


    leer1(){
        let ldatos=[];
            ldatos.push(xx);
            ldatos.push(yy);
            
            return ldatos;
          }



    leer(){
        var aux1=c.cuno;
        let ldatos=[];
        
            if (c.cuno!=null){
                do{ 
                    var padre =new Object();
                    let hijo=[];
                    hijo.push(aux1.dato1);
                    hijo.push(aux1.dato2);
                    padre.indices=hijo;
                    padre.valor=aux1.dato3;
                    ldatos.push(padre);
                    aux1=aux1.posterior
                }while(aux1!=null);
            }
            else{console.log("sin datos"); }
            return ldatos;
          }
        

}
module.exports = row;