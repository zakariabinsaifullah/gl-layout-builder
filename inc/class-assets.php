<?php
/**
 * Assets Manager Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to manage scripts and styles.
 */
class Assets {

	/**
	 * Instance of this class.
	 *
	 * @var Assets
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Assets A single instance of this class.
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
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_editor_scripts' ) );
	}

	/**
	 * Enqueue assets for both editor and frontend
	 */
	public function enqueue_block_assets() {
		if( Helpers::is_extension_enabled( 'tooltip' ) && Helpers::has_string( array( 'gutenlayouts-tooltip' ) ) ) {
			$tooltip_style_file = GLLB_PLUGIN_DIR . 'build/extensions/tooltip/style-index.css';
			if ( file_exists( $tooltip_style_file ) ) {
				wp_enqueue_style(
					'gllb-tooltip',
					GLLB_PLUGIN_URL . 'build/extensions/tooltip/style-index.css',
					array(),
					GLLB_VERSION
				);
			}
		}
	}

	/**
	 * Enqueue frontend scripts and styles.
	 */
	public function enqueue_frontend_scripts() {
		wp_register_style(
			'gllb-swiper-style',
			GLLB_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
			array(),
			'12.0.3'
		);

		wp_register_script(
			'gllb-swiper-script',
			GLLB_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
			array(),
			'12.0.3',
			true
		);

		// Enqueue lightbox frontend assets.
		if( Helpers::is_extension_enabled( 'lightbox' ) && Helpers::has_string( array( 'gllbEnableLightbox' ) ) ) {
			$lightbox_view_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/view.js';
			if ( file_exists( $lightbox_view_file ) ) {
				wp_enqueue_script(
					'gllb-lightbox-view-script',
					GLLB_PLUGIN_URL . 'build/extensions/lightbox/view.js',
					array(),
					GLLB_VERSION,
					true
				);
			}
			
			$lightbox_style_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/style-index.css';
			if ( file_exists( $lightbox_style_file ) ) {
				wp_enqueue_style(
					'gllb-lightbox-frontend-style',
					GLLB_PLUGIN_URL . 'build/extensions/lightbox/style-index.css',
					array(),
					GLLB_VERSION
				);
			}
		}

		// Enqueue iconic button frontend styles.
		if( Helpers::is_extension_enabled( 'iconic-button' ) && Helpers::has_string( array( 'gllbEnableIconicBtn' ) ) ) {
			$iconic_button_style_file = GLLB_PLUGIN_DIR . 'build/extensions/iconic-button/style-index.css';
			if ( file_exists( $iconic_button_style_file ) ) {
				wp_enqueue_style(
					'gllb-iconic-btn',
					GLLB_PLUGIN_URL . 'build/extensions/iconic-button/style-index.css',
					array(),
					GLLB_VERSION
				);
			}
			}

		// Enqueue entrance animation frontend assets.
		if( Helpers::is_extension_enabled( 'entrance-animation' ) && Helpers::has_string( array( 'gllb-entrance-animation' ) ) ) {
			$entrance_animation_view_file = GLLB_PLUGIN_DIR . 'build/extensions/entrance-animation/view.js';
			if ( file_exists( $entrance_animation_view_file ) ) {
				wp_enqueue_script(
					'gllb-entrance-animation-view-script',
					GLLB_PLUGIN_URL . 'build/extensions/entrance-animation/view.js',
					array(),
					GLLB_VERSION,
					true
				);
			}

			$entrance_animation_style_file = GLLB_PLUGIN_DIR . 'build/extensions/entrance-animation/view.css';
			if ( file_exists( $entrance_animation_style_file ) ) {
				wp_enqueue_style(
					'gllb-entrance-animation-frontend-style',
					GLLB_PLUGIN_URL . 'build/extensions/entrance-animation/view.css',
					array(),
					GLLB_VERSION
				);
			}
		}
	}

