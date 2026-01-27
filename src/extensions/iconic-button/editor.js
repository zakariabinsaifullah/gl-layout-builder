import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import classnames from 'classnames';

import { softMinifyCssStrings, svgToBase64DataUrl } from '../../helpers';
import { allowedBlocks } from './allowed-blocks';

/**
 * Button Icon HOC - Updated to preserve existing classes
 */
const gutenlayoutsBtnIconEditor = createHigherOrderComponent(BlockListBlock => {
    return props => {
        if (!allowedBlocks.includes(props.name)) {
            return <BlockListBlock {...props} />;
        }

        const { attributes, clientId, className: existingClassName } = props;
        const {
            gllbEnableIconicBtn,
            gllbBtnIconName,
            gllbBtnCustomSvg,
            gllbBtnIcon,
            gllbBtnIconPosition,
            gllbBtnIconSize,
            gllbBtnIconGap
        } = attributes;

        if (!gllbEnableIconicBtn) {
            return <BlockListBlock {...props} />;
        }

        // Use custom SVG if available, or fallback to old attribute
        const iconSVG = gllbBtnCustomSvg || gllbBtnIcon;

        if (!iconSVG && !gllbBtnIconName) {
            return <BlockListBlock {...props} />;
        }

        // unique class
        const uniqueClass = `gutenlayouts-btn-icon-${clientId.slice(0, 8)}`;

        const btnIconClass = classnames('gutenlayouts-btn-icon', uniqueClass, {
            [gllbBtnIconPosition]: gllbBtnIconPosition !== ''
        });

        // Combine existing className with animation class
        const combinedClassName = existingClassName ? `${existingClassName} ${btnIconClass}` : btnIconClass;

        // If we have an SVG code, we use the mask approach
        let maskStyle = '';
        if (iconSVG) {
            if (gllbBtnIconGap) {
                maskStyle += `
                .gutenlayouts-btn-icon.${uniqueClass} .wp-block-button__link{
                    --gutenlayouts-icon-gap: ${gllbBtnIconGap}!important;
                }`;
            }
            if (gllbBtnIconSize) {
                maskStyle += `
                .gutenlayouts-btn-icon.${uniqueClass} .wp-block-button__link::after{
                    --gutenlayouts-icon-size: ${gllbBtnIconSize}!important;
                }`;
            }
            maskStyle += `
            .gutenlayouts-btn-icon.${uniqueClass} .wp-block-button__link::after{
                --gutenlayouts-icon-url: url("${svgToBase64DataUrl(iconSVG)}");
            }`;
        }

        return (
            <>
                {maskStyle && <style>{softMinifyCssStrings(maskStyle)}</style>}
                <BlockListBlock {...props} className={combinedClassName} />
            </>
        );
    };
}, 'gutenlayoutsBtnIconEditor');

addFilter('editor.BlockListBlock', 'gutenlayouts/iconic-button-editor', gutenlayoutsBtnIconEditor);
