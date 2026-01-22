/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';
import './editor.scss';

const Edit = props => {
    const { attributes, setAttributes } = props;
    const { 
        labelLeft, labelRight, badgeLeft, badgeRight, 
        toggleColor, activeToggle, layoutStyle, alignment 
    } = attributes;

    // Ensure active state
    useEffect(() => {
        if (activeToggle !== 'left' && activeToggle !== 'right') {
            setAttributes({ activeToggle: 'left' });
        }
    }, []);

    const blockProps = useBlockProps({
        className: `gutenlayouts-pro-toggle style-${layoutStyle} align-${alignment}`
    });

    const innerBlocksTemplate = [
        ['gutenlayouts/toggle-content', { type: 'left' }],
        ['gutenlayouts/toggle-content', { type: 'right' }]
    ];

    return (
        <>
            <Inspector {...props} />
            <div {...blockProps} style={{ '--toggle-color': toggleColor }}>
                <div className="toggle-header">
                    {/* Left label */}
                    <div 
                        className={`toggle-label-wrapper left ${activeToggle === 'left' ? 'active' : ''}`}
                        onClick={() => setAttributes({ activeToggle: 'left' })}
                    >
                        {labelLeft}
                        {badgeLeft && <span className="toggle-badge">{badgeLeft}</span>}
                    </div>

                    {/* Switch (Pill) */}
                    {layoutStyle === 'pill' && (
                        <div 
                            className={`toggle-switch ${activeToggle}`}
                            onClick={() => setAttributes({ activeToggle: activeToggle === 'left' ? 'right' : 'left' })}
                            style={{ backgroundColor: activeToggle === 'right' ? toggleColor : '#e0e0e0' }}
                        >
                            <div className="switch-circle"></div>
                        </div>
                    )}

                    {/* Right label */}
                    <div 
                        className={`toggle-label-wrapper right ${activeToggle === 'right' ? 'active' : ''}`}
                        onClick={() => setAttributes({ activeToggle: 'right' })}
                    >
                        {labelRight}
                        {badgeRight && <span className="toggle-badge">{badgeRight}</span>}
                    </div>

                    {/* Sliding Indicator (Tabs) */}
                    {layoutStyle === 'tabs' && (
                        <div className={`tab-indicator ${activeToggle}`} style={{ backgroundColor: toggleColor }}></div>
                    )}
                </div>

                <div className="toggle-content-wrapper">
                    <InnerBlocks 
                        template={innerBlocksTemplate} 
                        templateLock="all" 
                    />
                </div>
            </div>
        </>
    );
};

export default Edit;
