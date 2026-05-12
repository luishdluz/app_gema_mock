// Repositorio global para documentación
window.DOCS_FUENTES = {};

$(document).ready(function() {

    // 1. FUNCIÓN DE CARGA
    window.cargarDocumentacion = function(id) {

        if (!window.DOCS_FUENTES[id]) {
            window.DOCS_FUENTES[id] = { notas: "", archivos: [] };
        }

        const data = window.DOCS_FUENTES[id] || { notas: "", archivos: [] };
        
        // Cargar notas
        $('#doc-notas-ia').val(data.notas);
        
        // Cargar archivos
        const $lista = $('#lista-archivos-doc').empty();
        data.archivos.forEach(file => {
            $lista.append(generarFileCardHTML(file.nombre, file.size));
        });
    };

    // 2. SIMULAR SUBIDA DE ARCHIVOS
    $('#drop-zone-doc').on('click', function() {
        $('#input-file-doc').click();
    });

    $('#input-file-doc').on('change', function(e) {
        const files = e.target.files;
        for (let file of files) {
            // Simulación: Agregamos al UI y al objeto
            const sizeStr = (file.size / 1024).toFixed(1) + ' KB';
            $('#lista-archivos-doc').append(generarFileCardHTML(file.name, sizeStr));
        }
    });

    function generarFileCardHTML(nombre, size) {
        // Elegir icono según extensión
        let icon = 'insert_drive_file';
        if (nombre.includes('.pdf')) icon = 'picture_as_pdf';
        if (nombre.includes('.xls') || nombre.includes('.csv')) icon = 'table_view';

        return `
            <div class="file-card-doc animate__animated animate__fadeInUp">
                <div class="file-icon">
                    <i class="material-icons-outlined">${icon}</i>
                </div>
                <div class="file-info">
                    <span class="file-name">${nombre}</span>
                    <span class="file-size">${size}</span>
                </div>
                <button class="btn-remove-filter btn-delete-file" style="margin:0;">
                    <i class="material-icons-outlined">delete</i>
                </button>
            </div>
        `;
    }

    // 3. ELIMINAR ARCHIVO
    $(document).on('click', '.btn-delete-file', function() {
        $(this).closest('.file-card-doc').fadeOut(200, function() { $(this).remove(); });
    });

    // 4. INTEGRAR CON EL BOTÓN GUARDAR GENERAL (configuracion.js)
    // Debes añadir este bloque dentro del clic de #btn-guardar-config
    window.guardarDocumentacionActual = function(id) {
        const archivos = [];
        $('#lista-archivos-doc .file-card-doc').each(function() {
            archivos.push({
                nombre: $(this).find('.file-name').text(),
                size: $(this).find('.file-size').text()
            });
        });

        window.DOCS_FUENTES[id] = {
            notas: $('#doc-notas-ia').val(),
            archivos: archivos
        };
        console.log("Documentación guardada para IA:", id);
    };
});