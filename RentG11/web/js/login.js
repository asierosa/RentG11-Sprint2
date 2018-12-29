/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var email_log, contraseña_log;

function iniciar() {
    email_log = document.getElementById("correoLogin");
    contraseña_log = document.getElementById("passLogin");
    var boton = document.getElementById("login");
    formulario = document.querySelector("form[name='frmLogin']");
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

window.addEventListener("load", iniciar);

