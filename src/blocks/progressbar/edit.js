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
    const { attributes, setAttributes, isSelected, context } = props;
    const { label, progress, labelSize, labelColor, pinColor, paColor, perceColor, perceSize } = attributes;
    const layout = context['gutenlayouts/layout'] || 'line';
    const cssCustomProperties = {
        ...(labelSize && { '--title-size': `${labelSize}px` }),
        ...(labelColor && { '--title-color': labelColor }),
        ...(pinColor && { '--inactive-color': pinColor }),
        ...(paColor && { '--active-color': paColor }),
        ...(perceSize && { '--percentange-size': `${perceSize}px` }),
        ...(perceColor && { '--percentange-color': perceColor })
    };
    /**
     * Block Props
     */
    useEffect(() => {
        if (layout !== attributes.layout) {
            setAttributes({ layout });
        }
    }, [layout]);
    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: `wp-block-gutenlayouts-progressbar layout-${layout}`
    });

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                {layout === 'line' ? (
                    <>
                        <div className="gutenlayout-bar-content">
                            <RichText
                                tagName="div"
                                className="gutenlayout-bar-title"
                                value={label}
                                onChange={value => setAttributes({ label: value })}
                            />
                            <div className="gutenlayout-bar-percent">{progress}%</div>
                        </div>

                        <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </>
                ) : (
                    <div className="gutenlayout-circle-container">
                        <div className="circle-svg-wrapper">
                            <svg width="120" height="120" viewBox="0 0 100 100">
                                <circle className="circle-bg" cx="50" cy="50" r={radius} strokeWidth="8" fill="transparent" />
                                <circle
                                    className="circle-fill"
                                    cx="50"
                                    cy="50"
                                    r={radius}
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="circle-content">
                                <div className="circle-percentage">{progress}%</div>
                                <RichText
                                    tagName="div"
                                    className="circle-label"
                                    value={label}
                                    onChange={value => setAttributes({ label: value })}
                                    placeholder="Label..."
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Edit;
