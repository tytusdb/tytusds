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
    tr.className = "list-group-item txt-cent";
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
    let temp;
    for(let i = 0; i <numeros.length;i++){
        for (let j = numeros.length - 1; j >= i; j--) {
            if(numeros[j-1]>numeros[j]){
                temp=numeros[j-1];
                numeros[j-1] = numeros[j];
                numeros[j]=temp;
            }
            
        }
    }
    for (let index = 0; index < numeros.length; index++) {
        const tr = document.createElement('tr');
        tr.className = "list-group-item";
        tr.innerHTML = `
            <tr>${numeros[index]}</tr>
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