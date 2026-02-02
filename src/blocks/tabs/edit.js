// import editor style
import './editor.scss';

/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { dispatch, select, useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { generateBoxStyles, generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';

/**
 * External Dependencies
 */
import classnames from 'classnames';
import { times } from 'lodash';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';

const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;

    const {
        uniqueId,
        tabTitles,
        tabChildCount,
        showTabDesc,
        tabTitleTag,
        layout,
        horizontalAlign,
        enableScrollTab,
        alignMent,
        tabsWidth,
        contentAlign,
        verticalAlign,
        // tab nav
        titleSize,
        descSize,
        tabNavPadding,
        tabNavBorder,
        tabNavBorderRadius,
        tabNavColors,
        tabNavActiveColors,
        gap,
        margin,
        verticalGap,
        verticalTabWidth
    } = attributes;

    // tab nav
    const tabNavPaddingStyles = generateBoxStyles(tabNavPadding);
    const tabNavBorderWidth = generateBorderWidth(tabNavBorder);
    const tabNavBorderStyle = generateBorderStyle(tabNavBorder);
    const tabNavBorderColor = generateBorderColor(tabNavBorder);
    const tabNavBorderRadiusStyle = generateBoxStyles(tabNavBorderRadius);
    const marginStyles = generateBoxStyles(margin);

    const cssCustomProperties = {
        ...(alignMent && { '--alignment': alignMent }),
        ...(contentAlign && { '--contentAlign': contentAlign }),
        ...(tabsWidth && { '--tabverWidth': `${tabsWidth}%` }),
        ...(titleSize && { '--titleSize': titleSize }),
        ...(descSize && { '--descSize': descSize }),
        ...(verticalAlign && { '--verticalAlign': verticalAlign }),
        ...(tabNavPaddingStyles && { '--tabNavPadding': tabNavPaddingStyles }),
        ...(tabNavBorderWidth && { '--tabNavBorderWidth': tabNavBorderWidth }),
        ...(tabNavBorderStyle && { '--tabNavBorderStyle': tabNavBorderStyle }),
        ...(tabNavBorderColor && { '--tabNavBorderColor': tabNavBorderColor }),
        ...(tabNavBorderRadiusStyle && { '--tabNavBorderRadius': tabNavBorderRadiusStyle }),
        ...(tabNavColors?.title && { '--titleColor': tabNavColors?.title }),
        ...(tabNavColors?.description && { '--descColor': tabNavColors?.description }),
        ...(tabNavColors?.bg && { '--tabNavBg': tabNavColors?.bg }),
        ...(tabNavActiveColors?.title && { '--activeTitleColor': tabNavActiveColors?.title }),
        ...(tabNavActiveColors?.description && { '--activeDescColor': tabNavActiveColors?.description }),
        ...(tabNavActiveColors?.border && { '--activeNavBorder': tabNavActiveColors?.border }),
        ...(tabNavActiveColors?.bg && { '--activeNavBg': tabNavActiveColors?.bg }),
        ...(gap && { '--navGap': gap }),
        ...(marginStyles && { '--navMargin': marginStyles }),
        ...(verticalGap && { '--verticalGap': verticalGap }),
        ...(verticalTabWidth && { '--verticalTabWidth': verticalTabWidth })
    };

    /**
     * Handle Block Unique Id
     */
    useEffect(() => {
        ({ uniqueId, setAttributes, clientId });
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [
        alignMent,
        contentAlign,
        tabsWidth,
        titleSize,
        descSize,
        verticalAlign,
        tabNavPadding,
        tabNavBorderWidth,
        tabNavBorderStyle,
        tabNavBorderColor,
        tabNavBorderRadiusStyle,
        tabNavColors,
        tabNavActiveColors,
        gap,
        marginStyles,
        verticalGap,
        verticalTabWidth
    ]);

    /**
     * Default Tab Titles (No Icon)
     */
    useEffect(() => {
        if (tabTitles.length === 0) {
            setAttributes({
                tabTitles: [
                    { id: '1', title: __('Tab 1', 'gutenlayout'), description: '' },
                    { id: '2', title: __('Tab 2', 'gutenlayout'), description: '' },
                    { id: '3', title: __('Tab 3', 'gutenlayout'), description: '' }
                ]
            });
        }
    }, []);

    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classnames(uniqueId)
    });

    /**
     * Inner Blocks
     */
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'tabs-content' },
        {
            template: times(tabChildCount, n => [
                'gutenlayouts/tab',
                {
                    tabId: `${n + 1}`,
                    parentTabId: uniqueId
                }
            ]),
            allowedBlocks: ['gutenlayouts/tab']
        }
    );

    /**
     * Tabs Interactivity
     */
    const { updateBlockAttributes } = useDispatch('core/block-editor');

    /**
     * Get Inner Blocks
     */
    const inner_blocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

    /**
     * Tabs Interactivity State
     */
    const tabRef = useRef(null);
    const [activeTabIndex, setActiveTabIndex] = useState('1');

    /**
     * Sync Tabs with Inner Blocks
     */
    useEffect(() => {
        if (!inner_blocks || inner_blocks.length === 0) return;

        // 1. Check for duplicates and fix IDs immediately
        const seenIds = new Set();
        let hasFixedIds = false;

        inner_blocks.forEach(block => {
            const currentTabId = block.attributes.tabId;
            // If ID is missing, duplicated, or we've seen it already in this pass
            if (!currentTabId || seenIds.has(currentTabId)) {
                const newId = String(Date.now() + Math.random().toString(36).substr(2, 9));
                updateBlockAttributes(block.clientId, { tabId: newId });
                seenIds.add(newId);
                hasFixedIds = true;
            } else {
                seenIds.add(currentTabId);
            }
        });

        if (hasFixedIds) return; // Wait for the next render with updated attributes

        // 2. Sync tabTitles with current blocks
        const currentTabIds = inner_blocks.map(block => block.attributes.tabId);

        // Filter existing titles to keep only those that still exist
        const updatedTitles = currentTabIds.map((id, index) => {
            const existingTitle = tabTitles.find(t => t.id === id);
            if (existingTitle) {
                return existingTitle;
            }
            // Create new title for new block
            return {
                id: id,
                title: `${__('Tab', 'gutenlayout')} ${index + 1}`,
                description: ''
            };
        });

        // 3. Update attributes if there's a change
        // We compare arrays to avoid infinite loops
        const isDifferent = updatedTitles.length !== tabTitles.length || updatedTitles.some((t, i) => t.id !== tabTitles[i].id);

        if (isDifferent) {
            setAttributes({
                tabTitles: updatedTitles,
                tabChildCount: inner_blocks.length
            });

            // If the active tab was deleted, switch to the first one
            if (!currentTabIds.includes(activeTabIndex)) {
                const firstId = currentTabIds[0];
                if (firstId) setActiveTabIndex(firstId);
            }
        }
    }, [inner_blocks, tabTitles, activeTabIndex]);

    /**
     * Tabs Interactivity Helpers
     */

    // Ensure active tab is valid on first load
    useEffect(() => {
        if (tabTitles.length > 0 && !tabTitles.find(t => t.id === activeTabIndex)) {
            setActiveTabIndex(tabTitles[0].id);
        }
    }, [tabTitles]);

    const handleTabClick = tabId => {
        const tabsParent = tabRef?.current;
        if (!tabsParent) return;

        const tabItems = tabsParent.querySelectorAll('.tabs-content .tab-item');

        tabItems.forEach(tab => {
            // Check both dataset and attribute for compatibility
            const attrId = tab.getAttribute('data-tab');
            tab.style.display = attrId === tabId ? 'block' : 'none';
        });

        setActiveTabIndex(tabId);
    };
    const appendBtn = () => {
        // Just create the block; the useEffect will handle adding the title and ID syncing
        // We provide a temporary ID that will likely be kept or sanitized
        const nextId = String(Date.now());
        const newBlock = createBlock('gutenlayouts/tab', {
            tabId: nextId,
            parentTabId: uniqueId
        });

        const childBlocks = select('core/block-editor').getBlocks(clientId);
        dispatch('core/block-editor').insertBlock(newBlock, childBlocks.length, clientId);
        // We don't set attributes here anymore; the effect handles it.
    };

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton icon="insert" title={__('Add Button', 'afftra-blocks')} onClick={appendBtn} />
                </ToolbarGroup>
            </BlockControls>
            {isSelected && <Inspector {...props} handleTabClick={handleTabClick} uniqueId={uniqueId} />}

            <div {...blockProps}>
                <div
                    className={classnames('tabs-wrapper', layout, {
                        [verticalAlign]: layout === 'nxt_vertical' && verticalAlign
                    })}
                    role="tablist"
                    ref={tabRef}
                >
                    <div
                        className={classnames('tabs-nav', {
                            [horizontalAlign]: horizontalAlign && layout === 'nxt_horizontal',
                            scrolled: enableScrollTab && layout === 'nxt_vertical'
                        })}
                    >
                        {tabTitles.map((tab, index) => (
                            <div
                                key={index}
                                className={classnames('nav-item', {
                                    active: tab.id === activeTabIndex
                                })}
                                role="tab"
                                data-nav={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                <div className="nav-item-inner">
                                    <div className="tab-content">
                                        <RichText
                                            tagName={tabTitleTag}
                                            className={classnames('tab-title', {
                                                'has-size': titleSize
                                            })}
                                            value={tab.title}
                                            onChange={value => {
                                                const newTabs = [...tabTitles];
                                                newTabs[index].title = value;
                                                setAttributes({ tabTitles: newTabs });
                                            }}
                                            placeholder={__('Title', 'gutenlayout')}
                                        />

                                        {showTabDesc && (
                                            <RichText
                                                tagName="p"
                                                className="tab-description"
                                                value={tab.description}
                                                onChange={value => {
                                                    const newTabs = [...tabTitles];
                                                    newTabs[index].description = value;
                                                    setAttributes({ tabTitles: newTabs });
                                                }}
                                                placeholder={__('Description', 'gutenlayout')}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div {...innerBlocksProps} />
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;
