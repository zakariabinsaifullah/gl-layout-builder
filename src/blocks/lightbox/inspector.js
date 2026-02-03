import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem,
    Button
} from '@wordpress/components';

import {
    NativeSelectControl,
    NativeToggleGroupControl,
    NativeTextControl,
    PanelColorControl,
    NativeRangeControl,
    NativeBoxControl,
    NativeIconPicker
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, onOpenContentModal } = props;
    const {
        contentType,
        youtubeUrl,
        vimeoUrl,
        alignment,
        lighteffColor,
        svgSize,
        iconPadding,
        icoHvBgColor,
        iconColor,
        iconName,
        iconSize,
        customSvgCode,
        strokeWidth,
        iconBgColor,
        animationType,
        animationDuration
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Lightbox Settings', 'gl-layout-builder')} initialOpen={true}>
                    <NativeIconPicker
                        onIconSelect={(iconName, iconType) => {
                            setAttributes({ iconName, iconType, customSvgCode: undefined });
                        }}
                        onCustomSvgInsert={({ customSvgCode, iconType, strokeWidth }) => {
                            setAttributes({ customSvgCode, iconType, strokeWidth });
                        }}
                        iconName={iconName}
                        customSvgCode={customSvgCode}
                        iconSize={iconSize}
                        strokeWidth={strokeWidth}
                    />
                    <NativeToggleGroupControl
                        label={__('Alignment', 'gl-layout-builder')}
                        value={alignment}
                        onChange={value => setAttributes({ alignment: value })}
                        options={[
                            { value: '', label: __('Left', 'gl-layout-builder') },
                            { value: 'center', label: __('Center', 'gl-layout-builder') },
                            { value: 'right', label: __('Right', 'gl-layout-builder') }
                        ]}
                    />
                    <NativeSelectControl
                        label={__('Content Type', 'gl-layout-builder')}
                        value={contentType}
                        options={[
                            { label: __('YouTube', 'gl-layout-builder'), value: 'youtube' },
                            { label: __('Vimeo', 'gl-layout-builder'), value: 'vimeo' },
                            { label: __('Any Content', 'gl-layout-builder'), value: 'content' }
                        ]}
                        onChange={value => setAttributes({ contentType: value })}
                    />
                    {contentType === 'youtube' && (
                        <NativeTextControl
                            label={__('YouTube URL', 'gl-layout-builder')}
                            value={youtubeUrl}
                            onChange={value => setAttributes({ youtubeUrl: value })}
                            placeholder="https://www.youtube.com/watch?v=OiXmadpgyHo"
                        />
                    )}
                    {contentType === 'vimeo' && (
                        <NativeTextControl
                            label={__('Vimeo URL', 'gl-layout-builder')}
                            value={vimeoUrl}
                            onChange={value => setAttributes({ vimeoUrl: value })}
                            placeholder="https://vimeo.com/VIDEO_ID"
                        />
                    )}
                    {contentType === 'content' && (
                        <Button variant="secondary" onClick={onOpenContentModal}>
                            {__('Add Popup Content', 'gl-layout-builder')}
                        </Button>
                    )}
                    <NativeSelectControl
                        label={__('Button Effect', 'gl-layout-builder')}
                        value={animationType}
                        options={[
                            { label: __('None', 'gl-layout-builder'), value: '' },
                            { label: __('Pulse', 'gl-layout-builder'), value: 'pulseEffect' },
                            { label: __('Radar', 'gl-layout-builder'), value: 'radarEffect' },
                            { label: __('Heartbeat', 'gl-layout-builder'), value: 'heartbeatEffect' },
                            { label: __('Glow', 'gl-layout-builder'), value: 'glowEffect' },
                            { label: __('Rotate', 'gl-layout-builder'), value: 'rotateEffect' }
                        ]}
                        onChange={value => setAttributes({ animationType: value })}
                    />
                    {animationType !== '' && (
                        <NativeRangeControl
                            label={__('Animation Duration', 'gl-layout-builder')}
                            value={animationDuration}
                            onChange={value => setAttributes({ animationDuration: value })}
                            min={1}
                            max={10}
                            step={0.1}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Effect Color', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            lighteffColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!lighteffColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                lighteffColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            colorSettings={[
                                {
                                    value: lighteffColor,
                                    onChange: color => setAttributes({ lighteffColor: color }),
                                    label: __('Color', 'gl-layout-builder')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Icon', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            svgSize: undefined,
                            icoHvBgColor: undefined,
                            iconColor: undefined,
                            iconPadding: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!svgSize}
                        label={__('Svg Size', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                svgSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            value={svgSize}
                            onChange={value => setAttributes({ svgSize: value })}
                            min={10}
                            max={200}
                            step={1}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => iconColor}
                        label={__('Colors', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                iconColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    value: iconColor,
                                    onChange: color => setAttributes({ iconColor: color }),
                                    label: __('Color', 'gl-layout-builder')
                                },
                                {
                                    value: iconBgColor,
                                    onChange: color => setAttributes({ iconBgColor: color }),
                                    label: __('Background', 'gl-layout-builder')
                                },
                                {
                                    value: icoHvBgColor,
                                    onChange: color => setAttributes({ icoHvBgColor: color }),
                                    label: __('Hover Background', 'gl-layout-builder')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Icon Padding', 'gl-layout-builder')}
                        hasValue={() => !!(iconPadding && (iconPadding.top || iconPadding.right || iconPadding.bottom || iconPadding.left))}
                        onDeselect={() =>
                            setAttributes({
                                iconPadding: {
                                    top: undefined,
                                    right: undefined,
                                    bottom: undefined,
                                    left: undefined
                                }
                            })
                        }
                    >
                        <NativeBoxControl
                            label={__('Icon Padding', 'gl-layout-builder')}
                            value={iconPadding}
                            onChange={value => setAttributes({ iconPadding: value })}
                            allowReset={true}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
