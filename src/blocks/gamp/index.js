/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const inlineIcon = (
    <svg
        fill="#000000"
        height="800px"
        width="800px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        enableBackground="new 0 0 512 512"
        xmlSpace="preserve"
    >
        <path
            d="M256,0C149.3,0,64,85.3,64,192c0,36.9,11,65.4,30.1,94.3l141.7,215v0c4.3,6.5,11.7,10.7,20.2,10.7c8.5,0,16-4.3,20.2-10.7
	l141.7-215C437,257.4,448,228.9,448,192C448,85.3,362.7,0,256,0z M256,298.6c-58.9,0-106.7-47.8-106.7-106.8
	c0-59,47.8-106.8,106.7-106.8c58.9,0,106.7,47.8,106.7,106.8C362.7,250.8,314.9,298.6,256,298.6z"
        />
    </svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
    icon: inlineIcon,
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save
});
