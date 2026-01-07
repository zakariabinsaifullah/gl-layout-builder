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
import Inspector from './inspector';
import classNames from 'classnames';

// Block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const {
        heightType,
        heights,
        columns,
        gaps,
        resMode,
        showArrows,
        navType,
        navRadius,
        paginationColor,
        pnSize,
        paSize,
        pRadius,
        paRadius,
        pgap,
        navColor,
        navbgColor,
        navBorderColor,
        navSize,
        navIconSize,
        navEdgeGap
    } = attributes;

    // CSS Custom Properties
    const cssCustomProperties = {
        ...(heightType === 'fixed' && heights?.Desktop && { '--dheight': `${heights['Desktop']}` }),
        ...(heightType === 'fixed' && heights?.Tablet && { '--theight': `${heights['Tablet']}` }),
        ...(heightType === 'fixed' && heights?.Mobile && { '--mheight': `${heights['Mobile']}` }),
        ...(paginationColor && { '--pagination-color': paginationColor }),
        ...(pnSize && { '--psize': `${pnSize}` }),
        ...(paSize && { '--pasize': `${paSize}` }),
        ...(pRadius && { '--pradius': `${pRadius}` }),
        ...(paRadius && { '--paradius': `${paRadius}` }),
        ...(navRadius && { '--nav-radius': `${navRadius}` }),
        ...(navSize && { '--nav-size': `${navSize}` }),
        ...(navIconSize && { '--nicon-size': `${navIconSize}` }),
        ...(navColor && { '--nav-color': navColor }),
        ...(navbgColor && { '--nav-bg': navbgColor }),
        ...(navBorderColor && { '--nborder-color': navBorderColor }),
        ...(navEdgeGap && { '--nav-gap': `${navEdgeGap}` }),
        ...(pgap && { '--pgap': `${pgap}` })
    };

    // Update block style when CSS properties change
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        heightType,
        heights,
        navColor,
        navbgColor,
        paginationColor,
        navRadius,
        paginationColor,
        pnSize,
        paSize,
        pRadius,
        paRadius,
        navBorderColor,
        navSize,
        navIconSize,
        navEdgeGap,
        pgap
    ]);

    // Inner blocks configuration
    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classNames('gutenlayouts-editor-slides', {
                [`columns-${columns[resMode]}`]: columns[resMode],
                [`gap-${gaps[resMode]}`]: gaps[resMode]
            })
        },
        {
            allowedBlocks: ['gutenlayouts/slide'],
            template: [['gutenlayouts/slide'], ['gutenlayouts/slide']],
            templateLock: false
        }
    );

    // Block Props
    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classNames({
            fixed: heightType === 'fixed',
            outside: navType === 'outside'
        })
    });

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="insert"
                        label={__('Add Slide', 'gutenlayouts')}
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
                <div {...innerBlocksProps} />
                {showArrows && (
                    <div className="swiper-navigation">
                        <div className="swiper-custom-prev gu-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L175 441c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L81.9 280 488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232 209 105c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z"
                                ></path>
                            </svg>
                        </div>
                        <div className="swiper-custom-next gu-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M505 273c9.4-9.4 9.4-24.6 0-33.9L337 71c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l127 127-406.1 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l406.1 0-127 127c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Edit;
