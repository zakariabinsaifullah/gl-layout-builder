document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.gl-counter-number');

    const formatNumber = (num, decimals, separator, isIndian) => {
        let n = num.toFixed(decimals);
        let parts = n.split('.');
        let x1 = parts[0];
        let x2 = parts.length > 1 ? '.' + parts[1] : '';

        if (separator) {
            if (isIndian) {
                // Indian System: Last 3 digits grouped, then every 2 digits (e.g., 10,00,000)
                let lastThree = x1.substring(x1.length - 3);
                let otherNumbers = x1.substring(0, x1.length - 3);
                if (otherNumbers !== '') {
                    lastThree = separator + lastThree;
                }
                x1 = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, separator) + lastThree;
            } else {
                // Standard International System: Every 3 digits (e.g., 1,000,000)
                x1 = x1.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            }
        }
        return x1 + x2;
    };

    const animateCounter = (el) => {
        const start = parseFloat(el.getAttribute('data-start')) || 0;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const duration = parseFloat(el.getAttribute('data-duration')) * 1000 || 2000;
        const separator = el.getAttribute('data-separator') || '';
        const isIndian = el.getAttribute('data-indian') === 'true';
        const decimals = parseInt(el.getAttribute('data-decimal')) || 0;
        
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const current = start + (target - start) * easeProgress;
            
            el.textContent = formatNumber(current, decimals, separator, isIndian);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = formatNumber(target, decimals, separator, isIndian);
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});
