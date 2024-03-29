const accordionList = document.querySelectorAll('[data-accordion]');

if (accordionList) {
    for (const accordion of accordionList) {
        accordion.addEventListener('click', (e) => {
            const activePanel = e.target.closest('[data-accordion_panel]');
            const accordionToggleBtn = e.target.closest('[data-accordion_btn]');
            if (!activePanel) return;

            if (accordionToggleBtn) {
                toggleAccordion(activePanel);
            }
        });

        function toggleAccordion(panelToActivate) {
            const activeButton = panelToActivate.querySelector('[data-accordion_btn]');
            const activePanelIsOpened = activeButton.getAttribute('aria-expanded');

            if (activePanelIsOpened === 'true') {
                panelToActivate.querySelector('[data-accordion_btn]').setAttribute('aria-expanded', false);
                panelToActivate.querySelector('[data-accordion_content]').setAttribute('aria-hidden', true);
            } else {
                panelToActivate.querySelector('[data-accordion_btn]').setAttribute('aria-expanded', true);
                panelToActivate.querySelector('[data-accordion_content]').setAttribute('aria-hidden', false);
            }
        }
    }
}
