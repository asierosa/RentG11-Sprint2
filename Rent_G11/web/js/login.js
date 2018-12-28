/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var email_log, contraseña_log, bd;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
function iniciar() {
    email_log = document.getElementById("correoLogin");
    contraseña_log = document.getElementById("passLogin");
    var boton = document.getElementById("login");
    formulario = document.querySelector("form[name='frmLogin']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
    crearbd();
    boton.addEventListener("click", enviarformulario);
    sessionStorage.setItem('Correo',email_log.value);
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

function crearbd() {
    DB = indexedDB.open("RentG11", 1);
    DB.onsuccess = function (e) {


    };

    DB.onerror = function (e) {
        alert('Error cargando la base de datos');
    };


    DB.onupgradeneeded = function (e) {
        bd = DB.result;
        cliente = bd.createObjectStore("cliente", {keyPath: "Email"});
        cliente.createIndex('Contraseña', 'dni', {unique: false});
        cliente.createIndex('Nombre', 'name', {unique: false});
        cliente.createIndex('DNI', 'dni', {unique: true});
        cliente.createIndex('Telefono', 'name', {unique: true});

        var coche = bd.createObjectStore("coche", {keyPath: "matricula"});
        coche.createIndex('Marca', 'marca', {unique: false});
        coche.createIndex('Caracteristica', 'caracteristica', {unique: false});


        var reserva = bd.createObjectStore("reserva", {keyPath: "id_reserva", autoIncrement: true});
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
function validar() {
    var email = email_log.value;
    var password = contraseña_log.value;

    var transaction = bd.transaction(["cliente"]);
    var objectStore = transaction.objectStore("cliente");
    var request = objectStore.get(email);
    request.onerror = function (e) {
        alert("El email introducido no esta en la BD");
        return;
    };
    request.onsuccess = function (e) {
        if (password !== request.result.password) {
            alert("Contraseña incorrecta");
            return;
        }
    };

}

window.addEventListener("load", iniciar);

