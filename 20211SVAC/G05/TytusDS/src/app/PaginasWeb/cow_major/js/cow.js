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

    eliminar(){
        let actual = this.cuno;
        let anterior = null;

        if (this.cuno!=null){
            do{
                if(actual==this.cfin){
                    if(actual==this.cuno){
                      this.cuno=this.cuno.posterior;
                }else{
                  anterior.posterior=null;
                  this.cfin=anterior;
                  } copia=actual.dato;
                } 
                anterior=actual;
                actual=actual.posterior;
                }while(actual!=null);
                this.ctamaño--
                }
                
        
         }


}

const c = new lista();



class cow{
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
    matriz=[];
    var r=parseInt(xx)*parseInt(yy);
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
    }while(contador<=r)
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
            }while(vx<=xx);
            document.getElementById("tabla").appendChild(tr);

            var l=0;
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            for(var ii=0; ii<matriz.length; ii++){
                th.innerHTML =matriz[ii];
                tr.appendChild(th);
                th.style.textAlign="center";
                th.style.border="5px solid";
                if(l==xx){
                    l=-1;
                    document.getElementById("tabla").appendChild(tr);
                    var tr = document.createElement("tr");
                    var th = document.createElement("th");
                }
                
                
                l++; }

            document.getElementById("tabla").appendChild(tr);
    
            
        
           
             }

}
module.exports = cow;