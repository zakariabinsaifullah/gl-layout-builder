/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Gamp from './map';

const Save = props => {
    const { attributes } = props;
    const { address, zoom, type, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <Gamp location={address} zoom={zoom} type={type} className="embd-map" />
        </div>
    );
};

export default Save;
