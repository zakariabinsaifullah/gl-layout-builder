import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { NativeToggleGroupControl, NativeRangeControl, NativeTextControl, NativeResponsiveControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {} = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'gutenlayouts')} initialOpen={true}>
                    settings
                </PanelBody>
            </InspectorControls>
        </>
    );
};

export default Inspector;
