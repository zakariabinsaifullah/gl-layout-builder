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
 * Class to handle plugin extensions like visibility control.
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
		add_action( 'wp_head', array( $this, 'visibility_inline_styles' ) );
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
}
