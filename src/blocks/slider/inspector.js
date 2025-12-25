import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeSelectControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const {
        autoplay,
        loop,
        showArrows,
        showPagination,
        height,

        delay
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Slider Settings', 'gutenlayouts')}>
                    <NativeToggleControl
                        label={__('Loop', 'gutenlayouts')}
                        checked={loop}
                        onChange={value => setAttributes({ loop: value })}
                    />
                    <NativeToggleControl
                        label={__('Autoplay', 'gutenlayouts')}
                        checked={autoplay}
                        onChange={value => setAttributes({ autoplay: value })}
                    />
                    {autoplay && (
                        <NativeRangeControl
                            label={__('Delay (ms)', 'gutenlayouts')}
                            value={delay}
                            onChange={value => setAttributes({ delay: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <NativeToggleControl
                        label={__('Show Arrows', 'gutenlayouts')}
                        checked={showArrows}
                        onChange={value => setAttributes({ showArrows: value })}
                    />
                    <NativeToggleControl
                        label={__('Show Pagination', 'gutenlayouts')}
                        checked={showPagination}
                        onChange={value => setAttributes({ showPagination: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Heights', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            height: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!height}
                        label={__('Height', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                height: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Rating Size', 'gutenlayouts')}
                            value={height}
                            onChange={value => setAttributes({ height: value })}
                            min={0}
                            max={1000}
                            step={1}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
