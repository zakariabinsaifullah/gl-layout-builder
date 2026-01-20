import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeTextControl,
    NativeUnitControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        showLabel,
        label,
        progress,
        thickNess,
        paColor,
        labelSize,
        pinColor,
        labelColor,
        perceColor,
        perceSize,
        layout,
        gap,
        radius,
        innerEdge,
        width
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('General', 'gl-layout-builder')} initialOpen={true}>
                    <NativeToggleGroupControl
                        label={__('Progress Type', 'gl-layout-builder')}
                        value={layout}
                        onChange={value => setAttributes({ layout: value })}
                        options={[
                            { label: __('Line', 'gl-layout-builder'), value: 'line' },
                            { label: __('Circle', 'gl-layout-builder'), value: 'circle' }
                        ]}
                    />

                    {layout === 'circle' && (
                        <NativeToggleGroupControl
                            label={__('Inner Edge', 'gl-layout-builder')}
                            value={innerEdge}
                            onChange={value => setAttributes({ innerEdge: value })}
                            options={[
                                { label: __('Sharp', 'gl-layout-builder'), value: 'square' },
                                { label: __('Rounded', 'gl-layout-builder'), value: 'round' }
                            ]}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Settings', 'gl-layout-builder')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Show Label', 'gl-layout-builder')}
                        checked={showLabel}
                        onChange={value => setAttributes({ showLabel: value })}
                    />
                    {showLabel && (
                        <NativeTextControl
                            label={__('Label', 'gl-layout-builder')}
                            value={label}
                            onChange={value => setAttributes({ label: value })}
                        />
                    )}

                    <NativeRangeControl
                        label={__('Value', 'gl-layout-builder')}
                        value={progress}
                        onChange={v =>
                            setAttributes({
                                progress: v
                            })
                        }
                        min={0}
                        max={100}
                    />
                    <NativeRangeControl
                        label={__('Thickness', 'gl-layout-builder')}
                        value={thickNess}
                        onChange={value => setAttributes({ thickNess: value })}
                        min={1}
                        max={50}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Gap', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            gap: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!gap}
                        label={__('Gap', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                gap: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Label Gap', 'gl-layout-builder')}
                            value={gap}
                            onChange={value => setAttributes({ gap: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Label', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            labelSize: undefined,
                            paColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!labelSize}
                        label={__('Font Size', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                labelSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'gl-layout-builder')}
                            value={labelSize}
                            onChange={value => setAttributes({ labelSize: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!labelColor}
                        label={__('Color', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                labelColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    value: labelColor,
                                    onChange: color => setAttributes({ labelColor: color }),
                                    label: __('Color', 'gl-layout-builder')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Value', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            perceSize: undefined,
                            perceColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!perceSize}
                        label={__('Font Size', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                perceSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'gl-layout-builder')}
                            value={perceSize}
                            onChange={value => setAttributes({ perceSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!perceColor}
                        label={__('Color', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                perceColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    value: perceColor,
                                    onChange: color => setAttributes({ perceColor: color }),
                                    label: __('Color', 'gl-layout-builder')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Progress', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            pinColor: undefined,
                            paColor: undefined
                        })
                    }
                >
                    {layout !== 'circle' && (
                        <ToolsPanelItem
                            hasValue={() => !!radius}
                            label={__('Border Radius', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    radius: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Border Radius', 'gl-layout-builder')}
                                value={radius}
                                onChange={value => setAttributes({ radius: value })}
                            />
                        </ToolsPanelItem>
                    )}

                    {layout === 'circle' && (
                        <ToolsPanelItem
                            hasValue={() => !!width}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    radius: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Circle Size', 'gl-layout-builder')}
                                value={width}
                                onChange={value => setAttributes({ width: value })}
                            />
                        </ToolsPanelItem>
                    )}

                    <ToolsPanelItem
                        hasValue={() => !!paColor || !!pinColor}
                        label={__('Colors', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                paColor: undefined,
                                pinColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    value: pinColor,
                                    onChange: color => setAttributes({ pinColor: color }),
                                    label: __('Normal Color', 'gl-layout-builder')
                                },
                                {
                                    value: paColor,
                                    onChange: color => setAttributes({ paColor: color }),
                                    label: __('Active Color', 'gl-layout-builder')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
