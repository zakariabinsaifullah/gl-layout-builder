/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    __experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
    __experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
    __experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
    __experimentalGetShadowClassesAndStyles as getShadowClassesAndStyles
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import Inspector from './inspector';
/**
 * External Dependencies
 */

/**
 * Internal Dependencies
 */
import Gamp from './map';
// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { address, zoom, type, height } = attributes;

    // Get block support props
    const borderProps = getBorderClassesAndStyles(attributes);
    const colorProps = getColorClassesAndStyles(attributes);
    const spacingProps = getSpacingClassesAndStyles(attributes);
    const shadowProps = getShadowClassesAndStyles(attributes);

    const cssCustomProperties = {
        ...(height && height?.Desktop && { '--desk-height': `${height.Desktop}px` }),
        ...(height && height?.Tablet && { '--tab-height': `${height.Tablet}px` }),
        ...(height && height?.Mobile && { '--mob-height': `${height.Mobile}px` })
    };

    // Block Props
    const supportStyles = {
        ...borderProps.style,
        ...colorProps.style,
        ...spacingProps.style,
        ...shadowProps.style
    };

    const blockProps = useBlockProps({ style: { ...supportStyles, ...cssCustomProperties } });

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [height]);

    /**
     * Block Props
     */

    return (
        <>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <Gamp location={address} zoom={zoom} type={type} className="embd-map" />
            </div>
        </>
    );
};

export default Edit;
