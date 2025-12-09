<?php

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Class Register_Blocks
 * 
 * @package Gutenlayouts
 */

class Register_Blocks {
    /**
     * Constructor to initialize block registration.
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_blocks' ] );
    }

    /**
     * Registers blocks from the blocks-manifest.php file.
     * @return void
     */
    public function register_blocks() {
        if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
            wp_register_block_types_from_metadata_collection( GUTENLAYOUTS_PLUGIN_DIR . '/build/blocks', GUTENLAYOUTS_PLUGIN_DIR . '/build/blocks-manifest.php' );
            return;
        }

        $manifest_data = require GUTENLAYOUTS_PLUGIN_DIR . '/build/blocks-manifest.php';
        foreach ( array_keys( $manifest_data ) as $block_type ) {
            register_block_type( GUTENLAYOUTS_PLUGIN_DIR . "/build/blocks/{$block_type}" );
        }
    }
}

new Register_Blocks();