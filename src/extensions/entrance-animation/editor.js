import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * Entrance Animation HOC - Updated to always merge and pass className
 */
const gllbEntranceAnimationEditor = createHigherOrderComponent(BlockListBlock => {
    return props => {
        const { attributes, className: existingClassName } = props;
        const { gllbEntranceAnimation } = attributes;

        let combinedClassName = existingClassName || '';
        if (gllbEntranceAnimation) {
            const animationClass = `animate__animated animate__${gllbEntranceAnimation}`;
            combinedClassName = combinedClassName
                ? `${combinedClassName} ${animationClass}`
                : animationClass;
        }

        return <BlockListBlock {...props} className={combinedClassName} />;
    };
}, 'gllbEntranceAnimationEditor');

addFilter('editor.BlockListBlock', 'gllb/gllbEntranceAnimationEditor', gllbEntranceAnimationEditor);