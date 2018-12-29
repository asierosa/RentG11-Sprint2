/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var nombre, telefono, DNI, email, contraseña, fuente, deposito, boton, cliente, bd;

function iniciar() {
    nombre = document.getElementById("nombre");
    telefono = document.getElementById("telefono");
    DNI = document.getElementById("DNI");
    email = document.getElementById("email");
    contraseña = document.getElementById("password");
    fuente = document.getElementById("imagen");
    deposito = document.getElementById("deposito");
    boton = document.getElementById("registro");
    formulario = document.querySelector("form[name='frmRegistro']");
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

window.addEventListener("load", iniciar, false);
