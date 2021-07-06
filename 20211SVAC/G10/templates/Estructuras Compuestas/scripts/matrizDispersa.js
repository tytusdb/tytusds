class Nodo_ortogonal {

    constructor(dato, x, y) {
        this.dato = dato;
        this.x = x;
        this.y = y;
        this.u = null;
        this.d = null;
        this.l = null;
        this.r = null;
    }

    set_dato(dato) {
        this.dato = dato;
    }

    get_dato() {
        return this.dato;
    }

    get_x() {
        return this.x;
    }

    get_y() {
        return this.y;
    }

    set_arriba(nodo) {
        this.u = nodo;
    }

    set_abajo(nodo) {
        this.d = nodo;
    }

    set_izquierda(nodo) {
        this.l = nodo;
    }

    set_derecha(nodo) {
        this.r = nodo;
    }

    get_arriba() {
        if(this.u == null || this.u.dato != "-"){
            return this.u;
        }else{
            return this.u.get_arriba();
        }
    }

    get_abajo() {
        if(this.d == null || this.d.dato != "-"){
            return this.d;
        }else{
            return this.d.get_abajo();
        }
    }

    get_izquierda() {
        if(this.l == null || this.l.dato != "-"){
            return this.l;
        }else{
            return this.l.get_izquierda();
        }
    }

    get_derecha() {
        if(this.r == null || this.r.dato != "-"){
            return this.r;
        }else{
            return this.r.get_derecha();
        }
    }
}

