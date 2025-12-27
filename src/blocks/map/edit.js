/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
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

    const cssCustomProperties = {
        ...(height && height?.Desktop && { '--desk-height': `${height.Desktop}px` }),
        ...(height && height?.Tablet && { '--tab-height': `${height.Tablet}px` }),
        ...(height && height?.Mobile && { '--mob-height': `${height.Mobile}px` })
    };
    const blockProps = useBlockProps({ style: cssCustomProperties });
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
