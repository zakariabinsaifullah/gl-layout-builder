<?php
/**
 * Plugin Name:       Gutenlayouts
 * Description:       Custom blocks, extensions, core blocks enhancement and pre-designed patterns and templates for Gutenberg editor.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Gutenlayouts
 * Author URI:        https://gutenlayouts.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenlayouts
 *
 * @package gutenlayouts
 */

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define constants.
define( 'GUTENLAYOUTS_VERSION', '0.1.0' );
define( 'GUTENLAYOUTS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GUTENLAYOUTS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );


// Include required files.
require_once __DIR__ . '/inc/class-api.php';
require_once __DIR__ . '/inc/class-rest-api.php';
require_once __DIR__ . '/inc/class-category.php';
require_once __DIR__ . '/inc/class-register.php';

function gu_slider_block_assets() {
    wp_register_style(
        'gutenlayouts-swiper-style',
        GUTENLAYOUTS_PLUGIN_URL . 'assets/css/swiper-bundle.min.css',
        [],
        '12.0.3'
    );

    wp_register_script(
        'gutenlayouts-swiper-script',
        GUTENLAYOUTS_PLUGIN_URL . 'assets/js/swiper-bundle.min.js',
        [],
        '12.0.3',
        true
    );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\gu_slider_block_assets' ); // for frontend



add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\gu_slider_block_editor_assets' );
function gu_slider_block_editor_assets() {
    $lib_dep_file = GUTENLAYOUTS_PLUGIN_DIR . 'build/library/index.asset.php';
    if ( file_exists( $lib_dep_file ) ) {
        $lib_asset = require_once $lib_dep_file;
        wp_enqueue_script(
            'gutenlayouts-library-script',
            GUTENLAYOUTS_PLUGIN_URL . 'build/library/index.js',
            $lib_asset['dependencies'],
            $lib_asset['version'],
            true
        );

        wp_enqueue_style(
            'gutenlayouts-library-style',
            GUTENLAYOUTS_PLUGIN_URL . 'build/library/index.css',
            [],
            $lib_asset['version']
        );
    }
}



