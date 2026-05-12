// Esquema Global de Metadatos (Se mantiene el arreglo)
window.GEMA_METADATA_SCHEMA = window.GEMA_METADATA_SCHEMA || [
    { id: 1, nombre: 'ID', descripcion: 'Identificador único de la fuente', tipo: 'texto' },
    { id: 2, nombre: 'Nombre', descripcion: 'Nombre descriptivo de la fuente', tipo: 'texto' },
    { id: 3, nombre: 'Descripción', descripcion: 'Detalle de la información que contiene la fuente', tipo: 'texto' },
    { id: 4, nombre: 'Responsable Información', descripcion: 'Oficina que generó la metodología', tipo: 'texto' },
    { id: 5, nombre: 'Responsable Técnico', descripcion: 'Oficina que implementa el objeto en la base de datos', tipo: 'texto' },
    { id: 6, nombre: 'Categoría', descripcion: 'Clasificación de seguridad de la información', tipo: 'select', valores: ['Uso Limitado', 'Uso General', 'Uso Público', 'No Significativa'] },
    { id: 7, nombre: 'Volumen', descripcion: 'Carga de datos estimada', tipo: 'select', valores: ['Bajo', 'Medio', 'Alto'] },
    { id: 8, nombre: 'Manejador DB', descripcion: 'Software de base de datos', tipo: 'select', valores: ['SQL Server', 'Sybase', 'Oracle', 'MongoDB'] },
    { id: 9, nombre: 'Servidor', descripcion: 'Host del servidor de base de datos', tipo: 'texto' },
    { id: 10, nombre: 'Base de Datos', descripcion: 'Nombre de la BD', tipo: 'texto' },
    { id: 11, nombre: 'Objeto', descripcion: 'Tipo de objeto resultante', tipo: 'select', valores: ['Tabla', 'Vista', 'Colección'] }
];

