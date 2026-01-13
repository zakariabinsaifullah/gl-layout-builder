document.addEventListener('DOMContentLoaded', () => {
    const nxTabs = document.querySelectorAll('.wp-block-gutenlayouts-tabs');

    nxTabs.forEach(nxTab => {
        const navItems = nxTab.querySelectorAll('.tabs-nav .nav-item');
        const tabItems = nxTab.querySelectorAll('.tabs-content .tab-item');
        const tabsContent = nxTab.querySelector('.tabs-content');

        function setHeight() {
            const activeTab = nxTab.querySelector('.tab-item.show');
            if (activeTab && tabsContent) {
                tabsContent.style.height = `${activeTab.offsetHeight}px`;
            }
        }

        navItems.forEach(nav => {
            nav.addEventListener('click', () => {
                const targetId = nav.getAttribute('data-nav');

                // Nav Active Class
                navItems.forEach(i => i.classList.remove('active'));
                nav.classList.add('active');

                // Tab Content Show/Hide
                tabItems.forEach(tab => {
                    if (tab.getAttribute('data-tab') === targetId) {
                        tab.classList.add('show');
                        tab.setAttribute('aria-hidden', 'false');
                    } else {
                        tab.classList.remove('show');
                        tab.setAttribute('aria-hidden', 'true');
                    }
                });

                setTimeout(setHeight, 100);
            });
        });

        window.addEventListener('load', setHeight);
        window.addEventListener('resize', setHeight);
    });
});
