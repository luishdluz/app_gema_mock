// Estado Global de Aplicaciones (Accesible para otros módulos)
window.GEMA_APPS = [
    { id: 'APP001', nombre: 'Explorador de Datos', oficina: 'Dirección de Información' },
    { id: 'APP002', nombre: 'Laboratorio de datos (LabPIIF)', oficina: 'Gerencia de Analítica' },
    { id: 'APP003', nombre: 'API de Información Financiera (APIIF)', oficina: 'Sistemas Centrales' }
];

$(document).ready(function() {
    
    // 1. Renderizar Aplicaciones
    function renderApps(filter = "") {
        const $grid = $('#apps-grid');
        $grid.empty();
        $('.no-results-apps').remove();

        const filtered = window.GEMA_APPS.filter(app => 
            app.nombre.toLowerCase().includes(filter.toLowerCase()) || 
            app.oficina.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            $grid.append(`
                <div class="no-results-container no-results-apps" style="grid-column: 1/-1;">
                    <h3 style="color:#64748b;">No se encontraron aplicaciones para "${filter}"</h3>
                </div>
            `);
            return;
        }

        filtered.forEach(app => {
            const cardHtml = `
                <div class="card-fuente card-app" data-id="${app.id}">
                    <div class="card-content">
                        <span class="card-id">${app.id}</span>
                        <h3>${app.nombre}</h3>
                        <div class="oficina-tag">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 -960 960 960' width='16px' fill='%2364748b'%3E%3Cpath d='M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z'/%3E%3C/svg%3E">
                            ${app.oficina}
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-mini btn-del-app" title="Eliminar Aplicación">
                            <img src="imagenes/delete.svg">
                        </button>
                    </div>
                </div>
            `;
            $grid.append(cardHtml);
        });
    }

    // Inicializar vista
    renderApps();

    // 2. Abrir/Cerrar Modal
    $('#btn-abrir-nueva-app').on('click', () => $('#modal-app').fadeIn(200).css('display', 'flex'));
    $('.btn-close-modal').on('click', () => $('#modal-app').fadeOut(200));

    // 3. Agregar Nueva Aplicación
    $('#form-nueva-app').on('submit', function(e) {
        e.preventDefault();
        const nuevaApp = {
            id: 'APP' + Math.floor(Math.random() * 1000),
            nombre: $('#app-nombre').val(),
            oficina: $('#app-oficina').val()
        };

        window.GEMA_APPS.push(nuevaApp);
        renderApps();
        $('#modal-app').fadeOut(200);
        this.reset();
    });

    // 4. Eliminar Aplicación (Usa la misma modal de confirmación de fuentes si existe)
    let appAEliminar = null;
    $(document).on('click', '.btn-del-app', function() {
        const id = $(this).closest('.card-app').data('id');
        appAEliminar = id;
        
        // Reutilizamos la modal de eliminación existente
        $('#confirm-title').text('¿Eliminar Aplicación?');
        $('#confirm-msg').text('Esta aplicación dejará de tener acceso a las fuentes de datos vinculadas.');
        $('#parent-warning').hide();
        $('#modal-eliminar').fadeIn(200).css('display', 'flex');
    });

    // Sobrescribimos el clic de confirmación para Apps si la modal está abierta para una App
    $('#btn-confirm-del').on('click', function() {
        if (appAEliminar) {
            window.GEMA_APPS = window.GEMA_APPS.filter(a => a.id !== appAEliminar);
            renderApps();
            $('#modal-eliminar').fadeOut(200);
            appAEliminar = null;
        }
    });

    // 5. Integración con Buscador del Header
    $('.input-buscar').on('input', function() {
        if ($('#vista-apps').hasClass('active')) {
            renderApps($(this).val());
        }
    });
});