/**
 * GEMA - Módulo de Exposición y Permisos
 * Maneja la lógica de grupos de acceso, visibilidad de campos y filtros.
 */

// 1. DATOS DE SIMULACIÓN (MOCKS)
const MOCK_USERS_SUGGESTIONS = [
    "B16847 - Juan Pérez", 
    "G00921 - María García", 
    "B22341 - Carlos Ruiz",
    "Grupo: Auditores Externos", 
    "Grupo: Riesgos - Nivel 1", 
    "Grupo: Sistemas Centrales"
];

const APPS_CONFIG = [
    { id: 'api', name: "API Gateway", icon: "bolt" },
    { id: 'siaff', name: "Portal SIAFF", icon: "desktop_windows" },
    { id: 'mobile', name: "App GEMA Móvil", icon: "smartphone" },
    { id: 'excel', name: "Excel Add-in", icon: "table_chart" }
];

window.GRUPOS_EXPOSICION = {
    'F001': [
        { 
            id: 'G01', 
            nombre: 'Analistas de Riesgo', 
            desc: 'Acceso autorizado para consulta de indicadores de volatilidad.',
            apps: ['api', 'siaff'],
            usuarios: ['Grupo: Riesgos - Nivel 1'],
            campos: ['FECHA', 'INDICE_INPC'],
            filtros: []
        }
    ]
};

