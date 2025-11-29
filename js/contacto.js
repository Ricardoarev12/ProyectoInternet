// =============================================
// VALIDACIÓN DE FORMULARIO CON EXPRESIONES REGULARES
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.contact-section form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            validarFormulario();
        });
    }
});

// Función para validar el formulario
function validarFormulario() {
    const nombre = document.querySelector('.contact-section input[type="text"]');
    const correo = document.querySelector('.contact-section input[type="email"]');
    const mensaje = document.querySelector('.contact-section textarea');
    
    // Limpiar errores previos
    limpiarErrores();
    
    let esValido = true;
    
    // Expresión regular para nombre (solo letras y espacios, mínimo 2 caracteres)
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    
    // Expresión regular para correo electrónico
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Expresión regular para mensaje (mínimo 10 caracteres)
    const regexMensaje = /^.{10,}$/;
    
    // Validar nombre
    if (!nombre.value.trim() || !regexNombre.test(nombre.value.trim())) {
        mostrarError(nombre, 'Ingresa un nombre válido (solo letras, mínimo 2 caracteres)');
        esValido = false;
    }
    
    // Validar correo
    if (!correo.value.trim() || !regexCorreo.test(correo.value.trim())) {
        mostrarError(correo, 'Ingresa un correo electrónico válido');
        esValido = false;
    }
    
    // Validar mensaje
    if (!mensaje.value.trim() || !regexMensaje.test(mensaje.value.trim())) {
        mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    }
    
    // Si todo es válido, mostrar mensaje de éxito
    if (esValido) {
        alert('¡Pregunta enviada correctamente!\n\nNos pondremos en contacto contigo pronto.');
        
        // Limpiar formulario
        nombre.value = '';
        correo.value = '';
        mensaje.value = '';
    }
}

// Función para mostrar error
function mostrarError(elemento, mensaje) {
    elemento.classList.add('error');
    
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-mensaje';
    errorMsg.textContent = mensaje;
    
    elemento.parentNode.insertBefore(errorMsg, elemento.nextSibling);
}

// Función para limpiar errores
function limpiarErrores() {
    // Remover clases de error
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    
    // Remover mensajes de error
    document.querySelectorAll('.error-mensaje').forEach(el => {
        el.remove();
    });
}
