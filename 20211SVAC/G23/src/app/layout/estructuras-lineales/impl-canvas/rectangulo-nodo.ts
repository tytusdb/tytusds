export class RectanguloNodo {
    private colorRelleno = 'black';
    private colorBorde = 'white';
    private colorTexto = 'white';
    private estiloTexto = 'bold 16px Verdana';
    private anchoRectangulo=3;
    public xCola=0;
    public yCola=0;
    public xHead=0;
    public xFinal=0;
    public yFinal=0;
    public xInicial=0;
    public yInicial=0;
  
    constructor(private ctx: CanvasRenderingContext2D,private texto:string, private x:number,
        private y:number, private ancho:number, private alto:number,
        private esDoble:boolean, private banderaAnimar:boolean) { 
            this.calcularCoords();
            this.draw(); 
        }
    getTexto(){
        return this.texto;
    }

    private draw() {
        if(this.texto==undefined) this.texto='1';
        this.ctx.fillStyle = this.colorBorde;
        this.ctx.fillRect(this.xInicial, this.yInicial, this.ancho, this.alto);
        this.ctx.fillStyle = this.colorRelleno;
        this.ctx.fillRect(this.xInicial+this.anchoRectangulo, this.yInicial+this.anchoRectangulo, this.ancho-this.anchoRectangulo*2, this.alto-this.anchoRectangulo*2);
        this.ctx.fillStyle = this.colorBorde;
        this.ctx.fillRect( this.xInicial+this.ancho*2/3, this.yInicial, this.anchoRectangulo, this.alto);
        if(this.esDoble){
            this.ctx.fillRect( this.xInicial+this.ancho/3, this.yInicial, this.anchoRectangulo, this.alto);
        }
        this.drawText();
    }
    public drawText(){
        this.ctx.fillStyle = this.colorTexto;
        this.ctx.textAlign = "center";
        this.ctx.font = this.estiloTexto;
        var sumaX=0;
        if(this.texto.length<=3) sumaX=this.ancho/4;
        else sumaX=this.ancho/2;
        if(this.esDoble){
            this.ctx.fillText( this.texto, this.xInicial+this.ancho/2, this.yInicial+23);
        }else{
            this.ctx.fillText( this.texto, this.xInicial+this.ancho/3, this.yInicial+23);
        }
    }

    private calcularCoords(){
        this.xFinal=10+(this.ancho * this.x);
        this.yFinal=(this.alto * this.y);
        this.yCola =this.alto *this.y+15;
        this.xCola = this.xFinal+this.ancho-10;
        this.xHead= this.xFinal+15;     
        this.xInicial = this.ctx.canvas.width/2;
        this.yInicial = 20;
        if(this.banderaAnimar==false){
            this.xInicial = this.xFinal;
            this.yInicial = this.yFinal;
        }
    }

    animar(){
        if(this.xInicial<this.xFinal) this.xInicial+=1;
        else if(this.xInicial>this.xFinal) this.xInicial-=1;
        if(this.yInicial<this.yFinal) this.yInicial+=1;
        else if(this.yInicial>this.yFinal) this.yInicial-=1;
        this.draw();
    }
  }
  