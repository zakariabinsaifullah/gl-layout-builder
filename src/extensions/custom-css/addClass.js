/**
 * Custom CSS HOC - Updated to preserve existing classes
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

const withGutenlayoutsUniqueClass = createHigherOrderComponent(BlockListBlock => {
    return props => {
        const { attributes, clientId, className: existingClassName } = props;
        const { gllbCustomCSS } = attributes;

        if (!gllbCustomCSS) {
            return <BlockListBlock {...props} />;
        }

        const generatedClass = `gutenlayouts-${clientId.slice(0, 8)}`;

        // Combine existing className with generated class
        const combinedClassName = existingClassName ? `${existingClassName} ${generatedClass}` : generatedClass;

        return <BlockListBlock {...props} className={combinedClassName} />;
    };
}, 'withGutenlayoutsUniqueClass');

addFilter('editor.BlockListBlock', 'gutenlayouts/with-unique-class', withGutenlayoutsUniqueClass);
