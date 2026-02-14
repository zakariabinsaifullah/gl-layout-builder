/**
 * WordPress dependencies
 */

import { addFilter } from '@wordpress/hooks';

/**
 * Add entrance animation attributes to block settings
 *
 * @param {Object} settings Block settings
 * @return {Object} Modified settings
 */

function gllbEntranceAnimationAttribute(settings) {
    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            gllbEntranceAnimation: {
                type: 'string',
                default: ''
            },
            gllbEntranceDuration: {
                type: 'number',
                default: 1
            },
            gllbEntranceDelay: {
                type: 'number',
                default: 0
            },
            gllbEntranceRepeat: {
                type: 'boolean',
                default: false
            },
            gllbEntranceLoop: {
                type: 'boolean',
                default: false
            }
        }
    };
}

addFilter('blocks.registerBlockType', 'gllb/gllbEntranceAnimationAttribute', gllbEntranceAnimationAttribute);