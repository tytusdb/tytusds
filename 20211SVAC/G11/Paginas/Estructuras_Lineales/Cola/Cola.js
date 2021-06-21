$(document).ready(main);

class Cola {
    constructor(){
        this.elementos = [];
    }    
    
    encolar(elemento){
      this.elementos.push(elemento);
      return this.elementos;
    }

    desencolar(){
      return this.elementos.shift();
    }

    peek(){
        return this.elementos[0];
    }

    size(){
        return this.elementos.length;;
    }

    isEmpty = () => {
      return this.elementos.length === 0;
    }

    print(){
        return this.elementos;
    }    
  }

function main () {
    const queue = new Cola();
    
	$('.btn-Ingrese').click(function(){
        let porId = document.getElementById("valor").value;
        queue.encolar(porId);
        console.log(queue.print())
        alert("Cola: " + queue.print())
	});

  $('.btn-Elimina').click(function(){
        alert("Se elimino el elemento: " + queue.desencolar() + ' ' + "Cola: " + queue.print())
        console.log(queue.print())
	});

  $('.btn-Actualizar').click(function(){
    alert("Actualizar")
  });

  $('.btn-Buscar').click(function(){
    alert("Buscar") 
  });

  $('.btn-Guardar').click(function(){
    alert("Guardar")
  });
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}