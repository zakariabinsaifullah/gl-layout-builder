<?php
/**
 * License Handler Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for Lemon Squeezy license functionality.
 */
class License {

	/**
	 * Lemon Squeezy API base URL.
	 *
	 * @var string
	 */
	private const API_URL = 'https://api.lemonsqueezy.com/v1/licenses';

	/**
	 * Option keys.
	 */
	private const OPT_LICENSE_KEY    = 'gllb_license_key';
	private const OPT_STATUS         = 'gllb_license_status';
	private const OPT_INSTANCE_ID    = 'gllb_license_instance_id';
	private const OPT_ACTIVATED_AT   = 'gllb_license_activated_at';
	private const OPT_EXPIRES_AT     = 'gllb_license_expires_at';
	private const OPT_LAST_CHECKED   = 'gllb_license_last_checked';

	/**
	 * Instance of this class.
	 *
	 * @var License
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return License A single instance of this class.
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
		add_action( 'wp_ajax_gllb_activate_license', array( $this, 'ajax_activate_license' ) );
		add_action( 'wp_ajax_gllb_deactivate_license', array( $this, 'ajax_deactivate_license' ) );
		add_action( 'wp_ajax_gllb_get_license_status', array( $this, 'ajax_get_license_status' ) );

		// Register weekly cron interval.
		add_filter( 'cron_schedules', array( $this, 'add_weekly_schedule' ) );

		// Weekly cron for license validation.
		add_action( 'gllb_weekly_license_check', array( $this, 'validate_license' ) );
		add_action( 'init', array( $this, 'schedule_license_check' ) );
	}

	/**
	 * Add weekly cron schedule.
	 *
	 * @param array $schedules Existing cron schedules.
	 * @return array Modified cron schedules.
	 */
	public function add_weekly_schedule( $schedules ) {
		$schedules['weekly'] = array(
			'interval' => WEEK_IN_SECONDS,
			'display'  => __( 'Once Weekly', 'gl-layout-builder' ),
		);
		return $schedules;
	}

	/**
	 * Schedule weekly license check.
	 */
	public function schedule_license_check() {
		if ( ! wp_next_scheduled( 'gllb_weekly_license_check' ) ) {
			wp_schedule_event( time(), 'weekly', 'gllb_weekly_license_check' );
		}
	}

	/**
	 * Get license data.
	 *
	 * @return array License data.
	 */
	public static function get_license_data() {
		return array(
			'license_key'  => get_option( self::OPT_LICENSE_KEY, '' ),
			'status'       => get_option( self::OPT_STATUS, 'inactive' ),
			'instance_id'  => get_option( self::OPT_INSTANCE_ID, '' ),
			'activated_at' => get_option( self::OPT_ACTIVATED_AT, '' ),
			'expires_at'   => get_option( self::OPT_EXPIRES_AT, '' ),
			'last_checked' => get_option( self::OPT_LAST_CHECKED, '' ),
		);
	}

