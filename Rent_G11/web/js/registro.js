/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global sesionStorage */

var nombre, telefono, DNI, email, contraseña, fuente, deposito, boton, cliente, bd;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function iniciar() {
    nombre = document.getElementById("nombre");
    telefono = document.getElementById("telefono");
    DNI = document.getElementById("DNI");
    email = document.getElementById("email");
    contraseña = document.getElementById("password");
    fuente = document.getElementById("imagen");
    deposito = document.getElementById("deposito");
    boton = document.getElementById("registro");
    crearbd();
    formulario = document.querySelector("form[name='frmRegistro']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
    boton.addEventListener("click", enviarformulario);
    boton.addEventListener("click", agregarobjeto);
    sessionStorage.setItem('Correo',email.value);
    
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
function crearbd() {
    DB = indexedDB.open("RentG11",1);
    DB.onsuccess = function (e) {
       
        
    };

    DB.onerror = function (e) {
        alert('Error cargando la base de datos');
        
    };


    DB.onupgradeneeded = function (e) {
        bd = DB.result;
        cliente = bd.createObjectStore("cliente", {keyPath: "Email"});
        cliente.createIndex('Contraseña', 'Contraseña', {unique: false});
        cliente.createIndex('Nombre', 'Nombre', {unique: false});
        cliente.createIndex('DNI', 'DNI', {unique: true});
        cliente.createIndex('Telefono', 'Telefono', {unique: true});

        var coche = bd.createObjectStore("coche", {keyPath: "matricula"});
        coche.createIndex('Marca', 'marca', {unique: false});
        coche.createIndex('Caracteristica', 'caracteristica', {unique: false});

        var reserva = bd.createObjectStore("reserva", {keyPath: "id_reserva", autoIncrement : true});
        reserva.createIndex('Email', 'email', {unique: false});
        reserva.createIndex('Matricula', 'matricula', {unique: false});
        reserva.createIndex('FechaI', 'fechaI', {unique: false});
        reserva.createIndex('HoraI', 'horaI', {unique: false});
        reserva.createIndex('FechaF', 'fechaF', {unique: false});
        reserva.createIndex('HoraF', 'horaF', {unique: false});
        reserva.createIndex('Ciudad', 'ciudad', {unique: false});

        cliente.add({Email: "admin1@rentG.com", Contraseña: "1234", Nombre: "admin1", DNI: "123456789", Telefono: "655555555"});
        cliente.add({Email: "admin2@rentG.com", Contraseña: "4321", Nombre: "admin2", DNI: "987654321", Telefono: "666666666"});
        coche.add({matricula: "1234ABC", marca: "Opel", caracteristica: "Pequeño"});
        coche.add({matricula: "9876CBA", marca: "Mercedes", caracteristica: "Mediano"});
        coche.add({matricula: "2468BDF", marca: "BMW", caracteristica: "Grande"});

    };
}
function agregarobjeto() {
    var n = nombre.value;
    var tel = telefono.value;
    var Dni = DNI.value;
    var correo = email.value;
    var psw = contraseña.value;
    var bd = DB.result;
    var transaccion = bd.transaction(["cliente"], "readwrite");
    var almacen = transaccion.objectStore("cliente");
    var agregar = almacen.add({Email: correo, Contraseña: psw, Nombre: n, DNI: Dni, Telefono: tel});

    agregar.onerror = function (e) {
        alert('Se ha producido un error');
    };

    transaccion.oncomplete = function (e) {

        n = "";
        tel = "";
        Dni = "";
        correo = "";
        psw = "";
        alert('Objeto agregado correctamente');
    };
}
window.addEventListener("load", iniciar, false);
