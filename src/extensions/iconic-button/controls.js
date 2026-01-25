
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { allowedBlocks } from './allowed-blocks';
import { NativeIconPicker } from '../../components';
import { getSVGString } from '../../helpers';

const gutenlayoutsBtnIconPanel = createHigherOrderComponent(BlockEdit => {
    return props => {
        // Check if the block is in the allowed list
        if (!allowedBlocks.includes(props.name)) {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const {
            gutenlayoutsBtnIconName,
            gutenlayoutsBtnIconType,
            gutenlayoutsBtnCustomSvg,
            gutenlayoutsBtnIconPosition,
            gutenlayoutsBtnIconSize,
            gutenlayoutsBtnIconGap
        } = attributes;

        return (
            <>
                <BlockEdit key="edit" {...props} />
                <InspectorControls>
                    <PanelBody title={__('Icon Settings', 'gl-layout-builder')} initialOpen={false}>
                        <NativeIconPicker
                            onIconSelect={(iconName, iconType, iconObj) => {
                                // Important: We save the icon SVG string so it works with CSS masks in PHP
                                const svgString = getSVGString(iconObj);
                                setAttributes({
                                    gutenlayoutsBtnIconName: iconName,
                                    gutenlayoutsBtnIconType: iconType,
                                    gutenlayoutsBtnCustomSvg: svgString
                                });
                            }}
                            onCustomSvgInsert={({ customSvgCode, iconType }) => {
                                setAttributes({
                                    gutenlayoutsBtnCustomSvg: customSvgCode,
                                    gutenlayoutsBtnIconType: iconType,
                                    gutenlayoutsBtnIconName: undefined
                                });
                            }}
                            iconName={gutenlayoutsBtnIconName}
                            customSvgCode={gutenlayoutsBtnCustomSvg}
                            iconSize={24}
                        />
                        <SelectControl
                            label={__('Icon Position', 'gl-layout-builder')}
                            value={gutenlayoutsBtnIconPosition}
                            options={[
                                { label: __('Before', 'gl-layout-builder'), value: 'gutenlayouts-icon-before' },
                                { label: __('After', 'gl-layout-builder'), value: '' }
                            ]}
                            onChange={value => setAttributes({ gutenlayoutsBtnIconPosition: value })}
                        />
                        <RangeControl
                            label={__('Icon Size', 'gl-layout-builder')}
                            value={gutenlayoutsBtnIconSize}
                            onChange={value => setAttributes({ gutenlayoutsBtnIconSize: value })}
                            min={0.2}
                            max={5}
                            step={0.1}
                            __next40pxDefaultSize
                        />
                        <RangeControl
                            label={__('Icon Gap', 'gl-layout-builder')}
                            value={gutenlayoutsBtnIconGap}
                            onChange={value => setAttributes({ gutenlayoutsBtnIconGap: value })}
                            min={0}
                            max={50}
                            step={1}
                            __next40pxDefaultSize
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withGutenlayoutsBtnIconPanel');

addFilter('editor.BlockEdit', 'gutenlayouts/iconic-button-panel', gutenlayoutsBtnIconPanel);