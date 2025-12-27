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
    const { autoplay, loop, showArrows, showPagination, paginationSize, paginationColor, height, delay, navColor, navbgColor, navSize } =
        attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Slider Settings', 'gutenlayouts')}>
                    <NativeToggleControl
                        label={__('Loop', 'gutenlayouts')}
                        checked={loop}
                        onChange={value => setAttributes({ loop: value })}
                    />
                    <NativeToggleControl
                        label={__('Autoplay', 'gutenlayouts')}
                        checked={autoplay}
                        onChange={value => setAttributes({ autoplay: value })}
                    />
                    {autoplay && (
                        <NativeRangeControl
                            label={__('Delay (ms)', 'gutenlayouts')}
                            value={delay}
                            onChange={value => setAttributes({ delay: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Show Arrows', 'gutenlayouts')}
                        checked={showArrows}
                        onChange={value => setAttributes({ showArrows: value })}
                    />
                    <NativeToggleControl
                        label={__('Show Pagination', 'gutenlayouts')}
                        checked={showPagination}
                        onChange={value => setAttributes({ showPagination: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Heights', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            height: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!height}
                        label={__('Height', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                height: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Rating Size', 'gutenlayouts')}
                            value={height}
                            onChange={value => setAttributes({ height: value })}
                            min={0}
                            max={1000}
                            step={1}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Pagination', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            paginationSize: undefined,
                            paginationColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!paginationSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                paginationSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Rating Size', 'gutenlayouts')}
                            value={paginationSize}
                            onChange={value => setAttributes({ paginationSize: value })}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!paginationColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                paginationColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: paginationColor,
                                    onChange: color => setAttributes({ paginationColor: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Navigation', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            navbgColor: undefined,
                            navColor: undefined // duplicate navColor সরিয়ে navSize যোগ করলাম
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!navSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                navSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Navigation Size', 'gutenlayouts')}
                            value={navSize}
                            onChange={value => setAttributes({ navSize: value })}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!navColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                navColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Navigation Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: navColor,
                                    onChange: color => setAttributes({ navColor: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!navbgColor}
                        label={__('Background Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                navbgColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Navigation Background Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: navbgColor,
                                    onChange: color => setAttributes({ navbgColor: color })
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
