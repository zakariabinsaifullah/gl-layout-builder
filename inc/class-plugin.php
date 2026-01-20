<?php
/**
 * Main Plugin Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main plugin class.
 */
class Plugin {

	/**
	 * Instance of this class.
	 *
	 * @var Plugin
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Plugin A single instance of this class.
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
		$this->init();
	}

	/**
	 * Initialize the plugin.
	 */
	public function init() {
		// Initialize components.
		$this->init_components();
	}

	/**
	 * Initialize plugin components.
	 */
	private function init_components() {
		// Initialize Assets.
		Assets::get_instance();

		// Initialize Rest API.
		Rest_Api::get_instance()->init();

		// Initialize Admin Page.
		Admin::get_instance();

		// Initialize Block Registration.
		Blocks::get_instance();

		// Initialize Categories.
		Category::get_instance();

		// Initialize Extensions (Visibility, etc).
		Extensions::get_instance();
	}
}
