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
		if ( Helpers::is_extension_enabled( 'visibility' ) ) {
			add_action( 'wp_head', array( $this, 'visibility_inline_styles' ) );
		}

		// Check if lightbox extension is enabled.
		if ( Helpers::is_extension_enabled( 'lightbox' ) ) {
			add_filter( 'render_block', array( $this, 'add_lightbox_class_to_gallery' ), 10, 2 );
		}

		// Check if custom CSS extension is enabled.
		if ( Helpers::is_extension_enabled( 'custom-css' ) ) {
			add_filter( 'render_block', array( $this, 'add_custom_css_to_block' ), 10, 2 );
			add_action( 'wp_head', array( $this, 'output_custom_css' ) );
		}

		// Check if iconic button extension is enabled.
		if ( Helpers::is_extension_enabled( 'iconic-button' ) ) {
			add_filter( 'render_block', array( $this, 'render_iconic_button' ), 10, 2 );
		}
	}

	/**
	 * Output visibility inline styles.
	 */
	public function visibility_inline_styles() {
		// Only output visibility styles if the page uses visibility classes.
		if ( Helpers::has_string(
			array(
				'gutenlayouts-hide-desktop',
				'gutenlayouts-hide-tablet',
				'gutenlayouts-hide-mobile',
			)
		) ) {
			echo '<style id="gl-layout-builder-visibility-inline-css">@media (min-width:1025px){.gutenlayouts-hide-desktop{display:none!important}}@media (min-width:768px) and (max-width:1024px){.gutenlayouts-hide-tablet{display:none!important}}@media (max-width:767px){.gutenlayouts-hide-mobile{display:none!important}}</style>';
		}
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

		$enable_btn_icon = $attrs['gllbEnableIconicBtn'] ?? false;

		if( ! $enable_btn_icon ) {
			return $block_content;
		}

		$icon_type = $attrs['gllbBtnIconType'];
		$custom_icon = $attrs['gllbBtnCustomSvg'];
		$icon_svg = $attrs['gllbBtnIcon'];

		$icon = $icon_type === 'custom' ? $custom_icon : $icon_svg;

		if( empty( $icon ) ) {
			return $block_content;
		}


		$position = isset( $attrs['gllbBtnIconPosition'] ) ? $attrs['gllbBtnIconPosition'] : '';
		$size     = isset( $attrs['gllbBtnIconSize'] ) ? $attrs['gllbBtnIconSize'] : '';
		$gap      = isset( $attrs['gllbBtnIconGap'] ) ? $attrs['gllbBtnIconGap'] : '';

		 // Build CSS custom properties
        $css_vars = '';
        if( ! empty( $size )) {
            $css_vars .= '--gutenlayouts-icon-size: ' . esc_attr( $size ) . ';';
        }
        if( ! empty( $gap ) ) {
            $css_vars .= '--gutenlayouts-icon-gap: ' . esc_attr( $gap ) . ';';
        }

        // Use WP_HTML_Tag_Processor to add styles to the wrapper div
        $processor = new \WP_HTML_Tag_Processor( $block_content );
        
        if ( $processor->next_tag( array( 'tag_name' => 'div', 'class_name' => 'wp-block-button' ) ) ) {
            // add class to button 
            $processor->add_class( 'gutenlayouts-btn-icon' );
            if( ! empty( $position ) ) {
                $processor->add_class(esc_attr( $position ));
            }
            if ( ! empty( $css_vars ) ) {
                $existing_style = $processor->get_attribute( 'style' ) ?? '';
                $new_style = trim( $existing_style . ' ' . $css_vars );
                $processor->set_attribute( 'style', $new_style );
            }
        }

        $modified_content = $processor->get_updated_html();

        // Now use regex to add the icon inside the button link
        // Pattern to match the button link content
        $pattern = '/(<a[^>]*class="[^"]*wp-block-button__link[^"]*"[^>]*>)(.*?)(<\/a>)/s';
        
        $modified_content = preg_replace_callback($pattern, function($matches) use ($icon, $position) {
            $opening_tag = $matches[1];
            $content = $matches[2];
            $closing_tag = $matches[3];
            
            // Clean up the existing content (remove extra whitespace)
            $content = trim($content);
            
            // Add icon based on position
            if ($position === 'before') {
                $new_content = $icon . $content;
            } else {
                $new_content = $content . $icon;
            }
            
            return $opening_tag . $new_content . $closing_tag;
        }, $modified_content);

        return $modified_content;

	}
}
