/**
 * WordPress Dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { 
        labelLeft, labelRight, badgeLeft, badgeRight, 
        toggleColor, activeToggle, layoutStyle, animationType, alignment 
    } = attributes;

    const activeState = activeToggle || 'left';

    const blockProps = useBlockProps.save({
        className: `gutenlayouts-pro-toggle style-${layoutStyle} align-${alignment}`,
        'data-animation': animationType,
        'data-active': activeState
    });

    return (
        <div {...blockProps} style={{ '--toggle-color': toggleColor }}>
            <div className="toggle-header">
                {/* Left */}
                <div className={`toggle-label-wrapper left ${activeState === 'left' ? 'active' : ''}`} data-id="left">
                    {labelLeft}
                    {badgeLeft && <span className="toggle-badge">{badgeLeft}</span>}
                </div>

                {/* Pill Switch */}
                {layoutStyle === 'pill' && (
                    <div className={`toggle-switch ${activeState}`}>
                        <div className="switch-circle"></div>
                    </div>
                )}

                {/* Right */}
                <div className={`toggle-label-wrapper right ${activeState === 'right' ? 'active' : ''}`} data-id="right">
                    {labelRight}
                    {badgeRight && <span className="toggle-badge">{badgeRight}</span>}
                </div>

                {/* Tab Indicator */}
                {layoutStyle === 'tabs' && (
                    <div className={`tab-indicator ${activeState}`}></div>
                )}
            </div>

            <div className="toggle-content-wrapper">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
