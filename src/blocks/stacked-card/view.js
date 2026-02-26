/**
 * Stacked Cards - Frontend Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const stackedBlocks = document.querySelectorAll('.wp-block-gutenlayouts-stacked-card');

    stackedBlocks.forEach(block => {
        const wrapper = block.querySelector('.sc-stack-wrapper');
        if (!wrapper) return;

        const cards = Array.from(wrapper.children);
        if (!cards.length) return;

        // Configuration from CSS variables
        const getStyleVal = (prop, fallback) => {
            const val = getComputedStyle(block).getPropertyValue(prop).trim();
            return val ? val : fallback;
        };

        const topOffset = parseInt(getStyleVal('--scb-top-offset', '80'), 10);
        const effectStyle =
            Array.from(block.classList)
                .find(c => c.startsWith('has-effect-'))
                ?.replace('has-effect-', '') || 'stack';

        const blurStrength = parseFloat(getStyleVal('--scb-blur-strength', '0'));
        const scaleStrength = parseFloat(getStyleVal('--scb-scale-strength', '0'));

        // Apply initial z-index and staggering if needed
        cards.forEach((card, index) => {
            card.style.zIndex = index + 1;
        });

        const handleScroll = () => {
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const stickyPos = topOffset; // Note: simplified to match style.scss top

                // Track if this card is currently in sticky habitat
                const isStuck = rect.top <= stickyPos + 5;

                if (!isStuck) {
                    card.style.transform = '';
                    card.style.filter = '';
                    card.style.opacity = '1';
                    return;
                }

                // Check how many cards are stacked on top of this one
                let cardsOnTop = 0;
                for (let j = index + 1; j < cards.length; j++) {
                    const nextRect = cards[j].getBoundingClientRect();
                    // If next card is also stuck (or very near), it counts as "on top"
                    if (nextRect.top <= stickyPos + 5) {
                        cardsOnTop++;
                    }
                }

                if (cardsOnTop > 0) {
                    // Apply effects based on how many cards are pressing down/on top
                    if (effectStyle === 'scale-blur') {
                        const scale = 1 - cardsOnTop * scaleStrength;
                        const blur = cardsOnTop * (blurStrength / 2); // Half strength per layer for smoother look
                        card.style.transform = `scale(${Math.max(0.7, scale)})`;
                        card.style.filter = `blur(${blur}px)`;
                        card.style.opacity = Math.max(0.4, 1 - cardsOnTop * 0.1);
                    } else if (effectStyle === 'fan') {
                        const rotation = cardsOnTop * 3;
                        const scale = 1 - cardsOnTop * scaleStrength;
                        card.style.transform = `scale(${Math.max(0.7, scale)}) rotate(${rotation}deg)`;
                        card.style.opacity = Math.max(0.6, 1 - cardsOnTop * 0.05);
                    } else {
                        // Standard stack
                        const scale = 1 - cardsOnTop * 0.03;
                        card.style.transform = `scale(${Math.max(0.85, scale)})`;
                        card.style.opacity = Math.max(0.7, 1 - cardsOnTop * 0.05);
                    }
                } else {
                    // This is the active/top card
                    card.style.transform = 'scale(1) rotate(0deg)';
                    card.style.filter = 'none';
                    card.style.opacity = '1';
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run once on load
    });
});
