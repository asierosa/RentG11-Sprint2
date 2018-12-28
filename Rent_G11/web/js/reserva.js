/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global IDBKeyRange, sesionStorage */

var DB, caja;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

function iniciar() {
    correo = sessionStorage.getItem('Correo');
    coche = document.getElementById("coches");
    fInicio = document.getElementById("fechaI");
    hInicio = document.getElementById("horaI");
    fFin = document.getElementById("fechaF");
    hFin = document.getElementById("horaF");
    ciudad = document.getElementById("ciudad");
    boton = document.getElementById("enviar");
    cajadatos = document.getElementById("cajadatos");
    var botonRSCliente = document.getElementById("busqRSCliente");
    var botonRSMatricula = document.getElementById("busqRSMatr");
    var botonRSFecha = document.getElementById("busqRSFecha"); 
    var botonCliente = document.getElementById("busqCliente");
    matriculaB = document.getElementById("matr");
    correoB = document.getElementById("emailCli");
    fechaB = document.getElementById("fechaRS");
    formulario = document.querySelector("form[name='frmAlquiler']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
    
    crearbd();
    
    boton.addEventListener("click", enviarformulario);
    
    
    boton.addEventListener("click",agregarReserva);
    botonRSCliente.addEventListener("click", buscarRSCliente);
    botonRSMatricula.addEventListener("click", buscarRSMatricula);
    botonRSFecha.addEventListener("click", buscarRSFecha);
    botonCliente.addEventListener("click", buscarCliente);
    

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
function validacionCoche() {
    if (coche.value === "") {
        coche.setCustomValidity("Seleccione el coche que desea");
    } else {
        coche.setCustomValidity("");
    }
}
function validacionfInicio() {
    var hoy = new date();
    if (fInicio.value === "" || fInicio.value < hoy) {
        fInicio.setCustomValidity("Inserte la fecha en la que quiere que inicie la reserva");
    } else {
        fInicio.setCustomValidity("");
    }
}
function validacionhInicio() {
    if (hInicio.value === "") {
        hInicio.setCustomValidity("Inserte la hora en la que quiere que inicie la reserva");
    } else {
        hInicio.setCustomValidity("");
    }
}
function validacionfFin() {
    if (fFin.value === "" || fFin > fInicio) {
        fFin.setCustomValidity("Inserte la fecha en la que quiere que inicie la reserva");
    } else {
        fFin.setCustomValidity("");
    }
}
function validacionhFin() {
    if (hFin.value === "") {
        hFin.setCustomValidity("Inserte la hora en la que quiere que quiere finalizar ");
    } else {
        hFin.setCustomValidity("");
    }
}
function validacionCiudad() {
    if (ciudad.value === "") {
        ciudad.setCustomValidity("Inserte la ciudad en la que quiere que quiere recoger el coche ");
    } else {
        ciudad.setCustomValidity("");
    }
}
function agregarReserva(){
    
    var email = correo;
    var matricula = coche.value;        
    var FI = fInicio.value;
    var HI = hInicio.value;
    var FF = fFin.value;
    var HF = hFin.value;
    var ciudad = ciudad.value;

    var bd = DB.result;
    var transaccion = bd.transaction(["reserva"], "readwrite");
    var almacen = transaccion.objectStore("reserva");
    var agregar = almacen.add({Email: email, Matricula: matricula, FechaI: FI, HoraI: HI, Telefono: tel,FechaF : FF, HoraF : HF , Ciudad : ciudad});
    
    agregar.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    transaccion.oncomplete = function (e) {

        email = "";
        matricula = "";
        FI = "";
        HI = "";
        FF = "";
        HF ="";
        ciudad = "";
        alert('Objeto agregado correctamente');
    };
}
function buscarRSCliente() {
    cajadatos.innerHTML = "";
    var Cliente =correoB.value;

    var transaccionC = bd.transaction(["reserva"],"readonly");
    var almacenC = transaccionC.objectStore("reserva");
    var indiceC = almacenC.index("Email");
    var rangoC = IDBKeyRange.only(Cliente);

    var puntero = indiceC.openCursor(rangoC);
    puntero.addEventListener("success", mostrarlista);
}
function buscarRSMatricula() {
    cajadatos.innerHTML = "";
    var Matricula = matriculaB.value;

    var transaccionM = bd.transaction(["reserva"],"readonly");
    var almacenM = transaccionM.objectStore("reserva");
    var indiceM = almacenM.index("Matricula");
    var rangoM = IDBKeyRange.only(Matricula);

    var puntero = indiceM.openCursor(rangoM);
    puntero.addEventListener("success", mostrarlista);
}
function buscarRSFecha() {
    cajadatos.innerHTML = "";
    var Fecha = fechaB.value;

    var transaccionF = bd.transaction(["reserva"],"readonly");
    var almacenF = transaccionF.objectStore("reserva");
    var indiceF = almacenF.index("FechaI");
    var rangoF = IDBKeyRange.only(Fecha);

    var puntero = indiceF.openCursor(rangoF);
    puntero.addEventListener("success", mostrarlista);
}
function buscarCliente() {
    cajadatos.innerHTML = "";
    var Cliente = correo;

    var transaccion = bd.transaction(["reserva"],"readonly");
    var almacen = transaccion.objectStore("reserva");
    var indice = almacen.index("Email");
    var rango = IDBKeyRange.only(Cliente);

    var puntero = indice.openCursor(rango);
    puntero.addEventListener("success", mostrarlista);
}

function mostrarlista(evento) {
    var puntero = evento.target.result;
    if (puntero) {
        cajadatos.innerHTML += "<div>" + puntero.value.id + " - " + puntero.value.nombre + " - " + puntero.value.fecha + "</div>";
        puntero.continue();
    }
}

window.addEventListener("load", iniciar, false);

