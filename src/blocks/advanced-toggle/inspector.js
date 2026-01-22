/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPalette, SelectControl } from '@wordpress/components';

const Inspector = ({ attributes, setAttributes }) => {
    const { 
        labelLeft, labelRight, badgeLeft, badgeRight, 
        toggleColor, layoutStyle, animationType, alignment 
    } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Layout & Style', 'gl-layout-builder')} initialOpen={true}>
                <SelectControl
                    label={__('Toggle Style', 'gl-layout-builder')}
                    value={layoutStyle}
                    options={[
                        { label: __('Pill Switch (iOS Style)', 'gl-layout-builder'), value: 'pill' },
                        { label: __('Tabs (Side by Side)', 'gl-layout-builder'), value: 'tabs' },
                        { label: __('Minimal (Text Only)', 'gl-layout-builder'), value: 'minimal' }
                    ]}
                    onChange={val => setAttributes({ layoutStyle: val })}
                />
                <SelectControl
                    label={__('Animation Type', 'gl-layout-builder')}
                    value={animationType}
                    options={[
                        { label: __('Smooth Fade', 'gl-layout-builder'), value: 'fade' },
                        { label: __('Slide & Fade', 'gl-layout-builder'), value: 'slide' },
                        { label: __('Scale Up', 'gl-layout-builder'), value: 'scale' }
                    ]}
                    onChange={val => setAttributes({ animationType: val })}
                />
                <SelectControl
                    label={__('Alignment', 'gl-layout-builder')}
                    value={alignment}
                    options={[
                        { label: __('Left', 'gl-layout-builder'), value: 'left' },
                        { label: __('Center', 'gl-layout-builder'), value: 'center' },
                        { label: __('Right', 'gl-layout-builder'), value: 'right' }
                    ]}
                    onChange={val => setAttributes({ alignment: val })}
                />
            </PanelBody>

            <PanelBody title={__('Labels & Badges', 'gl-layout-builder')} initialOpen={true}>
                <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                    <TextControl
                        label={__('Left Label', 'gl-layout-builder')}
                        value={labelLeft}
                        onChange={val => setAttributes({ labelLeft: val })}
                    />
                    <TextControl
                        label={__('Left Badge', 'gl-layout-builder')}
                        value={badgeLeft}
                        onChange={val => setAttributes({ badgeLeft: val })}
                    />
                </div>
                <div>
                    <TextControl
                        label={__('Right Label', 'gl-layout-builder')}
                        value={labelRight}
                        onChange={val => setAttributes({ labelRight: val })}
                    />
                    <TextControl
                        label={__('Right Badge', 'gl-layout-builder')}
                        value={badgeRight}
                        onChange={val => setAttributes({ badgeRight: val })}
                    />
                </div>
            </PanelBody>

            <PanelBody title={__('Colors', 'gl-layout-builder')} initialOpen={false}>
                <p>{__('Active Color', 'gl-layout-builder')}</p>
                <ColorPalette
                    value={toggleColor}
                    onChange={val => setAttributes({ toggleColor: val || '#2196F3' })}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
