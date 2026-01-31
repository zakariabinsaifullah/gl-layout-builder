/**
 * WordPress dependencies
 */
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * External Dependencies
 */
import classnames from 'classnames';

// Internal Dependencies

// block save function
const Save = props => {
    const { attributes } = props;
    const { uniqueId, tabTitles, enableScrollTab, blockStyle, layout, horizontalAlign, showTabDesc, tabTitleTag, verticalAlign } =
        attributes;

    /**
     * Block Props
     */
    const blockProps = useBlockProps.save({
        style: blockStyle,
        className: classnames('wp-block-gutenlayouts-tabs', uniqueId)
    });

    return (
        <div {...blockProps}>
            <div
                className={classnames('tabs-wrapper', layout, {
                    [verticalAlign]: layout === 'nxt_vertical' && verticalAlign
                })}
                role="tablist"
                tabIndex={0}
            >
                <div
                    className={classnames('tabs-nav', {
                        [horizontalAlign]: layout === 'nxt_horizontal' && horizontalAlign,

                        scrolled: enableScrollTab && layout === 'nxt_vertical'
                    })}
                >
                    {tabTitles &&
                        tabTitles?.length > 0 &&
                        tabTitles.map((tab, index) => {
                            const isActive = index === 0;
                            return (
                                <div
                                    className={classnames('nav-item', {
                                        active: isActive
                                    })}
                                    role="tab"
                                    tabIndex={isActive ? 0 : -1}
                                    aria-selected={isActive ? 'true' : 'false'}
                                    aria-controls={`tab-content-${tab?.id}`}
                                    id={`tab-title-${tab?.id}`}
                                    key={index}
                                    data-nav={tab?.id}
                                >
                                    <div className={classnames('nav-item-inner')}>
                                        <div className="tab-content">
                                            <RichText.Content tagName={tabTitleTag} className="tab-title" value={tab?.title} />
                                            {showTabDesc && tab?.description && (
                                                <RichText.Content tagName="p" className="tab-description" value={tab?.description} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="tabs-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default Save;
