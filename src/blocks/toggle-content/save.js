/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const Save = props => {
    const { attributes } = props;
    const { type } = attributes;

    const blockProps = useBlockProps.save({
        className: `toggle-content toggle-content-${type || 'left'}`
    });

    return (
        <div {...blockProps}>
            <InnerBlocks.Content />
        </div>
    );
};

export default Save;
