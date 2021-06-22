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
    const li  = document.createElement('li');
    li.className = "list-group-item";
    li.textContent = Number(numero);
    listAgregado.appendChild(li);
    limpiarCampo();
}

function ordenar(){
    while (listOrdenado.firstChild) {
        listOrdenado.removeChild(listOrdenado.firstChild);
    }
    titleTable("ORDENADOS",listOrdenado);
    for(let i = 0; i <numeros.length;i++){
        const elemento = numeros[i];
        let j = i-1;

        while(j>=0 && numeros[j] > elemento){
            numeros[j+1] = numeros[j];
            //pintarInsercion(elemento,numeros);
            j--;
        }
        numeros[j+1] = elemento;
        imprimirInsercion(i);
    }
    
}

function pintarInsercion(elemento,elemento2){
    const html = document.createElement('span');
    html.className = "itera";
    html.textContent = `${elemento} - ${elemento2}`;
    listOrdenado.appendChild(html);
}

function imprimirInsercion(i){

    const tr = document.createElement('tr');
    //tr.textContent = numero;
    tr.className = "list-group-item";
    listOrdenado.appendChild(tr); 

    const table = document.createElement('table');
    table.className = "list-order";

    tr.appendChild(table);

    const th = document.createElement('th');
    th.className = "list-group-item";
    th.innerHTML = `<th>Iteracion ${i}</th>`;
    
    table.appendChild(th);
    
    numeros.forEach((numero) => {
        const tr = document.createElement('tr');
        tr.textContent = numero;
        tr.className = "list-group-item";
        table.appendChild(tr);
    });
    
    
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
