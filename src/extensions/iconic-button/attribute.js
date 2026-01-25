/**
 * WordPress dependencies
 */

import { addFilter } from '@wordpress/hooks';
import { allowedBlocks } from './allowed-blocks';

/**
 * Add Iconic Button attribute to block settings
 *
 * @param {Object} settings Block settings
 * @param {string} name Block name
 * @return {Object} Modified settings
 */

function gutenlayoutsBtnIconAttribute(settings, name) {
    // Check if the block is in the allowed list
    if (!allowedBlocks.includes(name)) {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            gutenlayoutsBtnIconName: {
                type: 'string',
                default: ''
            },
            gutenlayoutsBtnIconType: {
                type: 'string',
                default: ''
            },
            gutenlayoutsBtnCustomSvg: {
                type: 'string',
                default: ''
            },
            gutenlayoutsBtnIconPosition: {
                type: 'string',
                default: ''
            },
            gutenlayoutsBtnIconSize: {
                type: 'number',
                default: 1
            },
            gutenlayoutsBtnIconGap: {
                type: 'number'
            }
        }
    };
}

addFilter('blocks.registerBlockType', 'gutenlayouts/iconic-button-attribute', gutenlayoutsBtnIconAttribute);