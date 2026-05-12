$(document).ready(function () {

    inicializarAplicacion();

    // ============================
    // BUSCADOR
    // ============================
    $('.input-buscar').on('input', function () {
        renderListaFuentes($(this).val());
    });

    // ============================
    // CLICK EN CARD
    // ============================
    $(document).on('click', '.api-source-item', function () {

        const id = $(this).data('id');
        const fuente = window.FUENTES_PRECARGADAS[id];

        $('.api-source-item').removeClass('active');
        $(this).addClass('active');

        mostrarDetalleFuente(id, fuente);
    });

});


/* =========================================================
   INICIALIZACIÓN
========================================================= */

function inicializarAplicacion() {

    renderListaFuentes();

    const primeraFuenteId = Object.keys(window.FUENTES_PRECARGADAS)[0];

    if (primeraFuenteId) {

        mostrarDetalleFuente(
            primeraFuenteId,
            window.FUENTES_PRECARGADAS[primeraFuenteId]
        );

        setTimeout(() => {
            $(`.api-source-item[data-id="${primeraFuenteId}"]`)
                .addClass('active');
        }, 100);
    }
}


/* =========================================================
   RENDER LISTA DE FUENTES
========================================================= */

function renderListaFuentes(filtro = "") {

    const fuentes = window.FUENTES_PRECARGADAS || {};
    const $lista = $('#lista-fuentes-api');

    $lista.empty();

    let total = 0;

    Object.keys(fuentes).forEach(id => {

        const fuente = fuentes[id];

        const textoBusqueda =
            `${id} ${fuente.Nombre} ${fuente.Descripción}`
                .toLowerCase();

        if (textoBusqueda.includes(filtro.toLowerCase())) {

            total++;

            $lista.append(`
                <div class="api-source-item" data-id="${id}">

                    <div class="source-indicator"></div>

                    <div class="source-item-content">

                        <div class="source-top-row">

                            <span class="source-id-tag">
                                ${id}
                            </span>

                            <span class="source-category">
                                ${fuente.Categoría || 'General'}
                            </span>

                        </div>

                        <h4>
                            ${fuente.Nombre}
                        </h4>

                        <p>
                            ${fuente.Descripción || 'Sin descripción disponible'}
                        </p>

                    </div>

                    <div class="source-arrow">
                        <i class="material-icons-outlined">
                            chevron_right
                        </i>
                    </div>

                </div>
            `);
        }

    });

    $('#fuentes-count').text(total);
}


/* =========================================================
   MOSTRAR DETALLE
========================================================= */

