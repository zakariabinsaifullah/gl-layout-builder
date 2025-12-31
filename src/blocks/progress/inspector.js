import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeSelectControl,
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
                <PanelBody title={__('General', 'gutenlayouts')} initialOpen={true}>
                    <NativeToggleGroupControl
                        label={__('Progress Type', 'gutenlayouts')}
                        value={layout}
                        onChange={value => setAttributes({ layout: value })}
                        options={[
                            { label: __('Line', 'gutenlayouts'), value: 'line' },
                            { label: __('Circle', 'gutenlayouts'), value: 'circle' }
                        ]}
                    />

                    {layout === 'circle' && (
                        <NativeToggleGroupControl
                            label={__('Inner Edge', 'gutenlayouts')}
                            value={innerEdge}
                            onChange={value => setAttributes({ innerEdge: value })}
                            options={[
                                { label: __('Sharp', 'gutenlayouts'), value: 'square' },
                                { label: __('Rounded', 'gutenlayouts'), value: 'round' }
                            ]}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Show Label', 'gutenlayouts')}
                        checked={showLabel}
                        onChange={value => setAttributes({ showLabel: value })}
                    />
                    {showLabel && (
                        <NativeTextControl
                            label={__('Label', 'gutenlayouts')}
                            value={label}
                            onChange={value => setAttributes({ label: value })}
                        />
                    )}

                    <NativeRangeControl
                        label={__('Value', 'gutenlayouts')}
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
                        label={__('Thickness', 'gutenlayouts')}
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
                    label={__('Gap', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            gap: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!gap}
                        label={__('Gap', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                gap: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Label Gap', 'gutenlayouts')}
                            value={gap}
                            onChange={value => setAttributes({ gap: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Label', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            labelSize: undefined,
                            paColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!labelSize}
                        label={__('Font Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                labelSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'gutenlayouts')}
                            value={labelSize}
                            onChange={value => setAttributes({ labelSize: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!labelColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                labelColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: labelColor,
                                    onChange: color => setAttributes({ labelColor: color }),
                                    label: __('Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel
                    label={__('Value', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            perceSize: undefined,
                            perceColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!perceSize}
                        label={__('Font Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                perceSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'gutenlayouts')}
                            value={perceSize}
                            onChange={value => setAttributes({ perceSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!perceColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                perceColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: perceColor,
                                    onChange: color => setAttributes({ perceColor: color }),
                                    label: __('Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Progress', 'gutenlayouts')}
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
                            label={__('Border Radius', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    radius: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Border Radius', 'gutenlayouts')}
                                value={radius}
                                onChange={value => setAttributes({ radius: value })}
                            />
                        </ToolsPanelItem>
                    )}

                    {layout === 'circle' && (
                        <ToolsPanelItem
                            hasValue={() => !!width}
                            label={__('Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    radius: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Circle Size', 'gutenlayouts')}
                                value={width}
                                onChange={value => setAttributes({ width: value })}
                            />
                        </ToolsPanelItem>
                    )}

                    <ToolsPanelItem
                        hasValue={() => !!paColor || !!pinColor}
                        label={__('Colors', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                paColor: undefined,
                                pinColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: pinColor,
                                    onChange: color => setAttributes({ pinColor: color }),
                                    label: __('Normal Color', 'gutenlayouts')
                                },
                                {
                                    value: paColor,
                                    onChange: color => setAttributes({ paColor: color }),
                                    label: __('Active Color', 'gutenlayouts')
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
