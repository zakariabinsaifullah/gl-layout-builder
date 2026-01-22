import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

// soft minify
const softMinifyCssStrings = (cssString = ' ') =>
    cssString.replace(/\s+/g, ' ').replace(/\.gutenlayouts\-[\w\-\s\.\,\:\>\(\)\d\+\[\]\#\>]+\{[\s]+\}/g, '');

/**
 * Higher-order component that adds the custom CSS style to the block in the editor
 */
const gutenlayoutsAddCustomStyle = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { attributes, clientId } = props;
        const { gutenlayoutsCustomCSS } = attributes;

        if (!gutenlayoutsCustomCSS) {
            return <BlockEdit {...props} />;
        }

        const dynamicClass = `gutenlayouts-${clientId.slice(0, 8)}`;

        // replace selector with dynamicClass
        const newCSS = gutenlayoutsCustomCSS.replace(/selector/g, `.${dynamicClass}`);

        const style = `${newCSS}`;

        return (
            <>
                <style>{softMinifyCssStrings(style)}</style>
                <BlockEdit key="edit" {...props} />
            </>
        );
    };
}, 'gutenlayoutsAddCustomStyle');

// Register filters

addFilter('editor.BlockEdit', 'gutenlayouts/add-custom-style', gutenlayoutsAddCustomStyle);