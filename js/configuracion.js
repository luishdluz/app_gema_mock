let fuenteActualId = null;

// 1. DICCIONARIO DE DATOS PREABLECIDOS
window.FUENTES_PRECARGADAS = {
    'F001': {
        'ID': 'F001',
        'Nombre': 'Índice Nacional de Precios al Consumidor (INPC)',
        'Descripción': 'Serie histórica del índice de precios y sus variaciones porcentuales mensuales y anuales.',
        'Responsable Información': 'Dirección de Precios',
        'Responsable Técnico': 'Sistemas Económicos',
        'Categoría': 'Uso Limitado',
        'Volumen': 'Bajo',
        'Manejador DB': 'SQL Server',
        'Servidor': 'SRV-ECO-01',
        'Base de Datos': 'DB_INPC',
        'Objeto': 'Vista'
    },
    'F002': {
        'ID': 'F002',
        'Nombre': 'Tasas de Interés de Referencia (TIIE)',
        'Descripción': 'Valores diarios de la Tasa de Interés Interbancaria de Equilibrio en distintos plazos.',
        'Responsable Información': 'Dirección de Operaciones',
        'Responsable Técnico': 'Sistemas Financieros',
        'Categoría': 'Uso General',
        'Volumen': 'Bajo',
        'Manejador DB': 'Sybase',
        'Servidor': 'SRV-FIN-05',
        'Base de Datos': 'DB_MERCADOS',
        'Objeto': 'Tabla'
    },
    'F003': {
        'ID': 'F003',
        'Nombre': 'Tablero de Calificaciones en el Envío de Información',
        'Descripción': 'Indicadores detallados sobre la calidad y consistencia de la información reportada por instituciones.',
        'Responsable Información': 'Gerencia de Analítica',
        'Responsable Técnico': 'Infraestructura de Datos',
        'Categoría': 'Uso Limitado',
        'Volumen': 'Medio',
        'Manejador DB': 'Oracle',
        'Servidor': 'SRV-GEMA-PROD',
        'Base de Datos': 'GEMA_AUDIT',
        'Objeto': 'Tabla'
    },
    'F004': {
        'ID': 'F004',
        'Nombre': 'Tablero de Calificaciones (Público)',
        'Descripción': 'Vista pública simplificada para transparencia en la calidad de la información financiera.',
        'Responsable Información': 'Gerencia de Analítica',
        'Responsable Técnico': 'Infraestructura de Datos',
        'Categoría': 'Uso Público',
        'Volumen': 'Bajo',
        'Manejador DB': 'Oracle',
        'Servidor': 'SRV-GEMA-PUB',
        'Base de Datos': 'GEMA_EXT',
        'Objeto': 'Vista'
    }
};

