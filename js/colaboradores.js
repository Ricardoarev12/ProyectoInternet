document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    const h2 = main ? main.querySelector('h2') : null;
    
    if (h2 && h2.textContent.includes('Aliados')) {
        cargarColaboradores();
    }
});

async function cargarColaboradores() {
    const main = document.querySelector('main');
    
    // Mostrar mensaje de carga
    main.innerHTML = `
        <h2>Nuestros Colaboradores</h2>
        <p class="cargando">Cargando colaboradores...</p>
    `;
    
    try {
        const response = await fetch('https://randomuser.me/api/?results=6&nat=es');
        const data = await response.json();
        const empresas = [
            { nombre: "TechSolutions", rol: "Proveedor de Hardware" },
            { nombre: "CloudNet", rol: "Servicios en la Nube" },
            { nombre: "DataPro", rol: "Análisis de Datos" },
            { nombre: "SecureIT", rol: "Seguridad Informática" },
            { nombre: "DevStudio", rol: "Desarrollo de Software" },
            { nombre: "NetServices", rol: "Servicios de Red" }
        ];
        
        let html = `
            <h2>Nuestros Colaboradores</h2>
            <p class="intro-colaboradores">Trabajamos con los mejores aliados para ofrecer productos y servicios de calidad.</p>
            <div class="colaboradores-grid">
        `;
        
        data.results.forEach((persona, index) => {
            html += `
                <div class="colaborador-card">
                    <img src="${persona.picture.large}" alt="${empresas[index].nombre}">
                    <h3>${empresas[index].nombre}</h3>
                    <p class="rol">${empresas[index].rol}</p>
                    <p class="representante">Rep: ${persona.name.first} ${persona.name.last}</p>
                </div>
            `;
        });
        
        html += '</div>';
        main.innerHTML = html;
        
    } catch (error) {
        main.innerHTML = `
            <h2>Nuestros Colaboradores</h2>
            <p class="intro-colaboradores">Trabajamos con los mejores aliados.</p>
            <div class="colaboradores-grid">
                <div class="colaborador-card">
                    <div class="avatar-placeholder">TS</div>
                    <h3>TechSolutions</h3>
                    <p class="rol">Proveedor de Hardware</p>
                </div>
                <div class="colaborador-card">
                    <div class="avatar-placeholder">CN</div>
                    <h3>CloudNet</h3>
                    <p class="rol">Servicios en la Nube</p>
                </div>
                <div class="colaborador-card">
                    <div class="avatar-placeholder">DP</div>
                    <h3>DataPro</h3>
                    <p class="rol">Análisis de Datos</p>
                </div>
                <div class="colaborador-card">
                    <div class="avatar-placeholder">SI</div>
                    <h3>SecureIT</h3>
                    <p class="rol">Seguridad Informática</p>
                </div>
            </div>
        `;
    }
}
