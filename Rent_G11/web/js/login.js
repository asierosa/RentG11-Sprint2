/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function iniciar() {
    
    formulario = document.querySelector("form[name='frmLogin']");
    formulario.addEventListener("invalid", validacion, true);
    formulario.addEventListener("input", comprobar);
   
 
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

