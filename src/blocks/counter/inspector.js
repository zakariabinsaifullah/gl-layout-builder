import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

import {
    NativeToggleGroupControl,
    NativeRangeControl,
    NativeToggleControl,
    PanelColorControl,
    NativeSelectControl,
    NativeTextControl,
    NativeIconPicker,NativeBoxControl ,
    NativeBorderBoxControl 
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        startNumber,
        endNumber,
        counterPrefix,
        counterSuffix,
        titleText,
        titleTag,
        hideIcon,
        hidePrefix,
        hideTitle,
        hideCounter,
        hideSuffix,
        iconType,
        iconName,
        customSvgCode,
        iconTypeImage,
        counterDirection,
        duration,
        alignment,
        counterSize,
        counterColor,
        counterTsize,
        counterTcolor,
        iconColor,
        iconSize,
        itemGap,
        contentGap,
        prefixSize,
        prefixColor,
        suffixSize,
        suffixColor,
        useSeparator,
        separatorType,
        isIndianSystem,
        decimalPlaces,
        iconBg,
        iconPadding,
        iconBorderRadius,
        iconBorder
    } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Layout', 'gl-layout-builder')} initialOpen={true}>
                    <NativeToggleGroupControl
                        label={__('Alignment', 'gl-layout-builder')}
                        value={alignment}
                        onChange={value => setAttributes({ alignment: value })}
                        options={[
                            { value: 'left', label: __('Left', 'gl-layout-builder') },
                            { value: 'center', label: __('Center', 'gl-layout-builder') },
                            { value: 'right', label: __('Right', 'gl-layout-builder') }
                        ]}
                    />
                    <NativeToggleGroupControl
                        label={__('Direction', 'gl-layout-builder')}
                        value={counterDirection}
                        onChange={value => setAttributes({ counterDirection: value })}
                        options={[
                            { value: 'column', label: __('Column', 'gl-layout-builder') },
                            { value: 'row', label: __('Row', 'gl-layout-builder') }
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Counter Settings', 'gl-layout-builder')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Show Counter', 'gl-layout-builder')}
                        checked={hideCounter}
                        onChange={value => setAttributes({ hideCounter: value })}
                    />
                    {hideCounter && (
                        <>
                            <div className="gl-counter-numbers-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <NativeTextControl
                                    label={__('Start', 'gl-layout-builder')}
                                    value={startNumber}
                                    type="number"
                                    onChange={value => setAttributes({ startNumber: value === '' ? 0 : parseFloat(value) })}
                                />
                                <NativeTextControl
                                    label={__('End', 'gl-layout-builder')}
                                    value={endNumber}
                                    type="number"
                                    onChange={value => setAttributes({ endNumber: value === '' ? 0 : parseFloat(value) })}
                                />
                            </div>

                            <NativeToggleControl
                                label={__('Show Prefix', 'gl-layout-builder')}
                                checked={hidePrefix}
                                onChange={value => setAttributes({ hidePrefix: value })}
                            />
                            {hidePrefix && (
                                <NativeTextControl
                                    label={__('Prefix', 'gl-layout-builder')}
                                    value={counterPrefix}
                                    onChange={value => setAttributes({ counterPrefix: value })}
                                />
                            )}

                            <NativeToggleControl
                                label={__('Show Suffix', 'gl-layout-builder')}
                                checked={hideSuffix}
                                onChange={value => setAttributes({ hideSuffix: value })}
                            />
                            {hideSuffix && (
                                <NativeTextControl
                                    label={__('Suffix', 'gl-layout-builder')}
                                    value={counterSuffix}
                                    onChange={value => setAttributes({ counterSuffix: value })}
                                />
                            )}
                            
                            <NativeRangeControl
                                label={__('Decimal Places', 'gl-layout-builder')}
                                value={decimalPlaces}
                                onChange={value => setAttributes({ decimalPlaces: value })}
                                min={0}
                                max={5}
                            />

                            <NativeToggleControl
                                label={__('Use Separator', 'gl-layout-builder')}
                                checked={useSeparator}
                                onChange={value => setAttributes({ useSeparator: value })}
                            />
                            {useSeparator && (
                                <>
                                    <NativeSelectControl
                                        label={__('Separator', 'gl-layout-builder')}
                                        value={separatorType}
                                        options={[
                                            { label: __('Comma (,)', 'gl-layout-builder'), value: ',' },
                                            { label: __('Dot (.)', 'gl-layout-builder'), value: '.' },
                                            { label: __('Space', 'gl-layout-builder'), value: ' ' }
                                        ]}
                                        onChange={value => setAttributes({ separatorType: value })}
                                    />
                                    <NativeToggleControl
                                        label={__('Indian Format', 'gl-layout-builder')}
                                        checked={isIndianSystem}
                                        onChange={value => setAttributes({ isIndianSystem: value })}
                                    />
                                </>
                            )}

                            <NativeRangeControl
                                label={__('Duration (s)', 'gl-layout-builder')}
                                value={duration}
                                onChange={value => setAttributes({ duration: value })}
                                min={0.1}
                                max={10}
                                step={0.1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Icon Settings', 'gl-layout-builder')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Show Icon', 'gl-layout-builder')}
                        checked={hideIcon}
                        onChange={value => setAttributes({ hideIcon: value })}
                    />
                    {hideIcon && (
                        <>
                            <NativeToggleGroupControl
                                label={__('Icon Type', 'gl-layout-builder')}
                                value={iconType}
                                onChange={value => setAttributes({ iconType: value })}
                                options={[
                                    { value: 'icon', label: __('Icon', 'gl-layout-builder') },
                                    { value: 'image', label: __('Image', 'gl-layout-builder') }
                                ]}
                            />
                            {iconType === 'icon' ? (
                                <NativeIconPicker
                                    onIconSelect={(iconName, type) => {
                                        setAttributes({ iconName, iconType: 'icon', customSvgCode: undefined });
                                    }}
                                    onCustomSvgInsert={({ customSvgCode, type }) => {
                                        setAttributes({ customSvgCode, iconType: 'icon', iconName: undefined });
                                    }}
                                    iconName={iconName}
                                    customSvgCode={customSvgCode}
                                />
                            ) : (
                                <div className="gl-media-upload-wrapper">
                                    <MediaUpload
                                        onSelect={media => {
                                            setAttributes({
                                                iconTypeImage: {
                                                    id: media.id,
                                                    url: media.url,
                                                    alt: media.alt,
                                                    sizes: media.sizes
                                                }
                                            });
                                        }}
                                        allowedTypes={['image']}
                                        value={iconTypeImage && iconTypeImage.id}
                                        render={({ open }) => (
                                            <Button className="gl-image-upload-button" variant="secondary" onClick={open}>
                                                {!iconTypeImage ? __('Select Image', 'gl-layout-builder') : __('Replace Image', 'gl-layout-builder')}
                                            </Button>
                                        )}
                                    />
                                    {iconTypeImage && (
                                        <Button
                                            variant="link"
                                            isDestructive
                                            onClick={() => setAttributes({ iconTypeImage: null })}
                                            style={{ marginTop: '10px', display: 'block' }}
                                        >
                                            {__('Remove Image', 'gl-layout-builder')}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Title Settings', 'gl-layout-builder')} initialOpen={false}>
                    <NativeToggleControl
                        label={__('Show Title', 'gl-layout-builder')}
                        checked={hideTitle}
                        onChange={value => setAttributes({ hideTitle: value })}
                    />
                    {hideTitle && (
                        <>
                            <NativeSelectControl
                                label={__('Tag', 'gl-layout-builder')}
                                value={titleTag}
                                options={[
                                    { label: __('H1', 'gl-layout-builder'), value: 'h1' },
                                    { label: __('H2', 'gl-layout-builder'), value: 'h2' },
                                    { label: __('H3', 'gl-layout-builder'), value: 'h3' },
                                    { label: __('H4', 'gl-layout-builder'), value: 'h4' },
                                    { label: __('H5', 'gl-layout-builder'), value: 'h5' },
                                    { label: __('H6', 'gl-layout-builder'), value: 'h6' },
                                    { label: __('P', 'gl-layout-builder'), value: 'p' },
                                    { label: __('Div', 'gl-layout-builder'), value: 'div' }
                                ]}
                                onChange={value => setAttributes({ titleTag: value })}
                            />
                            <NativeTextControl
                                label={__('Title', 'gl-layout-builder')}
                                value={titleText}
                                onChange={value => setAttributes({ titleText: value })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Gap Settings', 'gl-layout-builder')} initialOpen={false}>
                    <NativeRangeControl
                        label={__('Item Gap', 'gl-layout-builder')}
                        value={itemGap}
                        onChange={value => setAttributes({ itemGap: value })}
                        min={0}
                        max={100}
                    />
                    <NativeRangeControl
                        label={__('Content Gap', 'gl-layout-builder')}
                        value={contentGap}
                        onChange={value => setAttributes({ contentGap: value })}
                        min={0}
                        max={100}
                    />
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                {hideCounter && (
                    <ToolsPanel
                        label={__('Counter', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                counterSize: undefined,
                                counterColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!counterSize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ counterSize: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gl-layout-builder')}
                                value={counterSize}
                                onChange={value => setAttributes({ counterSize: value })}
                                min={0}
                                max={150}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!counterColor}
                            label={__('Color', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ counterColor: undefined })}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gl-layout-builder')}
                                colorSettings={[
                                    {
                                        value: counterColor,
                                        onChange: color => setAttributes({ counterColor: color }),
                                        label: __('Color', 'gl-layout-builder')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {hidePrefix && (
                    <ToolsPanel
                        label={__('Prefix', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                prefixSize: undefined,
                                prefixColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!prefixSize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ prefixSize: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gl-layout-builder')}
                                value={prefixSize}
                                onChange={value => setAttributes({ prefixSize: value })}
                                min={0}
                                max={150}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!prefixColor}
                            label={__('Color', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ prefixColor: undefined })}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gl-layout-builder')}
                                colorSettings={[
                                    {
                                        value: prefixColor,
                                        onChange: color => setAttributes({ prefixColor: color }),
                                        label: __('Color', 'gl-layout-builder')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {hideSuffix && (
                    <ToolsPanel
                        label={__('Suffix', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                suffixSize: undefined,
                                suffixColor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!suffixSize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ suffixSize: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gl-layout-builder')}
                                value={suffixSize}
                                onChange={value => setAttributes({ suffixSize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!suffixColor}
                            label={__('Color', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ suffixColor: undefined })}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gl-layout-builder')}
                                colorSettings={[
                                    {
                                        value: suffixColor,
                                        onChange: color => setAttributes({ suffixColor: color }),
                                        label: __('Color', 'gl-layout-builder')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {hideTitle && (
                    <ToolsPanel
                        label={__('Title', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                counterTsize: undefined,
                                counterTcolor: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!counterTsize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ counterTsize: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Font Size', 'gl-layout-builder')}
                                value={counterTsize}
                                onChange={value => setAttributes({ counterTsize: value })}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => !!counterTcolor}
                            label={__('Color', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ counterTcolor: undefined })}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Color', 'gl-layout-builder')}
                                colorSettings={[
                                    {
                                        value: counterTcolor,
                                        onChange: color => setAttributes({ counterTcolor: color }),
                                        label: __('Color', 'gl-layout-builder')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}

                {hideIcon && (
                    <ToolsPanel
                        label={__('Icon Box', 'gl-layout-builder')}
                        resetAll={() =>
                            setAttributes({
                                iconSize: undefined,
                                iconColor: undefined,
                                iconBg: undefined,
                                iconPadding: undefined,
                                iconBorderRadius: undefined,
                                iconBorder: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!iconSize}
                            label={__('Size', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ iconSize: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeRangeControl
                                label={__('Size', 'gl-layout-builder')}
                                value={iconSize}
                                onChange={value => setAttributes({ iconSize: value })}
                                min={0}
                                max={200}
                                step={1}
                            />
                        </ToolsPanelItem>
                        
                        {iconType === 'icon' && (
                            <ToolsPanelItem
                                hasValue={() => !!iconColor}
                                label={__('Icon Color', 'gl-layout-builder')}
                                onDeselect={() => setAttributes({ iconColor: undefined })}
                                onSelect={() => {}}
                            >
                                <PanelColorControl
                                    label={__('Icon Color', 'gl-layout-builder')}
                                    colorSettings={[{
                                        value: iconColor,
                                        onChange: color => setAttributes({ iconColor: color }),
                                        label: __('Icon Color', 'gl-layout-builder')
                                    }]}
                                />
                            </ToolsPanelItem>
                        )}

                        <ToolsPanelItem
                            hasValue={() => !!iconBg}
                            label={__('Background', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ iconBg: undefined })}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Background', 'gl-layout-builder')}
                                colorSettings={[{
                                    value: iconBg,
                                    onChange: color => setAttributes({ iconBg: color }),
                                    label: __('Background', 'gl-layout-builder')
                                }]}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => iconPadding && Object.values(iconPadding).some(v => v !== '')}
                            label={__('Padding', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ iconPadding: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeBoxControl
                                label={__('Padding', 'gl-layout-builder')}
                                value={iconPadding}
                                onChange={v => setAttributes({ iconPadding: v })}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => iconBorderRadius && Object.values(iconBorderRadius).some(v => v !== '')}
                            label={__('Radius', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ iconBorderRadius: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeBoxControl
                                label={__('Radius', 'gl-layout-builder')}
                                value={iconBorderRadius}
                                onChange={v => setAttributes({ iconBorderRadius: v })}
                            />
                        </ToolsPanelItem>

                        <ToolsPanelItem
                            hasValue={() => iconBorder && Object.values(iconBorder).some(v => v !== '')}
                            label={__('Border', 'gl-layout-builder')}
                            onDeselect={() => setAttributes({ iconBorder: undefined })}
                            onSelect={() => {}}
                        >
                            <NativeBorderBoxControl
                                label={__('Border', 'gl-layout-builder')}
                                value={iconBorder}
                                onChange={v => setAttributes({ iconBorder: v })}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
            </InspectorControls>
        </>
    );
};

export default Inspector;
