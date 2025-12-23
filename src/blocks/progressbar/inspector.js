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
    NativeSelectControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const {
        progress,
        thickNess,

        paColor,
        labelSize,
        pinColor,
        labelColor,
        perceColor,
        perceSize,
        progressSize,
        layout
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={true}>
                    <NativeRangeControl
                        label={__('Progress', 'gutenlayout')}
                        value={progress}
                        onChange={v =>
                            setAttributes({
                                progress: v
                            })
                        }
                        min={0}
                        max={100}
                    />
                </PanelBody>
                <PanelBody title={__('Thickness', 'gutenlayouts')} initialOpen={false}>
                    <NativeRangeControl
                        label={__('Thickness', 'gutenlayouts')}
                        value={thickNess}
                        onChange={value => setAttributes({ thickNess: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                </PanelBody>
                <PanelBody title={__('Width', 'gutenlayouts')} initialOpen={false}>
                    <NativeRangeControl
                        value={progressSize}
                        onChange={value => setAttributes({ progressSize: value })}
                        min={1}
                        max={2000}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('label', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            labelSize: undefined,
                            paColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!labelSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                labelSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Font Size', 'gutenlayouts')}
                            value={labelSize}
                            onChange={value => setAttributes({ labelSize: value })}
                            min={0}
                            max={100}
                            step={1}
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
                            label={__('Label', 'gutenlayouts')}
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
                    label={__('Percentange', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            perceSize: undefined,
                            perceColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!perceSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                perceSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Font Size', 'gutenlayouts')}
                            value={perceSize}
                            onChange={value => setAttributes({ perceSize: value })}
                            min={0}
                            max={100}
                            step={1}
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
                    label={__('Progress Bar', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            pinColor: undefined,
                            paColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!paColor}
                        label={__('Active Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                paColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: paColor,
                                    onChange: color => setAttributes({ paColor: color }),
                                    label: __('Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!pinColor}
                        label={__('In active Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                pinColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: pinColor,
                                    onChange: color => setAttributes({ pinColor: color }),
                                    label: __('Color', 'gutenlayouts')
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
