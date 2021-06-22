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

  $('#btnOrdenar').click(function(){
    //let aux;
    let listaOrdenar = document.getElementById('listaOrdenar');
    // Ordena los Elementos del Array  
    /*
    for(let i=1;i<array.length;i++){
        const element = array[i];
        let j = i-1;
        
        while( j >= 0 && array[j]>element){
            array[j + 1]= array[j];
            dibujar(element,array[j]);
            j--;
        }
        array[j + 1] = element;
        imprimir(i);
        //20-24-18-29-14-26
    }
    console.log(array);*/
    //------------------------------------------------------------
    for(i=0;i<array.length;i++){
        let minimo = i;
        console.log('iteracion '+ i );
        console.log('valor inicial: ' + array[i])
        for(j=i+1;j<array.length;j++){
            if(array[minimo]>array[j]){
                minimo = j;
            }
        }
        console.log('Valor Minimo: '+array[minimo]);
        imprimir(i);
        dibujar(array[minimo]);
        let temporal  = array [i];
        array[i]=array[minimo];
        array[minimo]= temporal;
    }
    console.log(array)
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

  $('.btn-Guardar').click(function(){
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