class Lista_horizontal {
    constructor(nodo = null) {
        if ((nodo === null)) {
            this.primero = null;
            this.ultimo = null;
            this.length = 0;

        } else {
            this.primero = nodo;
            this.ultimo = null;
            this.length = 1;

        }
    }
    imprimir() {

        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            console.log(((((nodo.get_dato() + ", x:") + nodo.get_x().toString()) + ", y:") + nodo.get_y().toString()));
            nodo = nodo.get_derecha();
        }

    }

    is_vacia() {
        return this.length;
    }

    get_length() {
        return this.length;
    }

    get_primero() {
        return this.primero;
    }

    get_ultimo() {
        return this.ultimo;
    }

    anadir_final(nodo) {
        if ((this.primero === null)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length += 1;

        } else {
            if ((this.length === 1)) {
                this.ultimo = nodo;
                this.primero.set_derecha(this.ultimo);
                this.ultimo.set_izquierda(this.primero);
                this.length += 1;

            } else {
                this.ultimo.set_derecha(nodo);
                nodo.set_izquierda(this.ultimo);
                this.ultimo = nodo;
                this.length += 1;

            }
        }
    }

    anadir_inicio(nodo) {
        if ((this.length === 0)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length += 1;

        } else {
            if ((this.length === 1)) {
                this.primero = nodo;
                this.primero.set_derecha(this.ultimo);
                this.ultimo.set_izquierda(this.primero);
                this.length += 1;
            } else {
                this.primero.set_derecha(nodo);
                nodo.set_izquierda(this.primero);
                this.primero = nodo;
                this.length += 1;
            }
        }
    }
    anadir_medio(nodo) {
        var nodo_post, nodo_pre, x;
        nodo_post = this.primero;
        x = nodo.get_x();
        while ((nodo_post.get_x() < x)) {
            if ((nodo_post.get_derecha() !== null)) {
                nodo_post = nodo_post.get_derecha();
            }
        }
        nodo_pre = nodo_post.get_izquierda();
        nodo.set_derecha(nodo_post);
        nodo.set_izquierda(nodo_pre);
        nodo_pre.set_derecha(nodo);
        nodo_post.set_izquierda(nodo);
        this.length += 1;
    }

    anadir(nodo) {
        if ((this.length === 0)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length = 1;
        } else {
            if ((nodo.get_x() > this.ultimo.get_x())) {
                this.anadir_final(nodo);
            } else {
                if ((nodo.get_x() < this.primero.get_x())) {
                    this.anadir_inicio(nodo);
                } else {
                    if (((nodo.get_x() < this.ultimo.get_x()) && (nodo.get_x() > this.primero.get_x()))) {
                        this.anadir_medio(nodo);
                    } else {
                        if (this.existe(nodo.get_x())) {
                            this.reemplazar(nodo.get_dato(), nodo.get_x());
                        }
                    }
                }
            }
        }
    }
    get_nodo(x) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_x() === x)) {
                return nodo;
            } else {
                nodo = nodo.get_derecha();
            }
        }
        return false;
    }

    existe(x) {
        var nodo;
        nodo = this.primero;
        while(nodo != null){
            if(nodo.get_x() === x){
                return true;
            }else{
                nodo = nodo.get_derecha();
            }
        }
        return false;
    }
    reemplazar(dato, x) {
        var nodo_rem;
        nodo_rem = this.get_nodo(x);
        nodo_rem.set_dato(dato);
    }
    get_llenos() {
        var cantidad, nodo;
        nodo = this.primero;
        cantidad = 0;
        while ((nodo !== null)) {
            if ((nodo.get_dato() === "*")) {
                cantidad += 1;
            }
            nodo = nodo.get_derecha();
        }
        return cantidad;
    }
}
class Lista_vertical {
    constructor(nodo = null) {
        if ((nodo === null)) {
            this.primero = null;
            this.ultimo = null;
            this.length = 0;
        } else {
            this.primero = nodo;
            this.ultimo = null;
            this.length = 1;
        }
    }
    is_vacia() {
        return this.length;
    }
    get_length() {
        return this.length;
    }
    get_primero() {
        return this.primero;
    }
    get_ultimo() {
        return this.ultimo;
    }
    imprimir() {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            console.log(((((nodo.get_dato() + ", x:") + nodo.get_x().toString()) + ", y:") + nodo.get_y().toString()));
            nodo = nodo.get_abajo();
        }
    }
    anadir_final(nodo) {
        if ((this.primero === null)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length += 1;
        } else {
            if ((this.length === 1)) {
                this.ultimo = nodo;
                this.primero.set_abajo(this.ultimo);
                this.ultimo.set_arriba(this.primero);
                this.length += 1;
            } else {
                this.ultimo.set_abajo(nodo);
                nodo.set_arriba(this.ultimo);
                this.ultimo = nodo;
                this.length += 1;
            }
        }
    }
    anadir_inicio(nodo) {
        if ((this.length === 0)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length += 1;
        } else {
            if ((this.length === 1)) {
                this.primero = nodo;
                this.primero.set_abajo(this.ultimo);
                this.ultimo.set_arriba(this.primero);
                this.length += 1;
            } else {
                this.primero.set_arriba(nodo);
                nodo.set_abajo(this.primero);
                this.primero = nodo;
                this.length += 1;
            }
        }
    }
    anadir_medio(nodo) {
        var nodo_post, nodo_pre, y;
        nodo_post = this.primero;
        y = nodo.get_y();
        while ((nodo_post.get_y() < y)) {
            if ((nodo_post.get_abajo() !== null)) {
                nodo_post = nodo_post.get_abajo();
            }
        }
        nodo_pre = nodo_post.get_arriba();
        nodo.set_abajo(nodo_post);
        nodo.set_arriba(nodo_pre);
        nodo_pre.set_abajo(nodo);
        nodo_post.set_arriba(nodo);
        this.length += 1;
    }
    anadir(nodo) {
        if ((this.length === 0)) {
            this.primero = nodo;
            this.ultimo = nodo;
            this.length = 1;
        } else {
            if ((nodo.get_y() > this.ultimo.get_y())) {
                this.anadir_final(nodo);
            } else {
                if ((nodo.get_y() < this.primero.get_y())) {
                    this.anadir_inicio(nodo);
                } else {
                    if (((nodo.get_y() < this.ultimo.get_y()) && (nodo.get_y() > this.primero.get_y()))) {
                        this.anadir_medio(nodo);
                    }
                }
            }
        }
    }
    get_nodo(y) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_y() === y)) {
                return nodo;
            } else {
                nodo = nodo.get_abajo();
            }
        }
        return false;
    }
    existe(y) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_y() === y)) {
                return true;
            } else {
                nodo = nodo.get_abajo();
            }
        }
        return false;
    }
    reemplazar(dato, y) {
        var nodo_rem;
        nodo_rem = this.get_nodo(y);
        nodo_rem.set_dato(dato);
    }
}
class Nodo_cabecera_fila {
    constructor(y) {
        this.lista_h = new Lista_horizontal();
        this.y = y;
        this.siguiente = null;
        this.anterior = null;
    }

