class ArregloMD{
    constructor(){
        this.elementos = [];
        this.largoX = 0;
        this.largoY = 0;
    }

    insertar(x, y, dato){
        
        if(this.elementos[x] == null){
            this.elementos[x] = []
        }

        this.elementos[x][y] = dato;
        if(this.elementos.length > this.largoX){
            this.largoX = this.elementos.length;
        }
        if(this.elementos[x].length > this.largoY){
            this.largoY = this.elementos[x].length;
        }
    }

    getDato(x,y){
        if(x < this.elementos.length){
            if(y < this.elementos[x].length){
                return this.elementos[x][y];
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    existe(dato){
        for (let i = 0; i < this.elementos.length; i++) {
            if(this.elementos[i] != null){
                for (let j = 0; j < this.elementos[i].length; j++) {
                    if(this.elementos[i][j] == dato){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    actualizar(dato, nuevo, x = null, y = null){
        console.log(nuevo);
        if(x == null && y == null){
            for (let i = 0; i < this.elementos.length; i++) {
                if(this.elementos[i] != null){
                    for (let j = 0; j < this.elementos[i].length; j++) {
                        if(this.elementos[i][j] == dato){
                            this.elementos[i][j] = nuevo;
                        }
                    }
                }
            }

        }else{
            for (let i = 0; i < this.elementos.length; i++) {
                if(this.elementos[i] != null){
                    for (let j = 0; j < this.elementos[i].length; j++) {
                        if(i == x && j == y){
                            this.elementos[i][j] = nuevo;
                        }
                    }
                }
            }
        }
    }

    eliminar(dato, x = null, y = null){
        
        if(x == null && y == null){
            for (let i = 0; i < this.elementos.length; i++) {
                if(this.elementos[i] != null){
                    for (let j = 0; j < this.elementos[i].length; j++) {
                        if(this.elementos[i][j] == dato){
                            this.elementos[i][j] == null;
                        }
                    }
                }
            }
        }else{
            for (let i = 0; i < this.elementos.length; i++) {
                if(this.elementos[i] != null){
                    for (let j = 0; j < this.elementos[i].length; j++) {
                        if(i == x && j == y){
                            this.elementos[i][j] == null;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.elementos.length; i++) {//para actualizar el largo de filas y columnas
            if(this.elementos[i] != null){
                for (let j = 0; j < this.elementos[i].length; j++) {
                    if(this.elementos[i][j] != null){
                        this.largoX = i + 1;
                        this.largoY = j + 1
                    }
                }
            }
        }
        
    }

    getRowMajor(){
        let row = new RowMajor();
        let i;
        let j = 0;
        while(j < this.largoY){
            i = 0
            while(i < this.largoX){
                if(this.elementos[i] != null){
                    row.lista.push(this.elementos[i][j]);
                    if(row.listaFilas[j] == null){
                        row.listaFilas[j] = []
                    }
                    row.listaFilas[j].push(this.elementos[i][j])
                }else{
                    row.lista.push(null);
                    if(i == this.largoX -1){
                        row.listaFilas.push(null);
                    }
                }
                i++;
            }
            j++;
        }

        return row;
    }

    getColMajor(){
        let col = new ColMajor();
        let j;
        let i = 0;
        while(i < this.largoX){
            j = 0;
            while(j < this.largoY){
                if(this.elementos[i] != null){
                    col.lista.push(this.elementos[i][j]);
                    if(col.listaColumnas[i] == null){
                        col.listaColumnas = [];
                    }
                    col.listaColumnas[i].push(this.elementos[i][j]);
                }else{
                    col.lista.push(null);
                    if(j == this.largoY -1){
                        col.listaColumnas.push(null);
                    }
                }
                j++;
            }
            i++;
        }

        return col;
    }

    imprimir(){
        let i;
        let j = 0;
        let texto;

        while(j < this.largoY){
            texto = "";
            i = 0;
            while(i < this.largoX){
                if(this.elementos[i] != null){
                    if(this.elementos[i][j] != null){
                        texto += "| "+this.elementos[i][j].toString()+" |"
                        
                    }else{
                        texto += "| - |";  
                    }
                }else{
                    texto += "| - |";
                }
                i++;
            }
            console.log(texto);
            j++;
        }
        console.log('');
    }

    mostrar(){
        
        let i;
        let j = 0;
        let texto;
        borrar_canvas()
        reiniciar_posixiones()
        while(j < this.largoY){
            texto = "";
            i = 0;
            while(i < this.largoX){
                if(this.elementos[i] != null){
                    if(this.elementos[i][j] != null){
                        crearMatriz(i, j, this.elementos[i][j].toString())
                        
                    }else{
                        crearMatriz(i, j, ' ')    
                    }
                }else{
                }
                i++;
            }
            j++;
        }
        this.imprimir()
    }   
}

class RowMajor{
    constructor(){
        this.lista = []
        this.listaFilas = []
    }
}

class ColMajor{
    constructor(){
        this.lista = []
        this.listaColumnas = []
    }
}

arreglo = new ArregloMD();

const posX = document.getElementById('x');
const posY = document.getElementById('y');
const dato = document.getElementById('dato');
const datoB = document.getElementById('datob');

const agregar = document.getElementById('agregar');
const eliminar = document.getElementById('eliminar');
const actualizar = document.getElementById('actualizar');
const buscar = document.getElementById('buscar');
const limpiar = document.getElementById('limpiar');

const lienzo = document.getElementById('lienzo');
const reporte = document.getElementById('reporte');

const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');
const archivo = document.getElementById('file');

const btColMajor = document.getElementById('colmajor');
const btRowMajor = document.getElementById('rowmajor');

let entrada;

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != '' && posX.value != '' && posY.value != ''){
        arreglo.insertar(parseInt(posX.value),parseInt(posY.value),dato.value)
        reporte.innerHTML = 'Se agregó el dato al arreglo.';
    }else{
        reporte.innerHTML = 'Escribe un dato y ubicación para agregar.';
    }
    arreglo.mostrar();
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    
    if(dato.value != ''){
        if(arreglo.existe(dato.value)){
            arreglo.eliminar(dato.value);
            reporte.innerHTML = 'Se eliminó el dato del arreglo.';
        }else{
            reporte.innerHTML = 'El dato no existe en el arreglo.';
        }
    }else if(posX.value != '' && posY.value != ''){
        if(arreglo.getDato(parseInt(posX.value),parseInt(posY.value)) != null){
            arreglo.eliminar(null, parseInt(posX.value),parseInt(posY.value));
            reporte.innerHTML = 'Se eliminó el dato del arreglo.';
        }else{
            reporte.innerHTML = 'La ubicación señalada está vacía.';
        }
    }else{
        reporte.innerHTML = 'Escribe un dato o ubicación para eliminar.';
    }
    //graficar
    arreglo.mostrar();
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    //let lienzo = new animacion()
    //lienzo.reset()
    borrar_canvas()
    if(dato.value != '' && datoB.value != ''){
        if(arreglo.existe(dato.value)){
            arreglo.actualizar(dato.value,datoB.value);
            reporte.innerHTML = 'Se actualizó el dato en el arreglo.';
        }else{
            reporte.innerHTML = 'El dato no existe en el arreglo.';
        }
    }else if(posX.value != '' && posY.value != '' && datoB.value != ''){
        if(arreglo.getDato(parseInt(posX.value),parseInt(posY.value)) != null){
            arreglo.actualizar(null,datoB.value,parseInt(posX.value),parseInt(posY.value));
            reporte.innerHTML = 'Se actualizó el dato en el arreglo.';
        }else{
            reporte.innerHTML = 'La ubicación señalada está vacía.';
        }
    }else{
        reporte.innerHTML = 'Escribe un dato o ubicación para actualizar.';
    }
    //graficar
    arreglo.mostrar();
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(arreglo.existe(dato.value)){
            reporte.innerHTML = 'Se encontró el dato en el arreglo.';
        }else{
            reporte.innerHTML = 'El dato no existe en el arreglo.';
        }
    }else if(posX.value != '' && posY.value != ''){
        if(arreglo.getDato(parseInt(posX.value),parseInt(posY.value)) != null){
            reporte.innerHTML = 'Se encontró el dato en el arreglo.';
        }else{
            reporte.innerHTML = 'La ubicación señalada está vacía.';
        }
    }else{
        reporte.innerHTML = 'Escribe un dato o ubicación para buscar.';
    }
    //graficar y tal vez resaltar dato buscado
    arreglo.mostrar();
})

limpiar.addEventListener("click", (e) =>{
    e.preventDefault
    arreglo.elementos = [];
    arreglo.largoX = 0;
    arreglo.largoY = 0;
    reporte.innerHTML = 'Se limpió el arreglo.';
    arreglo.mostrar();
})

btRowMajor.addEventListener("click", (e) =>{
    e.preventDefault
    borrar_canvas()
    arreglo.mostrar()
    resetmajor()
    rowMajor()
    
})

btColMajor.addEventListener("click", (e) =>{
    e.preventDefault
    borrar_canvas()
    arreglo.mostrar()
    resetmajor()
    columnMajor()
    
    
    //graficar col major
})

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = JSON.parse(leer.result)
    }
    reporte.innerHTML = 'Se cargó el archivo con éxito'
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()
    let valores = entrada["valores"];
    let x;
    let y;
    let dato;
    for (let i = 0; i < valores.length; i++) {
        dato = valores[i].valor;
        //console.log(dato);
        x = valores[i].indices[0];
        y = valores[i].indices[1];
        //console.log(x+", "+y);
        //console.log('');
        arreglo.insertar(x,y,dato);
    }
    arreglo.mostrar()
    reporte.innerHTML = 'Se leyó el json cargado.';
    archivo.setAttribute('enabled', '')
})

const salida ={
    categoria: 'Estructura Compuesta',
    nombre:'Row/Column Major',
    animacion:'10',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let lista = [];
    let dato, sublista;
    for(let j = 0; j < arreglo.largoY; j++){
        for (let i = 0; i < arreglo.largoX; i++) {
            if(arreglo.elementos[i] != null){
                if(arreglo.elementos[i][j] != null){
                    dato = {}
                    sublista = []
                    sublista.push(i);
                    sublista.push(j);
                    dato = {indices:sublista, valor: arreglo.elementos[i][j]}
                    lista.push(dato);
                }
            }
        }
    }

    salida.valores = lista;
    let texto = JSON.stringify(salida);
    download('ColumnRowMajor.json', texto);
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}