$(document).ready(function() {
    
    // 1. Lógica del Menú (Desktop y Móvil)
    function toggleMenu() {
        if (window.innerWidth > 1126) {
            // Desktop: Contraer/Expandir normal
            $('#sidebar').toggleClass('collapsed');
        } else {
            // Móvil: Abrir/Cerrar overlay completo
            $('#sidebar').toggleClass('mobile-open');
        }
    }

    $('#toggle-sidebar, #hamburger-btn').on('click', function() {
        toggleMenu();
    });

    // 2. Cambio de Vistas de Contenido
    $('.menu-item').not('.toggle-btn').on('click', function() {
        const targetView = $(this).data('target');

        // Actualizar clase activa en el menú
        $('.menu-item').removeClass('active');
        $(this).addClass('active');

        // Intercambiar visibilidad de los DIVs de contenido
        $('.view-section').removeClass('active');
        $('#' + targetView).addClass('active');

        // Si estamos en móvil, cerrar el menú tras elegir
        if (window.innerWidth <= 1126) {
            $('#sidebar').removeClass('mobile-open');
        }

        // Hacer scroll al inicio de la nueva vista
        $('.content-area').scrollTop(0);
    });
});