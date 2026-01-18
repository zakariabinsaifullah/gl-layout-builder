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
        iconPadding,
        icoHvBgColor,
        iconColor,
        iconName,
        iconSize,
        customSvgCode,
        contentType,
        enableAnimation,
        iconBgColor,
        animationType
    } = attributes;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAnimationString = type => {
        switch (type) {
            case 'radar':
                return 'radarEffect 2s infinite';
            case 'heartbeat':
                return 'heartbeatEffect 1.5s infinite';
            case 'glow':
                return 'glowEffect 2s infinite';
            case 'rotate':
                return 'rotateEffect 5s linear infinite'; // Slow rotation for elegance
            case 'pulse':
            default:
                return 'continuousHoverEffect 2s infinite';
        }
    };

    const cssCustomProperties = {
        ...(alignment && { '--alignment': alignment }),
        ...(lighteffColor && { '--lighteff-color': lighteffColor }),
        ...(svgSize && { '--svg-size': svgSize + 'px' }),
        ...(iconPadding && { '--icon-padding': `${iconPadding.top} ${iconPadding.right} ${iconPadding.bottom} ${iconPadding.left}` }),
        ...(icoHvBgColor && { '--ico-hv-bg-color': icoHvBgColor }),
        ...(iconColor && { '--icon-color': iconColor }),
        ...(!enableAnimation ? { '--lightbox-animation': 'none' } : { '--lightbox-animation': getAnimationString(animationType) }),
        ...(iconBgColor && { '--ico-bg-color': iconBgColor })
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
        enableAnimation,
        iconBgColor,
        animationType
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
                <a className="gutenlayouts-play-btn gutenlayouts-lightbox-btn-1">
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
                            <h3>{__('Popup Content', 'gutenlayouts')}</h3>
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