    get_y() {
        return this.y;
    }

    get_lista() {
        return this.lista_h;
    }

    set_siguiente(nodocf) {
        this.siguiente = nodocf;
    }

    get_siguiente() {
        return this.siguiente;
    }

    set_anterior(nodocf) {
        this.anterior = nodocf;
    }

    get_anterior() {
        return this.anterior;
    }

}
class Nodo_cabecera_columna {
    constructor(x) {
        this.lista_v = new Lista_vertical();
        this.x = x;
        this.siguiente = null;
        this.anterior = null;
    }

    get_x() {
        return this.x;
    }

    get_lista() {
        return this.lista_v;
    }

    set_siguiente(nodocc) {
        this.siguiente = nodocc;
    }

    get_siguiente() {
        return this.siguiente;
    }

    set_anterior(nodocc) {
        this.anterior = nodocc;
    }

    get_anterior() {
        return this.anterior;
    }
}
class Lista_cf {

    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.length = 0;
    }

    get_length() {
        return this.length;
    }

    anadir(y) {
        var i, nodocf;
        while ((this.length < y)) {
            i = (this.length + 1);
            if ((this.length === 0)) {
                this.primero = new Nodo_cabecera_fila(i);
                this.length += 1;
            } else {
                if ((this.length === 1)) {
                    this.ultimo = new Nodo_cabecera_fila(i);
                    this.primero.set_siguiente(this.ultimo);
                    this.length += 1;
                } else {
                    nodocf = new Nodo_cabecera_fila(i);
                    this.ultimo.set_siguiente(nodocf);
                    nodocf.set_anterior(this.ultimo);
                    this.ultimo = nodocf;
                    this.length += 1;
                }
            }
        }
    }

    get_fila(y) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_y() === y)) {
                return nodo.get_lista();
            } else {
                nodo = nodo.get_siguiente();
            }
        }
        return false;
    }

    existe(y) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_y() === y)) {
                return true;
            } else {
                nodo = nodo.get_siguiente();
            }
        }
        return false;
    }
}

class Lista_cc {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.length = 0;
    }

    get_length() {
        return this.length;
    }

    anadir(x) {
        var i;
        var nodocf;
        while ((this.length < x)){
            i = (this.length + 1);
            if ((this.length == 0)) {
                this.primero = new Nodo_cabecera_columna(i);
                this.length += 1;
            } else {
                if ((this.length == 1)) {
                    this.ultimo = new Nodo_cabecera_columna(i);
                    this.primero.set_siguiente(this.ultimo);
                    this.length += 1;
                } else {
                    nodocf = new Nodo_cabecera_columna(i);
                    this.ultimo.set_siguiente(nodocf);
                    nodocf.set_anterior(this.ultimo);
                    this.ultimo = nodocf;
                    this.length += 1;
                }
            }
        }
    }

    get_columna(x) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_x() === x)) {
                return nodo.get_lista();
            } else {
                nodo = nodo.get_siguiente();
            }
        }
        return false;
    }

    existe(x) {
        var nodo;
        nodo = this.primero;
        while ((nodo !== null)) {
            if ((nodo.get_x() === x)) {
                return true;
            } else {
                nodo = nodo.get_siguiente();
            }
        }
        return false;
    }
}
class Matriz_ortogonal {
    constructor(nombre, m, n) {
        this.nombre = nombre;
        this.lista_filas = new Lista_cf();
        this.lista_columnas = new Lista_cc();
        this.lista_filas.anadir(n);
        this.lista_columnas.anadir(m);
    }

    get_nombre() {
        return this.nombre;
    }
    set_nombre(nuevo) {
        this.nombre = nuevo;
    }
    get_m() {
        return this.lista_columnas.get_length();
    }

