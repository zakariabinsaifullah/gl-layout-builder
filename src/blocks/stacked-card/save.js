/**
 * WordPress Dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { blockStyle, effectStyle } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: `wp-block-gutenlayouts-stacked-card has-effect-${effectStyle}`
    });

    return (
        <div {...blockProps}>
            <div className="sc-stack-wrapper">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
