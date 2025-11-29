class Producto {
    constructor(id, nombre, precio, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    generarHTML() {
        return `
            <div class="producto-item" data-id="${this.id}">
                <div class="info">
                    <h3>${this.nombre}</h3>
                    <p class="precio">$${this.precio.toFixed(2)}</p>
                    <p class="descripcion">${this.descripcion}</p>
                    <div class="cantidad-carrito">
                        <label>Cantidad:</label>
                        <input type="number" value="1" min="1" max="10" class="input-cantidad" data-id="${this.id}">
                    </div>
                    <button class="btn-agregar" data-id="${this.id}" data-nombre="${this.nombre}" data-precio="${this.precio}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    }
}

const productos = [
    new Producto(1, "Laptop Gaming", 1299.99, "Laptop con procesador Intel i7, 16GB RAM y tarjeta gráfica dedicada."),
    new Producto(2, "Smartphone Samsung Galaxy", 699.99, "Smartphone con pantalla AMOLED de 6.7 pulgadas y cámara de 108MP."),
    new Producto(3, "Auriculares Bluetooth", 149.99, "Auriculares inalámbricos con cancelación de ruido y 30 horas de batería."),
    new Producto(4, "Smartwatch", 299.99, "Reloj inteligente con monitor cardíaco y GPS integrado."),
    new Producto(5, "Tablet Pro", 549.99, "Tablet de 12.4 pulgadas con 128GB de almacenamiento.")
];

function cargarProductos() {
    const listaProductos = document.querySelector('.lista-productos');
    
    if (listaProductos) {
        listaProductos.innerHTML = '';
        
        productos.forEach(producto => {
            listaProductos.insertAdjacentHTML('beforeend', producto.generarHTML());
        });
        
        agregarEventos();
    }
}

function agregarEventos() {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const nombre = this.dataset.nombre;
            const precio = parseFloat(this.dataset.precio);
            const inputCantidad = document.querySelector(`.input-cantidad[data-id="${id}"]`);
            const cantidad = parseInt(inputCantidad.value) || 1;
            
            agregarAlCarrito(id, nombre, precio, cantidad);
            
            this.textContent = '¡Agregado!';
            setTimeout(() => {
                this.textContent = 'Agregar al carrito';
            }, 1000);
        });
    });
}

function agregarAlCarrito(id, nombre, precio, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const existe = carrito.find(item => item.id === id);
    
    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, cantidad });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito`);
}

document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
});
