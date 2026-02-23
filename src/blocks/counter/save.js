/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { RenderIcon } from '../../helpers';

const Save = props => {
    const { attributes } = props;
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
        duration,
        blockStyle,
        useSeparator,
        separatorType,
        isIndianSystem,
        decimalPlaces
    } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: classnames(uniqueId)
    });

    return (
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
                                        src={
                                            iconTypeImage.sizes && iconTypeImage.sizes[imageRes]
                                                ? iconTypeImage.sizes[imageRes].url
                                                : iconTypeImage.url
                                        }
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
                                <span 
                                    className="gl-counter-number" 
                                    data-start={startNumber || 0} 
                                    data-target={endNumber || 0} 
                                    data-duration={duration || 3.2}
                                    data-separator={useSeparator ? (separatorType || ',') : ''}
                                    data-indian={isIndianSystem ? 'true' : 'false'}
                                    data-decimal={decimalPlaces || 0}
                                >
                                    {endNumber || 0}
                                </span>
                                {hideSuffix && <span className="gl-counter-suffix">{counterSuffix}</span>}
                            </div>
                        )}

                        {hideTitle && <RichText.Content tagName={titleTag} className="gl-counter-title" value={titleText} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Save;
