<?php
/**
 * Block Registration Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for block registration.
 */
class Blocks {

	/**
	 * Instance of this class.
	 *
	 * @var Blocks
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Blocks A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor to initialize block registration.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Registers blocks from the blocks-manifest.php file.
	 */
	public function register_blocks() {
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( GLLB_PLUGIN_DIR . 'build/blocks', GLLB_PLUGIN_DIR . 'build/blocks-manifest.php' );
			return;
		}

		$manifest_data = require GLLB_PLUGIN_DIR . 'build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( GLLB_PLUGIN_DIR . "build/blocks/{$block_type}" );
		}
	}
}
