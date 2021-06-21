//------------------------------------------------------------
//--------------------------------------------------------------------
$(document).ready(main);

let array = [];

function main () {
	$('#btnAgregar').click(function(){
        const porId = document.getElementById("numeros");
        const listaAgregar = document.getElementById('listaAgregar');
        array.push(Number(porId.value));
        console.log(array);
        //alert("Cola: " + array);
        const html = document.createElement('li');
        html.className = "list-group-item";
        html.textContent = Number(porId.value);
        listaAgregar.appendChild(html);

        // Limpiar input
        porId.value ="";
        porId.focus();
	});

  $('#btnOrdenar').click(function (){
    let listaOrdenar = document.getElementById('listaOrdenar');
    
    //---------------------------------------------------------------------
    
    console.log(quick(array));
    //---------------------------------------------------------------------    
  });

  $('#btnLimpiar').click(function(){
    while(listaAgregar.firstChild) {
        listaAgregar.removeChild(listaAgregar.firstChild);
    }

    while(listaOrdenar.firstChild){        
        listaOrdenar.removeChild(listaOrdenar.firstChild);
    }
    array=[];
  });

  $('#btnGuardar').click(function(){
    alert("Guardar")
  });
   
	// Mostramos y ocultamos submenus
	$('.submenu').click(function(){
		$(this).children('.children').slideToggle();
	});
}

function dibujar(elem){
    const listaOrdenar = document.getElementById('listaOrdenar');  

    const html = document.createElement('span');
    html.className="text-danger fw-bold fs-6";
    html.textContent = `Valor Minimo:  ${elem}`;
    listaOrdenar.appendChild(html);
}

function imprimir(i){
    const listaOrdenar = document.getElementById('listaOrdenar'); 
    var fragment = new DocumentFragment();
    const ul =document.createElement('ul');
    ul.className = "list-group list-group-horizontal mt-2";
    ul.textContent = `Iteracion ${i}`;

    array.forEach((numero)=>{
        const li = document.createElement('li');
        li.className="list-group-item";
        li.textContent = numero;
        fragment.appendChild(li);
    });
    ul.appendChild(fragment);
    listaOrdenar.appendChild(ul);
}

function quick(array){
    if (array.length == 0){
        return []
    }

    let mediumIndex = Math.floor(array.length / 2);
    let pivot = array[mediumIndex];
    //dibujar(pivot);
    let leftArray = [];
    let R_Array = [];

    for(let index = 0;index < array.length;index++){
        if(index != mediumIndex){
            if(array[index]>pivot){
                R_Array.push(array[index])
                //dibujar(R_Array);
            }
            else{
                leftArray.push(array[index])
                //dibujar(R_Array);
            }
            //imprimir(index);
        }        
    }
    
    leftArray = quick(leftArray);
    R_Array = quick(R_Array);
    dibujar(leftArray.concat(pivot).concat(R_Array));
    return leftArray.concat(pivot).concat(R_Array);    
}