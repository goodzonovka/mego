const tabs = document.querySelectorAll('[data-tabs]');

if (tabs) {

    for (const tabsContainer of tabs) {
        const openTab = (evt, tabTarget) => {
            var i, tabcontent;
            const referenceTab = tabsContainer.querySelector(`[data-tab_target="${tabTarget}"]`);

            tabcontent = tabsContainer.querySelectorAll('[data-tab]');
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = 'none';
            }

            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove('active');
            }

            document.getElementById(tabTarget).style.display = 'block';
            referenceTab.classList.add('active');
        };

        const tablinks = tabsContainer.querySelectorAll('[data-tab_target]');

        for (const link of tablinks) {
            link.addEventListener('click', (evt) => openTab(evt, evt.target.getAttribute('data-tab_target')));
        }
    }
}
