/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function iniciar() {
    correo = localStorage.getItem('Correo');
    coche = document.getElementById("coches");
    fInicio = document.getElementById("fechaI");
    hInicio = document.getElementById("horaI");
    fFin = document.getElementById("fechaF");
    hFin = document.getElementById("horaF");
    ciudad = document.getElementById("ciudad");
    boton = document.getElementById("enviar");
    matriculaB = document.getElementById("matr");
    correoB = document.getElementById("emailCli");
    fechaB = document.getElementById("fechaRS");
    formulario = document.querySelector("form[name='frmAlquiler']");
    formulario.addEventListener("input", comprobar);
    
    boton.addEventListener("click", enviarformulario);
    
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
        elemento.style.background = "#00bfff";
    } else {
        elemento.style.background = "#FFDDDD";
    }
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

window.addEventListener("load", iniciar, false);

