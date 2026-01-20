/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Add visibility attributes to all blocks.
 *
 * @param {Object} settings Block settings.
 * @return {Object} Modified block settings.
 */
function addVisibilityAttributes(settings) {
    if (settings.name.includes('core/') || settings.name.includes('gutenlayouts/')) {
        settings.attributes = {
            ...settings.attributes,
            hideOnDesktop: {
                type: 'boolean',
                default: false
            },
            hideOnTablet: {
                type: 'boolean',
                default: false
            },
            hideOnMobile: {
                type: 'boolean',
                default: false
            }
        };
    }
    return settings;
}

addFilter('blocks.registerBlockType', 'gutenlayouts/add-visibility-attributes', addVisibilityAttributes);

/**
 * Add visibility controls to the Inspector.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} Modified block edit component.
 */
const withVisibilityControls = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { attributes, setAttributes, isSelected } = props;
        const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && (
                    <InspectorControls>
                        <PanelBody title={__('Responsive Visibility', 'gl-layout-builder')} initialOpen={false}>
                            <ToggleControl
                                label={__('Hide on Desktop', 'gl-layout-builder')}
                                checked={!!hideOnDesktop}
                                onChange={value => setAttributes({ hideOnDesktop: value })}
                                help={__('Hide this block on desktop devices.', 'gl-layout-builder')}
                            />
                            <ToggleControl
                                label={__('Hide on Tablet', 'gl-layout-builder')}
                                checked={!!hideOnTablet}
                                onChange={value => setAttributes({ hideOnTablet: value })}
                                help={__('Hide this block on tablet devices.', 'gl-layout-builder')}
                            />
                            <ToggleControl
                                label={__('Hide on Mobile', 'gl-layout-builder')}
                                checked={!!hideOnMobile}
                                onChange={value => setAttributes({ hideOnMobile: value })}
                                help={__('Hide this block on mobile devices.', 'gl-layout-builder')}
                            />
                        </PanelBody>
                    </InspectorControls>
                )}
            </Fragment>
        );
    };
}, 'withVisibilityControls');

addFilter('editor.BlockEdit', 'gutenlayouts/with-visibility-controls', withVisibilityControls);

/**
 * Add visibility classes to the block in the frontend.
 *
 * @param {Object} props       Block properties.
 * @param {Object} blockType   Block type definition.
 * @param {Object} attributes  Block attributes.
 * @return {Object} Modified block properties.
 */
function addVisibilityClasses(props, blockType, attributes) {
    const { hideOnDesktop, hideOnTablet, hideOnMobile } = attributes;

    if (!hideOnDesktop && !hideOnTablet && !hideOnMobile) {
        return props;
    }

    const classes = [];

    if (hideOnDesktop) {
        classes.push('gutenlayouts-hide-desktop');
    }
    if (hideOnTablet) {
        classes.push('gutenlayouts-hide-tablet');
    }
    if (hideOnMobile) {
        classes.push('gutenlayouts-hide-mobile');
    }

    if (classes.length > 0) {
        props.className = (props.className || '') + ' ' + classes.join(' ');
        props.className = props.className.trim();
    }

    return props;
}

addFilter('blocks.getSaveContent.extraProps', 'gutenlayouts/add-visibility-classes', addVisibilityClasses);
