// =============================================
// CARRUSEL BÁSICO - PÁGINA DE INICIO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const productosGrid = document.querySelector('.productos-grid');
    
    if (productosGrid) {
        // Productos para el carrusel
        const productos = [
            { nombre: "Samsung Galaxy", precio: "$699.99", imagen: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/2025/01/galaxy-s25ultra-16by9.jpg" },
            { nombre: "Laptop Gaming", precio: "$1,299.99", imagen: "https://m.media-amazon.com/images/I/81kxce-AlLL._AC_.jpg" },
            { nombre: "Auriculares Bluetooth", precio: "$149.99", imagen: "https://m.media-amazon.com/images/I/61zW8yc4hTL.jpg" },
            { nombre: "Smartwatch", precio: "$299.99", imagen: "https://i5.walmartimages.com/asr/c67d5a0f-14ab-43af-8eaf-cfe75518c13f.8c2d23b6c1697fd0d42fbb0f42eafcc1.jpeg" },
            { nombre: "Tablet Pro", precio: "$549.99", imagen: "https://static.androidplanet.nl/orca/products/27077/samsung-galaxy-tab-s11-ultra.png" }
        ];

        // Limpiar contenido existente
        productosGrid.innerHTML = '';
        
        // Crear estructura del carrusel
        const carrusel = document.createElement('div');
        carrusel.className = 'carrusel';
        
        const track = document.createElement('div');
        track.className = 'carrusel-track';
        
        // Agregar productos al carrusel
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p class="precio">${producto.precio}</p>
            `;
            track.appendChild(card);
        });
        
        carrusel.appendChild(track);
        productosGrid.appendChild(carrusel);
        
        // Variables del carrusel
        let posicion = 0;
        const totalProductos = productos.length;
        
        // Función para mover el carrusel automáticamente
        function moverCarrusel() {
            posicion++;
            if (posicion >= totalProductos) {
                posicion = 0;
            }
            track.style.transform = `translateX(-${posicion * 220}px)`;
        }
        
        // Iniciar el carrusel automático cada 3 segundos
        setInterval(moverCarrusel, 3000);
    }
});
