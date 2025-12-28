document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.wp-block-gutenlayouts-carousel');
    sliders.forEach(function (slider) {
        const loop = slider.getAttribute('data-loop') === 'true';
        const autoplay = slider.getAttribute('data-autoplay') === 'true';
        const delay = parseInt(slider.getAttribute('data-delay')) || 3000;

        const swiper = new Swiper(slider.querySelector('.swiper'), {
            // Swiper options
            loop: loop,
            autoplay: autoplay
                ? {
                      delay: delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      enabled: autoplay
                  }
                : false,
            navigation: {
                nextEl: slider.querySelector('.swiper-custom-next'),
                prevEl: slider.querySelector('.swiper-custom-prev')
            },
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true
            },
            // Touch/Swipe navigation options for mobile
            touchRatio: 1,
            touchAngle: 45,
            grabCursor: true,
            allowTouchMove: true,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: false,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: true
        });
    });
});
