export class Flecha{
    x1=20;x2=100;y1=10;y2=50;
    constructor(private ctx: CanvasRenderingContext2D,
        private fromx:number, private fromy:number, 
        private tox:number, private toy:number,
        private anchoLinea:number, private colorFlecha:string,
        private esBidireccional:boolean) { 
            this.canvas_arrow();
        }

    canvas_arrow() {
        var headlen = 10; // length of head in pixels
        var dx = this.x2 - this.x1;
        var dy = this.y2 - this.y1;
        var angle = Math.atan2(dy, dx);
        this.ctx.moveTo(this.x1, this.y1);
        if(this.esBidireccional){
            this.ctx.lineTo(this.x1 + headlen * Math.cos(angle - Math.PI / 6), this.y1 - headlen * Math.sin(angle - Math.PI / 6));
            this.ctx.moveTo(this.x1, this.y1);
            this.ctx.lineTo(this.x1 + headlen * Math.cos(angle + Math.PI / 6), this.y1 - headlen * Math.sin(angle + Math.PI / 6));
            this.ctx.moveTo(this.x1, this.y1);}
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.lineTo(this.x2 - headlen * Math.cos(angle - Math.PI / 6), this.y2 - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(this.x2, this.y2);
        this.ctx.lineTo(this.x2 - headlen * Math.cos(angle + Math.PI / 6), this.y2 - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.strokeStyle  = this.colorFlecha;
        this.ctx.lineWidth  = this.anchoLinea;
        this.ctx.stroke();
      }
    animar(){
        if(this.x1<this.fromx) this.x1++;
        if(this.x1>this.fromx) this.x1--;
        if(this.x2<this.tox) this.x2++;
        if(this.x2>this.tox) this.x2--;
        if(this.y1<this.fromy) this.y1++;
        if(this.y1>this.fromy) this.y1--;
        if(this.y2<this.toy) this.y2++;
        if(this.y2>this.toy) this.y2--;
        this.canvas_arrow();
    }
    soloPintar(){
        this.x1=this.fromx; this.x2=this.tox;
        this.y1=this.fromy; this.y2=this.toy;
        this.canvas_arrow();
    }
  }