	/**
	 * AJAX handler to get license status.
	 */
	public function ajax_get_license_status() {
		check_ajax_referer( 'gllb_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized', 'gl-layout-builder' ) ) );
		}

		wp_send_json_success( self::get_license_data() );
	}

	/**
	 * AJAX handler to activate license.
	 */
	public function ajax_activate_license() {
		check_ajax_referer( 'gllb_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized', 'gl-layout-builder' ) ) );
		}

		$license_key = isset( $_POST['license_key'] ) ? sanitize_text_field( wp_unslash( $_POST['license_key'] ) ) : '';

		if ( empty( $license_key ) ) {
			wp_send_json_error( array( 'message' => __( 'Please enter a license key.', 'gl-layout-builder' ) ) );
		}

		// Activate with Lemon Squeezy.
		$result = $this->activate_license( $license_key );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( array( 'message' => $result->get_error_message() ) );
		}

		wp_send_json_success(
			array(
				'message' => __( 'License activated successfully!', 'gl-layout-builder' ),
				'data'    => self::get_license_data(),
			)
		);
	}

	/**
	 * Activate license with Lemon Squeezy API.
	 *
	 * @param string $license_key The license key.
	 * @return true|WP_Error True on success, WP_Error on failure.
	 */
	private function activate_license( $license_key ) {
		$response = wp_remote_post(
			self::API_URL . '/activate',
			array(
				'headers' => array(
					'Accept' => 'application/json',
				),
				'body'    => array(
					'license_key'   => $license_key,
					'instance_name' => home_url(),
				),
				'timeout' => 30,
			)
		);

		if ( is_wp_error( $response ) ) {
			return new \WP_Error( 'api_error', __( 'Failed to connect to license server.', 'gl-layout-builder' ) );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $body ) ) {
			return new \WP_Error( 'invalid_response', __( 'Invalid response from license server.', 'gl-layout-builder' ) );
		}

		// Check if activation was successful.
		if ( isset( $body['activated'] ) && true === $body['activated'] ) {
			$this->save_license_data( $license_key, $body );
			return true;
		}

		// Return error message from API.
		$error_message = isset( $body['error'] ) ? $body['error'] : __( 'License activation failed.', 'gl-layout-builder' );
		return new \WP_Error( 'activation_failed', $error_message );
	}

	/**
	 * Save license data after successful activation.
	 *
	 * @param string $license_key The license key.
	 * @param array  $response    API response data.
	 */
	private function save_license_data( $license_key, $response ) {
		$instance_id = isset( $response['instance']['id'] ) ? $response['instance']['id'] : '';
		$expires_at  = isset( $response['license_key']['expires_at'] ) ? $response['license_key']['expires_at'] : '';

		update_option( self::OPT_LICENSE_KEY, $license_key );
		update_option( self::OPT_STATUS, 'valid' );
		update_option( self::OPT_INSTANCE_ID, $instance_id );
		update_option( self::OPT_ACTIVATED_AT, current_time( 'mysql' ) );
		update_option( self::OPT_EXPIRES_AT, $expires_at );
		update_option( self::OPT_LAST_CHECKED, current_time( 'mysql' ) );
	}

	/**
	 * AJAX handler to deactivate license.
	 */
	public function ajax_deactivate_license() {
		check_ajax_referer( 'gllb_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized', 'gl-layout-builder' ) ) );
		}

		$license_key = get_option( self::OPT_LICENSE_KEY, '' );
		$instance_id = get_option( self::OPT_INSTANCE_ID, '' );

		if ( ! empty( $license_key ) && ! empty( $instance_id ) ) {
			// Deactivate with Lemon Squeezy API.
			wp_remote_post(
				self::API_URL . '/deactivate',
				array(
					'headers' => array(
						'Accept' => 'application/json',
					),
					'body'    => array(
						'license_key' => $license_key,
						'instance_id' => $instance_id,
					),
					'timeout' => 30,
				)
			);
		}

		// Clear local data.
		$this->clear_license_data();

		wp_send_json_success(
			array(
				'message' => __( 'License deactivated successfully.', 'gl-layout-builder' ),
				'data'    => self::get_license_data(),
			)
		);
	}

	/**
	 * Clear all license data.
	 */
	private function clear_license_data() {
		delete_option( self::OPT_LICENSE_KEY );
		delete_option( self::OPT_STATUS );
		delete_option( self::OPT_INSTANCE_ID );
		delete_option( self::OPT_ACTIVATED_AT );
		delete_option( self::OPT_EXPIRES_AT );
		delete_option( self::OPT_LAST_CHECKED );
	}

	/**
	 * Validate license (called by cron weekly).
	 */
	public function validate_license() {
		$license_key = get_option( self::OPT_LICENSE_KEY, '' );
		$instance_id = get_option( self::OPT_INSTANCE_ID, '' );

		if ( empty( $license_key ) ) {
			return;
		}

		$body_params = array(
			'license_key' => $license_key,
		);

		if ( ! empty( $instance_id ) ) {
			$body_params['instance_id'] = $instance_id;
		}

		$response = wp_remote_post(
			self::API_URL . '/validate',
			array(
				'headers' => array(
					'Accept' => 'application/json',
				),
				'body'    => $body_params,
				'timeout' => 30,
			)
		);

		if ( is_wp_error( $response ) ) {
			return;
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( empty( $body ) ) {
			return;
		}

		// Update status based on validation.
		if ( isset( $body['valid'] ) && true === $body['valid'] ) {
			update_option( self::OPT_STATUS, 'valid' );

			// Update expiry if available.
			if ( isset( $body['license_key']['expires_at'] ) ) {
				update_option( self::OPT_EXPIRES_AT, $body['license_key']['expires_at'] );
			}
		} else {
			update_option( self::OPT_STATUS, 'invalid' );
		}

		update_option( self::OPT_LAST_CHECKED, current_time( 'mysql' ) );
	}

	/**
	 * Check if license is valid.
	 *
	 * @return bool True if license is valid.
	 */
	public static function is_valid() {
		return 'valid' === get_option( self::OPT_STATUS, 'inactive' );
	}
}
