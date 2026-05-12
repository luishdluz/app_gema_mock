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