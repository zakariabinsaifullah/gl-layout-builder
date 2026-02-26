/**
 * Unfold Block - Frontend Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const unfoldBlocks = document.querySelectorAll('.wp-block-gutenlayouts-unfold');

    unfoldBlocks.forEach(block => {
        if (block.dataset.unfoldInitialized) return;
        block.dataset.unfoldInitialized = 'true';

        const toggleBtn = block.querySelector('.gl-unfold-toggle');
        const contentWrapper = block.querySelector('.gl-unfold-content-wrapper');

        if (!toggleBtn || !contentWrapper) return;

        const foldedText = block.getAttribute('data-text-folded') || 'Read More';
        const expandedText = block.getAttribute('data-text-expanded') || 'Show Less';
        const collapsedH = getComputedStyle(block).getPropertyValue('--collapsed-height').trim() || '150px';

        let isExpanded = false;
        let isAnimating = false;

        toggleBtn.addEventListener('click', e => {
            e.preventDefault();
            if (isAnimating) return;
            isAnimating = true;

            if (!isExpanded) {
                // EXPANDING: Read More → Show Less
                isExpanded = true;
                block.classList.add('is-expanded');
                toggleBtn.textContent = expandedText;

                // Measure full height
                contentWrapper.style.maxHeight = 'none';
                const fullH = contentWrapper.scrollHeight;
                contentWrapper.style.maxHeight = collapsedH;

                // Force reflow so browser registers the collapsedH before animating
                contentWrapper.offsetHeight;

                // Now animate to fullH
                contentWrapper.style.maxHeight = fullH + 'px';

                setTimeout(() => {
                    isAnimating = false;
                }, 700);
            } else {
                // COLLAPSING: Show Less → Read More
                isExpanded = false;
                block.classList.remove('is-expanded');
                toggleBtn.textContent = foldedText;

                // Get current actual rendered height
                const currentH = contentWrapper.offsetHeight;

                // Pin it explicitly (in case it was fluid)
                contentWrapper.style.maxHeight = currentH + 'px';

                // Force reflow so browser sees the pinned value
                contentWrapper.offsetHeight;

                // Now animate down
                contentWrapper.style.maxHeight = collapsedH;

                setTimeout(() => {
                    isAnimating = false;
                }, 700);
            }
        });
    });
});
