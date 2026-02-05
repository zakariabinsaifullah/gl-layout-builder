/**
 * Lightbox Implementation
 */
document.addEventListener('DOMContentLoaded', () => {
    // Helper to close lightbox
    const closeLightbox = element => {
        if (!element) return;

        element.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // Stop video if it's an iframe logic
        const iframe = element.querySelector('iframe');
        if (iframe) {
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        }
    };

    // Handle Open Clicks
    document.body.addEventListener('click', e => {
        const btn = e.target.closest('.gutenlayouts-play-btn');
        if (!btn) return;

        e.preventDefault();

        const targetId = btn.getAttribute('data-fslightbox');
        if (!targetId) return;

        const targetContent = document.getElementById(targetId);

        if (targetContent) {
            targetContent.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    // Handle Close Clicks (Button & Overlay)
    document.body.addEventListener('click', e => {
        // Close Button
        if (e.target.closest('.gutenlayouts-lightbox-close')) {
            const lightbox = e.target.closest('.gutenlayouts-lightbox-content');
            closeLightbox(lightbox);
        }

        // Overlay Click (The lightbox content wrapper itself acts as overlay)
        if (e.target.classList.contains('gutenlayouts-lightbox-content')) {
            closeLightbox(e.target);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const activeLightbox = document.querySelector('.gutenlayouts-lightbox-content.active');
            if (activeLightbox) {
                closeLightbox(activeLightbox);
            }
        }
    });
});
