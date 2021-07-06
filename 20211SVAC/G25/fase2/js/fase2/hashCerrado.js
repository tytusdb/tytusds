class Hash {
  constructor() {
    this.table = new Array(1024);
    this. canvas = document.getElementById('visor');
    this.ctx = this.canvas.getContext('2d');
  }
  hash(data) {
    // Agregue los valores de código ASCLL de cada carácter en la cadena y luego tome el resto de la longitud de la matriz
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    console.log("Hash Value: " + data + " -> " + total);
    return total % this.table.length;
  }
  insert(key, val) {
    var pos = this.hash(key);
    this.table[pos] = val;
  }
  get(key) {
    var pos = this.hash(key);
    return this.table[pos]
  }
  showGet(value){
    var pos = this.get(value);
    console.log(pos);
    var cuadro = 20;
    var separacionx = 75;
    var indicey = 0;
    var indicex = 0;

    this.canvas.width = this.canvas.width;

    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] != undefined) {
        //console.log("comparando i: "+i+" con: "+pos);
        if (this.table[i]==pos) {
        this.ctx.fillStyle = "red";
        //console.log("encontrado");
        }

        //console.log(i + ":" + this.table[i]);
        //dibujo del cuadro
        this.ctx.strokeRect(20+(separacionx*indicey),(cuadro*indicex),cuadro*2,cuadro);
        //texto dentro del cuadro
        this.ctx.fillText(this.table[i],25+(separacionx*indicey),(cuadro*indicex)+15);
        //texto fuera del cuadro
        this.ctx.fillText(i,(separacionx*indicey),(cuadro*indicex)+15);
        if (this.table[i]==pos) {
        this.ctx.fillStyle = "black";
        }
        indicex++;
        //console.log("valor x:"+indicex);
        if (indicex==25) {
          indicey++;
          indicex = 0;
        }
      }
    }
  }
  show() {
    var cuadro = 20;
    var separacionx = 75;
    var indicey = 0;
    var indicex = 0;

    this.canvas.width = this.canvas.width;
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] != undefined) {
        console.log(i + ":" + this.table[i]);
        //dibujo del cuadro
        this.ctx.strokeRect(20+(separacionx*indicey),(cuadro*indicex),cuadro*2,cuadro);
        //texto dentro del cuadro
        this.ctx.fillText(this.table[i],25+(separacionx*indicey),(cuadro*indicex)+15);
        //texto fuera del cuadro
        this.ctx.fillText(i,(separacionx*indicey),(cuadro*indicex)+15);
        indicex++;
        //console.log("valor x:"+indicex);
        if (indicex==25) {
          indicey++;
          indicex = 0;
        }
      }
    }
  }

/*var someNames = ["12", "15", "25", "16", "45", "75", "74", "15", "13"];
var hash = new Hash();
for (var i = 0; i < someNames.length; ++i) {
  hash.insert(someNames[i], someNames[i]);*/
}

//hash.show();
