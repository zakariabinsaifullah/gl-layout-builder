/**
 * WordPress Dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { showLabel, label, progress, thickNess, layout, blockStyle, innerEdge } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: `wp-block-gutenlayouts-progressbar layout-${layout || 'line'}`
    });

    const actualThickness = thickNess || 8;
    const radius = 45 - actualThickness / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div {...blockProps}>
            {layout === 'line' ? (
                <>
                    <div className="gutenlayout-bar-content">
                        {showLabel && <RichText.Content tagName="div" className="gutenlayout-bar-title" value={label} />}
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
                            <circle className="circle-bg" cx="50" cy="50" r={radius} fill="transparent" strokeWidth={actualThickness} />
                            <circle
                                className="circle-fill"
                                cx="50"
                                cy="50"
                                r={radius}
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
                            {showLabel && label && <RichText.Content tagName="div" className="circle-label" value={label} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Save;
