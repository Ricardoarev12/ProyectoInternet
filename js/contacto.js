document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.contact-section form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            validarFormulario();
        });
    }
});

function validarFormulario() {
    const nombre = document.querySelector('.contact-section input[type="text"]');
    const correo = document.querySelector('.contact-section input[type="email"]');
    const mensaje = document.querySelector('.contact-section textarea');

    limpiarErrores();
    
    let esValido = true;

    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const regexMensaje = /^.{10,}$/;

    if (!nombre.value.trim() || !regexNombre.test(nombre.value.trim())) {
        mostrarError(nombre, 'Ingresa un nombre válido (solo letras, mínimo 2 caracteres)');
        esValido = false;
    }

    if (!correo.value.trim() || !regexCorreo.test(correo.value.trim())) {
        mostrarError(correo, 'Ingresa un correo electrónico válido');
        esValido = false;
    }

    if (!mensaje.value.trim() || !regexMensaje.test(mensaje.value.trim())) {
        mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    }

    if (esValido) {
        alert('¡Pregunta enviada correctamente!\n\nNos pondremos en contacto contigo pronto.');
        
        nombre.value = '';
        correo.value = '';
        mensaje.value = '';
    }
}

function mostrarError(elemento, mensaje) {
    elemento.classList.add('error');
    
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-mensaje';
    errorMsg.textContent = mensaje;
    
    elemento.parentNode.insertBefore(errorMsg, elemento.nextSibling);
}

function limpiarErrores() {
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    
    document.querySelectorAll('.error-mensaje').forEach(el => {
        el.remove();
    });
}
