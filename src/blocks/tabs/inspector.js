import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    NativeTextControl,
    PanelColorControl,
    NativeUnitControl,
    NativeBoxControl,
    NativeSelectControl,
    NativeBorderBoxControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        tabTitleTag,
        showTabDesc,
        layout,
        alignMent,
        contentAlign,
        verticalAlign,
        // tab nav
        tabNavPadding,
        tabNavBorder,
        tabNavBorderRadius,
        tabNavColors,
        tabNavActiveColors,
        titleSize,
        descSize,
        gap,
        margin,
        // vertical tabs
        verticalGap,
        verticalTabWidth
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gl-layout-builder')} initialOpen={true}>
                    <NativeSelectControl
                        label={__('Tab Title Tag', 'gl-layout-builder')}
                        value={tabTitleTag}
                        onChange={v => {
                            setAttributes({
                                tabTitleTag: v
                            });
                        }}
                        options={[
                            { label: __('H1', 'gl-layout-builder'), value: 'h1' },
                            { label: __('H2', 'gl-layout-builder'), value: 'h2' },
                            { label: __('H3', 'gl-layout-builder'), value: 'h3' },
                            { label: __('H4', 'gl-layout-builder'), value: 'h4' },
                            { label: __('H5', 'gl-layout-builder'), value: 'h5' },
                            { label: __('H6', 'gl-layout-builder'), value: 'h6' },
                            { label: __('P', 'gl-layout-builder'), value: 'p' },
                            { label: __('Span', 'gl-layout-builder'), value: 'span' },
                            { label: __('Div', 'gl-layout-builder'), value: 'div' }
                        ]}
                    />
                    <NativeToggleControl
                        label={__('Show Tab Description', 'gutenlayout')}
                        checked={showTabDesc}
                        onChange={() => setAttributes({ showTabDesc: !showTabDesc })}
                    />
                    <NativeToggleGroupControl
                        label={__('Layout', 'gl-layout-builder')}
                        value={layout}
                        onChange={v => {
                            setAttributes({
                                layout: v
                            });
                        }}
                        options={[
                            { label: __('Horizontal', 'gl-layout-builder'), value: 'nxt_horizontal' },
                            { label: __('Vertical', 'gl-layout-builder'), value: 'nxt_vertical' }
                        ]}
                    />
                    {layout === 'nxt_horizontal' && (
                        <NativeToggleGroupControl
                            label={__('alignMent', 'gl-layout-builder')}
                            value={alignMent}
                            onChange={v => {
                                setAttributes({
                                    alignMent: v
                                });
                            }}
                            options={[
                                { label: __('Left', 'gl-layout-builder'), value: 'flex-start' },
                                { label: __('Center', 'gl-layout-builder'), value: 'center' },
                                { label: __('Right', 'gl-layout-builder'), value: 'flex-end' }
                            ]}
                        />
                    )}

                    <NativeToggleGroupControl
                        label={__('Tabs Content Align', 'gl-layout-builder')}
                        value={contentAlign}
                        onChange={v => {
                            setAttributes({
                                contentAlign: v
                            });
                        }}
                        options={[
                            { label: __('Left', 'gl-layout-builder'), value: 'left' },
                            { label: __('Center', 'gl-layout-builder'), value: 'center' },
                            { label: __('Right', 'gl-layout-builder'), value: 'right' }
                        ]}
                    />

                    {layout === 'nxt_vertical' && (
                        <NativeToggleGroupControl
                            label={__('Vertical Align', 'gl-layout-builder')}
                            value={verticalAlign}
                            onChange={v => {
                                setAttributes({
                                    verticalAlign: v
                                });
                            }}
                            options={[
                                { label: __('Top', 'gl-layout-builder'), value: 'flex-start' },
                                { label: __('Center', 'gl-layout-builder'), value: 'center' },
                                { label: __('Bottom', 'gl-layout-builder'), value: 'flex-end' }
                            ]}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Colors', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            tabNavColors: undefined,
                            tabNavActiveColors: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => tabNavColors && Object.values(tabNavColors).some(v => v !== '')}
                        label={__('Normal', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                tabNavColors: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Normal Colors', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    label: __('Title', 'gl-layout-builder'),
                                    value: tabNavColors?.title,
                                    onChange: color => setAttributes({ tabNavColors: { ...tabNavColors, title: color } })
                                },
                                {
                                    label: __('Description', 'gl-layout-builder'),
                                    value: tabNavColors?.description,
                                    onChange: color => setAttributes({ tabNavColors: { ...tabNavColors, description: color } })
                                },
                                {
                                    label: __('Background', 'gl-layout-builder'),
                                    value: tabNavColors?.bg,
                                    onChange: color => setAttributes({ tabNavColors: { ...tabNavColors, bg: color } })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => tabNavActiveColors && Object.values(tabNavActiveColors).some(v => v !== '')}
                        label={__('Active', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                tabNavActiveColors: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Active Colors', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    label: __('Title', 'gl-layout-builder'),
                                    value: tabNavActiveColors?.title,
                                    onChange: color => setAttributes({ tabNavActiveColors: { ...tabNavActiveColors, title: color } })
                                },
                                {
                                    label: __('Description', 'gl-layout-builder'),
                                    value: tabNavActiveColors?.description,
                                    onChange: color => setAttributes({ tabNavActiveColors: { ...tabNavActiveColors, description: color } })
                                },
                                {
                                    label: __('Border', 'gl-layout-builder'),
                                    value: tabNavActiveColors?.border,
                                    onChange: color => setAttributes({ tabNavActiveColors: { ...tabNavActiveColors, border: color } })
                                },
                                {
                                    label: __('Background', 'gl-layout-builder'),
                                    value: tabNavActiveColors?.bg,
                                    onChange: color => setAttributes({ tabNavActiveColors: { ...tabNavActiveColors, bg: color } })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Typography', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            titleSize: undefined,
                            descSize: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!titleSize}
                        label={__('Title', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                titleSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Title Size', 'gl-layout-builder')}
                            value={titleSize}
                            onChange={value => setAttributes({ titleSize: value })}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>
                    {showTabDesc && (
                        <ToolsPanelItem
                            hasValue={() => !!descSize}
                            label={__('Description', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    descSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Description Size', 'gl-layout-builder')}
                                value={descSize}
                                onChange={value => setAttributes({ descSize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>
                    )}
                </ToolsPanel>
                <ToolsPanel
                    label={__('Border', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            tabNavBorder: undefined,
                            tabNavBorderRadius: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tabNavBorder && Object.values(tabNavBorder).some(v => v !== '')}
                        label={__('Border', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                tabNavBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'gl-layout-builder')}
                            value={tabNavBorder}
                            onChange={v => {
                                setAttributes({
                                    tabNavBorder: v
                                });
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!tabNavBorderRadius && Object.values(tabNavBorderRadius).some(v => v !== '')}
                        label={__('Radius', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                tabNavBorderRadius: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Radius', 'gl-layout-builder')}
                            value={tabNavBorderRadius}
                            onChange={v => {
                                setAttributes({
                                    tabNavBorderRadius: v
                                });
                            }}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Dimensions', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            tabNavPadding: undefined,
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
                            label={__('Gap', 'gl-layout-builder')}
                            value={gap}
                            onChange={v => {
                                setAttributes({
                                    gap: v
                                });
                            }}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!tabNavPadding && Object.values(tabNavPadding).some(v => v !== '')}
                        label={__('Padding', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                tabNavPadding: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Padding', 'gl-layout-builder')}
                            value={tabNavPadding}
                            onChange={v => {
                                setAttributes({
                                    tabNavPadding: v
                                });
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!margin && Object.values(margin).some(v => v !== '')}
                        label={__('Margin', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                margin: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Margin', 'gl-layout-builder')}
                            value={margin}
                            onChange={v => {
                                setAttributes({
                                    margin: v
                                });
                            }}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                {layout === 'nxt_vertical' && (
                    <ToolsPanel
                        label={__('Vertical Tabs', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                verticalGap: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!verticalGap}
                            label={__('Gap', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    verticalGap: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Gap', 'gl-layout-builder')}
                                value={verticalGap}
                                onChange={v => {
                                    setAttributes({
                                        verticalGap: v
                                    });
                                }}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>
                        <ToolsPanelItem
                            hasValue={() => !!verticalTabWidth}
                            label={__('Tab Width', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    verticalTabWidth: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Tab Width', 'gl-layout-builder')}
                                value={verticalTabWidth}
                                onChange={v => {
                                    setAttributes({
                                        verticalTabWidth: v
                                    });
                                }}
                                min={0}
                                max={100}
                                step={1}
                                units={[
                                    { value: 'px', label: 'px' },
                                    { value: '%', label: '%' },
                                    { value: 'vw', label: 'vw' },
                                    { value: 'em', label: 'em' },
                                    { value: 'rem', label: 'rem' }
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
