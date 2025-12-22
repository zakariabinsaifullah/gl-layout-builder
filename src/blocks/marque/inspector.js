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
                <PanelBody title={__('Marquee Settings', 'gutenlayouts')}>
                    <NativeToggleGroupControl
                        label={__('Orientation', 'gutenlayouts')}
                        value={orientation}
                        onChange={value => setAttributes({ orientation: value })}
                        options={[
                            { value: 'horizontal', label: __('Horizontal', 'gutenlayouts') },
                            { value: 'vertical', label: __('Vertical', 'gutenlayouts') }
                        ]}
                    />

                    <NativeToggleGroupControl
                        label={__('Direction', 'gutenlayouts')}
                        value={direction}
                        onChange={value => setAttributes({ direction: value })}
                        options={[
                            {
                                value: 'left',
                                label: orientation === 'vertical' ? __('Up', 'gutenlayouts') : __('Left', 'gutenlayouts')
                            },
                            {
                                value: 'right',
                                label: orientation === 'vertical' ? __('Down', 'gutenlayouts') : __('Right', 'gutenlayouts')
                            }
                        ]}
                    />

                    <NativeRangeControl
                        label={__('Speed', 'gutenlayouts')}
                        value={speed}
                        onChange={value => setAttributes({ speed: value })}
                        min={1}
                        max={200}
                        step={1}
                        help={__('Higher values = Slower scrolling', 'gutenlayouts')}
                    />
                    <NativeRangeControl
                        label={__('Gap between items (px)', 'gutenlayouts')}
                        value={gap}
                        onChange={value => setAttributes({ gap: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                    {orientation === 'vertical' && (
                        <NativeRangeControl
                            label={__('Vertical Height', 'gutenlayouts')}
                            value={height || 500}
                            onChange={value => setAttributes({ height: value })}
                            min={200}
                            max={1000}
                            help={__('Set the visible height for vertical scrolling', 'gutenlayouts')}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Pause on Hover', 'gutenlayouts')}
                        checked={pauseOnHover}
                        onChange={value => setAttributes({ pauseOnHover: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
