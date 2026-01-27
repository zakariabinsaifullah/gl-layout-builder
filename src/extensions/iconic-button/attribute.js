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
            gllbEnableIconicBtn: {
                type: 'boolean',
                default: false
            },
            gllbBtnIconName: {
                type: 'string',
                default: ''
            },
            gllbBtnIcon: {
                type: 'string',
                default: ''
            },
            gllbBtnIconType: {
                type: 'string',
                default: ''
            },
            gllbBtnCustomSvg: {
                type: 'string',
                default: ''
            },
            gllbBtnIconPosition: {
                type: 'string',
                default: ''
            },
            gllbBtnIconSize: {
                type: 'string'
            },
            gllbBtnIconGap: {
                type: 'string'
            }
        }
    };
}

addFilter('blocks.registerBlockType', 'gutenlayouts/iconic-button-attribute', gutenlayoutsBtnIconAttribute);
