btnAgregar = document.getElementById('btnAgregar');
btnOrdenar = document.getElementById('btnOrdenar');
btnLimpiar = document.getElementById('btnLimpiar');

listAgregado = document.getElementById('listAgregado');
listOrdenado = document.getElementById('listOrdenado');

let numeros = [];

cargarEventos();

function cargarEventos(){

    btnAgregar.addEventListener('click', agregar);
    btnOrdenar.addEventListener('click', ordenar);
    btnLimpiar.addEventListener('click', limpiar);
}

function agregar(){

    while (listOrdenado.firstChild) {
        listOrdenado.removeChild(listOrdenado.firstChild);
    }
    titleTable("ORDENADOS",listOrdenado);
    const numero = document.getElementById('numero').value;
    numeros.push(Number(numero));
    const tr = document.createElement('tr');
    tr.className = "list-group-item";
    tr.innerHTML = `
        <tr>${Number(numero)}</tr>
    `;
    listAgregado.appendChild(tr);
    limpiarCampo();
}

function ordenar(){

    while (listOrdenado.firstChild) {
        listOrdenado.removeChild(listOrdenado.firstChild);
    }
    titleTable("ORDENADOS",listOrdenado);
    
    const quickSort = ([x = [], ...xs]) =>{
        return (x.length === 0 ) ? [] : [
            ...quickSort(xs.filter(y => y <= x)),
            x,
            ...quickSort(xs.filter(y => y > x))
        ];
    }
    let array = quickSort(numeros);
    for (let index = 0; index < array.length; index++) {
        const tr = document.createElement('tr');
        tr.className = "list-group-item";
        tr.innerHTML = `
            <tr>${array[index]}</tr>
        `;
        listOrdenado.appendChild(tr);
    }
}

function limpiar(){

    while (listAgregado.firstChild) {
        listAgregado.removeChild(listAgregado.firstChild);
    }
    
    while (listOrdenado.firstChild) {
        listOrdenado.removeChild(listOrdenado.firstChild);
    }

    limpiarCampo();

    titleTable("AGREGADOS",listAgregado);
    titleTable("ORDENADOS",listOrdenado);

    numeros=[];
}

function limpiarCampo(){
    document.getElementById('numero').value = "";
}

function titleTable(title,lista){
    const th = document.createElement('th');
    th.className = "title";
    th.innerHTML = `
        <th>${title}</th>
    `;
    lista.appendChild(th);
}