// 1. REPOSITORIO GLOBAL (Asegúrate de que esté al principio del archivo)
// DICCIONARIO DE DATOS ALINEADO CON LA PREVISUALIZACIÓN
window.DICCIONARIOS_PRECARGADOS = {
    'F001': [
        { 
            nombre: 'FECHA', 
            desc: 'Fecha de la observación (Mes y Año)', 
            tipo: 'DATE', 
            nulos: 'No', 
            long: '8', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'INDICE_INPC', 
            desc: 'Valor del Índice Nacional de Precios al Consumidor (Base 2018)', 
            tipo: 'DECIMAL', 
            nulos: 'No', 
            long: '18,4', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'INFLACION_MENSUAL', 
            desc: 'Inflación Mensual (%) - Variación respecto al mes anterior', 
            tipo: 'DECIMAL', 
            nulos: 'Sí', 
            long: '9,4', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'INFLACION_ANUAL', 
            desc: 'Inflación Anual (%) - Variación respecto al mismo mes del año anterior', 
            tipo: 'DECIMAL', 
            nulos: 'Sí', 
            long: '9,4', 
            cat_tipo: 'none' 
        }
    ],
    'F002': [
        { 
            nombre: 'FECHA', 
            desc: 'Fecha de determinación de la tasa', 
            tipo: 'DATE', 
            nulos: 'No', 
            long: '8', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'PLAZO_DIAS', 
            desc: 'Plazo de la TIIE expresado en días (28, 91, 182)', 
            tipo: 'INT', 
            nulos: 'No', 
            long: '3', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'TASA_PORCENTAJE', 
            desc: 'Valor de la tasa de interés en porcentaje', 
            tipo: 'FLOAT', 
            nulos: 'No', 
            long: '8', 
            cat_tipo: 'none' 
        },
        { 
            nombre: 'VARIACION_PP', 
            desc: 'Variación en puntos porcentuales respecto a la jornada anterior', 
            tipo: 'FLOAT', 
            nulos: 'Sí', 
            long: '8', 
            cat_tipo: 'none' 
        }
    ],
    'F003': [ // Tablero SF
        { nombre: 'SECTOR', desc: 'Sector', tipo: 'VARCHAR', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'INSTITUCION', desc: 'Nombre corto de la institución', tipo: 'VARCHAR', nulos: 'Sí', long: '5,2', cat_tipo: 'none' },
        { nombre: 'FORMULARIO', desc: 'Nombre del formulario', tipo: 'VARCHAR', nulos: 'No', long: '20', cat_tipo: 'json' },
        { nombre: 'PERIODO', desc: 'Periodo de información (YYYYMM)', tipo: 'INT', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'TOTAL', desc: 'Promedio General', tipo: 'DECIMAL', nulos: 'Sí', long: '5,2', cat_tipo: 'none' },
        { nombre: 'IND1', desc: 'Indicador de extemporaneidad (Puntualidad)', tipo: 'DECIMAL', nulos: 'No', long: '20', cat_tipo: 'json' },
        { nombre: 'IND2', desc: 'Indicador de reenvíos (Calidad)', tipo: 'DECIMAL', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'IND3', desc: '   Indicador de retransmisiones (Correcciones)', tipo: 'DECIMAL', nulos: 'Sí', long: '5,2', cat_tipo: 'none' }
    ],
    'F004': [ // Tablero Público
        { nombre: 'SECTOR', desc: 'Sector', tipo: 'VARCHAR', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'INSTITUCION', desc: 'Nombre corto de la institución', tipo: 'VARCHAR', nulos: 'Sí', long: '5,2', cat_tipo: 'none' },
        { nombre: 'FORMULARIO', desc: 'Nombre del formulario', tipo: 'VARCHAR', nulos: 'No', long: '20', cat_tipo: 'json' },
        { nombre: 'PERIODO', desc: 'Periodo de información (YYYYMM)', tipo: 'INT', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'TOTAL', desc: 'Promedio General', tipo: 'DECIMAL', nulos: 'Sí', long: '5,2', cat_tipo: 'none' },
        { nombre: 'IND1', desc: 'Indicador de extemporaneidad (Puntualidad)', tipo: 'DECIMAL', nulos: 'No', long: '20', cat_tipo: 'json' },
        { nombre: 'IND2', desc: 'Indicador de reenvíos (Calidad)', tipo: 'DECIMAL', nulos: 'No', long: '150', cat_tipo: 'none' },
        { nombre: 'IND3', desc: '   Indicador de retransmisiones (Correcciones)', tipo: 'DECIMAL', nulos: 'Sí', long: '5,2', cat_tipo: 'none' }
    ]
};

