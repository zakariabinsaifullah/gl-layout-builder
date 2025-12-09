/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	TextareaControl,
	Button,
	Flex,
	RangeControl,
	Icon,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { getIconByName, icons, getIconType } from "../../../../utils/icons";

/**
 * ContentCustom Component
 * Displays custom SVG editor with preview and controls
 */
export const ContentCustom = ({
	tempCustomSvgCode,
	setTempCustomSvgCode,
	previewIconSize,
	setPreviewIconSize,
	previewStrokeWidth,
	setPreviewStrokeWidth,
	currentCustomSvg,
	currentIconName,
	insertCustomSVG,
	clearCustomSVG,
}) => {
	const tempIconType = getIconType(tempCustomSvgCode);

	// Function to render the current icon preview
	const renderCurrentIcon = (size, customCode, customStroke) => {
		const svgCode = customCode !== null ? customCode : currentCustomSvg;
		const currentType = getIconType(svgCode);

		if (svgCode) {
			let finalSvgCode = svgCode;

			if (currentType === "line" && customStroke !== null) {
				finalSvgCode = svgCode.replace(
					/stroke-width="([^"]*)"/g,
					`stroke-width="${customStroke}"`,
				);
			}

			return (
				<div
					className="gutenlayouts-custom-svg-container"
					dangerouslySetInnerHTML={{ __html: finalSvgCode }}
					style={{ width: `${size}px`, height: `${size}px` }}
				/>
			);
		}

		const selectedIcon = getIconByName(currentIconName);
		if (selectedIcon) {
			return <Icon icon={selectedIcon.icon} size={size} />;
		}

		return <Icon icon={icons[0].icon} size={size} />;
	};

	return (
		<div className="gutenlayouts-modal__custom-svg">
			<div className="gutenlayouts-modal__custom-svg-editor">
				<TextareaControl
					label={__("Custom SVG code", "gutenlayouts")}
					value={tempCustomSvgCode}
					onChange={setTempCustomSvgCode}
					help={__(
						"Paste your custom SVG code here. It will override the selected icon.",
						"gutenlayouts",
					)}
					rows={15}
				/>
			</div>

			<div className="gutenlayouts-modal__custom-svg-preview">
				<h3>{__("Preview", "gutenlayouts")}</h3>
				<div className="gutenlayouts-icon-preview-container">
					{tempCustomSvgCode ? (
						renderCurrentIcon(
							previewIconSize,
							tempCustomSvgCode,
							previewStrokeWidth,
						)
					) : (
						<div className="gutenlayouts-empty-preview">
							{__("Enter SVG code to see preview", "gutenlayouts")}
						</div>
					)}
				</div>

				<div className="gutenlayouts-modal__custom-svg-controls">
					<RangeControl
						label={__("Icon Size", "gutenlayouts")}
						value={previewIconSize}
						onChange={setPreviewIconSize}
						min={16}
						max={256}
						__next40pxDefaultSize
					/>

					{tempIconType === "line" && (
						<RangeControl
							label={__("Stroke Width", "gutenlayouts")}
							value={previewStrokeWidth}
							onChange={setPreviewStrokeWidth}
							min={0.5}
							max={5}
							step={0.1}
							__next40pxDefaultSize
						/>
					)}
				</div>
				<div className="gutenlayouts-modal__custom-svg-buttons">
					<Flex>
						<Button
							__next40pxDefaultSize
							variant="secondary"
							onClick={clearCustomSVG}
							isDestructive
							style={{ flex: "1", justifyContent: "center" }}
						>
							{__("Clear", "gutenlayouts")}
						</Button>
						<Button
							__next40pxDefaultSize
							variant="primary"
							onClick={insertCustomSVG}
							disabled={!tempCustomSvgCode}
							style={{ flex: "1", justifyContent: "center" }}
						>
							{__("Insert Custom Icon", "gutenlayouts")}
						</Button>
					</Flex>
				</div>
			</div>
		</div>
	);
};
