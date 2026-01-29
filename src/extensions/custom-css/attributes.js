import { addFilter } from '@wordpress/hooks';

/**
 * Add customCSS attribute to block settings
 *
 * @param {Object} settings Block settings
 * @return {Object} Modified settings
 */
function gutenlayoutsAddAttributes(settings) {
    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            gllbDynamicClass: {
                type: 'string'
            },
            gllbCustomCSS: {
                type: 'string'
            }
        }
    };
}
addFilter('blocks.registerBlockType', 'gutenlayouts/add-custom-css-attributes', gutenlayoutsAddAttributes);
