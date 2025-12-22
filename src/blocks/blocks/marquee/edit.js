import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { arrowLeft, arrowRight } from '@wordpress/icons';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { speed, direction, pauseOnHover, gap } = attributes;

    const blockProps = useBlockProps({
        className: 'marquee-container'
    });

    const ALLOWED_BLOCKS = [
        'core/image',
        'core/paragraph',
        'core/heading',
        'core/columns',
        'core/column',
        'core/group',
        'core/social-links',
        'core/buttons'
    ];

    const TEMPLATE = [
        [
            'core/heading',
            {
                level: 3,
                textAlign: 'center',
                style: { color: { background: '#f2f2fa' } },
                content: 'This is a Marquee block. Add your scrolling content here!'
            }
        ]
    ];

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'gutenlayouts-marquee-items',
            style: {
                gap: `${gap}px`
            }
        },
        {
            // allowedBlocks: ALLOWED_BLOCKS, Allow all blocks
            template: TEMPLATE,
            orientation: 'horizontal'
        }
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Marquee Settings', 'gutenlayouts')}>
                    <ToggleGroupControl
                        label={__('Direction', 'gutenlayouts')}
                        value={direction}
                        isBlock
                        onChange={newDirection => setAttributes({ direction: newDirection })}
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                    >
                        <ToggleGroupControlOptionIcon icon={arrowLeft} value="left" label={__('Right to Left', 'gutenlayouts')} />
                        <ToggleGroupControlOptionIcon icon={arrowRight} value="right" label={__('Left to Right', 'gutenlayouts')} />
                    </ToggleGroupControl>

                    <RangeControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        label={__('Speed', 'gutenlayouts')}
                        value={speed}
                        onChange={newSpeed => setAttributes({ speed: newSpeed })}
                        min={5}
                        max={200}
                        help={__('Higher values = Slower scrolling', 'gutenlayouts')}
                    />

                    <RangeControl
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                        label={__('Gap between items (px)', 'gutenlayouts')}
                        value={gap}
                        onChange={newGap => setAttributes({ gap: newGap })}
                        min={0}
                        max={100}
                        initialPosition={40}
                    />

                    <div
                        className="gutenlayouts-marquee-controls__pause-on-hover"
                        style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}
                    >
                        <h3
                            style={{
                                flex: 1,
                                margin: 0
                            }}
                        >
                            {__('Pause on Hover', 'gutenlayouts')}
                        </h3>
                        <ToggleControl
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                            checked={pauseOnHover}
                            onChange={() => setAttributes({ pauseOnHover: !pauseOnHover })}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
}
