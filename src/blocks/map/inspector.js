import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeToggleGroupControl, NativeRangeControl, NativeTextControl, NativeResponsiveControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { resMode, address, type, zoom, height } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gl-layout-builder')} initialOpen={true}>
                    <NativeTextControl
                        label={__('Enter a Location', 'gl-layout-builder')}
                        value={address}
                        onChange={v => setAttributes({ address: v })}
                        placeholder={__('Enter a Location', 'gl-layout-builder')}
                    />
                </PanelBody>
                <PanelBody title={__('Options', 'gl-layout-builder')} initialOpen={false}>
                    <NativeToggleGroupControl
                        label={__('Map Type', 'gl-layout-builder')}
                        value={type}
                        onChange={type => {
                            setAttributes({ type });
                        }}
                        options={[
                            { label: __('Roadmap', 'gl-layout-builder'), value: 'roadmap' },
                            { label: __('Satellite', 'gl-layout-builder'), value: 'satellite' }
                        ]}
                    />
                    <NativeRangeControl
                        label={__('Zoom', 'gl-layout-builder')}
                        value={zoom}
                        onChange={value => setAttributes({ zoom: value })}
                        min={1}
                        max={20}
                        step={1}
                    />
                    <NativeResponsiveControl label={__('Height', 'gl-layout-builder')} props={props}>
                        <NativeRangeControl
                            value={height[resMode]}
                            onChange={value => setAttributes({ height: { ...height, [resMode]: value } })}
                            min={100}
                            max={1000}
                            step={10}
                        />
                    </NativeResponsiveControl>
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
