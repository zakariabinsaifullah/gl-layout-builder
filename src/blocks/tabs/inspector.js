import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeResponsiveControl,
    NativeToggleControl,
    NativeSelectControl,
    NativeTextControl,
    PanelColorControl,
    NativeUnitControl,
    NativeBoxControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        tabTitles,
        showTabDesc,
        layout,
        enableScrollTab,
        alignMent,
        tabsWidth,
        titleColor,
        titleSize,
        descColor,
        descSize,
        contentAlign,
        tabContentColor,
        tabContentBg,
        verticalAlign,
        contentPadding
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={true}>
                    <NativeToggleGroupControl
                        label={__('Layout', 'gutenlayouts')}
                        value={layout}
                        onChange={v => {
                            setAttributes({
                                layout: v
                            });
                        }}
                        options={[
                            { label: __('Horizontal', 'gutenlayouts'), value: 'nxt_horizontal' },
                            { label: __('Vertical', 'gutenlayouts'), value: 'nxt_vertical' }
                        ]}
                    />
                    {layout === 'nxt_horizontal' && (
                        <NativeToggleGroupControl
                            label={__('alignMent', 'gutenlayouts')}
                            value={alignMent}
                            onChange={v => {
                                setAttributes({
                                    alignMent: v
                                });
                            }}
                            options={[
                                { label: __('Left', 'gutenlayouts'), value: 'flex-start' },
                                { label: __('Center', 'gutenlayouts'), value: 'center' },
                                { label: __('Right', 'gutenlayouts'), value: 'flex-end' }
                            ]}
                        />
                    )}

                    <NativeToggleGroupControl
                        label={__('Tabs Content Align', 'gutenlayouts')}
                        value={contentAlign}
                        onChange={v => {
                            setAttributes({
                                contentAlign: v
                            });
                        }}
                        options={[
                            { label: __('Left', 'gutenlayouts'), value: 'left' },
                            { label: __('Center', 'gutenlayouts'), value: 'center' },
                            { label: __('Right', 'gutenlayouts'), value: 'right' }
                        ]}
                    />

                    {layout === 'nxt_vertical' && (
                        <NativeToggleGroupControl
                            label={__('Vertical Align', 'gutenlayouts')}
                            value={verticalAlign}
                            onChange={v => {
                                setAttributes({
                                    verticalAlign: v
                                });
                            }}
                            options={[
                                { label: __('Top', 'gutenlayouts'), value: 'flex-start' },
                                { label: __('Center', 'gutenlayouts'), value: 'center' },
                                { label: __('Bottom', 'gutenlayouts'), value: 'flex-end' }
                            ]}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Tabs', 'gutenlayout')} initialOpen={false}>
                    {layout === 'nxt_vertical' && (
                        <>
                            <NativeRangeControl
                                label={__('Tabs Width', 'gutenlayout')}
                                value={tabsWidth}
                                onChange={v =>
                                    setAttributes({
                                        tabsWidth: v
                                    })
                                }
                                onClickReset={() =>
                                    setAttributes({
                                        tabsWidth: 25
                                    })
                                }
                            />
                        </>
                    )}

                    <NativeToggleControl
                        label={__('Show Tab Description', 'gutenlayout')}
                        checked={showTabDesc}
                        onChange={() => setAttributes({ showTabDesc: !showTabDesc })}
                    />
                    {tabTitles &&
                        tabTitles.length > 0 &&
                        tabTitles.map((item, index) => {
                            return (
                                <div key={index}>
                                    <NativeTextControl
                                        label={__('Title', 'gutenlayout')}
                                        value={item?.title}
                                        onChange={v => {
                                            const newItems = [...tabTitles];
                                            newItems[index].title = v;
                                            setAttributes({
                                                tabTitles: newItems
                                            });
                                        }}
                                    />
                                    {showTabDesc && (
                                        <NativeTextControl
                                            label={__('Description', 'gutenlayout')}
                                            value={item?.description}
                                            onChange={v => {
                                                const newItems = [...tabTitles];
                                                newItems[index].description = v;
                                                setAttributes({
                                                    tabTitles: newItems
                                                });
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Tab Content', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            tabContentColor: undefined,
                            tabContentBg: undefined,
                            contentPadding: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tabContentColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                tabContentColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Background Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: tabContentColor,
                                    onChange: color => setAttributes({ tabContentColor: color })
                                }
                            ]}
                        />
                        <PanelColorControl
                            label={__('Hover Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: tabContentBg,
                                    onChange: color => setAttributes({ tabContentBg: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!contentPadding}
                        label={__('Padding', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                contentPadding: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Padding', 'gutenlayouts')}
                            value={contentPadding}
                            onChange={v => setAttributes({ contentPadding: v })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Title', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            titleColor: undefined,
                            titleSize: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!titleSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                titleSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'gutenlayouts')}
                            value={titleSize}
                            onChange={value => setAttributes({ titleSize: value })}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!titleColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                titleColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Text Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: titleColor,
                                    onChange: color => setAttributes({ titleColor: color }),
                                    label: __('Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                {showTabDesc && (
                    <ToolsPanel
                        label={__('Description', 'gutenlayouts')}
                        resetAll={() =>
                            setAttributes({
                                descColor: undefined,
                                descSize: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!descSize}
                            label={__('Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    descSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Font Size', 'gutenlayouts')}
                                value={descSize}
                                onChange={value => setAttributes({ descSize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!descColor}
                            label={__('Color', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    descColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Text Color', 'gutenlayouts')}
                                colorSettings={[
                                    {
                                        value: descColor,
                                        onChange: color => setAttributes({ descColor: color }),
                                        label: __('Color', 'gutenlayouts')
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
