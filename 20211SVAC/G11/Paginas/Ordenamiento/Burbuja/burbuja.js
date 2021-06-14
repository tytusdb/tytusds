bntAgregar = document.getElementById('btnAgregar');
btnOrdenar = document.getElementById('btnOrdenar');
btnLimpiar = document.getElementById('btnLimpiar');
lista_Agregar = document.getElementById('listaAgregar');
lista_Ordenar = document.getElementById('lista_O');

let arrayNumeros = [];

cargarEventos();

function cargarEventos(){
    btnAgregar.addEventListener('click', agregar);
}

function agregar(){
    const numeros = document.getElementById('numeros').value;
    arrayNumeros.push(Number(numeros));
    
    const html = document.createElement('li');
    html.className = "list-group-item";
    html.innerHTML= `
        <li>${Number(numeros)}</li>
    `;
    lista_Agregar.appendChild(html);
}