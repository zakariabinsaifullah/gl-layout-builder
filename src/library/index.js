/**
 * WordPress dependencies
 */
// import { addFilter } from '@wordpress/hooks';
// import { Modal } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';
// import { PluginMoreMenuItem } from '@wordpress/editor';
// import { __ } from '@wordpress/i18n';
import { useState, createRoot } from '@wordpress/element';

// editor scss
import './editor.scss';

import { Library } from './library';

const Gutenlayouts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let buttonContainer = document.querySelector('.gutenlayouts-pattern-library__toolbar-button');

    const injectButton = () => {
        const documentTools = document.querySelector('.editor-document-tools__left');
        if (!documentTools) return;

        // Avoid duplicate injection
        if (buttonContainer) return;

        // Create button container
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'gutenlayouts-pattern-library__toolbar-button';

        const root = createRoot(buttonContainer);

        root.render(<Library openPreferences={() => setIsModalOpen(true)} />);

        documentTools.parentNode.insertBefore(buttonContainer, documentTools.nextSibling);
    };

    injectButton();

    return null;

    // return (
    //     <>
    //         <PluginMoreMenuItem onClick={() => setIsModalOpen(true)} icon="admin-generic">
    //             {__('Gutenlayouts preferences', 'gutenlayouts')}
    //         </PluginMoreMenuItem>
    //         {isModalOpen && (
    //             <Modal
    //                 overlayClassName="gutenlayouts-modal__overlay"
    //                 title={__('Gutenlayouts preferences', 'gutenlayouts')}
    //                 onRequestClose={() => setIsModalOpen(false)}
    //                 size="large"
    //             >
    //                 MODAL CONTENT
    //             </Modal>
    //         )}
    //     </>
    // );
};

registerPlugin('gutenlayouts-plugin', {
    render: Gutenlayouts
});
