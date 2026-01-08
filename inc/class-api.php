<?php

namespace Gutenlayouts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Gutenlayouts_Api {

	private static $instance           = null;
	private const GUTENLAYOUTS_API_URL = 'https://gutenlayouts.com/wp-json/gutenlayouts/v1';

	public function get_patterns( array $args = array() ) {
		return $this->request( 'GET', self::GUTENLAYOUTS_API_URL . '/patterns', $args );
	}

	public function get_page_templates( array $args = array() ) {
		return $this->request( 'GET', self::GUTENLAYOUTS_API_URL . '/templates', $args );
	}

	public function get_pattern_categories( array $args = array() ) {
		return $this->request( 'GET', self::GUTENLAYOUTS_API_URL . '/patterns/categories', $args );
	}

	public function get_template_categories( array $args = array() ) {
		return $this->request( 'GET', self::GUTENLAYOUTS_API_URL . '/templates/categories', $args );
	}

	private function request( string $method, string $path, array $body ): array|\WP_Error {
		if ( $method === 'GET' && ! empty( $body ) ) {
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
				'Invalid JSON response from Gutenlayouts API',
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

	public static function get_instance(): static {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}