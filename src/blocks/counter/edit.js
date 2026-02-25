/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls, MediaUpload } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';
import { RenderIcon } from '../../helpers';
import './editor.scss';
import {generateBoxStyles, generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';


const Edit = props => {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const {
        uniqueId,
        hideIcon,
        hideTitle,
        hideCounter,
        hidePrefix,
        hideSuffix,
        startNumber,
        endNumber,
        counterPrefix,
        counterSuffix,
        titleTag,
        titleText,
        iconType,
        iconName,
        customSvgCode,
        iconTypeImage,
        imageRes,
        counterDirection,
        alignment,
        counterSize,
        counterColor,
        counterTsize,
        counterTcolor,
        iconColor,
        iconSize,
        itemGap,
        contentGap,
        prefixSize,
        prefixColor,
        suffixSize,
        suffixColor,
        iconBg,
        iconPadding,
        iconBorderRadius,
        iconBorder,
    } = attributes;

   const iconPaddingStyles = generateBoxStyles(iconPadding);
    const iconBorderWidth = generateBorderWidth(iconBorder);
    const iconBorderStyle = generateBorderStyle(iconBorder);
    const iconBorderColor = generateBorderColor(iconBorder);
    const iconBorderRadiusStyle = generateBoxStyles(iconBorderRadius);

    const cssCustomProperties = {
        ...(alignment && { '--alignment': alignment }),
        ...(counterDirection && { '--direction': counterDirection }),
        ...(counterSize && { '--counter-size': `${counterSize}px` }),
        ...(counterTsize && { '--title-size': `${counterTsize}px` }),
        ...(counterColor && { '--counter-color': counterColor }),
        ...(counterTcolor && { '--title-color': counterTcolor }),
        ...(iconSize && { '--icon-size': `${iconSize}px` }),
        ...(iconColor && { '--icon-color': iconColor }),
        ...(itemGap !== undefined && { '--item-gap': `${itemGap}px` }),
        ...(contentGap !== undefined && { '--content-gap': `${contentGap}px` }),
        ...(prefixSize && { '--prefix-size': `${prefixSize}px` }),
        ...(prefixColor && { '--prefix-color': prefixColor }),
        ...(suffixSize && { '--suffix-size': `${suffixSize}px` }),
        ...(suffixColor && { '--suffix-color': suffixColor }),
        ...(iconBg && { '--icon-bg': iconBg }),
         ...(iconPaddingStyles && { '--icon-padding': iconPaddingStyles }),
        ...(iconBorderWidth && { '--icon-border-width': iconBorderWidth }),
        ...(iconBorderStyle && { '--icon-border-style': iconBorderStyle }),
        ...(iconBorderColor && { '--icon-border-color': iconBorderColor }),
        ...(iconBorderRadiusStyle && { '--icon-radius': iconBorderRadiusStyle }),

       
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        counterSize,
        counterTsize,
        counterColor,
        counterTcolor,
        iconSize,
        iconColor,
        itemGap,
        contentGap,
        prefixSize,
        prefixColor,
        suffixSize,
        suffixColor,
        alignment,
        counterDirection,
        iconBg,
        iconPadding,
        iconBorderRadius,
        iconBorder
    ]);

    useEffect(() => {
        if (!uniqueId) {
            setAttributes({ uniqueId: 'gl-counter-' + clientId.slice(0, 8) });
        }
    }, []);

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classnames(uniqueId)
    });

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                {iconType === 'image' && (
                    <ToolbarGroup>
                        <MediaUpload
                            onSelect={media => {
                                setAttributes({
                                    iconTypeImage: {
                                        id: media.id,
                                        url: media.url,
                                        alt: media.alt,
                                        sizes: media.sizes
                                    }
                                });
                            }}
                            allowedTypes={['image']}
                            value={iconTypeImage && iconTypeImage.id}
                            render={({ open }) => (
                                <ToolbarButton icon="image-rotate" label={__('Replace Image', 'gl-layout-builder')} onClick={open} />
                            )}
                        />
                        <ToolbarButton icon="trash" label={__('Remove Image', 'gl-layout-builder')} onClick={() => setAttributes({ iconTypeImage: null })} />
                    </ToolbarGroup>
                )}
            </BlockControls>
            <div {...blockProps}>
                <div className="gl-counter-wrap">
                    <div className="gl-counter-item">
                        {hideIcon && (
                            <div className="gl-counter-icon">
                                {iconType === 'icon' ? (
                                    <RenderIcon customSvgCode={customSvgCode} iconName={iconName} />
                                ) : (
                                    iconTypeImage && (
                                        <img
                                            src={iconTypeImage.sizes && iconTypeImage.sizes[imageRes] ? iconTypeImage.sizes[imageRes].url : iconTypeImage.url}
                                            alt={iconTypeImage.alt || titleText}
                                        />
                                    )
                                )}
                            </div>
                        )}

                        <div className="gl-counter-content">
                            {hideCounter && (
                                <div className="gl-counter-number-wrap">
                                    {hidePrefix && <span className="gl-counter-prefix">{counterPrefix}</span>}
                                    <span className="gl-counter-number">{endNumber}</span>
                                    {hideSuffix && <span className="gl-counter-suffix">{counterSuffix}</span>}
                                </div>
                            )}

                            {hideTitle && (
                                <RichText
                                    tagName={titleTag}
                                    className="gl-counter-title"
                                    value={titleText}
                                    onChange={text => setAttributes({ titleText: text })}
                                    placeholder={__('Enter title...', 'gl-layout-builder')}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
