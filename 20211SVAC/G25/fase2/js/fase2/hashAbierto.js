class Hash {
  constructor(tamano) {
    this.tamano = tamano;
    this.table = new Array(1000);
    this. canvas = document.getElementById('visor');
    this.ctx = this.canvas.getContext('2d');

  }
  hash(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
      total += data.charCodeAt(i);
    }
    // Convierte la cadena en caracteres para sumar y realizar una operación cuadrada
    var s = total * total + ""
    // Reserve los 2 dígitos del medio
    var index = s.charAt(s.length / 2 - 1) * 10 + s.charAt(s.length / 2) * 1
    console.log("Hash Value: " + data + " -> " + index);
    return index;
  }
  solveClash(index, value) {
    var table = this.table
    // Realizar el método de dirección abierta lineal para resolver conflictos
    for (var i = 0; index + i < 1000; i++) {
      if (table[index + i] == null) {
        table[index + i] = value;
        break;
      }
    }
  }
  insert(key, val) {
    var index = this.hash(key);
    // Use fetch como índice en la tabla hash
    if (this.table[index] == null) {
      this.table[index] = val;
    } else {
      this.solveClash(index, val);
    }
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
        //console.log(i + ":" + this.table[i]);
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
}
/*var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hash = new Hash();
for (var i = 0; i < someNames.length; ++i) {
  hash.insert(someNames[i], someNames[i]);
}

hash.show();
*/
