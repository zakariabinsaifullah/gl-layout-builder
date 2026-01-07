/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';

const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const {
        layout,
        showLabel,
        label,
        progress,
        labelSize,
        labelColor,
        pinColor,
        paColor,
        perceColor,
        perceSize,
        thickNess,
        gap,
        radius,
        innerEdge,
        width
    } = attributes;

    const cssCustomProperties = {
        ...(labelSize && { '--title-size': `${labelSize}` }),
        ...(labelColor && { '--title-color': labelColor }),
        ...(pinColor && { '--inactive-color': pinColor }),
        ...(paColor && { '--active-color': paColor }),
        ...(perceSize && { '--percentange-size': `${perceSize}` }),
        ...(perceColor && { '--percentange-color': perceColor }),
        ...(thickNess && { '--thickness': thickNess }),
        ...(gap && { '--gap': `${gap}` }),
        ...(radius && { '--radius': `${radius}` }),
        ...(width && { '--csize': `${width}` })
    };
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [label, progress, labelSize, labelColor, pinColor, paColor, perceColor, perceSize, thickNess, gap, width, radius]);

    // block props
    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: `wp-block-gutenlayouts-progressbar layout-${layout}`
    });

    const actualThickness = thickNess || 8;
    const radiusValue = 45 - actualThickness / 2;
    const circumference = 2 * Math.PI * radiusValue;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                {layout === 'line' ? (
                    <>
                        <div className="gutenlayout-bar-content">
                            {showLabel && (
                                <RichText
                                    tagName="div"
                                    className="gutenlayout-bar-title"
                                    value={label}
                                    onChange={value => setAttributes({ label: value })}
                                    placeholder={__('Enter label...', 'gutenlayouts')}
                                />
                            )}
                            <div className="gutenlayout-bar-percent">{progress}%</div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </>
                ) : (
                    <div className="gutenlayout-circle-container">
                        <div className="circle-svg-wrapper">
                            <svg viewBox="0 0 100 100">
                                <circle
                                    className="circle-bg"
                                    cx="50"
                                    cy="50"
                                    r={radiusValue}
                                    fill="transparent"
                                    strokeWidth={actualThickness}
                                />
                                <circle
                                    className="circle-fill"
                                    cx="50"
                                    cy="50"
                                    r={radiusValue}
                                    fill="transparent"
                                    strokeWidth={actualThickness}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap={innerEdge}
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="circle-content">
                                <div className="circle-percentage">{progress}%</div>
                                {showLabel && (
                                    <RichText
                                        tagName="div"
                                        className="circle-label"
                                        value={label}
                                        onChange={value => setAttributes({ label: value })}
                                        placeholder={__('Enter label...', 'gutenlayouts')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Edit;
