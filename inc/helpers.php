<?php 

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Helpers {
 
    /**
	 * Check if an extension is enabled.
	 *
	 * @param string $extension_id Extension ID to check.
	 * @return bool True if enabled, false otherwise.
	 */
	public static function is_extension_enabled( $extension_id ) {
		$raw_settings       = get_option( 'gllb_settings', false );
		$enabled_extensions = array();

		// If no settings saved yet, enable all extensions by default.
		if ( false === $raw_settings ) {
			return true;
		}

		$enabled_extensions = isset( $raw_settings['extensions'] ) ? (array) $raw_settings['extensions'] : array();

		return in_array( $extension_id, $enabled_extensions, true );
	}

	/**
	 * Check if the current page contains specific CSS classes.
	 * Supports both traditional posts/pages and FSE block theme templates.
	 *
	 * @param array $strings Array of strings to search for.
	 * @return bool True if any of the strings are found, false otherwise.
	 */
	public static function has_string( $strings = array() ) {
		global $post, $_wp_current_template_content;

		// Return false if no classes provided.
		if ( empty( $strings ) || ! is_array( $strings ) ) {
			return false;
		}

		// Check traditional post content (posts, pages, CPTs).
		if ( $post && isset( $post->post_content ) ) {
			foreach ( $strings as $string ) {
				if ( false !== strpos( $post->post_content, $string ) ) {
					return true;
				}
			}
		}

		// Only check block theme content if using a block theme.
		if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
			// Check FSE block theme template content.
			if ( ! empty( $_wp_current_template_content ) ) {
				foreach ( $strings as $string ) {
					if ( false !== strpos( $_wp_current_template_content, $string ) ) {
						return true;
					}
				}
			}
		}

		return false;
	}

	/**
	 * Mask license key.
	 *
	 * @param string $license_key License key to mask.
	 * @return string Masked license key.
	 */
	public static function mask_license_key( $license_key ) {
		$visible_part = substr( $license_key, 0, 8 );
		$masked_part = preg_replace( '/[^-]/', 'X', substr( $license_key, 8 ) );
		return $visible_part . $masked_part;
	}

    /**
     * Get available blocks.
     *
     * @return array
     */
    public static function get_available_blocks() {
		return array(
			'carousel' => array(
				'title' => __( 'Carousel', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M80-360v-240q0-33 23.5-56.5T160-680q33 0 56.5 23.5T240-600v240q0 33-23.5 56.5T160-280q-33 0-56.5-23.5T80-360Zm280 160q-33 0-56.5-23.5T280-280v-400q0-33 23.5-56.5T360-760h240q33 0 56.5 23.5T680-680v400q0 33-23.5 56.5T600-200H360Zm360-160v-240q0-33 23.5-56.5T800-680q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280q-33 0-56.5-23.5T720-360Zm-360 80h240v-400H360v400Zm120-200Z" /></svg>',
				'desc'  => __('Create carousel or slider with any content', 'gl-layout-builder')
			),
			'icon'     => array(
				'title' => __( 'Icon', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm-14 50v146.23q0 13.31 12.5 16.04 12.5 2.73 18.19-8.96l99.46-226.62q3.85-9.23-1.45-17.96T579.69-530H500v-149.38q0-13.31-12.5-16.35-12.5-3.04-18.19 8.65L365.23-456.69q-3.84 9.84 1.08 18.27 4.92 8.42 14.77 8.42H466Z" /></svg>',
				'desc'  => __('Show SVG icon with stylish look', 'gl-layout-builder')
			),
			'map'      => array(
				'title' => __( 'Google Map', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" focusable="false"><path d="M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"></path></svg>',
				'desc'  => __('Embed google map without API key', 'gl-layout-builder')
			),
			'marque'   => array(
				'title' => __( 'Marquee', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" aria-hidden="true" focusable="false"><path d="M4 6.5h5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4V16h5a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 9 8H4V6.5Zm16 0h-5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h5V16h-5a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 15 8h5V6.5Z"></path></svg>',
				'desc'  => __('Create infinite loop of any content', 'gl-layout-builder'),
				'is_pro' => true,
			),
			'progress' => array(
				'title' => __( 'Progress', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" /></svg>',
				'desc'  => __('Interactive process in circle and bar style', 'gl-layout-builder')
			),
			'rating'   => array(
				'title' => __( 'Rating', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" aria-hidden="true" focusable="false"><path d="M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"></path></svg>',
				'desc'  => __('SVG star rating system', 'gl-layoutBuilder')
			),
			'tabs'   => array(
				'title' => __( 'Tabs', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-240h640v-320H520v-160H160v480Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80v-480 480Z" /></svg>',
				'desc'  => __('Shows content in tabs', 'gl-layout-builder'),
				'is_pro' => true,
			),
			'lightbox'   => array(
				'title' => __( 'Lightbox', 'gl-layout-builder' ),
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60" aria-hidden="true" focusable="false"><path d="M18.5 5.5V8H20V5.5h2.5V4H20V1.5h-1.5V4H16v1.5h2.5zM12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6h-1.5v6a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5h6V4z"></path></svg>',
				'desc'  => __('Showcase your content in a lightbox', 'gl-layout-builder'),
				'is_pro' => true,
			),
		);
	}


	/**
	 * Get all available extensions.
	 *
	 * @return array
	 */
	public static function get_available_extensions() {
		return array(
			'visibility' => array(
				'title' => __( 'Responsive Visibility', 'gl-layout-builder' ),
				'icon'  => 'dashicons-visibility',
				'demo'  => 'https://gutenlayouts.com/extensions/#visibility',
			),
			'custom-css' => array(
				'title' => __( 'Custom CSS', 'gl-layout-builder' ),
				'icon'  => 'dashicons-editor-code',
				'demo'  => 'https://gutenlayouts.com/extensions/#custom-css',
			),
			'lightbox'   => array(
				'title' => __( 'Gallery Lightbox', 'gl-layout-builder' ),
				'icon'  => 'dashicons-format-gallery',
				'demo'  => 'https://gutenlayouts.com/extensions/#lightbox',
			),
			'tooltip'    => array(
				'title' => __( 'RichText Tooltip', 'gl-layout-builder' ),
				'icon'  => 'dashicons-editor-help',
				'demo'  => 'https://gutenlayouts.com/extensions/#tooltip',
			),
			'iconic-button' => array(
				'title' => __( 'Iconic Button', 'gl-layout-builder' ),
				'icon'  => 'dashicons-button',
				'demo'  => 'https://gutenlayouts.com/extensions/#iconic-button',
			),
		);
	}
}

