/*EVENTOS*/
$('#guardar')
.on('click', () => agregar())
$('#eliminar')
.on('click', () => eliminar())
$('#actualizar')
.on('click', () => actualizar())
$('#buscar')
.on('click', () => buscar())

$('#guardar2')
.on('click', () => agregar2())
$('#actualizar2')
.on('click', () => actualizar2())
$('#buscar2')
.on('click', () => buscar2())


/***********LISTA SIMPLE***********/
function agregar(){
var listita;
if($("#guardar").data("midato") != null){
listita = $("#guardar").data("midato");
} else {
listita = new ListaSimple();
}
var x1 = document.getElementById("inputPassword6").value;
listita.add(x1);
console.log(listita.print());
$("#guardar").data("midato",listita);
}

function eliminar(){
var listita;
if($("#guardar").data("midato") != null){
listita = $("#guardar").data("midato");
} else {
listita = new ListaSimple();
}
var x1 = document.getElementById("inputPassword6").value;
listita.delete(x1);
console.log(listita.print());
$("#guardar").data("midato",listita);
}

function actualizar(){
var listita;
if($("#guardar").data("midato") != null){
listita = $("#guardar").data("midato");
} else {
listita = new ListaSimple();
}
var x1 = document.getElementById("inputPassword6").value;
listita.update(x1, x1+100);
console.log(listita.print());
$("#guardar").data("midato",listita);
}

function buscar(){
var listita;
if($("#guardar").data("midato") != null){
listita = $("#guardar").data("midato");
} else {
listita = new ListaSimple();
}
var x1 = document.getElementById("inputPassword6").value;
var elemento = listita.search(x1);
console.log(elemento);
$("#guardar").data("midato",listita);
}

/***********LISTA CIRCULAR DOBLE***********/
function agregar2(){
var listita;
if($("#guardar2").data("listita") != null){
listita = $("#guardar2").data("listita");
} else {
listita = new ListaCircularDoble();
}
var x1 = document.getElementById("input").value;
listita.add(x1);
console.log(listita.print());
$("#guardar2").data("listita",listita);
}

function actualizar2(){
var listita;
if($("#guardar2").data("listita") != null){
listita = $("#guardar2").data("listita");
} else {
listita = new ListaCircularDoble();
}
var x1 = document.getElementById("input").value;
listita.update(x1, x1+100);
console.log(listita.print());
$("#guardar2").data("listita",listita);
}

function buscar2(){
var listita;
if($("#guardar2").data("listita") != null){
listita = $("#guardar2").data("listita");
} else {
listita = new ListaCircularDoble();
}
var x1 = document.getElementById("input").value;
var elemento = listita.search(x1);
console.log(elemento);
$("#guardar2").data("listita",listita);
}

$(document).ready(function () {
var trigger = $('.hamburger'),
overlay = $('.overlay'),
isClosed = false;

trigger.click(function () {
hamburger_cross();      
});

function hamburger_cross() {

if (isClosed == true) {          
  overlay.hide();
  trigger.removeClass('is-open');
  trigger.addClass('is-closed');
  isClosed = false;
} else {   
  overlay.show();
  trigger.removeClass('is-closed');
  trigger.addClass('is-open');
  isClosed = true;
}
}

$('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
	});  
});