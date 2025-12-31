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
    NativeResponsiveControl,
    NativeUnitControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        resMode,
        heightType,
        heights,
        columns,
        gaps,
        autoplay,
        loop,
        showArrows,
        navType,
        showPagination,
        pnSize,
        paSize,
        pRadius,
        paRadius,
        pgap,
        paginationColor,
        delay,
        navColor,
        navbgColor,
        navBorderColor,
        navSize,
        navIconSize,
        navRadius,
        navEdgeGap
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('General', 'gutenlayouts')} initialOpen={true}>
                    <NativeToggleGroupControl
                        label={__('Height Type', 'gutenlayouts')}
                        value={heightType}
                        onChange={value => setAttributes({ heightType: value })}
                        options={[
                            { label: __('Adaptive', 'gutenlayouts'), value: 'adaptive' },
                            { label: __('Fixed', 'gutenlayouts'), value: 'fixed' }
                        ]}
                    />
                    {heightType === 'fixed' && (
                        <NativeResponsiveControl label={__('Height', 'gutenlayouts')} props={props}>
                            <NativeUnitControl
                                label={__('Slider Height', 'gutenlayouts')}
                                value={heights[resMode]}
                                onChange={value => {
                                    const newHeights = { ...heights, [resMode]: value };
                                    setAttributes({ heights: newHeights });
                                }}
                            />
                        </NativeResponsiveControl>
                    )}
                </PanelBody>
                <PanelBody title={__('Slider Options', 'gutenlayouts')} initialOpen={false}>
                    <NativeResponsiveControl label={__('Columns', 'gutenlayouts')} props={props}>
                        <NativeRangeControl
                            value={columns[resMode]}
                            onChange={value => {
                                const newColumns = { ...columns, [resMode]: value };
                                setAttributes({ columns: newColumns });
                            }}
                            min={1}
                            max={6}
                            step={1}
                        />
                    </NativeResponsiveControl>
                    <NativeResponsiveControl label={__('Gaps', 'gutenlayouts')} props={props}>
                        <NativeRangeControl
                            value={gaps[resMode]}
                            onChange={value => {
                                const newGaps = { ...gaps, [resMode]: value };
                                setAttributes({ gaps: newGaps });
                            }}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </NativeResponsiveControl>
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
                    {showArrows && (
                        <NativeToggleGroupControl
                            label={__('Navigation Type', 'gutenlayouts')}
                            value={navType}
                            onChange={value => setAttributes({ navType: value })}
                            options={[
                                { label: __('Inside', 'gutenlayouts'), value: 'inside' },
                                { label: __('Outside', 'gutenlayouts'), value: 'outside' }
                            ]}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Pagination', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            pnSize: undefined,
                            paSize: undefined,
                            pRadius: undefined,
                            paRadius: undefined,
                            paginationColor: undefined,
                            pgap: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!pgap}
                        label={__('Gap', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                pgap: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Vertical Gap', 'gutenlayouts')}
                            value={pgap}
                            onChange={value => setAttributes({ pgap: value })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!pnSize || !!paSize}
                        label={__('Sizes', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                pnSize: undefined,
                                paSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Normal Size', 'gutenlayouts')}
                            value={pnSize}
                            onChange={value => setAttributes({ pnSize: value })}
                        />
                        <NativeUnitControl
                            label={__('Active Size', 'gutenlayouts')}
                            value={paSize}
                            onChange={value => setAttributes({ paSize: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!pRadius || !!paRadius}
                        label={__('Radius', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                pRadius: undefined,
                                paRadius: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Normal Radius', 'gutenlayouts')}
                            value={pRadius}
                            onChange={value => setAttributes({ pRadius: value })}
                        />
                        <NativeUnitControl
                            label={__('Active Radius', 'gutenlayouts')}
                            value={paRadius}
                            onChange={value => setAttributes({ paRadius: value })}
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
                {showArrows && (
                    <ToolsPanel
                        label={__('Navigation', 'gutenlayouts')}
                        resetAll={() =>
                            setAttributes({
                                navbgColor: undefined,
                                navColor: undefined,
                                navEdgeGap: undefined,
                                navSize: undefined,
                                navIconSize: undefined,
                                navBorderColor: undefined,
                                navRadius: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!navEdgeGap}
                            label={__('Edge Gap', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    navEdgeGap: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Edge Gap', 'gutenlayouts')}
                                value={navEdgeGap}
                                onChange={value => setAttributes({ navEdgeGap: value })}
                            />
                        </ToolsPanelItem>
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
                            <NativeUnitControl
                                label={__('Size', 'gutenlayouts')}
                                value={navSize}
                                onChange={value => setAttributes({ navSize: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => !!navIconSize}
                            label={__('Icon Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    navIconSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Icon Size', 'gutenlayouts')}
                                value={navIconSize}
                                onChange={value => setAttributes({ navIconSize: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => !!navRadius}
                            label={__('Radius', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    navRadius: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Radius', 'gutenlayouts')}
                                value={navRadius}
                                onChange={value => setAttributes({ navRadius: value })}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => !!navColor || !!navbgColor || !!navBorderColor}
                            label={__('Colors', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    navColor: undefined,
                                    navbgColor: undefined,
                                    navBorderColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Colors', 'gutenlayouts')}
                                colorSettings={[
                                    {
                                        label: __('Color', 'gutenlayouts'),
                                        value: navColor,
                                        onChange: color => setAttributes({ navColor: color })
                                    },
                                    {
                                        label: __('Background', 'gutenlayouts'),
                                        value: navbgColor,
                                        onChange: color => setAttributes({ navbgColor: color })
                                    },
                                    {
                                        label: __('Border Color', 'gutenlayouts'),
                                        value: navBorderColor,
                                        onChange: color => setAttributes({ navBorderColor: color })
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>
        </>
    );
};

export default Inspector;
