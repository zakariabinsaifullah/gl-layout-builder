<?php
/**
 * Plugin Name:       Gutenlayouts
 * Description:       Custom blocks, extensions, core blocks enhancement and pre-designed patterns and templates for Gutenberg editor.
 * Version:           1.0.1
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
define( 'GUTENLAYOUTS_VERSION', '1.0.1' );
define( 'GUTENLAYOUTS_PLUGIN_FILE', __FILE__ );
define( 'GUTENLAYOUTS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GUTENLAYOUTS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Require autoloader.
require_once __DIR__ . '/inc/class-autoloader.php';

// Initialize autoloader.
Autoloader::run();

// Initialize Main Plugin Class.
Plugin::get_instance();
