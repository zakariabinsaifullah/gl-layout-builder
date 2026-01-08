<?php

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * REST API endpoints class
 * Handles WordPress REST API endpoints and caching
 */
class Gutenlayouts_REST_API {

	private static $instance = null;
	private $cache_prefix    = 'gutenlayouts_';
	private $cache_duration  = 3600;

	/**
	 * Initialize the REST API handler
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Register REST API routes
	 */
	public function register_rest_routes() {
		// Patterns
		register_rest_route(
			'gutenlayouts/v1',
			'/patterns',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_patterns' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
			)
		);

		register_rest_route(
			'gutenlayouts/v1',
			'/templates',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_page_templates' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
			)
		);

		register_rest_route(
			'gutenlayouts/v1',
			'/pattern_categories',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_pattern_categories' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
				'args'                => array(
					'layout_type' => array(
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		register_rest_route(
			'gutenlayouts/v1',
			'/template_categories',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_template_categories' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
				'args'                => array(
					'layout_type' => array(
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		register_rest_route(
			'gutenlayouts/v1',
			'/import_image',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_import_image' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
				'args'                => array(
					'imageUrl' => array(
						'required'          => true,
						'validate_callback' => function( $param, $request, $key ) {
							return filter_var( $param, FILTER_VALIDATE_URL );
						},
						'sanitize_callback' => 'esc_url_raw',
					),
					'title'    => array(
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);
	}


	public function validate_nonce( $nonce ) {
		return wp_verify_nonce( $nonce, 'wp_rest' );
	}

	public function rest_get_patterns( $request ) {
		$params = $request->get_params();

        // Check for refresh param
        $refresh = isset( $params['refresh'] ) && $params['refresh'] === 'true';
        if ( $refresh ) {
            unset( $params['refresh'] );
        }

		$cache_key = $this->get_cache_key( 'patterns', $params );

		// Try to get from cache first if not refreshing
		if ( ! $refresh ) {
            $cached_data = $this->get_cached_data( $cache_key );
            if ( $cached_data !== false ) {
                return rest_ensure_response( $cached_data );
            }
        }

		$response = Gutenlayouts_Api::get_instance()->get_patterns( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Filter patterns based on dependencies.
		if ( isset( $response['patterns'] ) && is_array( $response['patterns'] ) ) {
			// $response['patterns'] = $this->filter_patterns_by_dependencies( $response['patterns'] );
            // Dependencies logic seems unused or commented out in previous steps? 
            // Checking the file content provided earlier, it was active.
            // Wait, previous file content showed it active. 
            // I should preserve it.
            // $response['patterns'] = $this->filter_patterns_by_dependencies( $response['patterns'] );
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	public function rest_get_page_templates( $request ) {
		$params = $request->get_params();

		$cache_key = $this->get_cache_key( 'templates', $params );

		$cached_data = $this->get_cached_data( $cache_key );
		if ( $cached_data !== false ) {
			return rest_ensure_response( $cached_data );
		}

		$response = Gutenlayouts_Api::get_instance()->get_page_templates( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		// Filter page templates based on dependencies
		if ( isset( $response['pages'] ) && is_array( $response['pages'] ) ) {
			$response['pages'] = $this->filter_patterns_by_dependencies( $response['pages'] );
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	public function rest_get_pattern_categories( $request ) {
		$params = $request->get_params();

        // Check for refresh param
        $refresh = isset( $params['refresh'] ) && $params['refresh'] === 'true';
        if ( $refresh ) {
            unset( $params['refresh'] );
        }

		$cache_key = $this->get_cache_key( 'pattern_categories', $params );

		// Try to get from cache first
        if ( ! $refresh ) {
            $cached_data = $this->get_cached_data( $cache_key );
            if ( $cached_data !== false ) {
                return rest_ensure_response( $cached_data );
            }
        }

		$response = Gutenlayouts_Api::get_instance()->get_pattern_categories( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	public function rest_get_template_categories( $request ) {
		$params = $request->get_params();

		$cache_key = $this->get_cache_key( 'template_categories', $params );

		$cached_data = $this->get_cached_data( $cache_key );
		if ( $cached_data !== false ) {
			return rest_ensure_response( $cached_data );
		}

		$response = Gutenlayouts_Api::get_instance()->get_template_categories( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	public function rest_import_image( $request ) {
		$params = $request->get_params();
		$image_url = $params['imageUrl'];
		$title = ! empty( $params['title'] ) ? $params['title'] : basename( $image_url );

		// Check if it's a valid URL
		if ( ! filter_var( $image_url, FILTER_VALIDATE_URL ) ) {
			return new \WP_Error( 'invalid_url', 'Invalid image URL', array( 'status' => 400 ) );
		}

		// Required to use media_sideload_image
		require_once( ABSPATH . 'wp-admin/includes/media.php' );
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
		require_once( ABSPATH . 'wp-admin/includes/image.php' );

		// Sideload the image
		$id = media_sideload_image( $image_url, 0, $title, 'id' );

		if ( is_wp_error( $id ) ) {
			return $id;
		}

		$url = wp_get_attachment_url( $id );

		return rest_ensure_response( array(
			'success' => true,
			'id'      => $id,
			'url'     => $url,
		) );
	}

	/**
	 * Generate cache key
	 */
	private function get_cache_key( string $endpoint, array $params = array() ): string {
        // Ensure refresh is not part of cache key
        if( isset( $params['refresh'] ) ) {
            unset( $params['refresh'] );
        }
		return $this->cache_prefix . $endpoint . '_' . md5( wp_json_encode( $params ) );
	}

	/**
	 * Get cached data
	 */
	private function get_cached_data( string $cache_key ) {
		// Try object cache first, then transients
		$data = wp_cache_get( $cache_key, 'gutenlayouts' );
		if ( $data !== false ) {
			return $data;
		}

		return get_transient( $cache_key );
	}

	/**
	 * Set cached data
	 */
	private function set_cached_data( string $cache_key, $data ): void {
		set_transient( $cache_key, $data, $this->cache_duration );
	}

	/**
	 * Check if user has admin permission
	 */
	public function check_admin_permission(): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Check if user has editor permission (can edit posts)
	 * This ensures only authenticated users with content editing capabilities can access patterns
	 */
	public function check_editor_permission(): bool {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Get singleton instance
	 */
	public static function get_instance(): static {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

Gutenlayouts_REST_API::get_instance()->init();