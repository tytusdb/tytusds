class Nodo {

  constructor(data) {

    // Data De Nodo
    this.data = data;

    // Apuntadores
    this.siguiente = null;
    this.anterior = null;

  }
}

class Lista {

  constructor() {

    // Apuntadores
    this.primero = null;
    this.ultimo = null;
  }

  // Método Insertar Al Final
  insertar(data) {

    // Crear Nuevo Nodo
    let nuevo_nodo = new Nodo(data);

    // Verificar Si Lista Está Vacia
    if (this.primero != null) { // Lista No Vacia

      // Insertar Nuevo Nodo Al Final De La lista
      this.ultimo.siguiente = nuevo_nodo;
      this.ultimo.siguiente.anterior = this.ultimo;
      this.ultimo = nuevo_nodo;

    } else { // Lista Vacia

      // Insertar Primer Nodo
      this.primero = nuevo_nodo;
      this.ultimo = nuevo_nodo;

    }

  }

  // Método Insertar Al Inicio

}

let lista;
let mov_ = 100;
let cont_nodos = 0;
let cont_y = 0;

function Iniciar() {

  // Inicializar Lista
  lista = new Lista();

}

function _Insertar(valor) {

  if(document.getElementById("txt_input").value){

    // Guardar Valor Ingresado En txt_input
    valor = document.getElementById("txt_input").value;
  }else {

  }

  // Insertar Valor Ingresado A Lista
  lista.insertar(valor);


  // ---------- Dibujar ---------- //

  // Verificar Cantidad De Nodos
  if (cont_nodos == 0) { // Si No Hay Nodos Aún

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,0);
    let texto_nodo = Crear_Texto(id_txt,0,0,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      canvas.add(line);
    },1000);

  }else if (cont_nodos == 6 || cont_nodos == 12 || cont_nodos == 18 || cont_nodos == 24 || cont_nodos == 30 || cont_nodos == 36
  || cont_nodos == 42 || cont_nodos == 48 || cont_nodos == 54 || cont_nodos == 60) {

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    cont_y = cont_y + 75;

    // Reset Contador mov_
    mov_ = 100;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,cont_y);
    let texto_nodo = Crear_Texto(id_txt,0,cont_y,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      let x2 = grupo_nodo.left;
      let y2 = grupo_nodo.top + 30;
      line2 = Crear_Linea(id_line, [x2,y2,x2-80,y2]);
      nodo_nuevo.line2 = line2;
      canvas.add(line);
      canvas.add(line2);
    },1000);

  }else {

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,cont_y);
    let texto_nodo = Crear_Texto(id_txt,0,cont_y,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      let x2 = grupo_nodo.left;
      let y2 = grupo_nodo.top + 30;
      line2 = Crear_Linea(id_line, [x2,y2,x2-80,y2]);
      nodo_nuevo.line2 = line2;
      canvas.add(line);
      canvas.add(line2);
    },1000);

  }



}

function Insertar() {

  if(document.getElementById("txt_input").value){

    // Guardar Valor Ingresado En txt_input
    valor = document.getElementById("txt_input").value;
  }else {

  }

  // Insertar Valor Ingresado A Lista
  lista.insertar(valor);


  // ---------- Dibujar ---------- //

  // Verificar Cantidad De Nodos
  if (cont_nodos == 0) { // Si No Hay Nodos Aún

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,0);
    let texto_nodo = Crear_Texto(id_txt,0,0,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      canvas.add(line);
    },1000);

  }else if (cont_nodos == 6 || cont_nodos == 12 || cont_nodos == 18 || cont_nodos == 24 || cont_nodos == 30 || cont_nodos == 36
  || cont_nodos == 42 || cont_nodos == 48 || cont_nodos == 54 || cont_nodos == 60) {

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    cont_y = cont_y + 75;

    // Reset Contador mov_
    mov_ = 100;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,cont_y);
    let texto_nodo = Crear_Texto(id_txt,0,cont_y,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      let x2 = grupo_nodo.left;
      let y2 = grupo_nodo.top + 30;
      line2 = Crear_Linea(id_line, [x2,y2,x2-80,y2]);
      nodo_nuevo.line2 = line2;
      canvas.add(line);
      canvas.add(line2);
    },1000);

  }else {

    // Aumentar Contador
    cont_nodos = cont_nodos + 1;

    // Crear Id Para Cada Objeto
    let id_nodo = cont_nodos + 'N';
    let id_txt = cont_nodos + 'T';
    let id_line = cont_nodos + 'L';

    let nodo_nuevo = Crear_Nodo(id_nodo,0,cont_y);
    let texto_nodo = Crear_Texto(id_txt,0,cont_y,valor);
    let grupo_nodo = Crear_Grupo(cont_nodos,nodo_nuevo,texto_nodo);
    canvas.add(grupo_nodo);

    // Animación
    const aux_mov = "+=" + mov_;
    grupo_nodo.animate('left', aux_mov, {
      onChange: canvas.renderAll.bind(canvas),
      dudration: 1500
    });
    mov_ = mov_ + 200;

    // Crear Linea
    var line;
    window.setTimeout(() => {
      let x = grupo_nodo.left + 120;
      let y = grupo_nodo.top + 20;
      line = Crear_Linea(id_line, [x,y,x+100,y]);
      nodo_nuevo.line1 = line;
      let x2 = grupo_nodo.left;
      let y2 = grupo_nodo.top + 30;
      line2 = Crear_Linea(id_line, [x2,y2,x2-80,y2]);
      nodo_nuevo.line2 = line2;
      canvas.add(line);
      canvas.add(line2);
    },1000);

  }



}

