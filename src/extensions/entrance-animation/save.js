/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Add entrance animation attributes to the block's save content.
 *
 * @param {Object} extraProps Block extra props.
 * @param {Object} blockType Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Modified block extra props.
 */
function gllbEntranceAnimationSave(extraProps, blockType, attributes) {
    const { gllbEntranceAnimation, gllbEntranceDuration, gllbEntranceDelay, gllbEntranceRepeat, gllbEntranceLoop } = attributes;

    if (gllbEntranceAnimation) {
        // Add class
        extraProps.className = (extraProps.className || '') + ' gllb-entrance-animation';
        extraProps.className = extraProps.className.trim();

        // Add data attributes
        extraProps['data-gllb-entrance-animation'] = gllbEntranceAnimation;

        const options = {
            duration: gllbEntranceDuration,
            delay: gllbEntranceDelay,
            repeat: gllbEntranceRepeat,
            loop: gllbEntranceLoop
        };

        extraProps['data-gllb-entrance-options'] = JSON.stringify(options);
    }

    return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'gllb/gllbEntranceAnimationSave',
    gllbEntranceAnimationSave
);
