<?php
/**
 * Autoloader for Gutenlayouts classes.
 *
 * @package Gutenlayouts
 */

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Autoloader class.
 */
class Autoloader {

	/**
	 * Run autoloader.
	 *
	 * Register the autoloader.
	 */
	public static function run() {
		spl_autoload_register( array( __CLASS__, 'autoload' ) );
	}

	/**
	 * Autoload classes.
	 *
	 * @param string $class_name The name of the class to load.
	 */
	public static function autoload( $class_name ) {
		if ( false === strpos( $class_name, 'Gutenlayouts\\' ) ) {
			return;
		}

		$file_parts = explode( '\\', $class_name );
		$namespace  = '';

		// Get the class name (last part).
		$current_class = array_pop( $file_parts );

		// Build the path from the namespace parts.
		if ( ! empty( $file_parts ) ) {
			$namespace = implode( DIRECTORY_SEPARATOR, $file_parts );
			$namespace = strtolower( $namespace );
		}

		// Convert class name format (CamelCase) to file name format (kebab-case).
		$filename = 'class-' . str_replace( '_', '-', strtolower( $current_class ) ) . '.php';

		// Handle the base namespace mapping to 'inc' directory.
		// Since our namespace is Gutenlayouts and files are in inc/,
		// we need to remove 'Gutenlayouts' from the beginning if it exists in path structure
		// but since we check only classes starting with Gutenlayouts\, the $file_parts will contain 'Gutenlayouts'.
		
		// Let's refine the logic.
		// Class Name: Gutenlayouts\Api -> inc/class-api.php
		// Class Name: Gutenlayouts\Utils\Helper -> inc/utils/class-helper.php (if we had subdirs)

		// Remove the root namespace 'Gutenlayouts'.
		$file_parts_cleaned = array_filter( $file_parts, function( $part ) {
			return $part !== 'Gutenlayouts';
		});

		$path_parts = array_map( function( $part ) {
			return str_replace( '_', '-', strtolower( $part ) );
		}, $file_parts_cleaned );

		$directory = dirname( __DIR__ ) . '/inc/';

		if ( ! empty( $path_parts ) ) {
			$directory .= implode( DIRECTORY_SEPARATOR, $path_parts ) . DIRECTORY_SEPARATOR;
		}

		$file = $directory . $filename;

		if ( file_exists( $file ) ) {
			require_once $file;
		}
	}
}
