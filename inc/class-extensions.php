<?php
/**
 * Extensions Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to handle plugin extensions like visibility control, lightbox, and custom CSS.
 */
class Extensions {

	/**
	 * Instance of this class.
	 *
	 * @var Extensions
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Extensions A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		// Check if visibility extension is enabled.
		if ( $this->is_extension_enabled( 'visibility' ) ) {
			add_action( 'wp_head', array( $this, 'visibility_inline_styles' ) );
		}

		// Check if lightbox extension is enabled.
		if ( $this->is_extension_enabled( 'lightbox' ) ) {
			add_filter( 'render_block', array( $this, 'add_lightbox_class_to_gallery' ), 10, 2 );
		}

		// Check if custom CSS extension is enabled.
		if ( $this->is_extension_enabled( 'custom-css' ) ) {
			add_filter( 'render_block', array( $this, 'add_custom_css_to_block' ), 10, 2 );
			add_action( 'wp_head', array( $this, 'output_custom_css' ) );
		}

		// Check if iconic button extension is enabled.
		if ( $this->is_extension_enabled( 'iconic-button' ) ) {
			add_filter( 'render_block', array( $this, 'render_iconic_button' ), 10, 2 );
		}
	}

	/**
	 * Check if an extension is enabled.
	 *
	 * @param string $extension_id Extension ID to check.
	 * @return bool True if enabled, false otherwise.
	 */
	private function is_extension_enabled( $extension_id ) {
		$raw_settings       = get_option( 'gllb_settings', false );
		$enabled_extensions = array();

		// If no settings saved yet, enable all extensions by default.
		if ( false === $raw_settings ) {
			return true;
		}

		$enabled_extensions = isset( $raw_settings['extensions'] ) ? (array) $raw_settings['extensions'] : array();

		// Force enable during development/debugging
		if ( 'iconic-button' === $extension_id ) {
			return true;
		}

		return in_array( $extension_id, $enabled_extensions, true );
	}

	/**
	 * Output visibility inline styles.
	 */
	public function visibility_inline_styles() {
		// Only output visibility styles if the page uses visibility classes.
		if ( $this->has_classes(
			array(
				'gl-layout-builder-hide-desktop',
				'gl-layout-builder-hide-tablet',
				'gl-layout-builder-hide-mobile',
			)
		) ) {
			echo '<style id="gl-layout-builder-visibility-inline-css">@media (min-width:1025px){.gl-layout-builder-hide-desktop{display:none!important}}@media (min-width:768px) and (max-width:1024px){.gl-layout-builder-hide-tablet{display:none!important}}@media (max-width:767px){.gl-layout-builder-hide-mobile{display:none!important}}</style>';
		}
	}

