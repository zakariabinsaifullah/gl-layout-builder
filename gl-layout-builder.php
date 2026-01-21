<?php
/**
 * Plugin Name:       GL Layout Builder
 * Description:       Build powerful layouts with blocks, patterns & templates using GL Layout Builder.
 * Version:           1.0.2
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Binsaifullah
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gl-layout-builder
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define constants.
define( 'GLLB_VERSION', '1.0.2' );
define( 'GLLB_PLUGIN_FILE', __FILE__ );
define( 'GLLB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GLLB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Helper functions.
require_once __DIR__ . '/inc/helpers.php';

// Require autoloader.
require_once __DIR__ . '/inc/class-autoloader.php';

// Initialize autoloader.
Autoloader::run();

// Initialize Main Plugin Class.
Plugin::get_instance();
