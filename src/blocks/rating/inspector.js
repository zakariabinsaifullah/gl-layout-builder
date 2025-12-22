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
    const { enableRating, totalRating, rating, nrPos, ratingSize, ratingNsize, ratingColor, nuRatColor, alignment } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={true}>
                    <NativeToggleControl
                        label={__('Show Numeric Rating', 'gutenlayouts')}
                        checked={enableRating}
                        onChange={value => setAttributes({ enableRating: value })}
                    />
                    {enableRating && (
                        <NativeSelectControl
                            label={__('Position', 'gutenlayouts')}
                            value={nrPos}
                            options={[
                                { label: __('Left', 'gutenlayouts'), value: 'nr_left' },
                                { label: __('Right', 'gutenlayouts'), value: 'nr_right' },
                                { label: __('Top', 'gutenlayouts'), value: 'nr_top' },
                                { label: __('Bottom', 'gutenlayouts'), value: 'nr_bottom' }
                            ]}
                            onChange={value => setAttributes({ nrPos: value })}
                        />
                    )}
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
                </PanelBody>
                <PanelBody title={__('Rating', 'gutenlayouts')} initialOpen={false}>
                    <NativeRangeControl
                        label={__('Total Rating', 'gutenlayouts')}
                        value={totalRating}
                        onChange={value => setAttributes({ totalRating: value })}
                        min={1}
                        max={10}
                        step={1}
                    />
                    <NativeRangeControl
                        label={__('Rating Value', 'gutenlayouts')}
                        value={rating}
                        onChange={value => setAttributes({ rating: value })}
                        min={0}
                        max={totalRating}
                        step={0.1}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Rating', 'gutenlayouts')}
                    resetAll={() =>
                        setAttributes({
                            ratingSize: undefined,
                            ratingColor: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!ratingSize}
                        label={__('Size', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                ratingSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeRangeControl
                            label={__('Rating Size', 'gutenlayouts')}
                            value={ratingSize}
                            onChange={value => setAttributes({ ratingSize: value })}
                            min={0}
                            max={100}
                            step={1}
                        />
                    </ToolsPanelItem>

                    <ToolsPanelItem
                        hasValue={() => !!ratingColor}
                        label={__('Color', 'gutenlayouts')}
                        onDeselect={() => {
                            setAttributes({
                                ratingColor: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Star Color', 'gutenlayouts')}
                            colorSettings={[
                                {
                                    value: ratingColor,
                                    onChange: color => setAttributes({ ratingColor: color })
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                {enableRating && (
                    <ToolsPanel
                        label={__('Numeric Rating', 'gutenlayouts')}
                        resetAll={() =>
                            setAttributes({
                                ratingNsize: undefined,
                                nuRatColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!ratingNsize}
                            label={__('Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    ratingNsize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gutenlayouts')}
                                value={ratingNsize}
                                onChange={value => setAttributes({ ratingNsize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!nuRatColor}
                            label={__('Color', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    nuRatColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Text Color', 'gutenlayouts')}
                                colorSettings={[
                                    {
                                        value: nuRatColor,
                                        onChange: color => setAttributes({ nuRatColor: color }),
                                        label: __('Color', 'gutenlayouts')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>
        </>
    );
};

export default Inspector;
