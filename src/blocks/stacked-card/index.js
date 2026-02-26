import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const inlineIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <rect x="2" y="13" width="20" height="5" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="2" y="9" width="20" height="5" rx="2" fill="currentColor" opacity="0.65" />
        <rect x="2" y="5" width="20" height="5" rx="2" fill="currentColor" />
    </svg>
);

registerBlockType(metadata.name, {
    icon: inlineIcon,
    edit: Edit,
    save
});