function Update() {

  Actualizar('2T', "Pepito");

}

function Actualizar(id, valor) {

  aux = 
  canvas.forEachObject(function(obj) {

    if (obj.id.length == null) {

      // Obtener Objecto Texto Del Nodo Del Grupo Actual
      //canvas.setActiveObject(canvas._objects[obj.id-1]._objects[1]);
      //var activeObj = canvas.getActiveObject();
      window.alert(canvas._objects[obj.id - 1]._objects[1]);
/*
      if(activeObj.id == id) {

        activeObj.set({text: valor});
        canvas.renderAll();
      }
*/
    }

  });

  text.set({ text: newText }); //Change the text
  canvas.renderAll(); //Update the canvas

}

function Crear_Nodo(id, x, y, linea1, linea2) {

  var nodo = new fabric.Rect({
    id: id,
    left: x,
    top: y,
    width: 120,
    height: 60,
    fill: 'black',

  });
  nodo.hasControls = nodo.hasBorders = false;

  nodo.line1 = linea1;
  nodo.line2 = linea2;

  return nodo;
}

function Crear_Linea(id, coords) {

  return new fabric.Line(coords, {
    id: id,
    fill: 'red',
    stroke: 'blue',
    strokeWidth: 5,
    selectable: false,
    evented: false
  });

}

function Crear_Texto(id, x, y, texto) {

  return new fabric.Text(texto,{
    id: id,
    top: y,
    fontSize: 17,
    fill: 'red'
  });

}

function Crear_Grupo(id, nodo, texto) {

  // Fabricar Grupo
  return new fabric.Group([nodo,texto],{
    id: id
  });

}

function removeSpot(id) {

  canvas.forEachObject(function(obj) {

    if(obj.id && obj.id == id) {

      canvas.remove(obj);
      canvas.renderAll();
    }else {

    }
  });

}

function LeerJSON(archivo_Json) {

  let json_data = JSON.parse(archivo_Json);

  // Obtener Parámetros De Archivo Para Configurar Y Dibujar
  const categoria = json_data.categoria;
  const nombre = json_data.nombre;
  const repeticion = json_data.repeticion;
  const posicion = json_data.posicion;
  const valores = json_data.valores;

  // Recorrer Arreglo De Valores Para Insertarlos Uno A Uno
  callerFun(valores);

  aux_Rec++;


}

function testAsync(valor){
    return new Promise((resolve,reject)=>{
        //here our function should be implemented
        setTimeout(()=>{
          _Insertar(valor)
          resolve();
        ;} , 2000
        );
    });
}

async function callerFun(valores){

  let aux_Rec = 0;
  while (aux_Rec < valores.length) {
    await testAsync(valores[aux_Rec]);
    aux_Rec++;
  }

}

function AbrirArchivo(evento) {
  let archivo = evento.target.files[0];

  if(archivo){
    let reader = new FileReader();

    reader.onload = function(e) {

      let contenido = e.target.result;

      // Aquí Leer JSON
      LeerJSON(contenido);
    };

    reader.readAsText(archivo);

  }else {
    window.alert("No Se Ha Seleccionado Un Archivo")
  }
}

function VerLista() {

  let aux = lista.primero;
  let data = "";
  while (aux != null) {

    data = data + ", " + aux.data;

    aux = aux.siguiente;
  }

  document.getElementById("demo").innerHTML = "Data De Lista -> " + data;

  this.removeSpot(1);
  this.removeSpot('1L');

}

// Eventos
window.addEventListener('load', () => {
  document.getElementById('upload').addEventListener('change', AbrirArchivo);
});
