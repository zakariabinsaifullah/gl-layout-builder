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
	}
}
