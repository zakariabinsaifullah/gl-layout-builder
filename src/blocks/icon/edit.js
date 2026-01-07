import clsx from 'clsx';
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

import { link, Icon } from '@wordpress/icons';
import {
    PanelBody,
    RangeControl,
    Button,
    Dropdown,
    BaseControl,
    ToolbarButton,
    Popover,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Library from './components/library';
import QuickInserter from './components/quick-inserter';
import { icons, getIconByName, getIconType } from '../../utils/icons';
import { NativeResponsiveControl, NativeToggleControl, NativeTextControl, NativeRangeControl, PanelColorControl } from '../../components';

const folderOpen = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000000">
        <path d="M170-180q-29.15 0-49.58-20.42Q100-220.85 100-250v-457.69q0-29.15 21.58-50.73T172.31-780H362q14.46 0 27.81 5.62 13.34 5.61 23.19 15.46L471.92-700h354.62q12.77 0 21.38 8.62 8.62 8.61 8.62 21.38t-8.62 21.38q-8.61 8.62-21.38 8.62H447.38l-80-80H172.31q-5.39 0-8.85 3.46t-3.46 8.85V-240q0-5.39 2.12-4.04 2.11 1.35 5.57 3.27l77.85-259.92q7.23-23.31 26.61-37.46 19.39-14.16 43.08-14.16h514.46q36.77 0 58.35 29.23 21.57 29.23 11.34 63.77l-68.92 229.62q-6.85 22.53-25.65 36.11Q786-180 763.08-180H170Zm60.54-60h531q4.23 0 7.5-2.31 3.27-2.31 4.42-6.54l68.16-227.69q1.92-6.15-1.93-10.96-3.84-4.81-10-4.81H315.23q-4.23 0-7.5 2.31-3.27 2.31-4.42 6.54L230.54-240ZM160-500.08V-720-500.08ZM230.54-240l72.77-243.46q1.15-4.23 1.92-6.54l.77-2.31-1.35 4.81q-1.34 4.81-3.27 10.96l-68.15 227.69q-1.15 4.23-1.92 6.54l-.77 2.31Z" />
    </svg>
);

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
        linkRel,
        sizes,
        resMode,
        heading,
        description,
        showListTitle,
        showTitle,
        showDesc,
        listGap,
        titleColor,
        titleSize,
        descColor,
        descSize
    } = attributes;
    const cssCustomProperties = {
        ...(listGap && { '--list-gap': `${listGap}px` }),
        ...(titleColor && { '--title-color': titleColor }),
        ...(titleSize && { '--title-size': `${titleSize}px` }),
        ...(descColor && { '--desc-color': descColor }),
        ...(descSize && { '--desc-size': `${descSize}px` })
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [listGap, titleColor, titleSize, descColor, descSize]);

    // states
    const [isEditingURL, setIsEditingURL] = useState(false);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [modalState, setModalState] = useState({
        isOpen: false,
        activeTab: 'library'
    });

    const openModal = (tab = 'library') => {
        setModalState({
            isOpen: true,
            activeTab: tab
        });
    };

    const closeModal = () => {
        setModalState(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    const handleIconSelect = iconData => {
        setAttributes({
            iconName: iconData.name,
            iconType: getIconType(iconData.icon),
            customSvgCode: '' // Clear custom SVG when selecting library icon
        });
    };

    const handleCustomSvgInsert = ({ customSvgCode, iconType, strokeWidth }) => {
        setAttributes({
            customSvgCode,
            iconType,
            strokeWidth,
            iconName: '' // Clear icon name when using custom SVG
        });
    };

    // Function to render the current icon
    const renderCurrentIcon = (size = '24') => {
        if (customSvgCode) {
            return <div className="gutenlayouts-custom-svg-container" dangerouslySetInnerHTML={{ __html: customSvgCode }} />;
        }

        if (iconName) {
            const selectedIcon = getIconByName(iconName);
            if (selectedIcon) {
                return <Icon icon={selectedIcon.icon} size={size} />;
            }
        }

        return <Icon icon={icons[0].icon} size={size} />;
    };

    const borderProps = useBorderProps(attributes);
    const colorProps = useColorProps(attributes);
    const spacingProps = useSpacingProps(attributes);
    const shadowProps = useShadowProps(attributes);

    const blockProps = useBlockProps({
        style: cssCustomProperties,
        className: clsx(className, {
            [`is-${iconType}`]: iconType,
            [`justify-${justifyContent}`]: justifyContent
        })
    });

    return (
        <>
            <BlockControls group="other">
                <Button onClick={() => openModal('library')}>{__('Replace', 'gutenlayouts')}</Button>
            </BlockControls>
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
                    title={__('Link', 'gutenlayouts')}
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
                <PanelBody title={__('Settings', 'gutenlayouts')}>
                    <NativeToggleControl
                        label={__('Show List', 'gutenlayouts')}
                        checked={showListTitle}
                        onChange={value => setAttributes({ showListTitle: value })}
                    />
                    {showListTitle && (
                        <NativeToggleControl
                            label={__('Show Title', 'gutenlayouts')}
                            checked={showTitle}
                            onChange={value => setAttributes({ showTitle: value })}
                        />
                    )}
                    {showListTitle && (
                        <NativeToggleControl
                            label={__('Show Description', 'gutenlayouts')}
                            checked={showDesc}
                            onChange={value => setAttributes({ showDesc: value })}
                        />
                    )}
                    <BaseControl id="gutenlayouts-icon-settings" label={__('Icon', 'gutenlayouts')}>
                        <Dropdown
                            popoverProps={{
                                placement: 'left-start',
                                offset: 36,
                                shift: true
                            }}
                            className="gutenlayouts-icon-settings"
                            renderToggle={({ isOpen, onToggle, onClose }) => (
                                <div className="gutenlayouts-icon-settings__dropdown">
                                    <Button
                                        onClick={onToggle}
                                        aria-expanded={isOpen}
                                        className="gutenlayouts-icon-settings__dropdown-toggle"
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    >
                                        {!!(iconName || customSvgCode) ? (
                                            <span className="gutenlayouts-icon-settings__indicator">
                                                <Icon size={20} icon={renderCurrentIcon(20)} />
                                            </span>
                                        ) : (
                                            <span className="gutenlayouts-icon-settings__indicator disabled"></span>
                                        )}

                                        <span className="gutenlayouts-icon-settings__dropdown-label">
                                            {__(iconName || (customSvgCode ? 'Custom SVG' : 'Select Icon', 'gutenlayouts'))}
                                        </span>
                                    </Button>

                                    <Button
                                        label={__('Browse library', 'gutenlayouts')}
                                        onClick={() => {
                                            onClose();
                                            openModal('library');
                                        }}
                                        iconSize={18}
                                        size="small"
                                        icon={folderOpen}
                                        className="gutenlayouts-icon-settings__dropdown-more"
                                        __next40pxDefaultSize
                                        __nextHasNoMarginBottom
                                    />
                                </div>
                            )}
                            renderContent={({ onClose }) => (
                                <QuickInserter
                                    attributes={attributes}
                                    setAttributes={setAttributes}
                                    setIcon={handleIconSelect}
                                    onClose={onClose}
                                    openModal={openModal}
                                />
                            )}
                        />
                    </BaseControl>
                    <NativeResponsiveControl label={__('Icon Size (px)', 'gutenlayouts')} props={props}>
                        <RangeControl
                            value={sizes[resMode]}
                            onChange={value => setAttributes({ sizes: { ...sizes, [resMode]: value } })}
                            min={8}
                            max={256}
                            __next40pxDefaultSize
                        />
                    </NativeResponsiveControl>
                </PanelBody>
                {showListTitle && (
                    <PanelBody title={__('List Content', 'gutenlayouts')} initialOpen={false}>
                        <NativeRangeControl
                            label={__('Gap ', 'gutenlayouts')}
                            value={listGap}
                            onChange={value => setAttributes({ listGap: value })}
                            min={0}
                            max={100}
                        />
                        {showTitle && (
                            <NativeTextControl
                                label={__('Heading', 'gutenlayouts')}
                                value={heading}
                                onChange={value => setAttributes({ heading: value })}
                                placeholder={__('Add heading...', 'gutenlayouts')}
                            />
                        )}
                        {showDesc && (
                            <NativeTextControl
                                label={__('Description', 'gutenlayouts')}
                                value={description}
                                onChange={value => setAttributes({ description: value })}
                                placeholder={__('Add description...', 'gutenlayouts')}
                            />
                        )}
                    </PanelBody>
                )}
            </InspectorControls>
            <InspectorControls group="styles">
                {showTitle && (
                    <ToolsPanel
                        label={__('Title', 'gutenlayouts')}
                        resetAll={() =>
                            setAttributes({
                                titleSize: undefined,
                                titleColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!titleSize}
                            label={__('Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    titleSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gutenlayouts')}
                                value={titleSize}
                                onChange={value => setAttributes({ titleSize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!titleColor}
                            label={__('Color', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    titleColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Text Color', 'gutenlayouts')}
                                colorSettings={[
                                    {
                                        value: titleColor,
                                        onChange: color => setAttributes({ titleColor: color }),
                                        label: __('Color', 'gutenlayouts')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
                {showDesc && (
                    <ToolsPanel
                        label={__('Description', 'gutenlayouts')}
                        resetAll={() =>
                            setAttributes({
                                descSize: undefined,
                                descColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!descSize}
                            label={__('Size', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    descSize: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gutenlayouts')}
                                value={descSize}
                                onChange={value => setAttributes({ descSize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!descColor}
                            label={__('Color', 'gutenlayouts')}
                            onDeselect={() => {
                                setAttributes({
                                    descColor: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gutenlayouts')}
                                colorSettings={[
                                    {
                                        value: descColor,
                                        onChange: color => setAttributes({ descColor: color }),
                                        label: __('Color', 'gutenlayouts')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>

            <Library
                onClose={closeModal}
                onIconSelect={handleIconSelect}
                onCustomSvgInsert={handleCustomSvgInsert}
                currentIconName={iconName}
                currentCustomSvg={customSvgCode}
                currentIconSize={iconSize}
                currentStrokeWidth={strokeWidth}
                modalState={modalState}
                setModalState={setModalState}
            />

            <div {...blockProps}>
                <div className="gutenlayouts-icon-block-wrapper">
                    <div
                        className={clsx('icon-container', colorProps.className, borderProps.className)}
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
                        {renderCurrentIcon(iconSize)}
                    </div>
                    {showListTitle && (
                        <div className="icon-content">
                            {showTitle && (
                                <RichText
                                    tagName="h5"
                                    value={heading}
                                    onChange={value => setAttributes({ heading: value })}
                                    placeholder={__('Add heading...', 'gutenlayouts')}
                                    className="icon-heading"
                                />
                            )}
                            {showDesc && (
                                <RichText
                                    tagName="p"
                                    value={description}
                                    onChange={value => setAttributes({ description: value })}
                                    placeholder={__('Add description...', 'gutenlayouts')}
                                    className="icon-description"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
