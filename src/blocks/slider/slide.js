import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

registerBlockType('gutenlayouts/slide', {
    title: __('Slide', 'gutenlayouts'),
    icon: 'minus',
    category: 'text',
    parent: ['gutenlayouts/slider'],
    edit({ attributes, setAttributes }) {
        const {} = attributes;

        const blockProps = useBlockProps({
            className: 'gutenlayouts-editor-slide'
        });

        return (
            <>
                <div {...blockProps}>
                    <div className="slide-content">
                        <InnerBlocks />
                    </div>
                </div>
            </>
        );
    },
    save({ attributes }) {
        const {} = attributes;
        const blockProps = useBlockProps.save({
            className: 'swiper-slide'
        });

        return (
            <div {...blockProps}>
                <div className="slide-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    }
});
