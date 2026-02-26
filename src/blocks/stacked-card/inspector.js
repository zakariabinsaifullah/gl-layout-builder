import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import { NativeRangeControl, NativeSelectControl, NativeUnitControl } from '../../components';

const Inspector = ({ attributes, setAttributes }) => {
    const { topOffset, cardGap, cardHeight, effectStyle, blurStrength, scaleStrength } = attributes;

    return (
        <InspectorControls group="settings">
            <PanelBody title={__('Visual Effects', 'gl-layout-builder')} initialOpen={true}>
                <NativeSelectControl
                    label={__('Effect Style', 'gl-layout-builder')}
                    value={effectStyle}
                    options={[
                        { label: __('Standard Stack', 'gl-layout-builder'), value: 'stack' },
                        { label: __('3D Scale & Blur', 'gl-layout-builder'), value: 'scale-blur' },
                        { label: __('Fan / Deck', 'gl-layout-builder'), value: 'fan' }
                    ]}
                    onChange={value => setAttributes({ effectStyle: value })}
                />

                {effectStyle === 'scale-blur' && (
                    <NativeRangeControl
                        label={__('Blur Strength', 'gl-layout-builder')}
                        value={blurStrength}
                        onChange={value => setAttributes({ blurStrength: value })}
                        min={0}
                        max={20}
                        step={1}
                    />
                )}

                {(effectStyle === 'scale-blur' || effectStyle === 'fan') && (
                    <NativeRangeControl
                        label={__('Scale Strength', 'gl-layout-builder')}
                        help={__('Adjust how much the previous cards scale down.', 'gl-layout-builder')}
                        value={scaleStrength * 100}
                        onChange={value => setAttributes({ scaleStrength: value / 100 })}
                        min={0}
                        max={30}
                        step={1}
                    />
                )}
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