$(document).ready(function() {
    let valoresTemporales = [];
    let editId = null;

    // --- FUNCIÓN DE RENDERIZADO ---
    function renderMetadataTable() {
        const $tbody = $('#metadata-table-body');
        if (!$tbody.length) return;
        $tbody.empty();

        window.GEMA_METADATA_SCHEMA.forEach(meta => {
            let valoresHtml = meta.tipo === 'texto' ? 
                '<span class="type-tag type-texto">Texto Libre</span>' : 
                `<span class="type-tag type-select">Opciones</span> <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:5px;">` +
                (meta.valores ? meta.valores.map(v => `<span class="badge-valor">${v}</span>`).join('') : '') + `</div>`;

            $tbody.append(`
                <tr data-id="${meta.id}">
                    <td style="font-weight:700; color:#172542;">${meta.nombre}</td>
                    <td style="color:#64748b; font-size:0.85rem;">${meta.descripcion}</td>
                    <td>${valoresHtml}</td>
                    <td>
                        <div class="card-actions" style="border:none; margin:0; padding:0; justify-content:center;">
                            <button class="btn-mini btn-edit-meta" title="Editar"><img src="imagenes/edit.svg" style="width:14px;"></button>
                            <button class="btn-mini btn-del-meta" title="Eliminar"><img src="imagenes/delete.svg" style="width:14px;"></button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    renderMetadataTable();

    // --- EVENTOS DE LA MODAL (ABRIR / CERRAR) ---

    // Abrir para Nuevo
    $(document).on('click', '#btn-nuevo-metadato', function() {
        editId = null;
        valoresTemporales = [];
        $('#form-metadata')[0].reset();
        $('#section-valores-fijos').hide();
        $('#lista-valores-config').empty();
        $('#meta-modal-title').text('Nuevo Metadato');
        $('#modal-metadata').css('display', 'flex').hide().fadeIn(200);
    });

    // Abrir para Editar
    $(document).on('click', '.btn-edit-meta', function() {
        const id = $(this).closest('tr').data('id');
        const meta = window.GEMA_METADATA_SCHEMA.find(m => m.id == id);
        if (!meta) return;

        editId = id;
        $('#meta-nombre').val(meta.nombre);
        $('#meta-descripcion').val(meta.descripcion);
        $('#meta-tipo').val(meta.tipo);
        
        if (meta.tipo === 'select') {
            valoresTemporales = [...(meta.valores || [])];
            renderValoresTemporales();
            $('#section-valores-fijos').show();
        } else {
            $('#section-valores-fijos').hide();
        }

        $('#meta-modal-title').text('Editar Metadato');
        $('#modal-metadata').css('display', 'flex').hide().fadeIn(200);
    });

    // CERRAR MODAL (Universal para esta sección)
    $(document).on('click', '.btn-close-modal', function() {
        $('#modal-metadata').fadeOut(200);
    });

    // --- LÓGICA INTERNA DEL FORMULARIO ---

    // Cambiar tipo de entrada
    $(document).on('change', '#meta-tipo', function() {
        if ($(this).val() === 'select') {
            $('#section-valores-fijos').fadeIn();
        } else {
            $('#section-valores-fijos').hide();
            valoresTemporales = [];
        }
    });

    // Agregar valor a la lista
    $(document).on('click', '#btn-add-valor', function() {
        const valor = $('#input-nuevo-valor').val().trim();
        if (valor && !valoresTemporales.includes(valor)) {
            valoresTemporales.push(valor);
            renderValoresTemporales();
            $('#input-nuevo-valor').val('').focus();
        }
    });

    function renderValoresTemporales() {
        const $cont = $('#lista-valores-config');
        $cont.empty();
        valoresTemporales.forEach((v, index) => {
            $cont.append(`<span class="badge-valor removable" data-index="${index}">${v} &times;</span>`);
        });
    }

    // Quitar valor de la lista
    $(document).on('click', '.badge-valor.removable', function() {
        const idx = $(this).data('index');
        valoresTemporales.splice(idx, 1);
        renderValoresTemporales();
    });

    // --- GUARDAR (SUBMIT) ---
    $(document).on('submit', '#form-metadata', function(e) {
        e.preventDefault();
        
        const nuevoMetadato = {
            id: editId || Date.now(),
            nombre: $('#meta-nombre').val(),
            descripcion: $('#meta-descripcion').val(),
            tipo: $('#meta-tipo').val(),
            valores: $('#meta-tipo').val() === 'select' ? [...valoresTemporales] : null
        };

        if (editId) {
            const idx = window.GEMA_METADATA_SCHEMA.findIndex(m => m.id === editId);
            window.GEMA_METADATA_SCHEMA[idx] = nuevoMetadato;
        } else {
            window.GEMA_METADATA_SCHEMA.push(nuevoMetadato);
        }

        renderMetadataTable();
        $('#modal-metadata').fadeOut(200);
        console.log("Esquema actualizado:", window.GEMA_METADATA_SCHEMA);
    });

    // --- LÓGICA DE ELIMINACIÓN DE METADATOS ---
    let metaAEliminarId = null;

    // 1. Abrir confirmación al dar clic en el icono de eliminar (basurero)
    $(document).on('click', '.btn-del-meta', function() {
        const $fila = $(this).closest('tr');
        metaAEliminarId = $fila.data('id');
        const nombreMeta = $fila.find('td:first').text();

        // Personalizamos la modal de eliminación que ya tenemos en el HTML
        $('#confirm-title').text('¿Eliminar Metadato Obligatorio?');
        $('#confirm-msg').html(`Está a punto de eliminar el campo <b>"${nombreMeta}"</b>.<br>Esto afectará a la configuración de todas las fuentes de datos.`);
        $('#parent-warning').hide(); // No es una fuente, así que ocultamos el aviso de subfuentes
        
        // Mostramos la modal
        $('#modal-eliminar').css('display', 'flex').hide().fadeIn(200);
    });

    // 2. Escuchar la confirmación definitiva
    // Usamos .off() antes de .on() para evitar que el evento se duplique si el script se recarga
    $(document).on('click', '#btn-confirm-del', function() {
        if (metaAEliminarId !== null && $('#confirm-title').text().includes('Metadato')) {
            
            // Filtramos el arreglo global para quitar el elemento
            window.GEMA_METADATA_SCHEMA = window.GEMA_METADATA_SCHEMA.filter(m => m.id != metaAEliminarId);
            
            // Refrescamos la tabla
            renderMetadataTable();
            
            // Cerramos la modal
            $('#modal-eliminar').fadeOut(200);
            
            // Limpiamos la variable para que no afecte a fuentes o apps después
            metaAEliminarId = null;
            
            console.log("Metadato eliminado. Esquema actual:", window.GEMA_METADATA_SCHEMA);
        }
    });

    // 3. Botón cancelar de la modal (por si no estaba en este script)
    $(document).on('click', '#btn-cancel-del', function() {
        $('#modal-eliminar').fadeOut(200);
        metaAEliminarId = null;
    });

    // --- LÓGICA DEL BUSCADOR PARA METADATOS ---
    $(document).on('input', '.input-buscar', function() {
        // Solo actuar si la pestaña de metadatos está activa
        if (!$('#vista-metadatos').hasClass('active')) return;

        const searchTerm = $(this).val().toLowerCase().trim();
        const $rows = $('#metadata-table-body tr');
        let visibleRows = 0;

        // Limpiar mensaje de "sin resultados" previo
        $('.no-results-metadata').remove();

        if (searchTerm === "") {
            $rows.show();
            return;
        }

        $rows.each(function() {
            const $row = $(this);
            // Buscamos en el nombre (primera columna) y descripción (segunda columna)
            const nombre = $row.find('td:eq(0)').text().toLowerCase();
            const descripcion = $row.find('td:eq(1)').text().toLowerCase();

            if (nombre.includes(searchTerm) || descripcion.includes(searchTerm)) {
                $row.show();
                visibleRows++;
            } else {
                $row.hide();
            }
        });

        // Mostrar mensaje si no hay resultados
        if (visibleRows === 0) {
            $('#metadata-table-body').append(`
                <tr class="no-results-metadata">
                    <td colspan="4" style="text-align: center; padding: 40px; color: #64748b;">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='40px' viewBox='0 -960 960 960' width='40px' fill='%23cbd5e1'%3E%3Cpath d='M796-96 533-359q-30 26-69 42.5T380-300q-109 0-184.5-75.5T120-560q0-109 75.5-184.5T380-820q109 0 184.5 75.5T640-560q0 44-16.5 83T581-408l262 262-47 46ZM380-400q67 0 113.5-46.5T540-560q0-67-46.5-113.5T380-720q-67 0-113.5 46.5T220-560q0 67 46.5 113.5T380-400Z'/%3E%3C/svg%3E" style="display:block; margin: 0 auto 10px;">
                        No se encontraron metadatos que coincidan con "<b>${searchTerm}</b>"
                    </td>
                </tr>
            `);
        }
    });

});