/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { allowedBlocks } from './allowed-blocks';

const gutenlayoutsLightboxPanel = createHigherOrderComponent(BlockEdit => {
    return props => {
        // Check if the block is in the allowed list
        if (!allowedBlocks.includes(props.name)) {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const { gutenlayoutsEnableLightbox } = attributes;

        return (
            <>
                <BlockEdit key="edit" {...props} />
                <InspectorControls>
                    <PanelBody title={__('Lightbox', 'gl-layout-builder')} initialOpen={false}>
                        <ToggleControl
                            label={__('Enable Lightbox', 'gl-layout-builder')}
                            checked={gutenlayoutsEnableLightbox}
                            onChange={() => setAttributes({ gutenlayoutsEnableLightbox: !gutenlayoutsEnableLightbox })}
                            help={__('Lightbox works only in frontend.', 'gl-layout-builder')}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withGutenlayoutsLightboxPanel');

addFilter('editor.BlockEdit', 'gutenlayouts/lightbox-panel', gutenlayoutsLightboxPanel);