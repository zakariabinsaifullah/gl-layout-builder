/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const gllbEntranceAnimationPanel = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { attributes, setAttributes, isSelected } = props;
        const { gllbEntranceAnimation, gllbEntranceDuration, gllbEntranceDelay, gllbEntranceRepeat, gllbEntranceLoop } = attributes;

        return (
            <>
                <BlockEdit key="edit" {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title={__('Entrance Animation', 'gl-layout-builder')} initialOpen={false}>
                            <SelectControl
                                label={__('Select Animation Type', 'gl-layout-builder')}
                                value={gllbEntranceAnimation}
                                onChange={value => setAttributes({ gllbEntranceAnimation: value })}
                                __nextHasNoMarginBottom
                            >
                                <option value="">{__('None', 'gl-layout-builder')}</option>
                                <option value="bounce">{__('Bounce', 'gl-layout-builder')}</option>
                                <option value="flash">{__('Flash', 'gl-layout-builder')}</option>
                                <option value="pulse">{__('Pulse', 'gl-layout-builder')}</option>
                                <option value="rubberBand">{__('Rubber Band', 'gl-layout-builder')}</option>
                                <option value="shakeX">{__('Shake X', 'gl-layout-builder')}</option>
                                <option value="shakeY">{__('Shake Y', 'gl-layout-builder')}</option>
                                <option value="headShake">{__('Head Shake', 'gl-layout-builder')}</option>
                                <option value="swing">{__('Swing', 'gl-layout-builder')}</option>
                                <option value="tada">{__('Tada', 'gl-layout-builder')}</option>
                                <option value="wobble">{__('Wobble', 'gl-layout-builder')}</option>
                                <option value="jello">{__('Jello', 'gl-layout-builder')}</option>
                                <option value="heartBeat">{__('Heart Beat', 'gl-layout-builder')}</option>
                                <optgroup label={__('Fade', 'gl-layout-builder')}>
                                    <option value="fadeIn">{__('Fade In', 'gl-layout-builder')}</option>
                                    <option value="fadeInUp">{__('Fade In Up', 'gl-layout-builder')}</option>
                                    <option value="fadeInDown">{__('Fade In Down', 'gl-layout-builder')}</option>
                                    <option value="fadeInLeft">{__('Fade In Left', 'gl-layout-builder')}</option>
                                    <option value="fadeInRight">{__('Fade In Right', 'gl-layout-builder')}</option>
                                </optgroup>
                                <optgroup label={__('Zoom', 'gl-layout-builder')}>
                                    <option value="zoomIn">{__('Zoom In', 'gl-layout-builder')}</option>
                                    <option value="zoomInDown">{__('Zoom In Down', 'gl-layout-builder')}</option>
                                    <option value="zoomInLeft">{__('Zoom In Left', 'gl-layout-builder')}</option>
                                    <option value="zoomInRight">{__('Zoom In Right', 'gl-layout-builder')}</option>
                                    <option value="zoomInUp">{__('Zoom In Up', 'gl-layout-builder')}</option>
                                </optgroup>
                                <optgroup label={__('Slide', 'gl-layout-builder')}>
                                    <option value="slideInDown">{__('Slide In Down', 'gl-layout-builder')}</option>
                                    <option value="slideInLeft">{__('Slide In Left', 'gl-layout-builder')}</option>
                                    <option value="slideInRight">{__('Slide In Right', 'gl-layout-builder')}</option>
                                    <option value="slideInUp">{__('Slide In Up', 'gl-layout-builder')}</option>
                                </optgroup>
                                <optgroup label={__('Flip', 'gl-layout-builder')}>
                                    <option value="flipInX">{__('Flip In X', 'gl-layout-builder')}</option>
                                    <option value="flipInY">{__('Flip In Y', 'gl-layout-builder')}</option>
                                </optgroup>
                                <optgroup label={__('Light Speed', 'gl-layout-builder')}>
                                    <option value="lightSpeedInRight">{__('Light Speed In Right', 'gl-layout-builder')}</option>
                                    <option value="lightSpeedInLeft">{__('Light Speed In Left', 'gl-layout-builder')}</option>
                                </optgroup>
                                <optgroup label={__('Rotate', 'gl-layout-builder')}>
                                    <option value="rotateIn">{__('Rotate In', 'gl-layout-builder')}</option>
                                    <option value="rotateInDownLeft">{__('Rotate In Down Left', 'gl-layout-builder')}</option>
                                    <option value="rotateInDownRight">{__('Rotate In Down Right', 'gl-layout-builder')}</option>
                                    <option value="rotateInUpLeft">{__('Rotate In Up Left', 'gl-layout-builder')}</option>
                                    <option value="rotateInUpRight">{__('Rotate In Up Right', 'gl-layout-builder')}</option>
                                </optgroup>
                            </SelectControl>
                            {gllbEntranceAnimation && (
                                <>
                                    <RangeControl
                                        label={__('Duration (s)', 'gl-layout-builder')}
                                        value={gllbEntranceDuration}
                                        onChange={val => setAttributes({ gllbEntranceDuration: val })}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        help={__('Effect takes action on the frontend only.', 'gl-layout-builder')}
                                    />
                                    <RangeControl
                                        label={__('Delay (s)', 'gl-layout-builder')}
                                        value={gllbEntranceDelay}
                                        onChange={val => setAttributes({ gllbEntranceDelay: val })}
                                        min={0}
                                        max={10}
                                        step={0.1}
                                        help={__('Effect takes action on the frontend only.', 'gl-layout-builder')}
                                    />
                                    <ToggleControl
                                        label={__('Animation on both Scrolls', 'gl-layout-builder')}
                                        checked={gllbEntranceRepeat}
                                        onChange={() => setAttributes({ gllbEntranceRepeat: !gllbEntranceRepeat })}
                                        help={__('Effect takes action on the frontend only.', 'gl-layout-builder')}
                                    />
                                    <ToggleControl
                                        label={__('Enable Loop Animation', 'gl-layout-builder')}
                                        checked={gllbEntranceLoop}
                                        onChange={() => setAttributes({ gllbEntranceLoop: !gllbEntranceLoop })}
                                        help={__('Effect takes action on the frontend only.', 'gl-layout-builder')}
                                    />
                                </>
                            )}
                        </PanelBody>
                    </InspectorControls>
                )}
            </>
        );
    };
}, 'withGllbEntranceAnimationPanel');

addFilter('editor.BlockEdit', 'gllb/gllbEntranceAnimationPanel', gllbEntranceAnimationPanel);