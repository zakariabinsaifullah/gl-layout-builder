import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import { NativeToggleGroupControl, NativeRangeControl, NativeToggleControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { speed, direction, pauseOnHover, gap, orientation, height } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Marquee Settings', 'gl-layout-builder')}>
                    <NativeToggleGroupControl
                        label={__('Orientation', 'gl-layout-builder')}
                        value={orientation}
                        onChange={value => setAttributes({ orientation: value })}
                        options={[
                            { value: 'horizontal', label: __('Horizontal', 'gl-layout-builder') },
                            { value: 'vertical', label: __('Vertical', 'gl-layout-builder') }
                        ]}
                    />

                    <NativeToggleGroupControl
                        label={__('Direction', 'gl-layout-builder')}
                        value={direction}
                        onChange={value => setAttributes({ direction: value })}
                        options={[
                            {
                                value: 'left',
                                label: orientation === 'vertical' ? __('Up', 'gl-layout-builder') : __('Left', 'gl-layout-builder')
                            },
                            {
                                value: 'right',
                                label: orientation === 'vertical' ? __('Down', 'gl-layout-builder') : __('Right', 'gl-layout-builder')
                            }
                        ]}
                    />

                    <NativeRangeControl
                        label={__('Speed', 'gl-layout-builder')}
                        value={speed}
                        onChange={value => setAttributes({ speed: value })}
                        min={1}
                        max={200}
                        step={1}
                        help={__('Higher values = Slower scrolling', 'gl-layout-builder')}
                    />
                    <NativeRangeControl
                        label={__('Gap between items (px)', 'gl-layout-builder')}
                        value={gap}
                        onChange={value => setAttributes({ gap: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                    {orientation === 'vertical' && (
                        <NativeRangeControl
                            label={__('Vertical Height', 'gl-layout-builder')}
                            value={height || 500}
                            onChange={value => setAttributes({ height: value })}
                            min={200}
                            max={1000}
                            help={__('Set the visible height for vertical scrolling', 'gl-layout-builder')}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Pause on Hover', 'gl-layout-builder')}
                        checked={pauseOnHover}
                        onChange={value => setAttributes({ pauseOnHover: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
