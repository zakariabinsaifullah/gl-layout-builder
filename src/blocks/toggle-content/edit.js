/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = props => {
    const { attributes, context } = props;
    const { type } = attributes;
    const toggleState = context['gutenlayouts/toggleState'];
    const isActive = toggleState === type;

    const blockProps = useBlockProps({
        className: `toggle-content toggle-content-${type} ${isActive ? 'is-active' : 'is-hidden'}`,
        style: {
            display: isActive ? 'block' : 'none'
        }
    });

    return (
        <div {...blockProps}>
            <InnerBlocks n
                template={[['core/paragraph', { placeholder: __('Enter your content here...', 'gl-layout-builder') }]]}
                templateLock={false}
                renderAppender={ InnerBlocks.ButtonBlockAppender }
            />
        </div>
    );
};

export default Edit;
