export class Square {
    private colorRelleno = 'blue';
    private colorBorde = 'black';
    private x = 10;
    private y = 10;
    private z = 30;
  
    constructor(private ctx: CanvasRenderingContext2D,private texto:string) {}
  
    moveRight() {
      this.x++;
      this.draw();
    }
  
    private draw() {
        if(this.texto==undefined) this.texto='1';
        this.ctx.fillStyle = this.colorBorde;
        this.ctx.fillRect((this.z * this.x)-5, (this.z * this.y)-5, this.z+10, this.z+10);
        this.ctx.fillStyle = this.colorRelleno;
        this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = "center";
        this.ctx.font = '24px serif';
        this.ctx.fillText(this.texto,this.z * this.x+15,this.z *this.y+25);
    }
  }
  