import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import { NativeSelectControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const { thickNess, layout } = attributes;

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
            </InspectorControls>
            <InspectorControls group="styles"></InspectorControls>
        </>
    );
};

export default Inspector;