	/**
	 * Check if the current page contains specific CSS classes.
	 * Supports both traditional posts/pages and FSE block theme templates.
	 *
	 * @param array $classes Array of CSS class names to search for.
	 * @return bool True if any of the classes are found, false otherwise.
	 */
	public function has_classes( $classes = array() ) {
		global $post, $_wp_current_template_content;

		// Return false if no classes provided.
		if ( empty( $classes ) || ! is_array( $classes ) ) {
			return false;
		}

		// Check traditional post content (posts, pages, CPTs).
		if ( $post && isset( $post->post_content ) ) {
			foreach ( $classes as $class ) {
				if ( false !== strpos( $post->post_content, $class ) ) {
					return true;
				}
			}
		}

		// Only check block theme content if using a block theme.
		if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
			// Check FSE block theme template content.
			if ( ! empty( $_wp_current_template_content ) ) {
				foreach ( $classes as $class ) {
					if ( false !== strpos( $_wp_current_template_content, $class ) ) {
						return true;
					}
				}
			}

			// Check current template and template parts for block themes.
			if ( function_exists( 'get_block_templates' ) ) {
				// Get all templates and template parts.
				$templates      = get_block_templates( array(), 'wp_template' );
				$template_parts = get_block_templates( array(), 'wp_template_part' );
				$all_templates  = array_merge( $templates, $template_parts );

				foreach ( $all_templates as $template ) {
					if ( ! empty( $template->content ) ) {
						foreach ( $classes as $class ) {
							if ( false !== strpos( $template->content, $class ) ) {
								return true;
							}
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * Add lightbox class to gallery blocks.
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block data.
	 * @return string Modified block content.
	 */
	public function add_lightbox_class_to_gallery( $block_content, $block ) {
		// Only process gallery blocks.
		if ( 'core/gallery' !== $block['blockName'] ) {
			return $block_content;
		}

		// Check if lightbox is enabled for this block.
		if ( isset( $block['attrs']['gutenlayoutsEnableLightbox'] ) && $block['attrs']['gutenlayoutsEnableLightbox'] ) {
			// Add the lightbox class to the gallery.
			$block_content = str_replace( 'class="', 'class="gutenlayouts-lightbox ', $block_content );
		}

		return $block_content;
	}

	/**
	 * Add custom CSS class to blocks.
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block data.
	 * @return string Modified block content.
	 */
	public function add_custom_css_to_block( $block_content, $block ) {
		// Check if block has custom CSS.
		if ( ! isset( $block['attrs']['gutenlayoutsDynamicClass'] ) || empty( $block['attrs']['gutenlayoutsDynamicClass'] ) ) {
			return $block_content;
		}

		$dynamic_class = $block['attrs']['gutenlayoutsDynamicClass'];

		// Add the dynamic class to the block.
		$block_content = str_replace( 'class="', 'class="' . esc_attr( $dynamic_class ) . ' ', $block_content );

		return $block_content;
	}

	/**
	 * Output custom CSS in wp_head.
	 */
	public function output_custom_css() {
		global $post;

		if ( ! $post || ! isset( $post->post_content ) ) {
			return;
		}

		// Parse blocks from post content.
		$blocks = parse_blocks( $post->post_content );
		$css    = '';

		// Recursively collect custom CSS from all blocks.
		$css = $this->collect_custom_css( $blocks );

		if ( ! empty( $css ) ) {
			echo '<style id="gutenlayouts-custom-css">' . $this->minify_css( $css ) . '</style>';
		}
	}

	/**
	 * Recursively collect custom CSS from blocks.
	 *
	 * @param array $blocks Array of blocks.
	 * @return string Collected CSS.
	 */
	private function collect_custom_css( $blocks ) {
		$css = '';

		foreach ( $blocks as $block ) {
			// Check if block has custom CSS.
			if ( isset( $block['attrs']['gutenlayoutsCustomCSS'] ) && ! empty( $block['attrs']['gutenlayoutsCustomCSS'] ) ) {
				$custom_css    = $block['attrs']['gutenlayoutsCustomCSS'];
				$dynamic_class = isset( $block['attrs']['gutenlayoutsDynamicClass'] ) ? $block['attrs']['gutenlayoutsDynamicClass'] : '';

				if ( ! empty( $dynamic_class ) ) {
					// Replace 'selector' with the dynamic class.
					$custom_css = str_replace( 'selector', '.' . $dynamic_class, $custom_css );
					$css       .= $custom_css;
				}
			}

			// Recursively process inner blocks.
			if ( ! empty( $block['innerBlocks'] ) ) {
				$css .= $this->collect_custom_css( $block['innerBlocks'] );
			}
		}

		return $css;
	}

	/**
	 * Minify CSS string.
	 *
	 * @param string $css CSS string.
	 * @return string Minified CSS.
	 */
	private function minify_css( $css ) {
		// Remove comments.
		$css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
		// Remove whitespace.
		$css = str_replace( array( "\r\n", "\r", "\n", "\t", '  ', '    ', '    ' ), '', $css );
		// Remove spaces around selectors and properties.
		$css = preg_replace( '/\s*([{}|:;,])\s+/', '$1', $css );
		// Remove trailing semicolons.
		$css = str_replace( ';}', '}', $css );

		return trim( $css );
	}

	/**
	 * Render iconic button styles and classes.
	 *
	 * @param string $block_content Block content.
	 * @param array  $block Block data.
	 * @return string Modified block content.
	 */
	public function render_iconic_button( $block_content, $block ) {
		// Only process button blocks.
		if ( 'core/button' !== $block['blockName'] ) {
			return $block_content;
		}

		$attrs = $block['attrs'];

		$icon_svg = isset( $attrs['gutenlayoutsBtnCustomSvg'] ) ? $attrs['gutenlayoutsBtnCustomSvg'] : '';
		
		// Fallback to old attribute name if available
		if ( empty( $icon_svg ) && isset( $attrs['gutenlayoutsBtnIcon'] ) ) {
			$icon_svg = $attrs['gutenlayoutsBtnIcon'];
		}

		if ( empty( $icon_svg ) && ! isset( $attrs['gutenlayoutsBtnIconName'] ) ) {
			return $block_content;
		}

		$position = isset( $attrs['gutenlayoutsBtnIconPosition'] ) ? $attrs['gutenlayoutsBtnIconPosition'] : '';
		$size     = isset( $attrs['gutenlayoutsBtnIconSize'] ) ? $attrs['gutenlayoutsBtnIconSize'] : 1;
		$gap      = isset( $attrs['gutenlayoutsBtnIconGap'] ) ? $attrs['gutenlayoutsBtnIconGap'] : 0;

		// Generate a unique class based on attributes to avoid conflicts.
		$unique_id    = substr( md5( serialize( $attrs ) ), 0, 8 );
		$unique_class = 'gutenlayouts-btn-icon-' . $unique_id;

		$classes = 'gutenlayouts-btn-icon ' . $unique_class;
		if ( ! empty( $position ) ) {
			$classes .= ' ' . $position;
		}

		$block_content = str_replace( 'class="', 'class="' . esc_attr( $classes ) . ' ', $block_content );

		$style = '';
		if ( ! empty( $icon_svg ) ) {
			$svg_base64 = 'data:image/svg+xml;base64,' . base64_encode( $icon_svg );
			$style      = "
				.gutenlayouts-btn-icon.{$unique_class} .wp-block-button__link{
					--gutenlayouts-icon-gap: {$gap}px !important;
				}
				.gutenlayouts-btn-icon.{$unique_class} .wp-block-button__link::after{
					--gutenlayouts-icon-url: url('{$svg_base64}') !important;
					--gutenlayouts-icon-size: {$size}em !important;
				}
			";
		}

		return ( ! empty( $style ) ? '<style>' . $this->minify_css( $style ) . '</style>' : '' ) . $block_content;
	}
}
