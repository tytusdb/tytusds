export class Flecha{
    constructor(private ctx: CanvasRenderingContext2D,
        private fromx:number, private fromy:number, 
        private tox:number, private toy:number,
        private anchoLinea:number, private colorFlecha:string) { 
            this.canvas_arrow();
        }

    canvas_arrow() {
        var headlen = 10; // length of head in pixels
        var dx = this.tox - this.fromx;
        var dy = this.toy - this.fromy;
        var angle = Math.atan2(dy, dx);
        this.ctx.moveTo(this.fromx, this.fromy);
        this.ctx.lineTo(this.tox, this.toy);
        this.ctx.lineTo(this.tox - headlen * Math.cos(angle - Math.PI / 6), this.toy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(this.tox, this.toy);
        this.ctx.lineTo(this.tox - headlen * Math.cos(angle + Math.PI / 6), this.toy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.strokeStyle  = this.colorFlecha;
        this.ctx.lineWidth  = this.anchoLinea;
        this.ctx.stroke();
      }
  }