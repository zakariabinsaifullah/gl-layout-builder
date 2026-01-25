/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/blockEditor';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import { css } from '@codemirror/lang-css';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';

// Track panel open state
let initialOpen = false;

const gutenlayoutsAddCustomPanel = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { attributes, setAttributes, clientId } = props;
        const { gutenlayoutsCustomCSS } = attributes;
        const [gutenlayoutsCSS, setGutenlayoutsCSS] = useState(gutenlayoutsCustomCSS);

        const defaultCSS = `/* selector {
    color: #f00; 
} */`;

        const dynamicClass = `gutenlayouts-${clientId.slice(0, 8)}`;

        return (
            <>
                <BlockEdit key="edit" {...props} />
                <InspectorControls>
                    <PanelBody title={__('Custom CSS', 'gl-layout-builder')} initialOpen={initialOpen}>
                        <p className="gutenlayouts-help-note top-note">
                            {__('You must click on the ', 'gl-layout-builder')}
                            <code>{__('Apply/Update CSS', 'gl-layout-builder')}</code>
                            {__(' button to apply the CSS to the block.', 'gl-layout-builder')}
                            <a href="https://www.youtube.com/watch?v=rP7wBUrLxH8" target="_blank">
                                {__(' Watch Video', 'gl-layout-builder')}
                            </a>
                        </p>
                        <CodeMirror
                            className="gutenlayouts-codemirror"
                            value={gutenlayoutsCustomCSS || defaultCSS}
                            theme={githubLight}
                            height="200px"
                            extensions={[css()]}
                            onChange={value => setGutenlayoutsCSS(value)}
                        />
                        <div className="gutenlayouts-bottom-wrapper">
                            <button
                                className="gutenlayouts-apply-css"
                                onClick={() => {
                                    setAttributes({ gutenlayoutsCustomCSS: gutenlayoutsCSS });
                                    setAttributes({ gutenlayoutsDynamicClass: dynamicClass });
                                    initialOpen = true;
                                }}
                            >
                                {gutenlayoutsCustomCSS ? __('Update CSS', 'gl-layout-builder') : __('Apply CSS', 'gl-layout-builder')}
                            </button>
                            <p className="gutenlayouts-help-note">
                                {__('Add ', 'gl-layout-builder')}
                                <code>selector</code>
                                {__(' at the beginning to generate a unique class and avoid any conflict.', 'gl-layout-builder')}
                            </p>
                        </div>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'gutenlayoutsAddCustomPanel');

addFilter('editor.BlockEdit', 'gutenlayouts/add-custom-panel', gutenlayoutsAddCustomPanel);