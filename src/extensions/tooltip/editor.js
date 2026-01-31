import { BlockControls } from '@wordpress/block-editor';
import { Button, Popover, RadioControl, TextareaControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFormat, registerFormatType, removeFormat } from '@wordpress/rich-text';

const GutenlayoutsTooltipButton = props => {
    const { isActive, onChange, value, activeAttributes, contentRef } = props;
    const [panel, setPanel] = useState(false);

    // toolbar button click
    const toolbarButtonOnClick = () => {
        setPanel(!panel);
    };

    /**
     * Generate new format for tooltip
     *
     * @param {string} currentAttr - Current attribute
     * @param {string|number} currentAttrVal - New value of the current attribute
     * @param {Object} activeAttrs - Active attributes
     * @return {Object} New format
     */
    const generateFormat = (currentAttr, currentAttrVal, activeAttrs) => {
        /**
         * Create new attributes object with updated value of the current attribute
         * and remove empty attributes
         */
        const newAttrs = {
            ...activeAttrs,
            [currentAttr]: currentAttrVal
        };

        /**
         * Remove empty attributes from the new attributes object
         */
        Object.keys(newAttrs).forEach(key => {
            if (newAttrs[key] === '' || newAttrs[key] === undefined) {
                delete newAttrs[key];
            }
        });

        /**
         * Apply new formats
         */
        const newVal = applyFormat(value, {
            type: 'gutenlayouts/tooltip',
            attributes: newAttrs
        });

        return newVal;
    };

    // theme change
    const hanldeThemeChange = (v, activeAttributes) => {
        const newVal = generateFormat('data-theme', v, activeAttributes);
        onChange(newVal);
    };

    // content change
    const handleContentChange = (v, activeAttributes) => {
        const newVal = generateFormat('data-content', v, activeAttributes);
        onChange(newVal);
    };

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        className="gutenlayouts-tooltip-btn"
                        icon={!panel ? 'admin-comments' : 'no-alt'}
                        title={!panel ? __('Tooltip', 'gl-layout-builder') : __('Close', 'gl-layout-builder')}
                        onClick={toolbarButtonOnClick}
                        isPressed={isActive}
                    />
                </ToolbarGroup>
                {panel && (
                    <Popover className="gutenlayouts-format-popover tooltip" offset={5} focusOnMount={false} placement="bottom">
                        <TextareaControl
                            label={__('Tooltip Text', 'gl-layout-builder')}
                            onChange={v => {
                                handleContentChange(v, activeAttributes);
                            }}
                            value={activeAttributes['data-content'] ? activeAttributes['data-content'] : ''}
                        />
                        <RadioControl
                            label={__('Theme', 'gl-layout-builder')}
                            selected={activeAttributes['data-theme'] ? activeAttributes['data-theme'] : 'dark'}
                            options={[
                                { label: __('Dark', 'gl-layout-builder'), value: 'dark' },
                                { label: __('Light', 'gl-layout-builder'), value: 'light' }
                            ]}
                            onChange={v => {
                                hanldeThemeChange(v, activeAttributes);
                            }}
                        />
                        <div className="gutenlayouts-popup-actions">
                            <Button
                                className="gutenlayouts-apply-format"
                                onClick={() => {
                                    onChange(
                                        applyFormat(value, {
                                            type: 'gutenlayouts/tooltip',
                                            attributes: activeAttributes
                                        })
                                    );
                                    setPanel(false);
                                }}
                            >
                                {__('Apply', 'gl-layout-builder')}
                            </Button>
                            <Button
                                className="gutenlayouts-clear-format"
                                onClick={() => {
                                    onChange(removeFormat(value, 'gutenlayouts/tooltip'));
                                }}
                            >
                                {__('Clear', 'gl-layout-builder')}
                            </Button>
                        </div>
                    </Popover>
                )}
            </BlockControls>
        </>
    );
};

registerFormatType('gutenlayouts/tooltip', {
    title: __('Tooltip', 'gl-layout-builder'),
    tagName: 'span',
    className: 'gutenlayouts-tooltip',
    attributes: {
        'data-content': 'data-content',
        'data-theme': 'data-theme'
    },
    edit: GutenlayoutsTooltipButton
});
