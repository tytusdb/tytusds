export class RectanguloDobleNodo {
    private colorRelleno = 'blue';
    private colorBorde = 'black';
    private colorTexto = 'gray';
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
        private y:number, private ancho:number, private alto:number) { 
            this.calcularCoords();
            this.draw(); 
        }
  
    moveRight() {
      this.x++;
      this.draw();
    }
  
    private draw() {
        if(this.texto==undefined) this.texto='1';
        this.ctx.fillStyle = this.colorBorde;
        this.ctx.fillRect(this.xFinal, this.yFinal, this.ancho, this.alto);
        this.ctx.fillStyle = this.colorRelleno;
        this.ctx.fillRect(this.xFinal+this.anchoRectangulo, this.yFinal+this.anchoRectangulo, this.ancho-this.anchoRectangulo*2, this.alto-this.anchoRectangulo*2);
        this.ctx.fillStyle = this.colorBorde;
        this.ctx.fillRect( this.xFinal+this.ancho*2/3, this.yFinal, this.anchoRectangulo, this.alto);
        this.drawText();
    }
    public drawText(){
        this.ctx.fillStyle = this.colorTexto;
        this.ctx.textAlign = "center";
        this.ctx.font = this.estiloTexto;
        var sumaX=0;
        if(this.texto.length<=3) sumaX=this.ancho/4;
        else sumaX=this.ancho/2;
        this.ctx.fillText(this.texto,(this.ancho * this.x)+sumaX,this.alto *this.y+23);
    }

    private calcularCoords(){
        this.xFinal=10+(this.ancho * this.x);
        this.yFinal=(this.alto * this.y);
        this.yCola =this.alto *this.y+15;
        this.xCola = this.xFinal+this.ancho-10;
        this.xHead= this.xFinal+15;        
    }
  }
  