    get_n() {
        return this.lista_filas.get_length();
    }

    anadir(x, y, dato) {
        var nodo;
        nodo = new Nodo_ortogonal(dato, x, y);
        if(y > this.lista_filas.get_length()){
            this.lista_filas.anadir(y);
        }
        if(x > this.lista_columnas.get_length()){
            this.lista_columnas.anadir(x);
        }
        this.lista_filas.get_fila(y).anadir(nodo);
        this.lista_columnas.get_columna(x).anadir(nodo);
    }

    get_dato(x, y) {
        if ((Object.getPrototypeOf(this.lista_filas.get_fila(y)) !== Boolean)) {
            if ((this.lista_filas.get_fila(y).existe(x) && (x <= this.lista_columnas.get_length())) && (y <= this.lista_filas.get_length())) {
                return this.lista_filas.get_fila(y).get_nodo(x).get_dato();
            } else {
                return "-";
            }
        } else {
            return "-";
        }
    }

    get_nodo(x, y){
        if(Object.getPrototypeOf(this.lista_filas.get_fila(y)) != Boolean){
            this.lista_filas.get_fila(y);
            if((this.lista_filas.get_fila(y).existe(x) && (x <= this.lista_columnas.get_length())) && (y <= this.lista_filas.get_length())){
                return this.lista_filas.get_fila(y).get_nodo(x);
            }
        }else{
            return null;
        }
    }

    get_nodoB(dato){
        let b, nodo;
        let a = 1;
        while(a <= this.get_n()){
            b = 1;
            while(b <= this.get_m()){
                if(this.get_dato(b,a) == dato){
                    return this.get_nodo(b,a);
                }
                b += 1;
                console.log('nodoB');
            }
            a += 1;
        }
        return null;
    }

    imprimir(){
        var a, b, fila;
        a = 1;
        while ((a <= this.get_n())){
            fila = "";
            b = 1;
            while ((b <= this.get_m())) {
                fila = (fila + this.get_dato(b, a));
                b += 1;
            }
            console.log(fila);
            a += 1;
        }
    }

    get_llenos() {
        var cantidad, fila;
        fila = 1;
        cantidad = 0;
        while(fila <= this.get_n()){
            cantidad += this.lista_filas.get_fila(fila).get_llenos();
            fila += 1;
        }

        return cantidad;
    }

    get_vacios() {
        var i, vacios;
        i = this.get_llenos();
        vacios = (this.get_n() * this.get_m());
        vacios -= i;
        return vacios;

    }
}

const matriz = new Matriz_ortogonal("",1,1);

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

let entrada;

agregar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != '' && posX.value != '' && posY.value != ''){
        matriz.anadir(parseInt(posX.value)+1,parseInt(posY.value)+1,dato.value);
    }
    graficaMatriz(matriz);
    matriz.imprimir();
})

eliminar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        let nodo;
        nodo = matriz.get_nodoB(dato.value);
        if(nodo != null){
            console.log(nodo);
            matriz.anadir(nodo.get_x(), nodo.get_y(), "-");
        }else{
            reporte.innerHTML = 'El dato "'+dato.value+'" no se encuentra en la matriz.';
        }
    }else if(posX.value != '' && posY.value != ''){
        let nodo;
        nodo = matriz.get_nodo(parseInt(posX.value)+1, parseInt(posY.value)+1);
        if(nodo != null){
            matriz.anadir(nodo.get_x(), nodo.get_y(), "-");
        }else{
            reporte.innerHTML = 'No hay ningún dato en ['+posX.value+', '+posY.value+']';
        }
    }
    graficaMatriz(matriz);
    matriz.imprimir();
})