$(document).ready(function() {

    // --- 1. FUNCIÓN PRINCIPAL DE CARGA (LLAMADA DESDE CONFIGURACION.JS) ---
    window.cargarExposicion = function(id) {
    const $grid = $('#contenedor-grupos-grid');
    $('#editor-grupo-exposicion').addClass('hidden');
    $('#lista-grupos-exposicion').removeClass('hidden');

    $grid.empty().addClass('metadata-grid');
    
    // Obtenemos los grupos de esta fuente o un array vacío
    const grupos = window.GRUPOS_EXPOSICION[id] || [];
    
    grupos.forEach(grupo => {
        $grid.append(`
            <div class="metadata-card group-card" data-group-id="${grupo.id}" style="cursor:pointer; border-top: 3px solid #007279;">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-weight:bold; color:#172542; font-size:1.1rem;">${grupo.nombre}</div>
                    <span style="background:#e6f4f4; color:#007279; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:800;">ACTIVO</span>
                </div>
                <p style="font-size:12px; color:#64748b; margin:10px 0;">${grupo.desc}</p>
                <div style="margin-top:auto; font-size:11px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:10px; display:flex; gap:15px;">
                    <span><strong>${grupo.campos.length}</strong> campos</span>
                    <span><strong>${grupo.filtros.length}</strong> filtros</span>
                </div>
            </div>
        `);
    });

    // Siempre añadimos el botón de crear al final
    $grid.append(`
        <div class="add-dic-card" id="btn-add-group-trigger" style="min-height:150px;">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px' fill='%2394a3b8'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E">
            <span style="font-weight:600;">Crear Grupo de Permisos</span>
        </div>
    `);
};

    // --- 2. ABRIR / CERRAR EDITOR DE GRUPO ---
    // --- 2. ABRIR / CERRAR EDITOR DE GRUPO ---
$(document).off('click', '#btn-add-group-trigger, .group-card').on('click', '#btn-add-group-trigger, .group-card', function() {
    const isEdit = $(this).hasClass('group-card');
    const groupId = $(this).data('group-id');
    
    // Cambiar vista
    $('#lista-grupos-exposicion').addClass('hidden');
    $('#editor-grupo-exposicion').hide().removeClass('hidden').fadeIn(300);

    // 1. Obtener los datos (Si es edición busca el grupo, si es nuevo crea uno vacío)
    let datosGrupo = {
        nombre: "",
        desc: "",
        apps: [],
        usuarios: [],
        campos: [],
        filtros: []
    };

    if (isEdit) {
        const gruposFuente = window.GRUPOS_EXPOSICION[fuenteActualId] || [];
        datosGrupo = gruposFuente.find(g => g.id == groupId) || datosGrupo;
        $('#titulo-editor-grupo').text("Editar Grupo de Acceso");
        $('#exp-grupo-id-label').html(`<i class="material-icons-outlined" style="font-size:12px;">fingerprint</i> ID: ${groupId}`).attr('data-current-id', groupId);
    } else {
        $('#titulo-editor-grupo').text("Nuevo Grupo de Acceso");
        $('#exp-grupo-id-label').text("NUEVO GRUPO").removeAttr('data-current-id');
    }

    // 2. Llenar Nombre y Descripción
    $('#exp-grupo-nombre').val(datosGrupo.nombre);
    $('#exp-grupo-desc').val(datosGrupo.desc);

    // 3. Renderizar Aplicaciones y marcar las seleccionadas
    renderAppsTiles(datosGrupo.apps);

    // 4. Llenar Usuarios (Tags)
    const $tagsContainer = $('#selected-users-tags').empty();
    datosGrupo.usuarios.forEach(u => {
        $tagsContainer.append(`<div class="tag-user">${u} <span class="rm-tag">&times;</span></div>`);
    });

    // 5. Renderizar Dual List (Campos)
    // Pasamos los campos que ya están visibles para que se muevan a la derecha
    renderDualList(datosGrupo.campos);

    // 6. Renderizar Filtros
    const $filterContainer = $('#filter-rows-container').empty();
    datosGrupo.filtros.forEach(f => {
        agregarFilaFiltro(f.campo, f.operador, f.valor);
    });
});

    $('#btn-back-to-groups').on('click', function() {
        $('#editor-grupo-exposicion').addClass('hidden');
        $('#lista-grupos-exposicion').hide().removeClass('hidden').fadeIn(300);
    });

    // --- 3. LÓGICA DE APLICACIONES (TILES) ---
// --- 3. RENDERIZAR APPS (Usando el repositorio global window.GEMA_APPS) ---
function renderAppsTiles(appsSeleccionadas = []) {
    const $container = $('#exp-apps-list').empty();
    
    // Obtenemos las apps del repositorio global o un array vacío si no existe
    const appsReales = window.GEMA_APPS || [];

    if (appsReales.length === 0) {
        $container.append(`
            <div style="grid-column: 1 / -1; padding: 20px; text-align: center; background: #fef2f2; border: 1px dashed #ef4444; border-radius: 8px; color: #b91c1c; font-size: 12px;">
                <i class="material-icons-outlined" style="display:block; margin-bottom:5px;">warning</i>
                No hay aplicaciones configuradas en el sistema. <br> 
                Vaya a la sección de "Aplicaciones" para darlas de alta.
            </div>
        `);
        return;
    }

    appsReales.forEach(app => {
        // Verificamos si esta app estaba guardada en el grupo (usamos el ID o el Nombre como llave)
        const isSelected = appsSeleccionadas.includes(app.id || app.nombre);
        
        // Usamos el icono que tenga la app, o uno por defecto (settings_input_component)
        const iconoApp = app.icono || 'settings_input_component';

        $container.append(`
            <div class="app-tile ${isSelected ? 'selected' : ''}" data-app="${app.id || app.nombre}">
                <i class="material-icons-outlined">${iconoApp}</i>
                <span>${app.nombre}</span>
                <input type="checkbox" style="display:none" ${isSelected ? 'checked' : ''}>
            </div>
        `);
    });
}

// --- 4. RENDERIZAR DUAL LIST (Con campos visibles) ---
function renderDualList(camposVisibles = []) {
    const todosLosCampos = window.DICCIONARIOS_PRECARGADOS[fuenteActualId] || [];
    const $available = $('#list-available').empty();
    const $visible = $('#list-visible').empty();

    todosLosCampos.forEach(c => {
        const itemHtml = `<li data-field="${c.nombre}">${c.nombre} <i class="material-icons-outlined" style="font-size:16px; color:#cbd5e1">${camposVisibles.includes(c.nombre) ? 'chevron_left' : 'chevron_right'}</i></li>`;
        
        if (camposVisibles.includes(c.nombre)) {
            $visible.append(itemHtml);
        } else {
            $available.append(itemHtml);
        }
    });
}

// --- 6. AGREGAR FILA DE FILTRO (Refactorizada) ---
function agregarFilaFiltro(campo = "", op = "=", val = "") {
    const camposDic = window.DICCIONARIOS_PRECARGADOS[fuenteActualId] || [];
    const fieldOptions = camposDic.map(c => `<option value="${c.nombre}" ${c.nombre == campo ? 'selected' : ''}>${c.nombre}</option>`).join('');
    
    const filterHtml = `
        <div class="filter-builder-row">
            <select class="gema-input-card">${fieldOptions}</select>
            <select class="gema-input-card">
                <option ${op=='='?'selected':''}>=</option>
                <option ${op=='>'?'selected':''}>></option>
                <option ${op=='<'?'selected':''}>&lt;</option>
                <option ${op=='LIKE'?'selected':''}>LIKE</option>
            </select>
            <input type="text" class="gema-input-card" value="${val}" placeholder="Valor">
            <button type="button" class="btn-remove-filter"><i class="material-icons-outlined">delete</i></button>
        </div>
    `;
    $('#filter-rows-container').append(filterHtml);
}

    $(document).on('click', '.app-tile', function() {
        $(this).toggleClass('selected');
        const isSelected = $(this).hasClass('selected');
        $(this).find('input').prop('checked', isSelected);
    });

    // --- 4. LÓGICA DUAL LIST (CAMPOS) ---
    function renderDualList(camposVisibles = []) {
    const todosLosCampos = window.DICCIONARIOS_PRECARGADOS[fuenteActualId] || [];
    const $available = $('#list-available').empty();
    const $visible = $('#list-visible').empty();

    todosLosCampos.forEach(c => {
        const itemHtml = `<li data-field="${c.nombre}">${c.nombre} <i class="material-icons-outlined" style="font-size:16px; color:#cbd5e1">${camposVisibles.includes(c.nombre) ? 'chevron_left' : 'chevron_right'}</i></li>`;
        
        if (camposVisibles.includes(c.nombre)) {
            $visible.append(itemHtml);
        } else {
            $available.append(itemHtml);
        }
    });
}

    // Mover uno por uno al hacer clic
    $(document).on('click', '.field-list li', function() {
        const isFromAvailable = $(this).closest('ul').attr('id') === 'list-available';
        const targetList = isFromAvailable ? '#list-visible' : '#list-available';
        const icon = isFromAvailable ? 'chevron_left' : 'chevron_right';
        
        $(this).find('i').text(icon);
        $(this).detach().appendTo(targetList);
    });

    // Botones "Mover Todo"
    $('#move-all-right').on('click', function() {
        $('#list-available li').each(function() {
            $(this).find('i').text('chevron_left');
            $(this).detach().appendTo('#list-visible');
        });
    });

    $('#move-all-left').on('click', function() {
        $('#list-visible li').each(function() {
            $(this).find('i').text('chevron_right');
            $(this).detach().appendTo('#list-available');
        });
    });

    // --- 5. AUTOCOMPLETE DE USUARIOS ---
    $('#search-users').on('input', function() {
        const val = $(this).val().toLowerCase();
        const $results = $('#user-results').empty();
        
        if(val.length < 2) {
            $results.addClass('hidden');
            return;
        }

        const filtered = MOCK_USERS_SUGGESTIONS.filter(u => u.toLowerCase().includes(val));
        
        if(filtered.length > 0) {
            filtered.forEach(u => {
                $results.append(`<div class="user-suggestion-item">${u}</div>`);
            });
            $results.removeClass('hidden');
        } else {
            $results.addClass('hidden');
        }
    });

    $(document).on('click', '.user-suggestion-item', function() {
    const name = $(this).text();
    
    // Determinar si es grupo o usuario para poner el icono correcto
    const isGroup = name.toLowerCase().includes('grupo');
    const icon = isGroup ? 'groups' : 'person';

    $('#selected-users-tags').append(`
        <div class="tag-user" data-name="${name}">
            <i class="material-icons-outlined">${icon}</i>
            <span>${name}</span>
            <span class="rm-tag" title="Eliminar acceso">×</span>
        </div>
    `);
    
    $('#user-results').addClass('hidden');
    $('#search-users').val('');
});

    $(document).on('click', '.rm-tag', function() {
        $(this).closest('.tag-user').remove();
    });

    // --- 6. QUERY BUILDER (FILTROS) ---
    $('#btn-add-exp-filter').on('click', function() {
        const campos = window.DICCIONARIOS_PRECARGADOS[fuenteActualId] || [];
        const fieldOptions = campos.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
        
        const filterHtml = `
            <div class="filter-builder-row" style="display:none;">
                <select class="gema-input-card">
                    <option value="" disabled selected>Campo...</option>
                    ${fieldOptions}
                </select>
                <select class="gema-input-card">
                    <option value="=">=</option>
                    <option value="!=">!=</option>
                    <option value=">">></option>
                    <option value="<"><</option>
                    <option value=">=">>=</option>
                    <option value="<="><=</option>
                    <option value="LIKE">LIKE</option>
                    <option value="IN">IN (...)</option>
                </select>
                <input type="text" class="gema-input-card" placeholder="Valor">
                <button type="button" class="btn-remove-filter" title="Eliminar filtro">
                    <i class="material-icons-outlined" style="font-size:18px;">delete</i>
                </button>
            </div>
        `;

        $(filterHtml).appendTo('#filter-rows-container').slideDown(200);
    });

    $(document).on('click', '.btn-remove-filter', function() {
        $(this).closest('.filter-builder-row').slideUp(200, function() {
            $(this).remove();
        });
    });

    // --- 7. GUARDAR GRUPO (SIMULACIÓN) ---
    $('#btn-save-group').on('click', function() {
    const $btn = $(this);
    const nombre = $('#exp-grupo-nombre').val().trim();
    const desc = $('#exp-grupo-desc').val().trim();

    // Verificamos si estamos editando (leyendo el ID del label que configuramos al abrir)
    const currentId = $('#exp-grupo-id-label').attr('data-current-id');

    if(!nombre) {
        alert("El nombre del grupo es obligatorio.");
        return;
    }

    $btn.prop('disabled', true).text("Guardando...");

    // 1. Recolectar Aplicaciones seleccionadas (Tiles)
    const appsSeleccionadas = [];
$('.app-tile.selected').each(function() {
    // Guardamos el ID o nombre de la app real
    appsSeleccionadas.push($(this).data('app')); 
});

    // 2. Recolectar Usuarios (Tags)
    const usuariosTags = [];
    $('#selected-users-tags .tag-user').each(function() {
        // Limpiamos el texto para quitar la '×' del botón de eliminar
        //usuariosTags.push($(this).text().replace('×', '').trim());
        usuariosTags.push($(this).data('name'));
    });

    // 3. Recolectar Campos Visibles (de la lista derecha del Dual List)
    const camposVisibles = [];
    $('#list-visible li').each(function() {
        camposVisibles.push($(this).data('field'));
    });

    // 4. Recolectar Filtros (Query Builder)
    const filtrosAplicados = [];
    $('#filter-rows-container .filter-builder-row').each(function() {
        filtrosAplicados.push({
            campo: $(this).find('select').eq(0).val(),
            operador: $(this).find('select').eq(1).val(),
            valor: $(this).find('input').val()
        });
    });

    // 5. Preparar el objeto de datos
    const datosGrupo = {
        id: currentId || 'G' + Math.floor(Math.random() * 1000), // Si no hay ID, generamos uno nuevo
        nombre: nombre,
        desc: desc,
        apps: appsSeleccionadas,
        usuarios: usuariosTags,
        campos: camposVisibles,
        filtros: filtrosAplicados
    };

    // 6. Persistencia en el objeto global
    if (!window.GRUPOS_EXPOSICION[fuenteActualId]) {
        window.GRUPOS_EXPOSICION[fuenteActualId] = [];
    }

    if (currentId) {
        // MODO EDICIÓN: Buscamos la posición del grupo actual y lo reemplazamos
        const index = window.GRUPOS_EXPOSICION[fuenteActualId].findIndex(g => g.id == currentId);
        if (index !== -1) {
            window.GRUPOS_EXPOSICION[fuenteActualId][index] = datosGrupo;
        }
    } else {
        // MODO NUEVO: Simplemente lo agregamos al arreglo
        window.GRUPOS_EXPOSICION[fuenteActualId].push(datosGrupo);
    }

    // 7. Feedback visual y refrescar la lista
    setTimeout(() => {
        $btn.prop('disabled', false).html('<i class="material-icons-outlined">save</i> Guardar Cambios');
        
        // Efecto de salida
        $('#editor-grupo-exposicion').fadeOut(200, function() {
            $(this).addClass('hidden');
            $('#lista-grupos-exposicion').hide().removeClass('hidden').fadeIn(300);
            
            // Volvemos a cargar las cards de la lista para ver los cambios
            window.cargarExposicion(fuenteActualId); 
        });

        console.log("Grupo guardado con éxito:", datosGrupo);
    }, 600);
});

});