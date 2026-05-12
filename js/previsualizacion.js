$(document).ready(function() {
    console.log("Módulo de previsualización cargado correctamente.");

    // Simulación de datos institucionales (Fake Data)
    const fakeData = {
        'F001': {
            title: 'Índice Nacional de Precios al Consumidor (INPC)',
            headers: ['Fecha', 'Índice INPC', 'Inflación Mensual (%)', 'Inflación Anual (%)'],
            rows: [
                ['Marzo 2024', '133.45', '0.29', '4.42'],
                ['Febrero 2024', '133.06', '0.09', '4.40'],
                ['Enero 2024', '132.94', '0.89', '4.88'],
                ['Diciembre 2023', '131.76', '0.71', '4.66'],
                ['Noviembre 2023', '130.83', '0.64', '4.32']
            ]
        },
        'F002': {
            title: 'Tasas de Interés (TIIE)',
            headers: ['Fecha', 'Plazo (Días)', 'Tasa (%)', 'Variación (pp)'],
            rows: [
                ['15/04/2024', '28', '11.25', '-0.02'],
                ['15/04/2024', '91', '11.48', '+0.01'],
                ['12/04/2024', '28', '11.27', '0.00'],
                ['11/04/2024', '28', '11.27', '+0.05'],
                ['10/04/2024', '28', '11.22', '-0.01']
            ]
        },
        'F003': {
            title: 'Tablero de Tablero de Calificaciones en el Envío de Información del Sistema Financiero al Banco de México',
            headers: ['Sector', 'Institución', 'Formulario', 'Periodo', 'Total', 'Ind. 1', 'Ind. 2', 'Ind. 3'],
            rows: [
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'ACLME (PREVIO)', 'Diciembre 2025', '9.93', '9.27', '10.00', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'CVT', 'Noviembre 2025', '9.87', '9.27', '9.60', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'CVT', 'Diciembre 2025', '9.94', '10.00', '9.58', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'GARANTIAS', 'Noviembre 2025', '10.00', '10.00', '10.00', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'GARANTIAS', 'Diciembre 2025', '10.00', '10.00', '10.00', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OFF', 'Noviembre 2025', '10.00', '10.00', '10.00', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OFF', 'Diciembre 2025', '10.00', '10.00', '10.00', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OPTO', 'Noviembre 2025', '9.91', '9.75', '9.56', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OPTO', 'Diciembre 2025', '9.94', '9.90', '9.67', '10.00'],
                ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'PAC', 'Noviembre 2025', '10.00', '10.00', '10.00', '10.00']
            ]
        },
        'F004': {
        title: 'Tablero de Calificaciones en el Envío de Información del Sistema Financiero al Banco de México. (Público)',
        headers: ['Sector', 'Institución', 'Formulario', 'Periodo', 'Total', 'Ind. 1', 'Ind. 2', 'Ind. 3'],
        rows: [
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'ACLME (PREVIO)', 'Diciembre 2024', '9.93', '9.27', '10.00', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'CVT', 'Noviembre 2024', '9.87', '9.27', '9.60', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'CVT', 'Diciembre 2024', '9.94', '10.00', '9.58', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'GARANTIAS', 'Noviembre 2024', '10.00', '10.00', '10.00', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'GARANTIAS', 'Diciembre 2024', '10.00', '10.00', '10.00', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OFF', 'Noviembre 2024', '10.00', '10.00', '10.00', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OFF', 'Diciembre 2024', '10.00', '10.00', '10.00', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OPTO', 'Noviembre 2024', '9.91', '9.75', '9.56', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'OPTO', 'Diciembre 2024', '9.94', '9.90', '9.67', '10.00'],
            ['Casas de Bolsa', '(013005) - C.B. SCOTIA INVERLAT', 'PAC', 'Noviembre 2024', '10.00', '10.00', '10.00', '10.00']
        ]
    }
    };

    // 1. EVENTO DE APERTURA (Usando delegación de eventos)
    $(document).on('click', '.btn-preview', function(e) {
        e.preventDefault();
        
        // Buscamos el ID en la card padre
        const id = $(this).closest('.card-fuente').attr('data-id');
        const data = fakeData[id];

        console.log("Intentando abrir previsualización para ID:", id);

        if (data) {
            $('#modal-title').text(data.title);
            
            // Llenar Cabecera
            const $header = $('#table-header');
            $header.empty();
            data.headers.forEach(h => $header.append(`<th>${h}</th>`));

            // Llenar Filas
            const $body = $('#table-body');
            $body.empty();
            data.rows.forEach(row => {
                let rowHtml = '<tr>';
                row.forEach(cell => rowHtml += `<td>${cell}</td>`);
                rowHtml += '</tr>';
                $body.append(rowHtml);
            });

            // Mostrar Modal
            $('#modal-preview').css('display', 'flex').hide().fadeIn(300);
        } else {
            alert("No hay datos de previsualización disponibles para esta fuente.");
        }
    });

    // 2. EVENTO DE CIERRE
    $(document).on('click', '.btn-close-modal', function() {
        $('#modal-preview').fadeOut(300);
    });

    // Cerrar si hace clic fuera del contenido blanco
    $(document).on('click', '#modal-preview', function(e) {
        if ($(e.target).is('#modal-preview')) {
            $(this).fadeOut(300);
        }
    });
});