actualizar.addEventListener("click", (e) =>{
    e.preventDefault
    if(datoB.value != '' && dato.value != ''){
        let nodo;
        nodo = matriz.get_nodoB(dato.value);
        if(nodo != null){
            matriz.anadir(nodo.get_x(), nodo.get_y(), datoB.value);
            reporte.innerHTML = 'Se actualizó el nodo "'+dato.value+'".';
        }else{
            reporte.innerHTML = 'El dato "'+dato.value+'" no se encuentra en la matriz.';
        }
        console.log('actub');
        matriz.imprimir();
    }else if(datoB.value != '' && posX.value != '' && posY.value != ''){
        let nodo;
        nodo = matriz.get_nodo(parseInt(posX.value)+1, parseInt(posY.value)+1);
        if(nodo != null){
            matriz.anadir(nodo.get_x(), nodo.get_y(), datoB.value);
            reporte.innerHTML = 'Se actualizó el nodo en ['+posX.value+', '+posY.value+']';
        }else{
            reporte.innerHTML = 'No hay ningún dato en ['+posX.value+', '+posY.value+']';
        }
        matriz.imprimir();
    }
})

buscar.addEventListener("click", (e) =>{
    e.preventDefault
    if(dato.value != ''){
        if(matriz.get_nodoB(dato.value) != null){
            //graficar pero con
            reporte.innerHTML = 'Resaltando el dato "'+dato.value+'" en la matriz.';
        }else{
            reporte.innerHTML = 'El dato "'+dato.value+'" no se encuentra en la matriz.';
        }
    }else if(posX.value != '' && posY.value != ''){
        if(matriz.get_nodo(parseInt(posX.value)+1, parseInt(posX.value)+1) != null){
            //graficar
            reporte.innerHTML = 'Resaltando el nodo ['+posX.value+', '+posY.value+'] en la matriz.';
        }else{
            reporte.innerHTML = 'No hay ningún dato en ['+posX.value+', '+posY.value+']';
        }
    }
    matriz.imprimir();
})

limpiar.addEventListener("click", (e) =>{
    e.preventDefault
    matriz.lista_filas = new Lista_cf();
    matriz.lista_columnas = new Lista_cc();
    matriz.lista_filas.anadir(0);
    matriz.lista_columnas.anadir(0);
    reporte.innerHTML = 'Se limpió la matriz.';
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
    let listaA = null;
    let x;
    let y;
    let dato;
    for (let i = 0; i < valores.length; i++) {
        dato = valores[i].valor;
        x = valores[i].indices[0];
        y = valores[i].indices[1];
        matriz.anadir(x+1,y+1,dato);
    }
    graficaMatriz(matriz)
    reporte.innerHTML = 'Se leyó el json cargado.';
    archivo.setAttribute('enabled', '')
    matriz.imprimir();
})

const salida ={
    categoria: 'Estructura Compuesta',
    nombre:'Matriz Dispersa',
    almacenamiento:'Matriz',
    animacion:'10',
    valores: []
}

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let lista = [];
    let dato, sublista;
    for(let j = 0; j <= matriz.get_n() -1; j++){
        for (let i = 0; i <= matriz.get_m() -1; i++) {
            if(matriz.get_dato(i+1,j+1) != "-"){
                dato = {}
                sublista = []
                sublista.push(i);
                sublista.push(j);
                dato = {indices:sublista, valor: matriz.get_dato(i+1,j+1)};
                lista.push(dato);
            }
        }
    }

    salida.valores = lista;
    let texto = JSON.stringify(salida);
    download('matrizDispersa.json', texto);
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

function graficaMatriz(matriz){
    let html = '<table style="width: 100%; border-collapse: separate; border-spacing: 10px;"><tr><td style="border-style: none;"></td>';
    for (let k = 1; k <= matriz.get_m(); k++) {
        html += '<td >Columna '+(k-1)+'</td>'
    }
    html += '</tr>';

    for(let j = 0; j <= matriz.get_n() -1; j++){
        html += '<tr><td>Fila '+j+'</td>';
        for (let i = 0; i <= matriz.get_m() -1; i++) {
            if(matriz.get_dato(i+1,j+1) != "-"){
                html += '<td style="background-color: rgb(220,50,80); color: white; border-style: none;">'+matriz.get_dato(i+1,j+1)+'</td>';
            }else{
                html += '<td style="border-style: none; background-color: transparent;"></td>'
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    lienzo.innerHTML = html;
}