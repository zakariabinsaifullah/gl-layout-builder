class GalleryLightbox {
    constructor(gallerySelector = '.wp-block-gallery.gutenlayouts-lightbox') {
        this.galleries = document.querySelectorAll(gallerySelector);
        this.currentImageIndex = 0;
        this.images = [];
        this.lightboxOverlay = null;

        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.bindEvents();
    }

    createLightboxHTML() {
        // Create lightbox overlay
        this.lightboxOverlay = document.createElement('div');
        this.lightboxOverlay.className = 'gutenlayouts-lightbox-overlay';
        this.lightboxOverlay.innerHTML = `
                    <div class="gutenlayouts-lightbox-container">
                        <button class="gutenlayouts-lightbox-close" aria-label="Close lightbox">&times;</button>
                        <button class="gutenlayouts-lightbox-nav gutenlayouts-lightbox-prev" aria-label="Previous image">&#8249;</button>
                        <button class="gutenlayouts-lightbox-nav gutenlayouts-lightbox-next" aria-label="Next image">&#8250;</button>
                        <img class="gutenlayouts-lightbox-image" src="" alt="">
                        <div class="gutenlayouts-lightbox-counter"></div>
                    </div>
                `;
        document.body.appendChild(this.lightboxOverlay);

        // Get lightbox elements
        this.lightboxImage = this.lightboxOverlay.querySelector('.gutenlayouts-lightbox-image');
        this.lightboxClose = this.lightboxOverlay.querySelector('.gutenlayouts-lightbox-close');
        this.lightboxPrev = this.lightboxOverlay.querySelector('.gutenlayouts-lightbox-prev');
        this.lightboxNext = this.lightboxOverlay.querySelector('.gutenlayouts-lightbox-next');
        this.lightboxCounter = this.lightboxOverlay.querySelector('.gutenlayouts-lightbox-counter');
    }

    bindEvents() {
        // Add click events to all gallery images
        this.galleries.forEach(gallery => {
            const images = gallery.querySelectorAll('.wp-block-image img');
            images.forEach((img, index) => {
                img.addEventListener('click', e => {
                    e.preventDefault();
                    this.openLightbox(gallery, index);
                });
            });
        });

        // Lightbox controls
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.previousImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());

        // Keyboard controls
        document.addEventListener('keydown', e => {
            if (!this.lightboxOverlay.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });

        // Close on overlay click
        this.lightboxOverlay.addEventListener('click', e => {
            if (e.target === this.lightboxOverlay) {
                this.closeLightbox();
            }
        });

        // Prevent scrolling when lightbox is open
        this.lightboxOverlay.addEventListener('wheel', e => {
            e.preventDefault();
        });
    }

    openLightbox(gallery, startIndex) {
        // Get all images from the current gallery
        this.images = Array.from(gallery.querySelectorAll('.wp-block-image img')).map(img => ({
            src: this.getLargestImageSrc(img),
            alt: img.alt || '',
            caption: this.getImageCaption(img)
        }));

        this.currentImageIndex = startIndex;
        this.showImage();
        this.lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    showImage() {
        const currentImage = this.images[this.currentImageIndex];
        this.lightboxImage.src = currentImage.src;
        this.lightboxImage.alt = currentImage.alt;

        // Update counter
        this.lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${this.images.length}`;

        // Update navigation buttons
        this.lightboxPrev.disabled = this.currentImageIndex === 0;
        this.lightboxNext.disabled = this.currentImageIndex === this.images.length - 1;
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.showImage();
        }
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
            this.showImage();
        }
    }

    getLargestImageSrc(img) {
        // Try to get the largest image from srcset, fallback to src
        const srcset = img.getAttribute('srcset');
        if (srcset) {
            const sources = srcset.split(',').map(src => {
                const parts = src.trim().split(' ');
                return {
                    url: parts[0],
                    width: parseInt(parts[1]) || 0
                };
            });
            // Sort by width descending and return the largest
            sources.sort((a, b) => b.width - a.width);
            return sources[0].url;
        }
        return img.src;
    }

    getImageCaption(img) {
        // Try to find caption in various WordPress structures
        const figure = img.closest('figure');
        if (figure) {
            const caption = figure.querySelector('figcaption');
            if (caption) {
                return caption.textContent.trim();
            }
        }
        return '';
    }
}

// Initialize the lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GalleryLightbox();
});
