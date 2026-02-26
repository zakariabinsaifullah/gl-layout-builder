import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import {
    NativeRangeControl,
    NativeTextControl,
    NativeSelectControl,
    NativeBoxControl,
    NativeBorderBoxControl,
    PanelColorControl
} from '../../components';

const Inspector = ({ attributes, setAttributes }) => {
    const {
        collapsedHeight,
        buttonText,
        buttonTextActive,
        alignment,
        transitionDuration,
        btnColor,
        btnBg,
        btnHoverBg,
        btnHoverColor,
        btnBorder,
        btnPadding,
        unfOverlayColor
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Unfold Settings', 'gl-layout-builder')}>
                    <NativeRangeControl
                        label={__('Collapsed Height (px)', 'gl-layout-builder')}
                        value={collapsedHeight}
                        onChange={value => setAttributes({ collapsedHeight: value })}
                        min={50}
                        max={1000}
                    />
                    <NativeRangeControl
                        label={__('Transition Duration (s)', 'gl-layout-builder')}
                        value={transitionDuration}
                        onChange={value => setAttributes({ transitionDuration: value })}
                        min={0.1}
                        max={2}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody title={__('Button Settings', 'gl-layout-builder')}>
                    <NativeTextControl
                        label={__('Button Text (Folded)', 'gl-layout-builder')}
                        value={buttonText}
                        onChange={value => setAttributes({ buttonText: value })}
                    />
                    <NativeTextControl
                        label={__('Button Text (Expanded)', 'gl-layout-builder')}
                        value={buttonTextActive}
                        onChange={value => setAttributes({ buttonTextActive: value })}
                    />
                    <NativeSelectControl
                        label={__('Alignment', 'gl-layout-builder')}
                        value={alignment}
                        options={[
                            { label: __('Left', 'gl-layout-builder'), value: 'left' },
                            { label: __('Center', 'gl-layout-builder'), value: 'center' },
                            { label: __('Right', 'gl-layout-builder'), value: 'right' }
                        ]}
                        onChange={value => setAttributes({ alignment: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Unfold Overlay', 'gl-layout-builder')}
                    resetAll={() =>
                        setAttributes({
                            unfOverlayColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!unfOverlayColor}
                        label={__('Color', 'gl-layout-builder')}
                        onDeselect={() => {
                            setAttributes({
                                unfOverlayColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Star Color', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    value: unfOverlayColor,
                                    onChange: color => setAttributes({ unfOverlayColor: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>

                <ToolsPanel label={__('Button Styles', 'gl-layout-builder')}>
                    <ToolsPanelItem
                        hasValue={() => !!btnColor || !!btnBg || !!btnHoverColor || !!btnHoverBg}
                        label={__('Colors', 'gl-layout-builder')}
                        onDeselect={() =>
                            setAttributes({ btnColor: undefined, btnBg: undefined, btnHoverBg: undefined, btnHoverColor: undefined })
                        }
                    >
                        <PanelColorControl
                            label={__('Button Colors', 'gl-layout-builder')}
                            colorSettings={[
                                {
                                    label: __('Text Color', 'gl-layout-builder'),
                                    value: btnColor,
                                    onChange: color => setAttributes({ btnColor: color })
                                },
                                {
                                    label: __('Background Color', 'gl-layout-builder'),
                                    value: btnBg,
                                    onChange: color => setAttributes({ btnBg: color })
                                },
                                {
                                    label: __('Hover Text Color', 'gl-layout-builder'),
                                    value: btnHoverColor,
                                    onChange: color => setAttributes({ btnHoverColor: color })
                                },
                                {
                                    label: __('Hover Background Color', 'gl-layout-builder'),
                                    value: btnHoverBg,
                                    onChange: color => setAttributes({ btnHoverBg: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!btnBorder}
                        label={__('Border', 'gl-layout-builder')}
                        onDeselect={() => setAttributes({ btnBorder: undefined })}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'gl-layout-builder')}
                            value={btnBorder}
                            onChange={value => setAttributes({ btnBorder: value })}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!btnPadding}
                        label={__('Padding', 'gl-layout-builder')}
                        onDeselect={() => setAttributes({ btnPadding: undefined })}
                    >
                        <NativeBoxControl
                            label={__('Padding', 'gl-layout-builder')}
                            value={btnPadding}
                            onChange={value => setAttributes({ btnPadding: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
