/**
 * WordPress dependencies
 */

import { addFilter } from '@wordpress/hooks';
import { allowedBlocks } from './allowed-blocks';

/**
 * Add customCSS attribute to block settings
 *
 * @param {Object} settings Block settings
 * @param {string} name Block name
 * @return {Object} Modified settings
 */

function gutenlayoutsLightboxAttribute(settings, name) {
    // Check if the block is in the allowed list
    if (!allowedBlocks.includes(name)) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            gllbEnableLightbox: {
                type: 'boolean',
                default: false
            }
        }
    };
}

addFilter('blocks.registerBlockType', 'gutenlayouts/lightbox-attribute', gutenlayoutsLightboxAttribute);
