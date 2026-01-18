import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem,
    Button
} from '@wordpress/components';

import {
    NativeToggleControl,
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
        enableAnimation,
        iconBgColor,
        animationType
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Lightbox Settings', 'gutenlayouts')} initialOpen={true}>
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
                        label={__('Alignment', 'gutenlayouts')}
                        value={alignment}
                        onChange={value => setAttributes({ alignment: value })}
                        options={[
                            { value: '', label: __('Left', 'gutenlayouts') },
                            { value: 'center', label: __('Center', 'gutenlayouts') },
                            { value: 'right', label: __('Right', 'gutenlayouts') }
                        ]}
                    />
                    <NativeSelectControl
                        label={__('Content Source', 'gutenlayouts')}
                        value={contentType}
                        options={[
                            { label: __('YouTube', 'gutenlayouts'), value: 'youtube' },
                            { label: __('Vimeo', 'gutenlayouts'), value: 'vimeo' },
                            { label: __('Any Content', 'gutenlayouts'), value: 'content' }
                        ]}
                        onChange={value => setAttributes({ contentType: value })}
                    />
                    {contentType === 'youtube' && (
                        <NativeTextControl
                            label={__('YouTube URL', 'gutenlayouts')}
                            value={youtubeUrl}
                            onChange={value => setAttributes({ youtubeUrl: value })}
                            placeholder="https://www.youtube.com/watch?v=OiXmadpgyHo"
                        />
                    )}
                    {contentType === 'vimeo' && (
                        <NativeTextControl
                            label={__('Vimeo URL', 'gutenlayouts')}
                            value={vimeoUrl}
                            onChange={value => setAttributes({ vimeoUrl: value })}
                            placeholder="https://vimeo.com/VIDEO_ID"
                        />
                    )}
                    {contentType === 'content' && (
                        <Button variant="secondary" onClick={onOpenContentModal}>
                            {__('Edit Popup Content', 'gutenlayouts')}
                        </Button>
                    )}
                </PanelBody>
                <PanelBody title={__('Lightbox Effect', 'gutenlayouts')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Animation Effect', 'gutenlayouts')}
                        checked={enableAnimation}
                        onChange={value => setAttributes({ enableAnimation: value })}
                    />
                    {enableAnimation && (
                        <NativeSelectControl
                            label={__('Animation Type', 'gutenlayouts')}
                            value={animationType}
                            options={[
                                { label: __('Pulse (Default)', 'gutenlayouts'), value: 'pulse' },
                                { label: __('Radar', 'gutenlayouts'), value: 'radar' },
                                { label: __('Heartbeat', 'gutenlayouts'), value: 'heartbeat' },
                                { label: __('Glow', 'gutenlayouts'), value: 'glow' },
                                { label: __('Rotate', 'gutenlayouts'), value: 'rotate' }
                            ]}
                            onChange={value => setAttributes({ animationType: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Effect Color', 'gutenlayouts')}
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
                                    label: __('Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Icon', 'gutenlayouts')}
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
                        label={__('Svg Size', 'gutenlayouts')}
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
                        label={__(' Colors', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                iconColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: iconColor,
                                    onChange: color => setAttributes({ iconColor: color }),
                                    label: __('Color', 'gutenlayouts')
                                },
                                {
                                    value: iconBgColor,
                                    onChange: color => setAttributes({ iconBgColor: color }),
                                    label: __('Background', 'gutenlayouts')
                                },
                                {
                                    value: icoHvBgColor,
                                    onChange: color => setAttributes({ icoHvBgColor: color }),
                                    label: __('Hover Background', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        label={__('Icon Padding', 'gutenlayouts')}
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
                            label={__('Icon Padding', 'gutenlayouts')}
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
