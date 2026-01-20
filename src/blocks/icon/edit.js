/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
    RichText,
    BlockControls,
    InspectorControls,
    useBlockProps,
    JustifyToolbar,
    __experimentalUseBorderProps as useBorderProps,
    __experimentalUseColorProps as useColorProps,
    __experimentalGetSpacingClassesAndStyles as useSpacingProps,
    __experimentalGetShadowClassesAndStyles as useShadowProps,
    __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor';

import { link } from '@wordpress/icons';
import {
    PanelBody,
    RangeControl,
    ToolbarButton,
    Popover,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
    NativeResponsiveControl,
    NativeToggleControl,
    NativeTextControl,
    NativeIconPicker,
    PanelColorControl,
    NativeSelectControl,
    NativeUnitControl
} from '../../components';

import { RenderIcon } from '../../helpers';

import './editor.scss';

export default function Edit(props) {
    const { attributes, setAttributes, className } = props;
    const {
        iconName,
        iconSize,
        customSvgCode,
        iconType,
        strokeWidth,
        justifyContent,
        href,
        linkTarget,
        sizes,
        resMode,
        heading,
        headingTag,
        showTitle,
        listGap,
        titleColor,
        titleSize
    } = attributes;

    const cssCustomProperties = {
        ...(listGap && { '--list-gap': `${listGap}` }),
        ...(titleColor && { '--title-color': titleColor }),
        ...(titleSize && { '--title-size': `${titleSize}` })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [listGap, titleColor, titleSize]);

    // states
    const [isEditingURL, setIsEditingURL] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);

    const borderProps = useBorderProps(attributes);
    const colorProps = useColorProps(attributes);
    const spacingProps = useSpacingProps(attributes);
    const shadowProps = useShadowProps(attributes);

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: classNames(className, {
            [`is-${iconType}`]: iconType,
            [`justify-${justifyContent}`]: justifyContent
        })
    });

    return (
        <>
            <BlockControls group="block">
                <JustifyToolbar
                    allowedControls={['left', 'center', 'right']}
                    value={justifyContent}
                    onChange={value =>
                        setAttributes({
                            justifyContent: value
                        })
                    }
                />
                <ToolbarButton
                    ref={setPopoverAnchor}
                    name="link"
                    icon={link}
                    title={__('Link', 'gl-layout-builder')}
                    onClick={() => setIsEditingURL(true)}
                    isActive={!!href || isEditingURL}
                />
                {isEditingURL && (
                    <Popover
                        anchor={popoverAnchor}
                        onClose={() => setIsEditingURL(false)}
                        placement="bottom"
                        focusOnMount={true}
                        offset={12}
                        className="gutenlayouts-icon__link-popover"
                        variant="alternate"
                    >
                        <LinkControl
                            value={{
                                url: href,
                                opensInNewTab: linkTarget === '_blank'
                            }}
                            onChange={({ url: newURL = '', opensInNewTab }) => {
                                setAttributes({
                                    href: newURL,
                                    linkTarget: opensInNewTab ? '_blank' : undefined,
                                    linkRel: newURL ? 'nofollow' : undefined,
                                    tagName: 'a'
                                });
                            }}
                            onRemove={() =>
                                setAttributes({
                                    href: undefined,
                                    linkTarget: undefined,
                                    linkRel: undefined,
                                    tagName: 'div'
                                })
                            }
                        />
                    </Popover>
                )}
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Settings', 'gl-layout-builder')}>
                    <NativeToggleControl
                        label={__('Add List Title', 'gl-layout-builder')}
                        checked={showTitle}
                        onChange={value => setAttributes({ showTitle: value })}
                    />
                    <NativeIconPicker
                        onIconSelect={(iconName, iconType) => {
                            setAttributes({ iconName, iconType, customSvgCode: undefined });
                        }}
                        onCustomSvgInsert={({ customSvgCode, iconType, strokeWidth }) => {
                            // console.log('customSvgCode', customSvgCode);
                            setAttributes({ customSvgCode, iconType, strokeWidth });
                        }}
                        iconName={iconName}
                        customSvgCode={customSvgCode}
                        iconSize={iconSize}
                        strokeWidth={strokeWidth}
                    />
                    <NativeResponsiveControl label={__('Icon Size (px)', 'gl-layout-builder')} props={props}>
                        <RangeControl
                            value={sizes[resMode]}
                            onChange={value => setAttributes({ sizes: { ...sizes, [resMode]: value } })}
                            min={8}
                            max={256}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>
                </PanelBody>
                {showTitle && (
                    <PanelBody title={__('List Title', 'gl-layout-builder')} initialOpen={false}>
                        <NativeUnitControl
                            label={__('Gap ', 'gl-layout-builder')}
                            value={listGap}
                            onChange={value => setAttributes({ listGap: value })}
                        />
                        {showTitle && (
                            <>
                                <NativeSelectControl
                                    label={__('Select Tag', 'gl-layout-builder')}
                                    value={headingTag}
                                    onChange={value => setAttributes({ headingTag: value })}
                                    options={[
                                        { label: __('H1', 'gl-layout-builder'), value: 'h1' },
                                        { label: __('H2', 'gl-layout-builder'), value: 'h2' },
                                        { label: __('H3', 'gl-layout-builder'), value: 'h3' },
                                        { label: __('H4', 'gl-layout-builder'), value: 'h4' },
                                        { label: __('H5', 'gl-layout-builder'), value: 'h5' },
                                        { label: __('H6', 'gl-layout-builder'), value: 'h6' },
                                        { label: __('Paragraph', 'gl-layout-builder'), value: 'p' },
                                        { label: __('Div', 'gl-layout-builder'), value: 'div' }
                                    ]}
                                />
                                <NativeTextControl
                                    label={__('Title Text', 'gl-layout-builder')}
                                    value={heading}
                                    onChange={value => setAttributes({ heading: value })}
                                    placeholder={__('List title...', 'gl-layout-builder')}
                                />
                            </>
                        )}
                    </PanelBody>
                )}
            </InspectorControls>
            <InspectorControls group="styles">
                {showTitle && (
                    <ToolsPanel
                        label={__('Title', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                titleSize: undefined,
                                titleColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!titleSize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    titleSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('Font Size', 'gl-layout-builder')}
                                value={titleSize}
                                onChange={value => setAttributes({ titleSize: value })}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!titleColor}
                            label={__('Color', 'gl-layout-builder')}
                            onDeselect={() => {
                                setAttributes({
                                    titleColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gl-layout-builder')}
                                colorSettings={[
                                    {
                                        value: titleColor,
                                        onChange: color => setAttributes({ titleColor: color }),
                                        label: __('Color', 'gl-layout-builder')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>
            <div {...blockProps}>
                <div className="gutenlayouts-icon-block-wrapper">
                    <div
                        className={classNames('icon-container', colorProps.className, borderProps.className)}
                        style={{
                            ...borderProps.style,
                            ...colorProps.style,
                            ...spacingProps.style,
                            ...shadowProps.style,
                            ...(sizes?.Desktop !== 60 && { '--dsize': `${sizes.Desktop}px` }),
                            ...(sizes?.Tablet !== 48 && { '--tsize': `${sizes.Tablet}px` }),
                            ...(sizes?.Mobile !== 32 && { '--msize': `${sizes.Mobile}px` })
                        }}
                    >
                        <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={iconSize} />
                    </div>
                    {showTitle && (
                        <div className="icon-content">
                            <RichText
                                tagName={headingTag}
                                value={heading}
                                onChange={value => setAttributes({ heading: value })}
                                placeholder={__('List title...', 'gl-layout-builder')}
                                className="icon-heading"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
