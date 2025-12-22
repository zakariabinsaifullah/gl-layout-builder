/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const Save = props => {
    const { attributes } = props;
    const { thickNess } = attributes;

    const cssCustomProperties = {
        ...(thickNess && { '--thickness': `${thickNess}px` })
    };

    /**
     * Block Props
     */
    const blockProps = useBlockProps.save({
        style: cssCustomProperties
    });

    // Inner blocks props for save
    const innerBlockProps = useInnerBlocksProps.save({
        className: 'progressbar-inner-blocks'
    });

    return (
        <div {...blockProps}>
            <div {...innerBlockProps} />
        </div>
    );
};

export default Save;
