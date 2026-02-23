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
        useSeparator,
        separatorType,
        isIndianSystem,
        decimalPlaces
    } = attributes;

    const formatNumberPreview = num => {
        let n = parseFloat(num) || 0;
        let decimals = parseInt(decimalPlaces) || 0;
        let res = n.toFixed(decimals);

        if (useSeparator && separatorType) {
            let parts = res.split('.');
            let x1 = parts[0];
            let x2 = parts.length > 1 ? '.' + parts[1] : '';

            if (isIndianSystem) {
                let lastThree = x1.substring(x1.length - 3);
                let otherNumbers = x1.substring(0, x1.length - 3);
                if (otherNumbers !== '') {
                    lastThree = separatorType + lastThree;
                }
                x1 = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, separatorType) + lastThree;
            } else {
                x1 = x1.replace(/\B(?=(\d{3})+(?!\d))/g, separatorType);
            }
            res = x1 + x2;
        }
        return res;
    };

    const alignmentMap = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end'
    };

    const getBoxStyles = (box, type = 'padding') => {
        if (!box) return {};
        const styles = {};
        if (type === 'padding') {
            styles['--icon-padding'] = `${box.top || '0px'} ${box.right || '0px'} ${box.bottom || '0px'} ${box.left || '0px'}`;
        } else if (type === 'radius') {
            styles['--icon-radius'] = `${box.top || '0px'} ${box.right || '0px'} ${box.bottom || '0px'} ${box.left || '0px'}`;
        }
        return styles;
    };

    const getBorderStyles = border => {
        if (!border) return {};
        return {
            '--icon-border-width': border.width || '0px',
            '--icon-border-style': border.style || 'solid',
            '--icon-border-color': border.color || 'transparent'
        };
    };

    const cssCustomProperties = {
        '--alignment': alignmentMap[alignment] || 'center',
        '--text-align': alignment || 'center',
        '--direction': counterDirection || 'column',
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
        ...getBoxStyles(iconPadding, 'padding'),
        ...getBoxStyles(iconBorderRadius, 'radius'),
        ...getBorderStyles(iconBorder)
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
                                    <span className="gl-counter-number">{formatNumberPreview(endNumber)}</span>
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
