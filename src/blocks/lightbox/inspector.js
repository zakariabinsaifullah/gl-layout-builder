import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalDimensionControl as DimensionControl // eslint-disable-line
} from '@wordpress/components';

import {
    NativeToggleControl,
    NativeSelectControl,
    NativeToggleGroupControl,
    NativeTextControl,
    PanelColorControl,
    NativeRangeControl,
    NativeBoxControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        lightboxType,
        contentType,
        youtubeUrl,
        vimeoUrl,
        googleMapUrl,
        buttonText,
        enableHeading,
        enableSubHeading,
        buttonHeadingText,
        showPosterIcon,
        alignment,
        lighteffColor,
        svgSize,
        iconPadding,
        icoHvBgColor,
        iconColor,
        titleColor,
        titleSize
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Lightbox Settings', 'gutenlayouts')} initialOpen={true}>
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
                            { label: __('Google Map', 'gutenlayouts'), value: 'googleMap' }
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
                    {contentType === 'googleMap' && (
                        <NativeTextControl
                            label={__('Google Map Embed URL', 'gutenlayouts')}
                            value={googleMapUrl}
                            onChange={value => setAttributes({ googleMapUrl: value })}
                            placeholder="https://www.google.com/maps/embed?pb=..."
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
                        label={__(' Icon Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                iconColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            colorSettings={[
                                {
                                    value: iconColor,
                                    onChange: color => setAttributes({ iconColor: color }),
                                    label: __('Icon Color', 'gutenlayouts')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => icoHvBgColor}
                        label={__(' Hover Bg Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                icoHvBgColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            colorSettings={[
                                {
                                    value: icoHvBgColor,
                                    onChange: color => setAttributes({ icoHvBgColor: color }),
                                    label: __('Hover Background Color', 'gutenlayouts')
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
