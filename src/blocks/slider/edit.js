/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import './editor.scss';
import './slide';
import Inspector from './inspector';

// Block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        height,
        autoplay,
        loop,
        showArrows,
        showPagination,
        border,
        radius,
        bg,
        arrowColors,
        arrowBgColors,
        paginationColor,
        delay,
        status
    } = attributes;

    // CSS Custom Properties
    const cssCustomProperties = {
        ...(height && { '--slide-height': `${height}px` }),
        ...(bg && { '--slider-bg': bg }),
        ...(arrowColors && { '--arrow-color': arrowColors }),
        ...(arrowBgColors && { '--arrow-bg': arrowBgColors }),
        ...(paginationColor && { '--pagination-color': paginationColor }),
        ...(radius && { '--slider-radius': `${radius}px` })
    };

    // Update block style when CSS properties change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [height, bg, arrowColors, arrowBgColors, paginationColor, radius]);

    // Inner blocks configuration
    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'gutenlayouts-editor-slides'
        },
        {
            allowedBlocks: ['gutenlayouts/slide'],
            template: [['gutenlayouts/slide'], ['gutenlayouts/slide']],
            templateLock: false
        }
    );

    // Block Props
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="insert"
                        label={__('Add Slide', 'gb-slider')}
                        onClick={() => {
                            const innerBlocks = wp.data.select('core/block-editor').getBlocks(clientId);
                            const newBlock = wp.blocks.createBlock('gutenlayouts/slide');
                            wp.data.dispatch('core/block-editor').insertBlock(newBlock, innerBlocks.length, clientId);
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>

            {isSelected && <Inspector {...props} />}

            <div {...blockProps}>
                <div className="gutenlayouts-editor-wrapper">
                    <div {...innerBlocksProps} />
                </div>
                <div className="gutenlayouts-editor-note">
                    <p>{__('Preview: Slider will be displayed on the frontend', 'gb-slider')}</p>
                </div>
            </div>
        </>
    );
};

export default Edit;
