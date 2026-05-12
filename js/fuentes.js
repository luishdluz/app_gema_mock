$(document).ready(function() {
    $('.input-buscar').on('input', function() {
        const searchTerm = $(this).val().toLowerCase().trim();
        const isFuentesActive = $('#vista-fuentes').hasClass('active');

        if (!isFuentesActive) return;

        const $grid = $('.cards-grid');
        const $allCards = $('.card-fuente');
        const $wrappers = $('.hierarchy-grid-wrapper');

        // 1. Limpieza total de estados
        $('.no-results-container').remove();
        $allCards.removeClass('parent-context match-highlight').show();
        $wrappers.show();

        if (searchTerm === "") return;

        // 2. Ocultar todo para empezar el filtrado limpio
        $allCards.hide();
        $wrappers.hide();

        let visibleCardsCount = 0;

        // 3. Lógica de búsqueda con consciencia jerárquica
        $allCards.each(function() {
            const $card = $(this);
            const contentText = [
                $card.find('.card-id').text(),
                $card.find('h3').text(),
                $card.find('p').text()
            ].join(' ').toLowerCase();

            if (contentText.includes(searchTerm)) {
                // Si la card coincide, la mostramos y resaltamos
                $card.show().addClass('match-highlight');
                visibleCardsCount++;

                // Mostrar el contenedor de jerarquía si existe
                const $wrapper = $card.closest('.hierarchy-grid-wrapper');
                if ($wrapper.length) $wrapper.show();

                // --- MANEJO DE FAMILIA (PADRES/HIJOS) ---

                // Caso A: Si es un HIJO, mostrar al PADRE como contexto
                if ($card.hasClass('is-child')) {
                    const $parent = $card.siblings('.is-parent');
                    const parentMatches = $parent.text().toLowerCase().includes(searchTerm);
                    
                    if (!parentMatches) {
                        $parent.show().addClass('parent-context');
                    } else {
                        $parent.show(); // Si el padre también coincide, mostrar normal
                    }
                }

                // Caso B: Si es un PADRE, mostrar a los HIJOS como contexto
                if ($card.hasClass('is-parent')) {
                    const $children = $card.siblings('.is-child');
                    $children.each(function() {
                        const $child = $(this);
                        const childMatches = $child.text().toLowerCase().includes(searchTerm);
                        
                        if (!childMatches) {
                            $child.show().addClass('parent-context');
                        } else {
                            $child.show(); // Si el hijo también coincide, mostrar normal
                        }
                    });
                }
            }
        });

        // 4. Mensaje si no hay resultados en absoluto
        if (visibleCardsCount === 0) {
            $grid.append(`
                <div class="no-results-container" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='%23ccc'%3E%3Cpath d='M796-96 533-359q-30 26-69 42.5T380-300q-109 0-184.5-75.5T120-560q0-109 75.5-184.5T380-820q109 0 184.5 75.5T640-560q0 44-16.5 83T581-408l262 262-47 46ZM380-400q67 0 113.5-46.5T540-560q0-67-46.5-113.5T380-720q-67 0-113.5 46.5T220-560q0 67 46.5 113.5T380-400Z'/%3E%3C/svg%3E" style="opacity:0.6; margin-bottom:15px;">
                    <h3 style="color:#172542;">No se encontraron fuentes para "${searchTerm}"</h3>
                </div>
            `);
        }
    });
});