/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { GutenLayouts } from './icons';
import { PatternLibraryModal } from './modal';

// Create a custom slot for the toolbar button
export const Library = ({ openPreferences }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ToolbarButton
                variant="tertiary"
                size="compact"
                onClick={() => setIsModalOpen(true)}
                icon={<GutenLayouts />}
                label={__('Gutenlayouts Pattern Library', 'gutenlayouts')}
                showTooltip={true}
                style={{
                    backgroundColor: 'transparent'
                }}
            />
            {isModalOpen && (
                <div>
                    <PatternLibraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} openPreferences={openPreferences} />
                </div>
            )}
        </>
    );
};
