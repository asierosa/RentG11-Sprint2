/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global sesionStorage */

var nombre, telefono, DNI, email, contraseña, fuente, deposito, boton, cliente, bd;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function iniciar() {
    
    formulario = document.querySelector("form[name='frmRegistro']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
    boton.addEventListener("click", enviarformulario);
    
//    fuente.addEventListener("dragstart", arrastrar);
//    fuente.addEventListener("dragend", finalizar);
//    deposito.addEventListener("dragenter", entrar);
//    deposito.addEventListener("dragleave", salir);
//    deposito.addEventListener("dragover", function (evento) {
//        evento.preventDefault();
//    });
//    deposito.addEventListener("drop", soltar);
    
}
function validacion(evento) {
    var elemento = evento.target;
    elemento.style.background = "#FFDDDD";
}

function enviarformulario() {
    var valido = formulario.checkValidity();
    if (valido) {
        formulario.submit();
    }
}
function comprobar(evento) {
    var elemento = evento.target;
    if (elemento.validity.valid) {
        elemento.style.background = "#FFFFFF";
    } else {
        elemento.style.background = "#FFDDDD";
    }
}

function entrar(evento) {
    evento.preventDefault();
    deposito.style.background = "rgba(0, 150, 0, .2)";
}
function salir(evento) {
    evento.preventDefault();
    deposito.style.background = "#FFFFFF";
}
function finalizar(evento) {
    elemento = evento.target;
    elemento.style.visibility = "hidden";
}
function arrastrar(evento) {
    var codigo = '<img src="' + fuente.src + '">';
    evento.dataTransfer.setData("Text", codigo);
}
function soltar(evento) {
    evento.preventDefault();
    deposito.style.background = "#FFFFFF";
    deposito.innerHTML = evento.dataTransfer.getData("Text");
}


window.addEventListener("load", iniciar, false);
