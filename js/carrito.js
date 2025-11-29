// =============================================
// CARRITO FUNCIONAL
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    const h2 = main ? main.querySelector('h2') : null;
    
    // Verificar si estamos en la página del carrito
    if (h2 && h2.textContent.includes('carrito')) {
        mostrarCarrito();
    }
});

// Función para mostrar el carrito
function mostrarCarrito() {
    const main = document.querySelector('main');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    let html = '<h2>Resumen del carrito</h2>';
    
    if (carrito.length === 0) {
        html += `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío</p>
                <a href="productos.html" class="btn-ver-productos">Ver productos</a>
            </div>
        `;
    } else {
        html += '<div class="carrito-lista">';
        
        let subtotal = 0;
        
        carrito.forEach(item => {
            const itemTotal = item.precio * item.cantidad;
            subtotal += itemTotal;
            
            html += `
                <div class="carrito-item" data-id="${item.id}">
                    <div class="item-info">
                        <h3>${item.nombre}</h3>
                        <p>Precio: $${item.precio.toFixed(2)}</p>
                    </div>
                    <div class="item-cantidad">
                        <button class="btn-menos" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-mas" data-id="${item.id}">+</button>
                    </div>
                    <div class="item-total">
                        <p>$${itemTotal.toFixed(2)}</p>
                        <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Resumen
        const iva = subtotal * 0.16;
        const total = subtotal + iva;
        
        html += `
            <div class="carrito-resumen">
                <p>Subtotal: $${subtotal.toFixed(2)}</p>
                <p>IVA (16%): $${iva.toFixed(2)}</p>
                <p class="total">Total: $${total.toFixed(2)}</p>
                <button class="btn-comprar" id="btn-comprar">Finalizar compra</button>
                <button class="btn-vaciar" id="btn-vaciar">Vaciar carrito</button>
            </div>
        `;
    }
    
    main.innerHTML = html;
    
    // Agregar eventos
    agregarEventosCarrito();
}

// Función para agregar eventos del carrito
function agregarEventosCarrito() {
    // Botones de incrementar
    document.querySelectorAll('.btn-mas').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(parseInt(this.dataset.id), 1);
        });
    });
    
    // Botones de decrementar
    document.querySelectorAll('.btn-menos').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(parseInt(this.dataset.id), -1);
        });
    });
    
    // Botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            eliminarProducto(parseInt(this.dataset.id));
        });
    });
    
    // Botón vaciar carrito
    const btnVaciar = document.getElementById('btn-vaciar');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
    
    // Botón comprar
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', finalizarCompra);
    }
}

// Función para cambiar cantidad
function cambiarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

// Función para eliminar producto
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para vaciar carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}

// Función para finalizar compra
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length > 0) {
        const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const total = subtotal * 1.16;
        
        alert(`¡Compra realizada con éxito!\nTotal: $${total.toFixed(2)}\n\nGracias por tu compra.`);
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
}
