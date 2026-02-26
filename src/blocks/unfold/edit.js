import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import Inspector from './inspector';
import { generateBoxStyles, generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const {
        collapsedHeight,
        buttonText,
        alignment,
        transitionDuration,
        blockStyle,
        btnColor,
        btnBg,
        btnHoverBg,
        btnHoverColor,
        btnBorder,
        btnPadding,
        unfOverlayColor
    } = attributes;
    // style
    const btnPaddingStyle = generateBoxStyles(btnPadding);
    const btnBorderWidth = generateBorderWidth(btnBorder);
    const btnBorderStyle = generateBorderStyle(btnBorder);
    const btnBorderColor = generateBorderColor(btnBorder);

    const cssCustomProperties = {
        ...(collapsedHeight && { '--collapsed-height': `${collapsedHeight}px` }),
        ...(transitionDuration && { '--transition-duration': `${transitionDuration}s` }),
        ...(btnColor && { '--button-color': btnColor }),
        ...(btnBg && { '--button-bg': btnBg }),
        ...(btnHoverBg && { '--button-hover-bg': btnHoverBg }),
        ...(btnHoverColor && { '--button-hover-color': btnHoverColor }),
        ...(btnBorderWidth && { '--button-border-width': btnBorderWidth }),
        ...(btnBorderStyle && { '--button-border-style': btnBorderStyle }),
        ...(btnBorderColor && { '--button-border-color': btnBorderColor }),
        ...(btnPaddingStyle && { '--button-padding': btnPaddingStyle }),
        ...(unfOverlayColor && { '--unfold-overlay-color': `linear-gradient(to bottom, transparent, ${unfOverlayColor})` })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [collapsedHeight, transitionDuration, btnColor, btnBg, btnHoverBg, btnHoverColor, btnBorder, btnPadding, unfOverlayColor]);

    const blockProps = useBlockProps({
        style: blockStyle
    });

    return (
        <>
            <Inspector {...props} />
            <div {...blockProps}>
                <div className="gl-unfold-content-wrapper" style={{ maxHeight: `${collapsedHeight}px`, overflow: 'hidden' }}>
                    <div className="gl-unfold-content">
                        <InnerBlocks />
                    </div>
                    <div className="gl-unfold-overlay"></div>
                </div>

                <div className={`gl-unfold-button-container align-${alignment}`}>
                    <button className="gl-unfold-toggle" type="button">
                        {buttonText}
                    </button>
                </div>
            </div>
        </>
    );
}
