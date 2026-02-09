<?php
/**
 * REST API Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle WordPress REST API endpoints and caching.
 */
class Rest_Api {

	/**
	 * Instance of this class.
	 *
	 * @var Rest_Api
	 */
	private static $instance = null;

	/**
	 * Cache prefix.
	 *
	 * @var string
	 */
	private $cache_prefix = 'gllb_';

	/**
	 * Cache duration in seconds.
	 *
	 * @var int
	 */
	private $cache_duration = 3600;

	/**
	 * Return an instance of this class.
	 *
	 * @return Rest_Api A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Initialize the REST API handler.
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Register REST API routes.
	 */
	public function register_rest_routes() {
		// Patterns.
		register_rest_route(
			'gllb/v1',
			'/patterns',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_patterns' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
			)
		);

		register_rest_route(
			'gllb/v1',
			'/templates',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_page_templates' ),
				'permission_callback' => array( $this, 'check_editor_permission' ),
			)
		);

		register_rest_route(
			'gllb/v1',
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
			'gllb/v1',
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
			'gllb/v1',
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

	/**
	 * Validate nonce.
	 *
	 * @param string $nonce The nonce to verify.
	 * @return int|bool Whether the nonce is valid.
	 */
	public function validate_nonce( $nonce ) {
		return wp_verify_nonce( $nonce, 'wp_rest' );
	}

	/**
	 * Get patterns callback.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error Response object or error.
	 */
	public function rest_get_patterns( $request ) {
		$params = $request->get_params();

		// Check for refresh param.
		$refresh = isset( $params['refresh'] ) && 'true' === $params['refresh'];
		if ( $refresh ) {
			unset( $params['refresh'] );
		}

		$cache_key = $this->get_cache_key( 'patterns', $params );

		// Try to get from cache first if not refreshing.
		if ( ! $refresh ) {
			$cached_data = $this->get_cached_data( $cache_key );
			if ( false !== $cached_data ) {
				return rest_ensure_response( $cached_data );
			}
		}

		$response = Api::get_instance()->get_patterns( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	/**
	 * Get page templates callback.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error Response object or error.
	 */
	public function rest_get_page_templates( $request ) {
		$params = $request->get_params();

		$refresh = isset( $params['refresh'] ) && 'true' === $params['refresh'];
		if ( $refresh ) {
			unset( $params['refresh'] );
		}

		$cache_key = $this->get_cache_key( 'templates', $params );

		// Try to get from cache first if not refreshing.
		if ( ! $refresh ) {
			$cached_data = $this->get_cached_data( $cache_key );
			if ( false !== $cached_data ) {
				return rest_ensure_response( $cached_data );
			}
		}

		$response = Api::get_instance()->get_page_templates( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	/**
	 * Get pattern categories callback.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error Response object or error.
	 */
	public function rest_get_pattern_categories( $request ) {
		$params = $request->get_params();

		// Check for refresh param.
		$refresh = isset( $params['refresh'] ) && 'true' === $params['refresh'];
		if ( $refresh ) {
			unset( $params['refresh'] );
		}

		$cache_key = $this->get_cache_key( 'pattern_categories', $params );

		// Try to get from cache first.
		if ( ! $refresh ) {
			$cached_data = $this->get_cached_data( $cache_key );
			if ( false !== $cached_data ) {
				return rest_ensure_response( $cached_data );
			}
		}

		$response = Api::get_instance()->get_pattern_categories( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	/**
	 * Get template categories callback.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error Response object or error.
	 */
	public function rest_get_template_categories( $request ) {
		$params = $request->get_params();

		// Check for refresh param.
		$refresh = isset( $params['refresh'] ) && 'true' === $params['refresh'];
		if ( $refresh ) {
			unset( $params['refresh'] );
		}

		$cache_key = $this->get_cache_key( 'template_categories', $params );

		// Try to get from cache first.
		if ( ! $refresh ) {
			$cached_data = $this->get_cached_data( $cache_key );
			if ( false !== $cached_data ) {
				return rest_ensure_response( $cached_data );
			}
		}

		$response = Api::get_instance()->get_template_categories( $params );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$this->set_cached_data( $cache_key, $response );

		return rest_ensure_response( $response );
	}

	/**
	 * Import image callback.
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response|\WP_Error Response object or error.
	 */
	public function rest_import_image( $request ) {
		$params    = $request->get_params();
		$image_url = $params['imageUrl'];
		$title     = ! empty( $params['title'] ) ? $params['title'] : basename( $image_url );

		// Check if it's a valid URL.
		if ( ! filter_var( $image_url, FILTER_VALIDATE_URL ) ) {
			return new \WP_Error( 'invalid_url', 'Invalid image URL', array( 'status' => 400 ) );
		}

		// Required to use media_sideload_image.
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// Sideload the image.
		$id = media_sideload_image( $image_url, 0, $title, 'id' );

		if ( is_wp_error( $id ) ) {
			return $id;
		}

		$url = wp_get_attachment_url( $id );

		return rest_ensure_response(
			array(
				'success' => true,
				'id'      => $id,
				'url'     => $url,
			)
		);
	}

	/**
	 * Generate cache key.
	 *
	 * @param string $endpoint The API endpoint.
	 * @param array  $params   The parameters.
	 * @return string The cache key.
	 */
	private function get_cache_key( string $endpoint, array $params = array() ) {
		// Ensure refresh is not part of cache key.
		if ( isset( $params['refresh'] ) ) {
			unset( $params['refresh'] );
		}
		return $this->cache_prefix . $endpoint . '_' . md5( wp_json_encode( $params ) );
	}

	/**
	 * Get cached data.
	 *
	 * @param string $cache_key The cache key.
	 * @return mixed The cached data or false.
	 */
	private function get_cached_data( string $cache_key ) {
		// Try object cache first, then transients.
		$data = wp_cache_get( $cache_key, 'gl-layout-builder' );
		if ( false !== $data ) {
			return $data;
		}

		return get_transient( $cache_key );
	}

	/**
	 * Set cached data.
	 *
	 * @param string $cache_key The cache key.
	 * @param mixed  $data      The data to cache.
	 */
	private function set_cached_data( string $cache_key, $data ) {
		set_transient( $cache_key, $data, $this->cache_duration );
	}

	/**
	 * Check if user has admin permission.
	 *
	 * @return bool True if admin.
	 */
	public function check_admin_permission() {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Check if user has editor permission (can edit posts).
	 *
	 * @return bool True if editor.
	 */
	public function check_editor_permission() {
		// Authenticate checks are handled by WordPress, usually valid cookie or nonce.
		return current_user_can( 'edit_posts' );
	}
}