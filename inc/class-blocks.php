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
		// Get enabled blocks from settings; default to all only on first install.
		$raw_settings    = get_option( 'gllb_settings', false );
		$manifest_file = GLLB_PLUGIN_DIR . 'build/blocks-manifest.php';
		if ( ! file_exists( $manifest_file ) ) {
			return;
		}
		$manifest_data = require $manifest_file;
		$all_blocks      = array_keys( $manifest_data );
		$enabled_blocks  = array();

		if ( false === $raw_settings ) {
			$enabled_blocks = $all_blocks; // First load: enable everything.
		} else {
			$enabled_blocks = isset( $raw_settings['blocks'] ) ? (array) $raw_settings['blocks'] : array();
		}

		// Register blocks using modern approach if available.
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			// Filter manifest to only include enabled blocks.
			$filtered_manifest = array();
			$available_blocks = Helpers::get_available_blocks();
			$is_license_valid = License::is_valid();

			foreach ( $manifest_data as $block_type => $block_data ) {
				$is_pro = isset( $available_blocks[ $block_type ]['is_pro'] ) && $available_blocks[ $block_type ]['is_pro'];
				if ( $is_pro && ! $is_license_valid ) {
					continue;
				}

				if ( in_array( $block_type, $enabled_blocks, true ) || ( isset( $block_data['parent'] ) && ! empty( $block_data['parent'] ) ) ) {
					$filtered_manifest[ $block_type ] = $block_data;
				}
			}

			// Register enabled blocks.
			foreach ( array_keys( $filtered_manifest ) as $block_type ) {
				register_block_type( GLLB_PLUGIN_DIR . "build/blocks/{$block_type}" );
			}
			return;
		}

		// Fallback for older WordPress versions.
		$available_blocks = Helpers::get_available_blocks();
		$is_license_valid = License::is_valid();

		foreach ( $all_blocks as $block_type ) {
			$is_pro = isset( $available_blocks[ $block_type ]['is_pro'] ) && $available_blocks[ $block_type ]['is_pro'];
			if ( $is_pro && ! $is_license_valid ) {
				continue;
			}
			
			$block_data = isset( $manifest_data[ $block_type ] ) ? $manifest_data[ $block_type ] : array();
			if ( in_array( $block_type, $enabled_blocks, true ) || ( isset( $block_data['parent'] ) && ! empty( $block_data['parent'] ) ) ) {
				register_block_type( GLLB_PLUGIN_DIR . "build/blocks/{$block_type}" );
			}
		}
	}
}
