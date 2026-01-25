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
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_scripts' ) );
	}

	/**
	 * Enqueue frontend scripts and styles.
	 */
	public function enqueue_frontend_scripts() {
		wp_register_style(
			'gl-layout-builder-swiper-style',
			GLLB_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
			array(),
			'12.0.3'
		);

		wp_register_script(
			'gl-layout-builder-swiper-script',
			GLLB_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
			array(),
			'12.0.3',
			true
		);

		// Enqueue tooltip frontend styles.
		$tooltip_style_file = GLLB_PLUGIN_DIR . 'build/extensions/tooltip/style-index.css';
		if ( file_exists( $tooltip_style_file ) ) {
			wp_enqueue_style(
				'gl-layout-builder-tooltip-frontend-style',
				GLLB_PLUGIN_URL . 'build/extensions/tooltip/style-index.css',
				array(),
				GLLB_VERSION
			);
		}

		// Enqueue lightbox frontend assets.
		$lightbox_view_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/view.js';
		if ( file_exists( $lightbox_view_file ) ) {
			wp_enqueue_script(
				'gl-layout-builder-lightbox-view-script',
				GLLB_PLUGIN_URL . 'build/extensions/lightbox/view.js',
				array(),
				GLLB_VERSION,
				true
			);
		}

		$lightbox_style_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/style-index.css';
		if ( file_exists( $lightbox_style_file ) ) {
			wp_enqueue_style(
				'gl-layout-builder-lightbox-frontend-style',
				GLLB_PLUGIN_URL . 'build/extensions/lightbox/style-index.css',
				array(),
				GLLB_VERSION
			);
		}

		// Enqueue iconic button frontend styles.
		$iconic_button_style_file = GLLB_PLUGIN_DIR . 'build/extensions/iconic-button/style-index.css';
		if ( file_exists( $iconic_button_style_file ) ) {
			wp_enqueue_style(
				'gl-layout-builder-iconic-button-frontend-style',
				GLLB_PLUGIN_URL . 'build/extensions/iconic-button/style-index.css',
				array(),
				GLLB_VERSION
			);
		}
	}

	/**
	 * Enqueue block editor scripts and styles.
	 */
	public function enqueue_editor_scripts() {
		$lib_dep_file = GLLB_PLUGIN_DIR . 'build/library/index.asset.php';
		if ( file_exists( $lib_dep_file ) ) {
			$lib_asset = require $lib_dep_file;
			wp_enqueue_script(
				'gl-layout-builder-library-script',
				GLLB_PLUGIN_URL . 'build/library/index.js',
				$lib_asset['dependencies'],
				$lib_asset['version'],
				true
			);

			wp_enqueue_style(
				'gl-layout-builder-library-style',
				GLLB_PLUGIN_URL . 'build/library/index.css',
				array(),
				$lib_asset['version']
			);
		}

		if ( Helpers::is_extension_enabled( 'visibility' ) ) {	
			$visibility_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/visibility/index.asset.php';
			if ( file_exists( $visibility_dep_file ) ) {
				$visibility_asset = require $visibility_dep_file;
				wp_enqueue_script(
					'gl-layout-builder-visibility-script',
				GLLB_PLUGIN_URL . 'build/extensions/visibility/index.js',
				$visibility_asset['dependencies'],
				$visibility_asset['version'],
				true
			);
		}

		$tooltip_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/tooltip/index.asset.php';
		if ( file_exists( $tooltip_dep_file ) ) {
			$tooltip_asset = require $tooltip_dep_file;
			wp_enqueue_script(
				'gl-layout-builder-tooltip-script',
				GLLB_PLUGIN_URL . 'build/extensions/tooltip/index.js',
				$tooltip_asset['dependencies'],
				$tooltip_asset['version'],
				true
			);

			wp_enqueue_style(
				'gl-layout-builder-tooltip-style',
				GLLB_PLUGIN_URL . 'build/extensions/tooltip/index.css',
				array(),
				$tooltip_asset['version']
			);
		}

		$lightbox_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/lightbox/index.asset.php';
		if ( file_exists( $lightbox_dep_file ) ) {
			$lightbox_asset = require $lightbox_dep_file;
			wp_enqueue_script(
				'gl-layout-builder-lightbox-script',
				GLLB_PLUGIN_URL . 'build/extensions/lightbox/index.js',
				$lightbox_asset['dependencies'],
				$lightbox_asset['version'],
				true
			);

			wp_enqueue_style(
				'gl-layout-builder-lightbox-style',
				GLLB_PLUGIN_URL . 'build/extensions/lightbox/index.css',
				array(),
				$lightbox_asset['version']
			);
		}

		$custom_css_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/custom-css/index.asset.php';
		if ( file_exists( $custom_css_dep_file ) ) {
			$custom_css_asset = require $custom_css_dep_file;
			wp_enqueue_script(
				'gl-layout-builder-custom-css-script',
				GLLB_PLUGIN_URL . 'build/extensions/custom-css/index.js',
				$custom_css_asset['dependencies'],
				$custom_css_asset['version'],
				true
			);

			wp_enqueue_style(
				'gl-layout-builder-custom-css-style',
				GLLB_PLUGIN_URL . 'build/extensions/custom-css/index.css',
				array(),
				$custom_css_asset['version']
			);
		}

		$iconic_btn_dep_file = GLLB_PLUGIN_DIR . 'build/extensions/iconic-button/index.asset.php';
		if ( file_exists( $iconic_btn_dep_file ) ) {
			$iconic_btn_asset = require $iconic_btn_dep_file;
			wp_enqueue_script(
				'gl-layout-builder-iconic-button-script',
				GLLB_PLUGIN_URL . 'build/extensions/iconic-button/index.js',
				$iconic_btn_asset['dependencies'],
				$iconic_btn_asset['version'],
				true
			);

			wp_enqueue_style(
				'gl-layout-builder-iconic-button-style',
				GLLB_PLUGIN_URL . 'build/extensions/iconic-button/index.css',
				array(),
				$iconic_btn_asset['version']
			);
		}
	}
}
