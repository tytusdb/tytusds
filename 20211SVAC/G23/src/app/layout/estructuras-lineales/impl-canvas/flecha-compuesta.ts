export class FlechaCompuesta{
    constructor(private ctx: CanvasRenderingContext2D,
        private fromx:number, private fromy:number, 
        private tox:number, private toy:number,
        private anchoLinea:number, private colorFlecha:string,
        private posicionFlecha:string) { 
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