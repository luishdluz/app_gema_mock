$(document).ready(function() {
    let elementoAEliminar = null;

    // 1. Abrir Modal de Confirmación
    $(document).on('click', '.btn-del', function() {
        elementoAEliminar = $(this).closest('.card-fuente');
        const nombreFuente = elementoAEliminar.find('h3').text();
        const esPadre = elementoAEliminar.hasClass('is-parent');

        $('#confirm-title').text(`¿Eliminar "${nombreFuente}"?`);
        
        if (esPadre) {
            $('#parent-warning').show();
        } else {
            $('#parent-warning').hide();
        }

        $('#modal-eliminar').css('display', 'flex').hide().fadeIn(200);
    });

    // 2. Ejecutar Eliminación
    $('#btn-confirm-del').on('click', function() {
        if (!elementoAEliminar) return;

        const $wrapper = elementoAEliminar.closest('.hierarchy-grid-wrapper');
        const esHijo = elementoAEliminar.hasClass('is-child');
        const esPadre = elementoAEliminar.hasClass('is-parent');

        // Efecto visual de desvanecimiento antes de borrar
        elementoAEliminar.css('transition', 'all 0.4s');
        elementoAEliminar.css({ opacity: 0, transform: 'scale(0.8)' });

        setTimeout(() => {
            if (esPadre) {
                // Si es padre, borramos todo el grupo (incluye hijos)
                if ($wrapper.length) {
                    $wrapper.fadeOut(300, function() { $(this).remove(); });
                } else {
                    elementoAEliminar.remove();
                }
            } else if (esHijo) {
                // Si es hijo, lo borramos y checamos si el padre se queda solo
                const $parent = elementoAEliminar.siblings('.is-parent');
                elementoAEliminar.remove();

                // Si ya no quedan más hijos en el wrapper
                if ($wrapper.find('.is-child').length === 0) {
                    // "Disolvemos" el wrapper: movemos al padre afuera y borramos el wrapper
                    $parent.removeClass('is-parent').detach().insertBefore($wrapper);
                    $wrapper.remove();
                }
            } else {
                // Fuente independiente normal
                elementoAEliminar.remove();
            }
            
            $('#modal-eliminar').fadeOut(200);
            elementoAEliminar = null;
        }, 400);
    });

    // Cerrar modal
    $('#btn-cancel-del, .modal-overlay').on('click', function(e) {
        if (e.target !== this) return;
        $('#modal-eliminar').fadeOut(200);
    });
});