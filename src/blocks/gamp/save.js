/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Gamp from './map';
// block save function
const Save = props => {
    const { attributes } = props;
    const { uniqueId, address, zoom, type, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        className: ('wp-block-gutenlayouts-gmap', uniqueId),
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <Gamp location={address} zoom={zoom} type={type} className="embd-map" />
        </div>
    );
};

export default Save;
