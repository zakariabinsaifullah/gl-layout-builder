/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import Inspector from './inspector';
import { generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';
/**
 * External Dependencies
 */

/**
 * Internal Dependencies
 */
import Gamp from './map';
// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const { address, zoom, type, height, mapBorder, mapRadius } = attributes;
    const borderWidth = mapBorder ? generateBorderWidth(mapBorder) : null;
    const borderStyle = mapBorder ? generateBorderStyle(mapBorder) : null;
    const borderColor = mapBorder ? generateBorderColor(mapBorder) : null;

    const cssCustomProperties = {
        ...(height && { '--map-height': `${height}px` }),
        ...(borderWidth && { '--map-width': borderWidth }),
        ...(borderStyle && { '--mapborder-style': borderStyle }),
        ...(borderColor && { '--mapborder-color': borderColor }),
        ...(mapRadius && { '--radius': `${mapRadius}px` })
    };
    const blockProps = useBlockProps({ style: cssCustomProperties });
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [height, mapBorder, mapRadius]);
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
