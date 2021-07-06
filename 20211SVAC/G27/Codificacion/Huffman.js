class Heap {
    constructor(fn) {
        this.fn = fn || function (e) {
            return e;
        };
        this.items = [];
    }
    swap(i, j) {
        this.items[i] = [
            this.items[j],
            this.items[j] = this.items[i]
        ][0];
    }
    bubble(index) {
        var parent = ~~((index - 1) / 2);
        if (this.item(parent) < this.item(index)) {
            this.swap(index, parent);
            this.bubble(parent);
        }
    }
    item(index) {
        return this.fn(this.items[index]);
    }
    pop() {
        return this.items.pop();
    }
    sift(index, end) {
        var child = index * 2 + 1;
        if (child < end) {
            if (child + 1 < end && this.item(child + 1) > this.item(child)) {
                child++;
            }
            if (this.item(index) < this.item(child)) {
                this.swap(index, child);
                return this.sift(child, end);
            }
        }
    }
    push() {
        var lastIndex = this.items.length;
        for (var i = 0; i < arguments.length; i++) {
            this.items.push(arguments[i]);
            this.bubble(lastIndex++);
        }
    }
    get length() {
        return this.items.length;
    }
}
  
  
  class Huffman {
    encoden(data) {
      var prob = {};
      var tree = new Heap(function(e) {
        return e[0];
      });
      for (var i = 0; i < data.length; i++) {
        if (prob.hasOwnProperty(data[i])) {
          prob[data[i]]++;
        } else {
          prob[data[i]] = 1;
        }
      }
      Object.keys(prob).sort(function(a, b) {
        return ~~(Math.random() * 2);
      }).forEach(function(e) {
        tree.push([prob[e], e]);
      });
      while (tree.length > 1) {
        var first = tree.pop(),
            second = tree.pop();
        tree.push([first[0] + second[0], [first[1], second[1]]]);
      }
      var dict = {};
      var recurse = function(root, string) {
        if (root.constructor === Array) {
          recurse(root[0], string + '0');
          recurse(root[1], string + '1');
        } else {
          dict[root] = string;
        }
      };
      tree.items = tree.pop()[1];
      recurse(tree.items, '');
      var result = '';
      for (var i = 0; i < data.length; i++) {
        result += dict[data.charAt(i)];
      }
      var header = Object.keys(dict).map(function(e) {
        return e.charCodeAt(0) + '|' + dict[e];
      }).join('-') + '/';
      return header + result;
    }
    decode(string) {
      string = string.split('/');
      var data = string[1].split(''),
          header = {};
      string[0].split('-').forEach(function(e) {
        var values = e.split('|');
        header[values[1]] = String.fromCharCode(values[0]);
      });
      var result = '';
      while (data.length) {
        var i = 0,
            cur = '';
        while (data.length) {
          cur += data.shift();
          if (header.hasOwnProperty(cur)) {
            result += header[cur];
            break;
          }
        }
      }
      return result;
    }
  };
  
  function AbrirArchivo(files){
    var file = files[0];
    var lector = new FileReader();
    lector.onload = function(e) {
      var contenido = e.target.result;
      document.getElementById("Codigo").innerHTML=contenido;;
    };
    lector.onerror = function(e) {
      console.error("File could not be read! Code " + e.target.error.code);
    };
    lector.readAsText(file);
    }
  var Hf = new Huffman;
    
    function nuevoValor(){
      var x = document.getElementById("Codigo").value;
      //document.getElementById("Codigo").value = "";
    //	var y = 
    
       Hf.encoden(x);
       document.getElementById("Codificado").innerHTML=Hf.encoden(x);
      //document.getElementById("Codigo").focus();
      
    };