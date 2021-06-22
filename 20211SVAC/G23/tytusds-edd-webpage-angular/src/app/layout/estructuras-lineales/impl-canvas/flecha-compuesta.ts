export class FlechaCompuesta{
    x1=0;x2=0;y1=0;y2=0;
    constructor(private ctx: CanvasRenderingContext2D,
        private fromx:number, private fromy:number, 
        private tox:number, private toy:number,
        private anchoLinea:number, private colorFlecha:string,
        private posicionFlecha:string) { 
            this.x1=fromx;
            this.x2=tox;
            this.y1=fromy;
            this.y1=toy;
            fromx=50; fromy=100;
            tox=50, fromy=100;
            this.lines();
            this.canvas_arrow();
        }
    animar(){
        if(this.fromx<this.x1) this.fromx++;
        else if(this.fromx>this.x1) this.fromx--;
        if(this.tox<this.x2) this.tox++;
        else if(this.tox>this.x2) this.tox--;
        this.lines();
        this.canvas_arrow();
    }
    soloPintar(){
        this.fromx=this.x1; this.tox=this.x2;
        this.fromy=this.y1; this.toy=this.y2;
        this.lines();
        this.canvas_arrow();
    }
    lines(){
        if(this.posicionFlecha=='arriba'){
            this.ctx.moveTo(this.fromx, this.fromy);
            this.ctx.lineTo(this.fromx, this.fromy-20);
            this.ctx.lineTo(this.tox, this.fromy-20);
            this.ctx.lineTo(this.tox, this.fromy);
        }else{
            this.ctx.moveTo(this.fromx, this.fromy);
            this.ctx.lineTo(this.fromx, this.fromy+20);
            this.ctx.lineTo(this.tox, this.fromy+20);
            this.ctx.lineTo(this.tox, this.fromy);
        }
    }
    canvas_arrow() {
        var dx = this.tox - this.fromx;
        var dy = this.toy - this.fromy;
        if(this.posicionFlecha=='arriba'){
            this.ctx.moveTo(this.tox, this.toy);
            this.ctx.lineTo(this.tox - 5, this.toy - 5);
            this.ctx.moveTo(this.tox, this.toy);
            this.ctx.lineTo(this.tox + 5, this.toy - 5);
            this.ctx.strokeStyle  = this.colorFlecha;
            this.ctx.lineWidth  = this.anchoLinea;
            this.ctx.stroke();
        }else{
            this.ctx.moveTo(this.tox, this.toy);
            this.ctx.lineTo(this.tox - 5, this.toy + 5);
            this.ctx.moveTo(this.tox, this.toy);
            this.ctx.lineTo(this.tox + 5, this.toy + 5);
            this.ctx.strokeStyle  = this.colorFlecha;
            this.ctx.lineWidth  = this.anchoLinea;
            this.ctx.stroke();
        }
      }
  }