import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalBorderBoxControl as BorderBoxControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem,
    SelectControl // eslint-disable-line
} from '@wordpress/components';
import { select } from '@wordpress/data';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeSelectControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const { thickNess, layout, strokeWidth } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={true}>
                    <NativeSelectControl
                        label={__('Select Layout', 'text-domain')}
                        value={layout}
                        options={[
                            { label: 'Line', value: 'line' },
                            { label: 'Circle', value: 'circle' }
                        ]}
                        onChange={value => setAttributes({ layout: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Thickness', 'gutenlayouts')} initialOpen={false}>
                    <NativeRangeControl
                        label={__('Thickness', 'gutenlayouts')}
                        value={thickNess}
                        onChange={value => setAttributes({ thickNess: value })}
                        min={1}
                        max={100}
                        step={1}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles"></InspectorControls>
        </>
    );
};

export default Inspector;
