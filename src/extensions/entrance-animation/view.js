import 'animate.css';
import gllbScrollAnimation from './animation';
document.addEventListener('DOMContentLoaded', () => {
    const gllbAnimationElements = document.querySelectorAll('.gllb-entrance-animation');
    if (gllbAnimationElements && gllbAnimationElements?.length > 0) {
        gllbAnimationElements.forEach(element => {
            const animation = element.dataset.gllbEntranceAnimation;
            const options = element.dataset.gllbEntranceOptions; // JSON string
            const gllbOptions = options ? JSON.parse(options) : {};

            if (!animation) {
                return;
            }

            gllbScrollAnimation(element, animation, { ...gllbOptions, threshold: 0.2 });
        });
    }
});