import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { buttonText, buttonTextActive, alignment, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps} data-text-folded={buttonText} data-text-expanded={buttonTextActive}>
            <div className="gl-unfold-content-wrapper">
                <div className="gl-unfold-content">
                    <InnerBlocks.Content />
                </div>
                <div className="gl-unfold-overlay"></div>
            </div>

            <div className={`gl-unfold-button-container align-${alignment}`}>
                <button className="gl-unfold-toggle" type="button">
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
