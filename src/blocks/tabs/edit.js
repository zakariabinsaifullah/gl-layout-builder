// import editor style
import './editor.scss';

/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { generateBoxStyles } from '../../styles';

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
        titleColor,
        titleSize,
        descColor,
        descSize,
        tabContentColor,
        tabContentBg,
        verticalAlign,
        contentPadding
    } = attributes;
    const cssCustomProperties = {
        ...(alignMent && { '--alignment': alignMent }),
        ...(contentAlign && { '--contentAlign': contentAlign }),
        ...(tabsWidth && { '--tabverWidth': `${tabsWidth}%` }),
        ...(titleColor && { '--titleColor': titleColor }),
        ...(titleSize && { '--titleSize': titleSize }),
        ...(descColor && { '--descColor': descColor }),
        ...(descSize && { '--descSize': descSize }),
        ...(tabContentColor && { '--tabContentBg': tabContentColor }),
        ...(tabContentBg && { '--tabContenthBg': tabContentBg }),
        ...(verticalAlign && { '--verticalAlign': verticalAlign }),
        ...(contentPadding && { '--contentPadding': generateBoxStyles(contentPadding) })
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
        titleColor,
        titleSize,
        descColor,
        descSize,
        tabContentColor,
        tabContentBg,
        verticalAlign,
        contentPadding
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
            templateLock: 'all',
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
    const tabRef = useRef(null);
    const [activeTabIndex, setActiveTabIndex] = useState('1');

    const handleTabClick = tabId => {
        const tabsParent = tabRef?.current;
        if (!tabsParent) return;

        const tabItems = tabsParent.querySelectorAll('.tabs-content .tab-item');

        tabItems.forEach(tab => {
            tab.style.display = tab.getAttribute('data-tab') === tabId ? 'block' : 'none';
        });

        setActiveTabIndex(tabId);
    };
    const appendBtn = () => {
        const nextIndex = tabTitles.length + 1;
        const newTabs = [...tabTitles, { id: String(nextIndex), title: `Tab ${nextIndex}`, description: '' }];
        setAttributes({
            tabTitles: newTabs,
            tabChildCount: nextIndex
        });
        const newBlock = createBlock('gutenlayouts/tab', {
            tabId: String(nextIndex),
            parentTabId: uniqueId
        });
        const childBlocks = select('core/block-editor').getBlocks(clientId);
        dispatch('core/block-editor').insertBlock(newBlock, childBlocks.length, clientId);

        setActiveTabIndex(String(nextIndex));
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
                                            className="tab-title"
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
