/**
 * Main animation function
 * @param {Element} target - DOM element
 * @param {string} animation - animate.css animation name
 * @param {Object} options - Animation options
 */
const gllbScrollAnimation = (target, animation, options = {}) => {
    const defaultOptions = {
        duration: 1000, // Animation duration in milliseconds
        delay: 0, // Animation delay in milliseconds
        repeat: true, // Repeat animation when element re-enters viewport
        offset: 0, // Offset before animation triggers
        loop: false // Loop animation infinitely
    };

    const settings = { ...defaultOptions, ...options };

    // Process offset values
    const offsets =
        typeof settings.offset === 'number'
            ? {
                  top: settings.offset,
                  bottom: settings.offset,
                  left: settings.offset,
                  right: settings.offset
              }
            : {
                  top: settings.offset.top || 0,
                  bottom: settings.offset.bottom || 0,
                  left: settings.offset.left || 0,
                  right: settings.offset.right || 0
              };

    // Create stylesheet for initial hidden state
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const hiddenClassName = `scroll-animate-hidden-${uniqueId}`;

    const style = document.createElement('style');

    style.textContent = `
        .${hiddenClassName} {
            opacity: 0;
            visibility: hidden;
            will-change: transform, opacity;
            transform: translateY(20px);
            animation-duration: ${settings.duration}s;
            animation-delay: ${settings.delay}s;
        }
    `;

    document.head.appendChild(style);

    // Track animation state for each element
    let isAnimating = new WeakMap();

    // Create Intersection Observer
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const element = entry.target;

                if (entry.isIntersecting && !isAnimating.get(element)) {
                    // Element entered viewport - start animation
                    isAnimating.set(element, true);

                    requestAnimationFrame(() => {
                        // Remove hidden class and add animation classes
                        element.classList.remove(hiddenClassName);
                        element.classList.add('animate__animated', `animate__${animation}`);

                        // Add infinite loop class if loop option is enabled
                        if (settings.loop) {
                            element.classList.add('animate__infinite');
                        }

                        // Apply visible styles
                        element.style.opacity = '1';
                        element.style.visibility = 'visible';
                        element.style.transform = 'translateY(0)';
                        element.style.animationDuration = `${settings.duration}s`;
                        element.style.animationDelay = `${settings.delay}s`;
                    });

                    // Handle animation end event
                    element.addEventListener(
                        'animationend',
                        () => {
                            isAnimating.set(element, false);

                            // If repeat is disabled, stop observing this element
                            if (!settings.repeat) {
                                observer.unobserve(element);
                            }
                        },
                        { once: true }
                    );
                } else if (!entry.isIntersecting && settings.repeat) {
                    // Element left viewport and repeat is enabled - reset animation
                    isAnimating.set(element, false);

                    // Add hidden class and remove animation classes
                    element.classList.add(hiddenClassName);
                    element.classList.remove('animate__animated', `animate__${animation}`);

                    // Remove infinite loop class if it was added
                    if (settings.loop) {
                        element.classList.remove('animate__infinite');
                    }

                    // Reset to hidden state
                    element.style.opacity = '0';
                    element.style.visibility = 'hidden';
                    element.style.transform = 'translateY(20px)';
                    element.style.animationDuration = `${settings.duration}s`;
                    element.style.animationDelay = `${settings.delay}s`;
                }
            });
        },
        {
            root: null,
            rootMargin: `${offsets.top}px ${offsets.right}px ${offsets.bottom}px ${offsets.left}px`
        }
    );

    // Helper function to convert target to array of elements
    const getElements = target => {
        if (typeof target === 'string') {
            return Array.from(document.querySelectorAll(target));
        } else if (target instanceof NodeList) {
            return Array.from(target);
        } else if (target instanceof Element) {
            return [target];
        }
        return [];
    };

    // Initialize elements
    const elements = getElements(target);
    elements.forEach(element => {
        element.classList.add(hiddenClassName);
        isAnimating.set(element, false);
        observer.observe(element);
    });

    // Return cleanup function
    return () => {
        elements.forEach(element => {
            observer.unobserve(element);
            element.classList.remove(hiddenClassName, 'animate__animated', `animate__${animation}`, 'animate__infinite');
            element.style.opacity = '';
            element.style.visibility = '';
            element.style.transform = '';
            element.style.animationDuration = '';
            element.style.animationDelay = '';
            isAnimating.delete(element);
        });
        style.remove();
    };
};

export default gllbScrollAnimation;