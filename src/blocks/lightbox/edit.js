/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import Inspector from './inspector';
import './editor.scss';
/**
 * External Dependencies
 */

/**
 * Internal Dependencies
 */

// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const { uniqueId, contentCaption, showPosterIcon, alignment, lighteffColor, svgSize, iconPadding, icoHvBgColor, iconColor } =
        attributes;

    const cssCustomProperties = {
        ...(alignment && { '--alignment': alignment }),
        ...(lighteffColor && { '--lighteff-color': lighteffColor }),
        ...(svgSize && { '--svg-size': svgSize + 'px' }),
        ...(iconPadding && { '--icon-padding': `${iconPadding.top} ${iconPadding.right} ${iconPadding.bottom} ${iconPadding.left}` }),
        ...(icoHvBgColor && { '--ico-hv-bg-color': icoHvBgColor }),
        ...(iconColor && { '--icon-color': iconColor })
    };
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [contentCaption, showPosterIcon, alignment, lighteffColor, svgSize, iconPadding, icoHvBgColor, iconColor]);

    const blockProps = useBlockProps({
        style: cssCustomProperties
    });
    useEffect(() => {
        if (!uniqueId) {
            setAttributes({ uniqueId: `lightbox-${clientId}` });
        }
    }, [uniqueId, clientId, setAttributes]);
    /**
     * Block Props
     */

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <a
                    href={`#${uniqueId}`}
                    className="gutenlayouts-play-btn gutenlayouts-lightbox-btn-1"
                    data-fslightbox={uniqueId}
                    data-caption={contentCaption}
                >
                    {showPosterIcon && (
                        <span className="gutenlayouts-btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path>
                            </svg>
                        </span>
                    )}
                </a>
            </div>
        </>
    );
};

export default Edit;
