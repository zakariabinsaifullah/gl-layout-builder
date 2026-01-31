document.addEventListener('DOMContentLoaded', () => {
    const nxTabs = document.querySelectorAll('.wp-block-gutenlayouts-tabs');

    nxTabs.forEach(nxTab => {
        const navItems = nxTab.querySelectorAll('.tabs-nav .nav-item');
        const tabItems = nxTab.querySelectorAll('.tabs-content .tab-item');
        const tabsContent = nxTab.querySelector('.tabs-content');

        if (!navItems.length) return;

        /**
         * Set Height of the tabs content wrapper
         */
        function setHeight() {
            // Find currently allowed visible tab (not just by class, but by logic if possible)
            // But usually we rely on class .show
            const activeTab = nxTab.querySelector('.tab-item.show');
            if (activeTab && tabsContent) {
                tabsContent.style.height = `${activeTab.offsetHeight}px`;
            }
        }

        /**
         * Activate Tab Logic
         * @param {HTMLElement} nav The navigation item to activate
         */
        function activateTab(nav) {
            const targetId = nav.getAttribute('data-nav');

            // 1. Update Nav Items
            navItems.forEach(item => {
                const isActive = item === nav;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
                item.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            // 2. Update Tab Content Panels
            let foundActive = false;
            tabItems.forEach(tab => {
                if (tab.getAttribute('data-tab') === targetId) {
                    tab.classList.add('show');
                    tab.setAttribute('aria-hidden', 'false');
                    foundActive = true;
                } else {
                    tab.classList.remove('show');
                    tab.setAttribute('aria-hidden', 'true');
                }
            });

            // 3. Update Height
            if (foundActive) {
                setTimeout(setHeight, 50); // Small delay to allow transition/rendering
            }
        }

        /**
         * Initialize Logic
         * Ensure one tab is active on load
         */
        function init() {
            // Check if any nav is active
            let activeNav = nxTab.querySelector('.tabs-nav .nav-item.active');

            // If no active nav (unexpected), default to first
            if (!activeNav && navItems.length > 0) {
                activeNav = navItems[0];
                // Force activation
                activateTab(activeNav);
            } else {
                // Ensure panel visibility matches active nav
                // This covers cases where HTML might be out of sync
                if (activeNav) {
                    activateTab(activeNav);
                }
            }

            setHeight();
        }

        // --- Event Listeners ---

        // Click Event
        navItems.forEach(nav => {
            nav.addEventListener('click', e => {
                e.preventDefault(); // Prevent jump if link
                activateTab(nav);
            });

            // Keyboard Navigation (Roving Tabindex)
            nav.addEventListener('keydown', e => {
                const index = Array.from(navItems).indexOf(nav);
                let newIndex = null;

                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown': // Optional support for vertical lists if role is tablist
                        newIndex = (index + 1) % navItems.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        newIndex = (index - 1 + navItems.length) % navItems.length;
                        break;
                    case 'Home':
                        newIndex = 0;
                        break;
                    case 'End':
                        newIndex = navItems.length - 1;
                        break;
                    case 'Enter':
                    case ' ':
                        activateTab(nav);
                        break;
                    default:
                        return;
                }

                if (newIndex !== null) {
                    e.preventDefault();
                    const targetNav = navItems[newIndex];
                    targetNav.focus(); // Move focus
                    // Optional: Automatically activate on focus (standard for tabs)
                    activateTab(targetNav);
                }
            });
        });

        window.addEventListener('load', setHeight);
        window.addEventListener('resize', setHeight);

        // Run Init
        init();
    });
});