$(document).ready(function() {

    //Nueva fuente
    // --- EVENTO: CLIC EN AGREGAR NUEVA FUENTE ---
$(document).on('click', '#btn-nueva-fuente', function(e) {
    e.preventDefault();
    
    // 1. Generamos un ID temporal para la nueva fuente
    fuenteActualId = 'NUEVA_' + Date.now();
    
    // 2. Limpiar el título y etiquetas de la modal
    $('#config-fuente-titulo').text("Nueva Fuente de Datos");
    $('#config-fuente-id').text(`ID sugerido: ${fuenteActualId}`);

    // 3. Reset de pestañas (siempre iniciar en metadatos)
    $('.tab-btn').removeClass('active');
    $('[data-tab="tab-metadatos"]').addClass('active');
    $('.tab-pane').removeClass('active').hide();
    $('#tab-metadatos').show().addClass('active');

    // 4. Cargar módulos VACÍOS
    // Al no existir el ID en los objetos globales, estas funciones cargarán todo en blanco
    cargarMetadatos(fuenteActualId);
    cargarDiccionario(fuenteActualId);
    
    if (typeof window.cargarExposicion === "function") window.cargarExposicion(fuenteActualId);
    if (typeof window.cargarDocumentacion === "function") window.cargarDocumentacion(fuenteActualId);

    // 5. Mostrar modal
    $('#modal-configuracion').fadeIn(300).css('display', 'flex');
});
    

    // --- 1. ABRIR CONFIGURACIÓN ---
    $(document).off('click', '.btn-config').on('click', '.btn-config', function(e) {
        e.preventDefault();
        const $card = $(this).closest('.card-fuente');
        fuenteActualId = $card.data('id');
        const nombre = $card.find('h3').text();

        $('#config-fuente-titulo').text(nombre);
        $('#config-fuente-id').text(`ID: ${fuenteActualId}`);

        // Reset de pestañas
        $('.tab-btn').removeClass('active');
        $('[data-tab="tab-metadatos"]').addClass('active');
        $('.tab-pane').removeClass('active').hide();
        $('#tab-metadatos').show().addClass('active');

        // CARGAR DATOS
        cargarMetadatos(fuenteActualId);
        cargarDiccionario(fuenteActualId);

        $('#modal-configuracion').fadeIn(300).css('display', 'flex');
    });

    // --- CONTROLADOR DE PESTAÑAS (TABS) ---
$(document).off('click', '.tab-btn').on('click', '.tab-btn', function(e) {
    e.preventDefault();
    
    // 1. Obtener el ID del tab al que queremos ir
    const targetTab = $(this).data('tab');
    console.log("Cambiando a pestaña:", targetTab);

    // 2. Gestionar estado visual de los botones
    $('.tab-btn').removeClass('active'); // Quitamos active de todos
    $(this).addClass('active');          // Ponemos active al actual

    // 3. Gestionar visibilidad de los paneles de contenido
    $('.tab-pane').removeClass('active').hide(); // Escondemos todos los paneles
    $(`#${targetTab}`).addClass('active').fadeIn(200); // Mostramos el panel destino

    // 4. Lógica extra: Si entramos a diccionario, asegurar que se cargue
    if (targetTab === 'tab-diccionario') {
        // fuenteActualId es la variable global que definimos al abrir la modal
        if (typeof cargarDiccionario === "function") {
            cargarDiccionario(fuenteActualId);
        }
    }else if (targetTab === 'tab-exposicion') {
        // Verificamos que la función exista antes de llamarla
        if (typeof window.cargarExposicion === "function") {
            window.cargarExposicion(fuenteActualId);
        } else {
            console.error("Error: js/exposicion.js no está cargado.");
        }
    }else if (targetTab === 'tab-documentacion') {
        cargarDocumentacion(fuenteActualId);
    }
});

    // 2. RENDERIZAR CARDS OBLIGATORIAS
    function renderMandatoryCards(datosExistentes) {
        const $container = $('#contenedor-metadatos-obligatorios');
        const esquema = window.GEMA_METADATA_SCHEMA || [];

        esquema.forEach(meta => {
            const valorActual = datosExistentes[meta.nombre] || "";
            let inputControl = '';

            if (meta.tipo === 'select') {
                inputControl = `<select class="gema-input-card">
                    <option value="" disabled ${valorActual === "" ? "selected" : ""}>Seleccione...</option>
                    ${meta.valores ? meta.valores.map(v => 
                        `<option value="${v}" ${v === valorActual ? "selected" : ""}>${v}</option>`
                    ).join('') : ''}
                </select>`;
            } else {
                inputControl = `<input type="text" class="gema-input-card" value="${valorActual}" placeholder="Capturar...">`;
            }

            // Inyectamos la estructura de Card que pediste
            $container.append(`
                <div class="metadata-card">
                    <label title="${meta.descripcion}">
                        ${meta.nombre}
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='14px' viewBox='0 -960 960 960' width='14px' fill='%23cbd5e1'%3E%3Cpath d='M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'/%3E%3C/svg%3E">
                    </label>
                    ${inputControl}
                </div>
            `);
        });
    }

    // 3. RENDERIZAR LA TARJETA DE "AGREGAR"
    function renderAddCard() {
        $('#contenedor-metadatos-opcionales').append(`
            <div class="add-dic-card" id="btn-card-add-meta">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px' fill='%2394a3b8'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E">
                <span>Agregar Metadato Opcional</span>
            </div>
        `);
    }

    // 4. LÓGICA PARA AGREGAR CAMPO OPCIONAL
    $(document).off('click', '#btn-card-add-meta').on('click', '#btn-card-add-meta', function(e) {
        e.preventDefault();
        const nuevoHtml = generarHtmlMetaOpcional();
        $(nuevoHtml).insertBefore('#btn-card-add-meta').hide().fadeIn(300);
    });

// --- 2. CARGAR METADATOS (OBLIGATORIOS Y OPCIONALES) ---
    function cargarMetadatos(id) {
        const $contObligatorios = $('#contenedor-metadatos-obligatorios');
        const $contOpcionales = $('#contenedor-metadatos-opcionales');
        
        $contObligatorios.empty().addClass('metadata-grid');
        $contOpcionales.empty().addClass('metadata-grid');

        const datos = FUENTES_PRECARGADAS[id] || {};
        const esquema = window.GEMA_METADATA_SCHEMA || [];

        // Renderizar Obligatorios
        esquema.forEach(meta => {
            const valor = datos[meta.nombre] || "";
            let inputControl = meta.tipo === 'select' ? 
                `<select class="gema-input-card">
                    <option value="" disabled ${valor === "" ? "selected" : ""}>Seleccione...</option>
                    ${meta.valores ? meta.valores.map(v => `<option value="${v}" ${v === valor ? "selected" : ""}>${v}</option>`).join('') : ''}
                </select>` : 
                `<input type="text" class="gema-input-card" value="${valor}" placeholder="Capturar...">`;

            $contObligatorios.append(`
                <div class="metadata-card" data-nombre="${meta.nombre}">
                    <label>${meta.nombre}</label>
                    ${inputControl}
                </div>
            `);
        });

        // Renderizar Opcionales Guardados
        if (datos.opcionales && datos.opcionales.length > 0) {
            datos.opcionales.forEach(opt => {
                $contOpcionales.append(generarHtmlMetaOpcional(opt.llave, opt.valor));
            });
        }

        // Agregar Botón "+"
        $contOpcionales.append(`
            <div class="add-dic-card" id="btn-card-add-meta">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px' fill='%2394a3b8'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E">
                <span>Agregar Metadato Opcional</span>
            </div>
        `);
    }

// Función auxiliar para crear el HTML de la card opcional
// --- 3. FUNCIÓN ÚNICA PARA CREAR HTML DE CARD OPCIONAL ---
    function generarHtmlMetaOpcional(llave = "", valor = "") {
        return `
            <div class="metadata-card meta-opcional-card" style="border-left: 4px solid #cbd5e1;">
                <button type="button" class="btn-remove-meta-card" title="Eliminar">&times;</button>
                <div>
                    <label style="color:#64748b; font-size:10px; font-weight:bold;">Nombre del Campo</label>
                    <input type="text" class="gema-input-card opt-llave" value="${llave}" placeholder="Ej: Periodicidad">
                </div>
                <div>
                    <label style="color:#64748b; font-size:10px; font-weight:bold;">Valor</label>
                    <input type="text" class="gema-input-card opt-valor" value="${valor}" placeholder="Ej: Semestral">
                </div>
            </div>
        `;
    }

    // 5. ELIMINAR CARD OPCIONAL
    $(document).on('click', '.btn-remove-meta-card', function(e) {
        e.stopPropagation();
        $(this).closest('.metadata-card').fadeOut(250, function() { $(this).remove(); });
    });

    $(document).on('click', '.btn-close-config', function(e) {
        e.preventDefault();
        $('#modal-configuracion').fadeOut(200);
    });


    //Guardar cambios
$(document).off('click', '#btn-guardar-config').on('click', '#btn-guardar-config', function() {
    if (!fuenteActualId) return;

    // --- 1. RECOLECTAR METADATOS OBLIGATORIOS ---
    const nuevosMetadatos = {};
    $('#contenedor-metadatos-obligatorios .metadata-card').each(function() {
        const nombre = $(this).data('nombre'); 
        const valor = $(this).find('.gema-input-card').val();
        if (nombre) nuevosMetadatos[nombre] = valor;
    });

    // --- 2. RECOLECTAR METADATOS OPCIONALES ---
    const opcionalesGuardar = [];
    $('#contenedor-metadatos-opcionales .meta-opcional-card').each(function() {
        const llave = $(this).find('.opt-llave').val().trim();
        const valor = $(this).find('.opt-valor').val().trim();
        if (llave && valor) {
            opcionalesGuardar.push({ llave, valor });
        }
    });

    // --- 3. ACTUALIZAR OBJETO GLOBAL ---
    FUENTES_PRECARGADAS[fuenteActualId] = {
        ...FUENTES_PRECARGADAS[fuenteActualId],
        ...nuevosMetadatos,
        opcionales: opcionalesGuardar
    };

    // --- 4. GUARDAR DICCIONARIO ---
    const nuevosCamposDiccionario = [];
    $('#contenedor-diccionario .dic-card').each(function() {
        const campo = {
            nombre: $(this).find('.field-nombre').val(),
            desc: $(this).find('.field-desc').val(),
            tipo: $(this).find('.field-tipo').val(),
            nulos: $(this).find('.field-nulos').val(),
            long: $(this).find('.field-long').val(),
            cat_tipo: $(this).find('.sel-cat-tipo').val()
        };
        if (campo.nombre) nuevosCamposDiccionario.push(campo);
    });
    window.DICCIONARIOS_PRECARGADOS[fuenteActualId] = nuevosCamposDiccionario;

    // --- 5. GUARDAR DOCUMENTACIÓN ---
    if (typeof guardarDocumentacionActual === "function") {
        guardarDocumentacionActual(fuenteActualId);
    }

    // --- 6. LÓGICA DE PINTADO (ESTRUCTURA SOLICITADA) ---
    const esNueva = fuenteActualId.startsWith('NUEVA_');
    const $btn = $(this);

    const nombre = nuevosMetadatos['Nombre'] || "Sin Nombre";
    const desc = nuevosMetadatos['Descripción'] || "Sin descripción";
    const cat = nuevosMetadatos['Categoría'] || "Uso General";

    // Determinar clase de color por categoría
    let catClass = 'cat-general';
    if (cat === 'Uso Limitado') catClass = 'cat-limitado';
    else if (cat === 'Uso Público') catClass = 'cat-publico';
    else if (cat === 'No Significativa') catClass = 'cat-no-sig';

    if (esNueva) {
        // CREAR NUEVA CARD CON TU ESTRUCTURA EXACTA
        const nuevaCardHtml = `
            <div class="card-fuente ${catClass}" data-id="${fuenteActualId}">
                <div class="card-content">
                    <span class="card-id">ID: ${fuenteActualId}</span>
                    <h3>${nombre}</h3>
                    <p>${desc}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-mini btn-preview" title="Previsualizar"><img src="imagenes/ver.svg"></button>
                    <button class="btn-mini btn-config" title="Configurar"><img src="imagenes/settings.svg"></button>
                    <button class="btn-mini btn-del" title="Eliminar"><img src="imagenes/delete.svg"></button>
                </div>
            </div>
        `;

        // Seleccionar el grid y agregarla al inicio
        const $grid = $('.grid-fuentes, .cards-grid');
        if ($grid.length > 0) {
            $grid.prepend(nuevaCardHtml);
        }

    } else {
        // ACTUALIZAR CARD EXISTENTE SIGUIENDO TU ESTRUCTURA
        const $card = $(`.card-fuente[data-id="${fuenteActualId}"]`);
        if ($card.length > 0) {
            $card.find('.card-id').text(`ID: ${fuenteActualId}`);
            $card.find('h3').text(nombre);
            $card.find('p').text(desc);
            
            // Actualizar clase de color
            $card.removeClass('cat-limitado cat-general cat-publico cat-no-sig').addClass(catClass);
        }
    }

    // --- 7. FEEDBACK Y CIERRE ---
    $btn.text('¡Configuración Guardada!').css('background-color', '#44ac34');

    setTimeout(() => {
        $btn.text('Guardar Cambios').css('background-color', '');
        $('#modal-configuracion').fadeOut(200);
    }, 1000);
});



    // Al renderizar la configuración, llamamos al diccionario
    function cargarDiccionario(id) {
        const $container = $('#contenedor-diccionario');
        $container.empty().addClass('metadata-grid'); // CRÍTICO: Re-asegurar GRID

        const campos = window.DICCIONARIOS_PRECARGADOS[id] || [];
        
        campos.forEach(campo => {
            $container.append(generarHtmlCardDiccionario(campo));
        });

        $container.append(`
            <div class="add-dic-card" id="btn-card-add-dic">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px' fill='%2394a3b8'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E">
                <span>Agregar Campo Manual</span>
            </div>
        `);
    }

    function generarHtmlCardDiccionario(datos = {}) {
        return `
            <div class="metadata-card dic-card">
                <button type="button" class="btn-remove-meta-card" title="Eliminar campo">&times;</button>
                <div class="dic-card-header">
                    <input type="text" class="gema-input-card field-nombre" value="${datos.nombre || ''}" placeholder="NOMBRE_CAMPO" style="font-weight:bold; color:#172542; border:none; background:transparent; font-size:1rem;">
                </div>
                
                <textarea class="gema-input-card field-desc" placeholder="Descripción funcional..." rows="2" style="resize:none; margin-bottom:10px; font-size:0.85rem;">${datos.desc || ''}</textarea>
                
                <div class="prop-grid" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px;">
                    <div>
                        <label style="font-size:10px;">Tipo</label>
                        <select class="gema-input-card field-tipo" style="padding:4px; font-size:0.8rem;">
                            <option ${datos.tipo=='VARCHAR'?'selected':''}>VARCHAR</option>
                            <option ${datos.tipo=='INT'?'selected':''}>INT</option>
                            <option ${datos.tipo=='DECIMAL'?'selected':''}>DECIMAL</option>
                            <option ${datos.tipo=='DATE'?'selected':''}>DATE</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:10px;">Nulos</label>
                        <select class="gema-input-card field-nulos" style="padding:4px; font-size:0.8rem;">
                            <option ${datos.nulos=='Sí'?'selected':''}>Sí</option>
                            <option ${datos.nulos=='No'?'selected':''}>No</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:10px;">Long</label>
                        <input type="text" class="gema-input-card field-long" value="${datos.long || ''}" placeholder="255" style="padding:4px; font-size:0.8rem;">
                    </div>
                </div>

                <div class="catalog-section" style="margin-top:10px; background:#f8fafc; padding:10px; border-radius:8px;">
                    <label style="font-size:11px; font-weight:bold; color:#64748b;">Catálogo</label>
                    <select class="gema-input-card sel-cat-tipo" style="font-size:0.8rem; margin-top:5px;">
                        <option value="none" ${datos.cat_tipo=='none'?'selected':''}>Ninguno</option>
                        <option value="json" ${datos.cat_tipo=='json'?'selected':''}>Cargar JSON</option>
                        <option value="fuente" ${datos.cat_tipo=='fuente'?'selected':''}>Fuente GEMA</option>
                    </select>
                </div>
            </div>
        `;
    }

    function agregarCardDiccionario(datos = {}) {
        const idUnico = Date.now() + Math.random();
        const cardHtml = `
            <div class="metadata-card dic-card">
                <button type="button" class="btn-remove-meta-card">&times;</button>
                <div class="dic-card-header">
                    <input type="text" class="gema-input-card" value="${datos.nombre || ''}" placeholder="NOMBRE_CAMPO" style="font-weight:bold; color:#172542; border:none; background:transparent;">
                </div>
                
                <textarea class="gema-input-card" placeholder="Descripción funcional..." rows="2">${datos.desc || ''}</textarea>
                
                <div class="prop-grid">
                    <div>
                        <label>Tipo</label>
                        <select class="gema-input-card">
                            <option ${datos.tipo=='VARCHAR'?'selected':''}>VARCHAR</option>
                            <option ${datos.tipo=='INT'?'selected':''}>INT</option>
                            <option ${datos.tipo=='DECIMAL'?'selected':''}>DECIMAL</option>
                            <option ${datos.tipo=='DATE'?'selected':''}>DATE</option>
                        </select>
                    </div>
                    <div>
                        <label>Nulos</label>
                        <select class="gema-input-card">
                            <option ${datos.nulos=='Sí'?'selected':''}>Sí</option>
                            <option ${datos.nulos=='No'?'selected':''}>No</option>
                        </select>
                    </div>
                    <div>
                        <label>Long</label>
                        <input type="text" class="gema-input-card" value="${datos.long || ''}" placeholder="255">
                    </div>
                </div>

                <div class="catalog-section">
                    <label>Catálogo Asociado</label>
                    <select class="gema-input-card sel-cat-tipo">
                        <option value="none" ${datos.cat_tipo=='none'?'selected':''}>Ninguno</option>
                        <option value="json" ${datos.cat_tipo=='json'?'selected':''}>Cargar JSON (Key-Value)</option>
                        <option value="fuente" ${datos.cat_tipo=='fuente'?'selected':''}>Otra Fuente GEMA</option>
                    </select>
                    
                    <div class="cat-config-json ${datos.cat_tipo=='json'?'':'hidden'}" style="margin-top:10px;">
                        <input type="file" class="gema-input-card" accept=".json">
                    </div>
                    
                    <div class="cat-config-fuente ${datos.cat_tipo=='fuente'?'':'hidden'}" style="margin-top:10px;">
                        <select class="gema-input-card">
                            <option>Seleccionar fuente...</option>
                            <option>F005 - Catálogo de Oficinas</option>
                            <option>F009 - Estados de la República</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        $(cardHtml).insertBefore('#btn-card-add-dic');
    }

    function renderAddCardDiccionario() {
        $('#contenedor-diccionario').append(`
            <div class="add-dic-card" id="btn-card-add-dic" style="min-height:180px;">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px' fill='%2394a3b8'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E">
                <span style="font-size:0.85rem;">Agregar Campo Manual</span>
            </div>
        `);
    }

    // SIMULACIÓN DE SYNC CON BD
    $(document).on('click', '#btn-sync-db', function() {
        const tieneCampos = $('#contenedor-diccionario .dic-card').length > 0;
        
        if (tieneCampos && !confirm('Se sobreescribirán los campos configurados. ¿Desea continuar?')) return;

        const $btn = $(this);
        $btn.prop('disabled', true).text('Consultando estructura...');
        
        // Simular delay de red
        setTimeout(() => {
            $('#contenedor-diccionario .dic-card').remove();
            
            const camposMock = [
                { nombre: 'ID_TRANSACCION', tipo: 'INT', long: '10', nulos: 'No' },
                { nombre: 'MONTO_OPERACION', tipo: 'DECIMAL', long: '18,2', nulos: 'Sí' },
                { nombre: 'FECHA_VALOR', tipo: 'DATE', long: '8', nulos: 'No' },
                { nombre: 'DIVISA', tipo: 'VARCHAR', long: '3', nulos: 'No' }
            ];

            camposMock.forEach(c => agregarCardDiccionario(c));
            
            $btn.prop('disabled', false).html('<img src="..." > Obtener estructura de BD');
            alert('Estructura obtenida exitosamente desde el objeto de base de datos.');
        }, 1500);
    });

    // Toggle de visibilidad de catálogos
    $(document).on('change', '.sel-cat-tipo', function() {
        const val = $(this).val();
        const $parent = $(this).closest('.catalog-section');
        $parent.find('.cat-config-json, .cat-config-fuente').addClass('hidden');
        if(val === 'json') $parent.find('.cat-config-json').removeClass('hidden');
        if(val === 'fuente') $parent.find('.cat-config-fuente').removeClass('hidden');
    });

    $(document).off('click', '#btn-card-add-dic').on('click', '#btn-card-add-dic', function() {
        const nuevaCard = generarHtmlCardDiccionario({ nombre: 'NUEVO_CAMPO', tipo: 'VARCHAR', nulos: 'No', cat_tipo: 'none' });
        $(nuevaCard).insertBefore('#btn-card-add-dic').hide().fadeIn(300);
    });

});