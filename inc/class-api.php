<?php
/**
 * API Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle API requests to the remote server.
 */
class Api {

	/**
	 * Instance of this class.
	 *
	 * @var Api
	 */
	private static $instance = null;

	/**
	 * API base URL.
	 *
	 * @var string
	 */
	private const GLLB_API_URL = 'https://gutenlayouts.com/wp-json/gutenlayouts/v1';

	/**
	 * Return an instance of this class.
	 *
	 * @return Api A single instance of this class.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Get patterns from the API.
	 *
	 * @param array $args Optional arguments.
	 * @return array|\WP_Error Response data or error.
	 */
	public function get_patterns( array $args = array() ) {
		return $this->request( 'GET', self::GLLB_API_URL . '/patterns', $args );
	}

	/**
	 * Get page templates from the API.
	 *
	 * @param array $args Optional arguments.
	 * @return array|\WP_Error Response data or error.
	 */
	public function get_page_templates( array $args = array() ) {
		return $this->request( 'GET', self::GLLB_API_URL . '/templates', $args );
	}

	/**
	 * Get pattern categories from the API.
	 *
	 * @param array $args Optional arguments.
	 * @return array|\WP_Error Response data or error.
	 */
	public function get_pattern_categories( array $args = array() ) {
		return $this->request( 'GET', self::GLLB_API_URL . '/patterns/categories', $args );
	}

	/**
	 * Get template categories from the API.
	 *
	 * @param array $args Optional arguments.
	 * @return array|\WP_Error Response data or error.
	 */
	public function get_template_categories( array $args = array() ) {
		return $this->request( 'GET', self::GLLB_API_URL . '/templates/categories', $args );
	}

	/**
	 * Send a request to the API.
	 *
	 * @param string $method HTTP method (GET, POST, etc).
	 * @param string $path   API endpoint path (full URL).
	 * @param array  $body   Request body or query parameters.
	 * @return array|\WP_Error Response data or error.
	 */
	private function request( string $method, string $path, array $body ) {
		if ( 'GET' === $method && ! empty( $body ) ) {
			$path .= '?' . http_build_query( $body );
			$body  = null;
		}

		$response = wp_remote_request(
			$path,
			array(
				'body'    => $body,
				'method'  => $method,
				'timeout' => 20,
				'headers' => array(
					'Referer' => home_url(),
					'Accept'  => 'application/json',
				),
			)
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		$body          = wp_remote_retrieve_body( $response );
		$data          = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new \WP_Error(
				'api_json_error',
				'Invalid JSON response from GL Layout Builder API',
				array( 'status' => $response_code )
			);
		}

		if ( $response_code >= 500 ) {
			return new \WP_Error(
				'api_server_error',
				"API server error with status {$response_code}",
				array(
					'status'        => $response_code,
					'response_data' => $data,
				)
			);
		}

		if ( $response_code >= 400 ) {
			$data['http_status'] = $response_code;
		}

		return $data;
	}
}