	/**
	 * Enqueue block editor scripts and styles.
	 */
	public function enqueue_editor_scripts() {

		if( ! is_admin() ) {
			return;
		}

		$lib_dep_file = GLLB_PLUGIN_DIR . 'build/library/index.asset.php';
		if ( file_exists( $lib_dep_file ) ) {
			$lib_asset = require $lib_dep_file;
			wp_enqueue_script(
				'gllb-library-script',
				GLLB_PLUGIN_URL . 'build/library/index.js',
				$lib_asset['dependencies'],
				$lib_asset['version'],
				true
			);

			wp_enqueue_style(
				'gllb-library-style',
				GLLB_PLUGIN_URL . 'build/library/index.css',
				array(),
				$lib_asset['version']
			);

			wp_localize_script( 'gllb-library-script', 'gllb_library_data', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'gllb_library_nonce' ),
				'status'   => get_option( 'gllb_license_status' ),
			) );
		}

		// Visibility extension
		if ( Helpers::is_extension_enabled( 'visibility' ) ) {
			$visibility_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/visibility/index.asset.php';
			if ( file_exists( $visibility_dep_file ) ) {
				$visibility_asset = require $visibility_dep_file;
				wp_enqueue_script(
					'gllb-visibility-script',
					GLLB_PLUGIN_URL . 'build/extensions/visibility/index.js',
					$visibility_asset['dependencies'],
					$visibility_asset['version'],
					true
				);
			}
		}

		// Tooltip extension
		if(Helpers::is_extension_enabled( 'tooltip' )) {
			$tooltip_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/tooltip/index.asset.php';
			if ( file_exists( $tooltip_dep_file ) ) {
				$tooltip_asset = require $tooltip_dep_file;
				wp_enqueue_script(
					'gllb-tooltip-script',
					GLLB_PLUGIN_URL . 'build/extensions/tooltip/index.js',
					$tooltip_asset['dependencies'],
					$tooltip_asset['version'],
					true
				);

				wp_enqueue_style(
					'gllb-tooltip-style',
					GLLB_PLUGIN_URL . 'build/extensions/tooltip/index.css',
					array(),
					$tooltip_asset['version']
				);
			}
		}

		// Lightbox extension
		if( Helpers::is_extension_enabled( 'lightbox' ) ) {
			$lightbox_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/index.asset.php';
			if ( file_exists( $lightbox_dep_file ) ) {
				$lightbox_asset = require $lightbox_dep_file;
				wp_enqueue_script(
					'gllb-lightbox-script',
					GLLB_PLUGIN_URL . 'build/extensions/lightbox/index.js',
					$lightbox_asset['dependencies'],
					$lightbox_asset['version'],
					true
				);
			}
		}

		// Custom CSS extension
		if( Helpers::is_extension_enabled( 'custom-css' ) ) {
			$custom_css_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/custom-css/index.asset.php';
			if ( file_exists( $custom_css_dep_file ) ) {
				$custom_css_asset = require $custom_css_dep_file;
				wp_enqueue_script(
					'gllb-custom-css-script',
					GLLB_PLUGIN_URL . 'build/extensions/custom-css/index.js',
					$custom_css_asset['dependencies'],
					$custom_css_asset['version'],
					true
				);

				wp_enqueue_style(
					'gllb-custom-css-style',
					GLLB_PLUGIN_URL . 'build/extensions/custom-css/index.css',
					array(),
					$custom_css_asset['version']
				);
			}
		}

		// Iconic button extension 
		if( Helpers::is_extension_enabled( 'iconic-button' ) ) {
			$iconic_btn_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/iconic-button/index.asset.php';
			if ( file_exists( $iconic_btn_dep_file ) ) {
				$iconic_btn_asset = require $iconic_btn_dep_file;
				wp_enqueue_script(
					'gllb-iconic-button-script',
					GLLB_PLUGIN_URL . 'build/extensions/iconic-button/index.js',
					$iconic_btn_asset['dependencies'],
					$iconic_btn_asset['version'],
					true
				);

				wp_enqueue_style(
					'gllb-iconic-button-style',
					GLLB_PLUGIN_URL . 'build/extensions/iconic-button/index.css',
					array(),
					$iconic_btn_asset['version']
				);
			}
		}

		// Enceance Animation extension
		if( Helpers::is_extension_enabled( 'entrance-animation' ) ) {
			$entrance_animation_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/entrance-animation/index.asset.php';
			if ( file_exists( $entrance_animation_dep_file ) ) {
				$entrance_animation_asset = require $entrance_animation_dep_file;
				wp_enqueue_script(
					'gllb-entrance-animation-script',
					GLLB_PLUGIN_URL . 'build/extensions/entrance-animation/index.js',
					$entrance_animation_asset['dependencies'],
					$entrance_animation_asset['version'],
					true
				);

				$entrance_animation_style_file = GLLB_PLUGIN_DIR . 'build/extensions/entrance-animation/index.css';
				if( file_exists( $entrance_animation_style_file ) ) {
					wp_enqueue_style(
						'gllb-entrance-animation-editor-style',
						GLLB_PLUGIN_URL . 'build/extensions/entrance-animation/index.css',
						array(),
						$entrance_animation_asset['version']
					);
				}
			}
		}
	}
}
