import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { allowedBlocks } from './allowed-blocks';
import { NativeIconPicker, NativeToggleControl, NativeToggleGroupControl, NativeUnitControl } from '../../components';
import { getSVGString } from '../../helpers';

// Track panel open state
let initialOpen = false;

const gutenlayoutsBtnIconPanel = createHigherOrderComponent(BlockEdit => {
    return props => {
        // Check if the block is in the allowed list
        if (!allowedBlocks.includes(props.name)) {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, isSelected } = props;
        const { gllbEnableIconicBtn, gllbBtnIconName, gllbBtnCustomSvg, gllbBtnIconPosition, gllbBtnIconSize, gllbBtnIconGap } = attributes;

        return (
            <>
                <BlockEdit key="edit" {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title={__('Icon Settings', 'gl-layout-builder')} initialOpen={initialOpen}>
                            <NativeToggleControl
                                label={__('Add Icon to Button', 'gl-layout-builder')}
                                checked={gllbEnableIconicBtn}
                                onChange={() => {
                                    setAttributes({ gllbEnableIconicBtn: !gllbEnableIconicBtn });
                                    initialOpen = true;
                                }}
                            />
                            {gllbEnableIconicBtn && (
                                <>
                                    <NativeIconPicker
                                        onIconSelect={(iconName, iconType, iconObj) => {
                                            // Important: We save the icon SVG string so it works with CSS masks in PHP
                                            const svgString = getSVGString(iconObj);
                                            setAttributes({
                                                gllbBtnIcon: svgString,
                                                gllbBtnIconName: iconName,
                                                gllbBtnIconType: iconType,
                                                gllbBtnCustomSvg: undefined
                                            });
                                        }}
                                        onCustomSvgInsert={({ customSvgCode, iconType }) => {
                                            setAttributes({
                                                gllbBtnCustomSvg: customSvgCode,
                                                gllbBtnIconType: iconType,
                                                gllbBtnIconName: undefined,
                                                gllbBtnIcon: undefined
                                            });
                                        }}
                                        iconName={gllbBtnIconName}
                                        customSvgCode={gllbBtnCustomSvg}
                                        iconSize={24}
                                    />
                                    <NativeToggleGroupControl
                                        label={__('Position', 'gl-layout-builder')}
                                        value={gllbBtnIconPosition}
                                        options={[
                                            { label: __('Before', 'gl-layout-builder'), value: 'gutenlayouts-icon-before' },
                                            { label: __('After', 'gl-layout-builder'), value: '' }
                                        ]}
                                        onChange={value => setAttributes({ gllbBtnIconPosition: value })}
                                    />
                                    <NativeUnitControl
                                        label={__('Size', 'gl-layout-builder')}
                                        value={gllbBtnIconSize}
                                        onChange={value => setAttributes({ gllbBtnIconSize: value })}
                                    />
                                    <NativeUnitControl
                                        label={__('Gap', 'gl-layout-builder')}
                                        value={gllbBtnIconGap}
                                        onChange={value => setAttributes({ gllbBtnIconGap: value })}
                                    />
                                </>
                            )}
                        </PanelBody>
                    </InspectorControls>
                )}
            </>
        );
    };
}, 'withGutenlayoutsBtnIconPanel');

addFilter('editor.BlockEdit', 'gutenlayouts/iconic-button-panel', gutenlayoutsBtnIconPanel);
