import { useEffect } from '@wordpress/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';

export default function Edit(props) {
    const { attributes, setAttributes } = props;
    const { effectStyle, blurStrength, scaleStrength, blockStyle } = attributes;

    const cssCustomProperties = {
        '--scb-blur-strength': blurStrength,
        '--scb-scale-strength': scaleStrength
    };

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [blurStrength, scaleStrength, effectStyle]);

    const blockProps = useBlockProps({
        className: `wp-block-gutenlayouts-stacked-card has-effect-${effectStyle}`,
        style: blockStyle
    });

    return (
        <>
            <Inspector {...props} />
            <div {...blockProps}>
                <div className="sc-stack-wrapper">
                    <InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
                </div>
            </div>
        </>
    );
}
