/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';

import Inspector from './inspector';
import './editor.scss';

/**
 * Internal Dependencies
 */
import { RenderIcon } from '../../helpers';
import { generateBoxStyles, generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        uniqueId,
        contentCaption,
        showPosterIcon,
        alignment,
        lighteffColor,
        svgSize,
        iconBorder,
        iconPadding,
        icoHvBgColor,
        iconColor,
        iconHvColor,
        iconHBColor,
        iconName,
        iconSize,
        customSvgCode,
        iconBgColor,
        animationType,
        animationDuration,
        overlayColor,
        lightboxMaxWidth,
        lightboxMaxHeight,
        lightboxPadding,
        lightboxBgColor,
        lightboxBorderRadius,
        closeIconColor
    } = attributes;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // style
    const iconPaddingStyle = generateBoxStyles(iconPadding);
    const iconBorderWidth = generateBorderWidth(iconBorder);
    const iconBorderStyle = generateBorderStyle(iconBorder);
    const iconBorderColor = generateBorderColor(iconBorder);
    const lightboxPaddingStyle = generateBoxStyles(lightboxPadding);
    const lightboxBorderRadiusStyle = generateBoxStyles(lightboxBorderRadius);

    const cssCustomProperties = {
        ...(alignment && { '--alignment': alignment }),
        ...(lighteffColor && { '--lighteff-color': lighteffColor }),
        ...(svgSize && { '--svg-size': svgSize }),
        ...(iconPaddingStyle && { '--padding': iconPaddingStyle }),
        ...(iconColor && { '--icon-color': iconColor }),
        ...(iconBgColor && { '--bg-color': iconBgColor }),
        ...(iconHvColor && { '--hicon-color': iconHvColor }),
        ...(icoHvBgColor && { '--hbg-color': icoHvBgColor }),
        ...(iconBorderWidth && { '--border-width': iconBorderWidth }),
        ...(iconBorderStyle && { '--border-style': iconBorderStyle }),
        ...(iconBorderColor && { '--border-color': iconBorderColor }),
        ...(iconHBColor && { '--iconhb-color': iconHBColor }),
        ...(animationType !== '' && { '--lightbox-animation': animationType }),
        ...(animationDuration && { '--animation-duration': animationDuration + 's' }),
        ...(overlayColor && { '--overlay-color': overlayColor }),
        ...(lightboxMaxWidth && { '--lightbox-max-width': lightboxMaxWidth }),
        ...(lightboxMaxHeight && { '--lightbox-max-height': lightboxMaxHeight }),
        ...(lightboxPaddingStyle && { '--lightbox-padding': lightboxPaddingStyle }),
        ...(lightboxBgColor && { '--lightbox-bg-color': lightboxBgColor }),
        ...(lightboxBorderRadiusStyle && { '--lightbox-border-radius': lightboxBorderRadiusStyle }),
        ...(closeIconColor && { '--close-icon-color': closeIconColor })
    };
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        contentCaption,
        showPosterIcon,
        alignment,
        lighteffColor,
        svgSize,
        iconPadding,
        icoHvBgColor,
        iconColor,
        iconHvColor,
        iconBgColor,
        iconBorderWidth,
        iconBorderStyle,
        iconBorderColor,
        iconHBColor,
        animationType,
        animationDuration,
        overlayColor,
        lightboxMaxWidth,
        lightboxMaxHeight,
        lightboxPadding,
        lightboxBgColor,
        lightboxBorderRadius,
        closeIconColor
    ]);

    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    useEffect(() => {
        if (!uniqueId) {
            setAttributes({ uniqueId: `lightbox-${clientId}` });
        }
    }, [uniqueId, clientId, setAttributes]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {isSelected && <Inspector {...props} onOpenContentModal={openModal} />}
            <div {...blockProps}>
                <a className="gutenlayouts-play-btn">
                    {showPosterIcon && (
                        <span className="gutenlayouts-btn-icon">
                            <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={iconSize} />
                        </span>
                    )}
                </a>
            </div>
            {isModalOpen && (
                <div className="gutenlayouts-lightbox-overlay" onClick={closeModal}>
                    <div className="gutenlayouts-lightbox-popup" onClick={e => e.stopPropagation()}>
                        <div className="gutenlayouts-lightbox-header">
                            <h3>{__('Popup Content', 'gl-layout-builder')}</h3>
                            <button className="gutenlayouts-lightbox-close" onClick={closeModal} aria-label="Close">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                                </svg>
                            </button>
                        </div>
                        <div className="gutenlayouts-lightbox-content-area">
                            <InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Edit;
