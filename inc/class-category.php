<?php

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Class Register Blocks Category
 * 
 * @package Gutenlayouts
 */

class Register_Blocks_Category {

    /**
     * Constructor to initialize category registration.
     */
    public function __construct() {
        add_filter( 'block_categories_all', [ $this, 'add_gutenlayouts_category' ], 10, 2 );
    }

    /**
     * Adds a custom block category for Gutenlayouts.
     *
     * @param array $categories Existing block categories.
     * @param WP_Post|null $post The post being edited, or null.
     * @return array Modified block categories.
     */
    public function add_gutenlayouts_category( $categories, $post ) {
        $categories[] = [
            'slug'  => 'gutenlayouts',
            'title' => __( 'Gutenlayouts', 'gutenlayouts' ),
        ];
        return $categories;
    }
}

new Register_Blocks_Category();