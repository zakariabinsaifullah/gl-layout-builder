/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const { thickNess } = attributes;
    const cssCustomProperties = {
        ...(thickNess && { '--thickness': `${thickNess}px` })
    };
    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    // Inner blocks
    const innerBlockProps = useInnerBlocksProps(
        {
            className: 'progressbar-inner-blocks'
        },
        {
            allowedBlocks: ['gutenlayouts/progressbar'],
            template: [
                [
                    'gutenlayouts/progressbar',
                    {
                        progress: 50,
                        label: 'Durability Score'
                    }
                ]
            ],
            renderAppender: false,
            templateLock: false
        }
    );

    // Get child blocks using useSelect
    const childBlocks = useSelect(
        select => {
            return select('core/block-editor').getBlocks(clientId);
        },
        [clientId]
    );

    // Get dispatch function
    const { insertBlock } = useDispatch('core/block-editor');

    // Append Button handler
    const appendBtn = () => {
        const newBlock = createBlock('gutenlayouts/progressbar', {});
        insertBlock(newBlock, childBlocks.length, clientId);
    };

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton icon="insert" title={__('Add Progress Bar', 'gutenlayout-blocks')} onClick={appendBtn} />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div {...innerBlockProps} />
            </div>
        </>
    );
};

export default Edit;
