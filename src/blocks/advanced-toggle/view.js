/**
 * Pro Advanced Toggle Frontend Logic - Binary Edition
 */
document.addEventListener('DOMContentLoaded', () => {
    const initToggles = () => {
        const blocks = document.querySelectorAll('.gutenlayouts-pro-toggle');

        blocks.forEach(block => {
            const labels = block.querySelectorAll('.toggle-label-wrapper');
            const toggleSwitch = block.querySelector('.toggle-switch');
            const tabIndicator = block.querySelector('.tab-indicator');
            const contentItems = block.querySelectorAll('.wp-block-gutenlayouts-toggle-content');
            const animationType = block.getAttribute('data-animation') || 'fade';
            const initialState = block.getAttribute('data-active') || 'left';

            const updateToggle = (state) => {
                // Update Labels
                labels.forEach(l => l.classList.remove('active'));
                const activeLabel = block.querySelector(`.toggle-label-wrapper.${state}`);
                if (activeLabel) activeLabel.classList.add('active');

                // Update Switch/Indicator
                if (toggleSwitch) {
                    toggleSwitch.classList.remove('left', 'right');
                    toggleSwitch.classList.add(state);
                }
                if (tabIndicator) {
                    tabIndicator.classList.remove('left', 'right');
                    tabIndicator.classList.add(state);
                }

                // Update Content
                contentItems.forEach(item => {
                    item.style.display = 'none';
                    item.classList.remove('is-active');
                });

                const activeItem = block.querySelector(`.toggle-content-${state}`);
                if (activeItem) {
                    activeItem.style.display = 'block';
                    activeItem.classList.add('is-active');
                }

                window.dispatchEvent(new Event('resize'));
            };

            // Initialize on Load
            updateToggle(initialState);

            // Click events
            labels.forEach(label => {
                label.addEventListener('click', () => {
                    const state = label.classList.contains('left') ? 'left' : 'right';
                    updateToggle(state);
                });
            });

            if (toggleSwitch) {
                toggleSwitch.addEventListener('click', () => {
                    const currentState = toggleSwitch.classList.contains('left') ? 'right' : 'left';
                    updateToggle(currentState);
                });
            }
        });
    };

    initToggles();
});
