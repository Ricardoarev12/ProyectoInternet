// =============================================
// CARRUSEL BÁSICO - SOLO ANIMACIÓN
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carrusel-track');
    
    if (track) {
        const productos = track.querySelectorAll('.producto-card');
        const totalProductos = productos.length;
        let posicion = 0;
        
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
