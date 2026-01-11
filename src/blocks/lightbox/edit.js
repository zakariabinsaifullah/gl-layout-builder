/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

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
        customSvgCode
    } = attributes;

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
                <a className="gutenlayouts-play-btn gutenlayouts-lightbox-btn-1">
                    {showPosterIcon && (
                        <span className="gutenlayouts-btn-icon">
                            <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={iconSize} />
                        </span>
                    )}
                </a>
            </div>
        </>
    );
};

export default Edit;
