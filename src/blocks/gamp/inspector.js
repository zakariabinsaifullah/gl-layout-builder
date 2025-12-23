import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
    SelectControl
} from '@wordpress/components';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeSelectControl,
    NativeTextControl,
    NativeBorderBoxControl,
    NativeBoxControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const { address, type, zoom, height, mapBorder, mapRadius } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Gamap', 'gutenlayouts')} initialOpen={true}>
                    <NativeTextControl
                        label={__('Enter a Location', 'embed-blocks')}
                        value={address}
                        onChange={v => setAttributes({ address: v })}
                        placeholder={__('Enter a Location', 'embed-blocks')}
                    />

                    <SelectControl
                        label={__('Map Type', 'embed-blocks')}
                        value={type}
                        options={[
                            { label: __('Roadmap', 'embed-blocks'), value: 'roadmap' },
                            { label: __('Satellite', 'embed-blocks'), value: 'satellite' },
                            { label: __('Terrain', 'embed-blocks'), value: 'terrain' },
                            { label: __('Hybrid', 'embed-blocks'), value: 'hybrid' }
                        ]}
                        onChange={type => {
                            setAttributes({ type });
                        }}
                        __next40pxDefaultSize={true}
                        labelPosition="side"
                    />
                    <NativeRangeControl
                        label={__('Zoom', 'gutenlayouts')}
                        value={zoom}
                        onChange={value => setAttributes({ zoom: value })}
                        min={1}
                        max={20}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Height', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            height: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!height}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                height: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Size', 'gutenlayouts')}
                            value={height}
                            onChange={value => setAttributes({ height: value })}
                            min={0}
                            max={1000}
                            step={1}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Border', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            mapBorder: undefined,
                            mapRadius: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!mapBorder}
                        label={__('Border', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                mapBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'gutenlayouts')}
                            value={mapBorder}
                            onChange={border => {
                                setAttributes({ mapBorder: border });
                            }}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Radius', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            mapRadius: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!mapRadius}
                        label={__('Radius', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                mapRadius: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            value={mapRadius}
                            onChange={value => setAttributes({ mapRadius: value })}
                            min={0}
                            max={1000}
                            step={1}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
