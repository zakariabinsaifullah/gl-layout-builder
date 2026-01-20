<?php
/**
 * Block Categories Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register custom block category.
 */
class Category {

	/**
	 * Instance of this class.
	 *
	 * @var Category
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Category A single instance of this class.
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
		add_filter( 'block_categories_all', array( $this, 'add_gutenlayouts_category' ), 10, 2 );
	}

	/**
	 * Adds a custom block category for GutenLayout Blocks.
	 *
	 * @param array        $categories Existing block categories.
	 * @param \WP_Post|null $post       The post being edited, or null.
	 * @return array Modified block categories.
	 */
	public function add_gutenlayouts_category( $categories, $post ) {
		$categories[0] = array(
			'slug'  => 'gutenlayouts',
			'title' => __( 'GutenLayout Blocks', 'gl-layout-builder' ),
		);
		return $categories;
	}
}