function mostrarDetalleFuente(idFuente, fuente) {

    const diccionario =
        window.DICCIONARIOS_PRECARGADOS[idFuente] || [];

    const html = `

        <div class="api-main-wrapper">

            <!-- ===================================== -->
            <!-- HEADER -->
            <!-- ===================================== -->

            <div class="api-detail-header">

                <div class="api-header-left">

                    <div class="header-badge-row">

                        <span class="source-id-badge">
                            ${idFuente}
                        </span>

                        <span class="source-category-badge">
                            ${fuente.Categoría || 'General'}
                        </span>

                    </div>

                    <h1 class="api-main-title">
                        ${fuente.Nombre}
                    </h1>

                    <p class="api-main-description">
                        ${fuente.Descripción}
                    </p>

                </div>

            </div>


            <!-- ===================================== -->
            <!-- TABS -->
            <!-- ===================================== -->

            <div class="api-tabs-container">

                <button class="api-tab-btn active"
                        data-tab="tab-documentacion">

                    <i class="material-icons-outlined">
                        description
                    </i>

                    Documentación

                </button>

                <button class="api-tab-btn"
                        data-tab="tab-diccionario">

                    <i class="material-icons-outlined">
                        storage
                    </i>

                    Diccionario

                </button>

                <button class="api-tab-btn"
                        data-tab="tab-playground">

                    <i class="material-icons-outlined">
                        terminal
                    </i>

                    Probar API

                </button>

            </div>


            <!-- ===================================== -->
            <!-- CONTENIDO -->
            <!-- ===================================== -->

            <div class="api-content-wrapper">

                <!-- ===================================== -->
                <!-- TAB DOCUMENTACIÓN -->
                <!-- ===================================== -->

                <div class="tab-pane-api active"
                     id="tab-documentacion">

                    <div class="doc-card">

                        <h2 class="section-title-api">
                            1. Token de Consulta
                        </h2>

                        <p class="section-text-api">
                            El token de consulta es un requisito necesario para poder utilizar el API. 
                            Consiste en caracteres alfanuméricos y debe ser enviado cada vez que se interactúe 
                            con los servicios provistos a través del JSON de entrada.
                        </p>

                        <div class="code-container-api">

                            <div class="code-header-api">
                                Ejemplo de Token JWT
                            </div>

                            <pre class="code-block-api">eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUb2tlbiIsImlhdCI6MTY5NzIyOTQwMCwiZXhwIjoxNjk3MjI5NDYwLCJtZW5zYWplIjoiR2VuZXJvIHVuIHRva2VuIHBhcmEgdXNhciBlbCBBUElGRiIsInRpcG9MbGF2ZSI6InB1YmxpY2EiLCJ1c3VhcmlvIjoicHVibGljbyJ9.MknHZlzvcUa0KKiMPglWXGdb6hflkn49L8cYdx__TbY</pre>

                        </div>

                    </div>


                    <div class="doc-card">

                        <h2 class="section-title-api">
                            2. ¿Cómo generar el token externamente?
                        </h2>

                        <p class="section-text-api">
                            Para obtener un token válido, se debe consumir el siguiente servicio técnico:
                        </p>

                        <div class="table-wrapper-api">

                            <table class="table-api">

                                <tbody>

                                    <tr>
                                        <td>URL del servicio</td>
                                        <td>
                                            <code>
                                                https://www.banxico.org.mx/GEMA/API/generaTokenAPIIF
                                            </code>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Método</td>
                                        <td>
                                            <span class="method-tag post">
                                                POST
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Content-Type</td>
                                        <td>
                                            <code>
                                                application/json
                                            </code>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Formato de respuesta</td>
                                        <td>
                                            Texto (String)
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Datos de entrada</td>
                                        <td>
                                            No se requieren datos de entrada
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>


                    <div class="doc-card">

                        <div class="endpoint-header-api">

                            <span class="method-tag post">
                                POST
                            </span>

                            <code>
                                /consultarInformacion
                            </code>

                        </div>

                        <p class="section-text-api">
                            Este servicio permite consultar información de diversas fuentes de base de datos 
                            de manera dinámica y flexible.
                        </p>

                        <h3 class="sub-title-api">
                            Detalles del servicio
                        </h3>

                        <div class="table-wrapper-api">

                            <table class="table-api">

                                <tbody>

                                    <tr>
                                        <td>URL del servicio</td>
                                        <td>
                                            <code>
                                                https://www.banxico.org.mx/GEMA/API/consultarInformacion
                                            </code>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Método</td>
                                        <td>
                                            <span class="method-tag post">
                                                POST
                                            </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Content-Type</td>
                                        <td>
                                            <code>
                                                application/json
                                            </code>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Formato de respuesta</td>
                                        <td>
                                            JSON
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        <h3 class="sub-title-api">
                            Descripción de entrada (Body)
                        </h3>

                        <div class="table-wrapper-api">

                            <table class="table-api">

                                <thead>

                                    <tr>
                                        <th>Campo</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Requerido</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    <tr>
                                        <td><code>token</code></td>
                                        <td>Texto</td>
                                        <td>Código alfanumérico generado.</td>
                                        <td><span class="req-tag">Obligatorio</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>fuente</code></td>
                                        <td>Texto</td>
                                        <td>ID de la fuente (Ej: ${idFuente})</td>
                                        <td><span class="req-tag">Obligatorio</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>camposVisibles</code></td>
                                        <td>Texto</td>
                                        <td>Campos visibles separados por coma.</td>
                                        <td><span class="req-tag">Obligatorio</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>campos</code></td>
                                        <td>Texto</td>
                                        <td>Campos para filtros.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>operadores</code></td>
                                        <td>Texto</td>
                                        <td>Operadores lógicos.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>valores</code></td>
                                        <td>Texto</td>
                                        <td>Valores de filtros.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>camposAgrupador</code></td>
                                        <td>Texto</td>
                                        <td>Campos de agregación.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>operadoresAgrupador</code></td>
                                        <td>Texto</td>
                                        <td>Funciones de agregación.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>agruparPorCampos</code></td>
                                        <td>Texto</td>
                                        <td>Campos GROUP BY.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>ordenamiento</code></td>
                                        <td>Texto</td>
                                        <td>Orden ascendente o descendente.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>limite</code></td>
                                        <td>Texto</td>
                                        <td>Número máximo de registros.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>paginado</code></td>
                                        <td>Texto</td>
                                        <td>1 para activar paginación.</td>
                                        <td><span class="opt-tag">Opcional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>pagInicio</code></td>
                                        <td>Texto</td>
                                        <td>Página inicial.</td>
                                        <td><span class="cond-tag">Condicional</span></td>
                                    </tr>

                                    <tr>
                                        <td><code>pagFin</code></td>
                                        <td>Número</td>
                                        <td>Página final.</td>
                                        <td><span class="cond-tag">Condicional</span></td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- TAB DICCIONARIO -->
                <!-- ===================================== -->

                <div class="tab-pane-api"
                     id="tab-diccionario">

                    <div class="doc-card">

                        <h2 class="section-title-api">
                            Diccionario de Datos
                        </h2>

                        <div class="table-wrapper-api">

                            <table class="table-api">

                                <thead>

                                    <tr>
                                        <th>Campo</th>
                                        <th>Tipo</th>
                                        <th>Longitud</th>
                                        <th>Nulos</th>
                                        <th>Descripción</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    ${diccionario.map(campo => `

                                        <tr>

                                            <td>
                                                <code>
                                                    ${campo.nombre}
                                                </code>
                                            </td>

                                            <td>
                                                ${campo.tipo}
                                            </td>

                                            <td>
                                                ${campo.long}
                                            </td>

                                            <td>
                                                ${campo.nulos}
                                            </td>

                                            <td>
                                                ${campo.desc}
                                            </td>

                                        </tr>

                                    `).join('')}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- TAB PLAYGROUND -->
                <!-- ===================================== -->

                <div id="tab-playground"
                     class="tab-pane-api">

                    <div class="tester-container">

                        <div class="token-generator-box">
    
    <div class="token-glow"></div>

    <div class="token-left">

        <div class="token-icon-wrapper">
            <div class="token-icon-bg">
                <i class="material-icons-outlined">vpn_key</i>
            </div>
        </div>

        <div class="token-text-content">
            <div class="token-title-row">
                <h4 class="token-badge-secure">Autenticación JWT</h4>
            </div>

            <p>
                Genera un token temporal firmado digitalmente para
                autorizar peticiones hacia los servicios del API GEMA.
            </p>

            <div class="token-mini-info">
                <span>
                    <i class="material-icons-outlined">schedule</i>
                    Expira en 1 min
                </span>

                <span>
                    <i class="material-icons-outlined">lock</i>
                    JWT
                </span>
            </div>
        </div>

    </div>

    <div class="token-right">

        <button class="btn-generar-token" onclick="generarTokenJWT()">
            <i class="material-icons-outlined">auto_awesome</i>
            Generar Token
        </button>

        <div class="token-input-wrapper">
            <input 
                type="text"
                id="token-display"
                class="token-input"
                placeholder="Token no generado..."
                readonly
            >

            <button class="btn-copy-token" onclick="copiarToken()">
                <i class="material-icons-outlined">content_copy</i>
            </button>
        </div>

    </div>

</div>


                        <div class="playground-layout">

                            <div class="params-side">

                                <h3>
                                    Parámetros de la Consulta
                                </h3>

                                <div class="params-grid">

                                    <div class="form-group-api full-width">

                                        <label>
                                            ID de Fuente
                                        </label>

                                        <input type="text"
                                               id="test-id-fuente"
                                               class="form-control-gema"
                                               value="${idFuente}"
                                               readonly>

                                    </div>

                                    <div class="form-group-api full-width">

                                        <label>
                                            Campos Visibles
                                        </label>

                                        <input type="text"
                                               id="test-visibles"
                                               class="form-control-gema"
                                               placeholder="CAMPO1, CAMPO2">

                                    </div>

                                    <div class="form-group-api">

                                        <label>
                                            Campos
                                        </label>

                                        <input type="text"
                                               id="test-campos"
                                               class="form-control-gema"
                                               placeholder="CAMPO_A">

                                    </div>

                                    <div class="form-group-api">

                                        <label>
                                            Operadores
                                        </label>

                                        <input type="text"
                                               id="test-operadores"
                                               class="form-control-gema"
                                               placeholder="=">

                                    </div>

                                    <div class="form-group-api full-width">

                                        <label>
                                            Valores
                                        </label>

                                        <input type="text"
                                               id="test-valores"
                                               class="form-control-gema"
                                               placeholder="Valor">

                                    </div>

                                    <div class="form-group-api">

                                        <label>
                                            Ordenamiento
                                        </label>

                                        <input type="text"
                                               id="test-order"
                                               class="form-control-gema"
                                               placeholder="FECHA:1">

                                    </div>

                                    <div class="form-group-api">

                                        <label>
                                            Límite
                                        </label>

                                        <input type="number"
                                               id="test-limit"
                                               class="form-control-gema"
                                               value="10">

                                    </div>

                                </div>

                                <button class="btn-primary-api"
                                        onclick="consultarInformacionApi()">

                                    CONSULTAR INFORMACIÓN

                                </button>

                            </div>


                            <div class="response-side">

                                <div class="response-header">

                                    <h3>
                                        Resultado JSON
                                    </h3>

                                    <span id="status-pill"
                                          class="status-badge"
                                          style="display:none;">

                                        200 OK

                                    </span>

                                </div>

                                <div class="json-container">

                                    <pre id="api-response-viewer"
                                         class="json-viewer">

Esperando ejecución...

                                    </pre>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;

    $('#detalle-fuente-api').html(html);

    inicializarTabs();
}


/* =========================================================
   TABS
========================================================= */

function inicializarTabs() {

    $('.api-tab-btn').off('click');

    $('.api-tab-btn').on('click', function () {

        const tab = $(this).data('tab');

        $('.api-tab-btn').removeClass('active');
        $(this).addClass('active');

        $('.tab-pane-api').removeClass('active');

        $('#' + tab).addClass('active');
    });
}


/* =========================================================
   GENERAR TOKEN SIMULADO
========================================================= */

window.copiarToken = function () {

    const input = document.getElementById("token-display");

    if (!input.value) return;

    navigator.clipboard.writeText(input.value);

    const btn = document.querySelector(".btn-copy-token");

    btn.innerHTML = '<i class="material-icons-outlined">done</i>';

    setTimeout(() => {
        btn.innerHTML = '<i class="material-icons-outlined">content_copy</i>';
    }, 1500);
};

window.generarTokenJWT = function () {

    const btn = document.querySelector(".btn-generar-token");

    btn.innerHTML = `
        <i class="material-icons-outlined spin-icon">progress_activity</i>
        Generando...
    `;

    btn.disabled = true;

    setTimeout(() => {

        const token =
            "eyJhbGciOiJIUzI1NiJ9." +
            btoa(Date.now()) +
            ".JWT-GEMA-DEMO";

        $("#token-display").val(token);

        btn.innerHTML = `
            <i class="material-icons-outlined">verified</i>
            Token Generado
        `;

        setTimeout(() => {

            btn.innerHTML = `
                <i class="material-icons-outlined">auto_awesome</i>
                Generar Token
            `;

            btn.disabled = false;

        }, 2000);

    }, 1200);
};

/* =========================================================
   CONSULTAR API SIMULADA
========================================================= */

window.consultarInformacionApi = function () {

    const fuente =
        $('#test-id-fuente').val();

    const visibles =
        $('#test-visibles').val();

    const campos =
        $('#test-campos').val();

    const operadores =
        $('#test-operadores').val();

    const valores =
        $('#test-valores').val();

    const orden =
        $('#test-order').val();

    const limite =
        $('#test-limit').val();

    const resultado = {
        status: 200,
        mensaje: "Consulta ejecutada correctamente",
        metadata: {
            fuente,
            fechaConsulta: new Date().toISOString(),
            limite,
            ordenamiento: orden
        },
        filtros: {
            campos,
            operadores,
            valores
        },
        datos: [
            {
                ID: 1,
                DESCRIPCION: "Registro de ejemplo 1",
                FECHA: "2026-05-12",
                VALOR: 1234.56
            },
            {
                ID: 2,
                DESCRIPCION: "Registro de ejemplo 2",
                FECHA: "2026-05-11",
                VALOR: 8765.43
            }
        ]
    };

    $('#status-pill').show();

    $('#api-response-viewer').text(
        JSON.stringify(resultado, null, 4)
    );
};