<?php
/**
 * Admin Page Class.
 *
 * @package gl-layout-builder
 */

namespace GLLayoutBuilder;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handler for admin page functionality.
 */
class Admin {

	/**
	 * Instance of this class.
	 *
	 * @var Admin
	 */
	private static $instance = null;

	/**
	 * Return an instance of this class.
	 *
	 * @return Admin A single instance of this class.
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
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_action( 'wp_ajax_gllb_save_settings', array( $this, 'save_settings' ) );
		add_action( 'wp_ajax_gllb_get_settings', array( $this, 'get_settings' ) );
	}

	/**
	 * Register admin menu.
	 */
	public function register_admin_menu() {
		add_menu_page(
			__( 'Gutenlayouts', 'gl-layout-builder' ),
			__( 'Gutenlayouts', 'gl-layout-builder' ),
			'manage_options',
			'gutenlayouts',
			array( $this, 'render_admin_page' ),
			'dashicons-layout',
			30
		);
	}

	/**
	 * Enqueue admin assets.
	 *
	 * @param string $hook Current admin page hook.
	 */
	public function enqueue_admin_assets( $hook ) {
		if ( 'toplevel_page_gutenlayouts' !== $hook ) {
			return;
		}

		// Enqueue CSS.
		wp_enqueue_style(
			'gllb-admin',
			GLLB_PLUGIN_URL . 'assets/css/admin.css',
			array(),
			GLLB_VERSION
		);

		// Enqueue JS.
		wp_enqueue_script(
			'gllb-admin',
			GLLB_PLUGIN_URL . 'assets/js/admin.js',
			array( 'jquery' ),
			GLLB_VERSION,
			true
		);

		// Localize script.
		wp_localize_script(
			'gllb-admin',
			'gllbAdmin',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'gllb_admin_nonce' ),
			)
		);
	}

	/**
	 * Get all available blocks.
	 *
	 * @return array
	 */
	private function get_available_blocks() {
		return array(
			'carousel' => array(
				'title' => __( 'Carousel', 'gl-layout-builder' ),
				'icon'  => 'dashicons-slides',
				'demo'  => 'https://gutenlayouts.com/demo/carousel',
			),
			'icon'     => array(
				'title' => __( 'Icon', 'gl-layout-builder' ),
				'icon'  => 'dashicons-star-filled',
				'demo'  => 'https://gutenlayouts.com/demo/icon',
			),
			'map'      => array(
				'title' => __( 'Map', 'gl-layout-builder' ),
				'icon'  => 'dashicons-location',
				'demo'  => 'https://gutenlayouts.com/demo/map',
			),
			'marque'   => array(
				'title' => __( 'Marquee', 'gl-layout-builder' ),
				'icon'  => 'dashicons-move',
				'demo'  => 'https://gutenlayouts.com/demo/marquee',
			),
			'progress' => array(
				'title' => __( 'Progress', 'gl-layout-builder' ),
				'icon'  => 'dashicons-chart-bar',
				'demo'  => 'https://gutenlayouts.com/demo/progress',
			),
			'rating'   => array(
				'title' => __( 'Rating', 'gl-layout-builder' ),
				'icon'  => 'dashicons-star-half',
				'demo'  => 'https://gutenlayouts.com/demo/rating',
			),
		);
	}

	/**
	 * Get all available extensions.
	 *
	 * @return array
	 */
	private function get_available_extensions() {
		return array(
			'visibility' => array(
				'title' => __( 'Visibility Control', 'gl-layout-builder' ),
				'icon'  => 'dashicons-visibility',
				'demo'  => 'https://gutenlayouts.com/demo/visibility',
			),
			'custom-css' => array(
				'title' => __( 'Custom CSS', 'gl-layout-builder' ),
				'icon'  => 'dashicons-editor-code',
				'demo'  => 'https://gutenlayouts.com/demo/custom-css',
			),
			'lightbox'   => array(
				'title' => __( 'Lightbox', 'gl-layout-builder' ),
				'icon'  => 'dashicons-format-image',
				'demo'  => 'https://gutenlayouts.com/demo/lightbox',
			),
			'tooltip'    => array(
				'title' => __( 'Tooltip', 'gl-layout-builder' ),
				'icon'  => 'dashicons-editor-help',
				'demo'  => 'https://gutenlayouts.com/demo/tooltip',
			),
			'iconic-button' => array(
				'title' => __( 'Iconic Button', 'gl-layout-builder' ),
				'icon'  => 'dashicons-button',
				'demo'  => 'https://gutenlayouts.com/demo/iconic-button',
			),
		);
	}

	/**
	 * Get saved settings.
	 *
	 * @return array
	 */
	private function get_saved_settings() {
		$default_settings = array(
			'blocks'     => array(),
			'extensions' => array(),
		);

		$settings = get_option( 'gllb_settings', $default_settings );

		// Merge with defaults.
		return wp_parse_args( $settings, $default_settings );
	}

	/**
	 * AJAX handler to get settings.
	 */
	public function get_settings() {
		check_ajax_referer( 'gllb_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized', 'gl-layout-builder' ) ) );
		}

		$settings = $this->get_saved_settings();
		wp_send_json_success( $settings );
	}

	/**
	 * AJAX handler to save settings.
	 */
	public function save_settings() {
		check_ajax_referer( 'gllb_admin_nonce', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Unauthorized', 'gl-layout-builder' ) ) );
		}

		$blocks     = isset( $_POST['blocks'] ) ? array_map( 'sanitize_text_field', $_POST['blocks'] ) : array();
		$extensions = isset( $_POST['extensions'] ) ? array_map( 'sanitize_text_field', $_POST['extensions'] ) : array();

		$settings = array(
			'blocks'     => $blocks,
			'extensions' => $extensions,
		);

		update_option( 'gllb_settings', $settings );

		wp_send_json_success( array( 'message' => __( 'Settings saved successfully!', 'gl-layout-builder' ) ) );
	}

	/**
	 * Render admin page.
	 */
	public function render_admin_page() {
		$blocks          = $this->get_available_blocks();
		$extensions      = $this->get_available_extensions();
		$saved_settings  = $this->get_saved_settings();
		$enabled_blocks  = isset( $saved_settings['blocks'] ) ? $saved_settings['blocks'] : array();
		$enabled_extensions = isset( $saved_settings['extensions'] ) ? $saved_settings['extensions'] : array();
		$raw_settings    = get_option( 'gllb_settings', false );
		$is_first_save   = ( false === $raw_settings );
		$enabled_blocks_effective = ( $is_first_save && empty( $enabled_blocks ) ) ? array_keys( $blocks ) : $enabled_blocks;
		$enabled_extensions_effective = ( $is_first_save && empty( $enabled_extensions ) ) ? array_keys( $extensions ) : $enabled_extensions;
		$blocks_total    = count( $blocks );
		$extensions_total = count( $extensions );
		$blocks_active   = count( $enabled_blocks_effective );
		$extensions_active = count( $enabled_extensions_effective );

		?>
		<div class="gllb-admin-wrapper">
			<!-- Top Navigation Header -->
			<header class="gllb-admin-header">
				<div class="gllb-container">
					<div class="gllb-header-inner">
						<div class="gllb-logo-area">
							<span class="dashicons dashicons-layout"></span>
							<h1><?php esc_html_e( 'Gutenlayouts', 'gl-layout-builder' ); ?></h1>
							<div class="gllb-version-tag">v<?php echo esc_html( GLLB_VERSION ); ?></div>
						</div>
						
						<nav class="gllb-main-nav">
							<button class="gllb-nav-link active" data-tab="welcome">
								<?php esc_html_e( 'Dashboard', 'gl-layout-builder' ); ?>
							</button>
							<button class="gllb-nav-link" data-tab="blocks">
								<?php esc_html_e( 'Blocks', 'gl-layout-builder' ); ?>
							</button>
							<button class="gllb-nav-link" data-tab="extensions">
								<?php esc_html_e( 'Extensions', 'gl-layout-builder' ); ?>
							</button>
							<button class="gllb-nav-link" data-tab="settings">
								<?php esc_html_e( 'Settings', 'gl-layout-builder' ); ?>
							</button>
						</nav>

						<div class="gllb-header-actions">
							<a href="https://gutenlayouts.com/pricing" target="_blank" class="gllb-btn-upgrade">
								<?php esc_html_e( 'Unlock Pro', 'gl-layout-builder' ); ?>
								<span class="dashicons dashicons-external"></span>
							</a>
						</div>
					</div>
				</div>
			</header>

			<!-- Main Content Area -->
			<main class="gllb-main-content">
				<div class="gllb-container">
					
					<!-- Dashboard Tab -->
					<div id="welcome" class="gllb-tab-pane active">
						<div class="gllb-dashboard-grid">
							<!-- Left Column -->
							<div class="gllb-dashboard-main">
								<div class="gllb-welcome-banner">
									<div class="gllb-banner-content">
										<h2><?php esc_html_e( 'Welcome to Gutenlayouts', 'gl-layout-builder' ); ?></h2>
										<p><?php esc_html_e( 'We designed Gutenlayouts to be intuitive. Check out our comprehensive documentation to get started.', 'gl-layout-builder' ); ?></p>
										<div class="gllb-banner-actions">
											<a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=page' ) ); ?>" class="gllb-button gllb-button-primary" style="text-decoration:none">
												<span class="dashicons dashicons-plus-alt2"></span>
												<?php esc_html_e( 'Create New Page', 'gl-layout-builder' ); ?>
											</a>
											<a href="https://gutenlayouts.com/docs" target="_blank" class="gllb-link-white">
												<?php esc_html_e( 'Read Full Guide', 'gl-layout-builder' ); ?>
												<span class="dashicons dashicons-arrow-right-alt2"></span>
											</a>
										</div>
									</div>
									<div class="gllb-banner-image">
										<!-- Placeholder for a nice graphic -->
										<div class="gllb-banner-graphic">
											<span class="dashicons dashicons-layout"></span>
										</div>
									</div>
								</div>

								<div class="gllb-video-tutorial">
									<div class="gllb-video-wrapper">
										<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
								</div>

								<div class="gllb-section-title">
									<h3><?php esc_html_e( 'What’s New in v', 'gl-layout-builder' ); ?><?php echo esc_html( GLLB_VERSION ); ?></h3>
									<p><?php esc_html_e( 'Explore the latest blocks and features added in this release.', 'gl-layout-builder' ); ?></p>
								</div>

								<div class="gllb-info-card warning">
									<span class="dashicons dashicons-info"></span>
									<p><strong><?php esc_html_e( 'Important:', 'gl-layout-builder' ); ?></strong> <?php esc_html_e( 'Gutenlayouts v3 is strictly beta. Please do not use on live sites yet.', 'gl-layout-builder' ); ?></p>
								</div>
							</div>

							<!-- Right Column -->
							<aside class="gllb-dashboard-sidebar">
								<div class="gllb-sidebar-card">
									<h3><?php esc_html_e( 'Extend Your Website', 'gl-layout-builder' ); ?></h3>
									<ul class="gllb-resource-list">
										<li>
											<div class="gllb-resource-icon"><span class="dashicons dashicons-admin-appearance"></span></div>
											<div class="gllb-resource-info">
												<strong>Astra Theme</strong>
												<span>Fast and customizable theme.</span>
											</div>
											<button class="gllb-btn-xs"><?php esc_html_e( 'Install', 'gl-layout-builder' ); ?></button>
										</li>
										<li>
											<div class="gllb-resource-icon"><span class="dashicons dashicons-layout"></span></div>
											<div class="gllb-resource-info">
												<strong>Starter Templates</strong>
												<span>Ready-made templates.</span>
											</div>
											<button class="gllb-btn-xs"><?php esc_html_e( 'Install', 'gl-layout-builder' ); ?></button>
										</li>
									</ul>
								</div>

								<div class="gllb-sidebar-card">
									<h3><?php esc_html_e( 'Quick Access', 'gl-layout-builder' ); ?></h3>
									<ul class="gllb-quick-links">
										<li><a href="#"><span class="dashicons dashicons-sos"></span> <?php esc_html_e( 'VIP Support', 'gl-layout-builder' ); ?> <span class="gllb-badge-pro">PRO</span></a></li>
										<li><a href="#"><span class="dashicons dashicons-book"></span> <?php esc_html_e( 'Help Center', 'gl-layout-builder' ); ?></a></li>
										<li><a href="#"><span class="dashicons dashicons-groups"></span> <?php esc_html_e( 'Join Community', 'gl-layout-builder' ); ?></a></li>
										<li><a href="#"><span class="dashicons dashicons-star-filled"></span> <?php esc_html_e( 'Rate Us', 'gl-layout-builder' ); ?></a></li>
									</ul>
								</div>
							</aside>
						</div>
					</div>

					<!-- Blocks Tab -->
					<div id="blocks" class="gllb-tab-pane">
						<div class="gllb-toolbar-modern">
							<div class="gllb-toolbar-left">
								<h3><?php esc_html_e( 'Blocks', 'gl-layout-builder' ); ?></h3>
							</div>
							<div class="gllb-toolbar-right">
								<div class="gllb-search-modern">
									<span class="dashicons dashicons-search"></span>
									<input type="search" class="gllb-search" data-target="blocks-grid" placeholder="<?php esc_attr_e( 'Search blocks...', 'gl-layout-builder' ); ?>">
								</div>
								<div class="gllb-actions-group">
									<button class="gllb-btn-text gllb-bulk-toggle" data-target="blocks" data-action="activate"><?php esc_html_e( 'Activate All', 'gl-layout-builder' ); ?></button>
									<button class="gllb-btn-text gllb-bulk-toggle" data-target="blocks" data-action="deactivate"><?php esc_html_e( 'Deactivate All', 'gl-layout-builder' ); ?></button>
								</div>
								<button class="gllb-button gllb-button-primary gllb-save-settings" data-type="blocks">
									<?php esc_html_e( 'Save Changes', 'gl-layout-builder' ); ?>
								</button>
							</div>
						</div>

						<div class="gllb-grid-modern" id="blocks-grid">
							<?php foreach ( $blocks as $block_id => $block ) : ?>
								<div class="gllb-card-modern gllb-block-item" data-label="<?php echo esc_attr( strtolower( $block['title'] ) ); ?>">
									<div class="gllb-card-header">
										<div class="gllb-icon-box">
											<span class="dashicons <?php echo esc_attr( $block['icon'] ); ?>"></span>
										</div>
										<span class="gllb-pro-badge" style="display:none">PRO</span>
									</div>
									<div class="gllb-card-body">
										<h4><?php echo esc_html( $block['title'] ); ?></h4>
										<a href="<?php echo esc_url( $block['demo'] ); ?>" target="_blank" class="gllb-link-subtle"><?php esc_html_e( 'Demo', 'gl-layout-builder' ); ?></a>
									</div>
									<div class="gllb-card-footer">
										<label class="gllb-switch">
											<input 
												type="checkbox" 
												name="blocks[]" 
												value="<?php echo esc_attr( $block_id ); ?>"
												<?php checked( in_array( $block_id, $enabled_blocks, true ) || ( $is_first_save && empty( $enabled_blocks ) ) ); ?>
											/>
											<span class="gllb-slider"></span>
										</label>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					</div>

					<!-- Extensions Tab -->
					<div id="extensions" class="gllb-tab-pane">
						<div class="gllb-toolbar-modern">
							<div class="gllb-toolbar-left">
								<h3><?php esc_html_e( 'Extensions', 'gl-layout-builder' ); ?></h3>
							</div>
							<div class="gllb-toolbar-right">
								<div class="gllb-search-modern">
									<span class="dashicons dashicons-search"></span>
									<input type="search" class="gllb-search" data-target="extensions-grid" placeholder="<?php esc_attr_e( 'Search extensions...', 'gl-layout-builder' ); ?>">
								</div>
								<div class="gllb-actions-group">
									<button class="gllb-btn-text gllb-bulk-toggle" data-target="extensions" data-action="activate"><?php esc_html_e( 'Activate All', 'gl-layout-builder' ); ?></button>
									<button class="gllb-btn-text gllb-bulk-toggle" data-target="extensions" data-action="deactivate"><?php esc_html_e( 'Deactivate All', 'gl-layout-builder' ); ?></button>
								</div>
								<button class="gllb-button gllb-button-primary gllb-save-settings" data-type="extensions">
									<?php esc_html_e( 'Save Changes', 'gl-layout-builder' ); ?>
								</button>
							</div>
						</div>

						<div class="gllb-grid-modern" id="extensions-grid">
							<?php foreach ( $extensions as $ext_id => $extension ) : ?>
								<div class="gllb-card-modern gllb-block-item" data-label="<?php echo esc_attr( strtolower( $extension['title'] ) ); ?>">
									<div class="gllb-card-header">
										<div class="gllb-icon-box">
											<span class="dashicons <?php echo esc_attr( $extension['icon'] ); ?>"></span>
										</div>
									</div>
									<div class="gllb-card-body">
										<h4><?php echo esc_html( $extension['title'] ); ?></h4>
										<a href="<?php echo esc_url( $extension['demo'] ); ?>" target="_blank" class="gllb-link-subtle"><?php esc_html_e( 'Documentation', 'gl-layout-builder' ); ?></a>
									</div>
									<div class="gllb-card-footer">
										<label class="gllb-switch">
											<input 
												type="checkbox" 
												name="extensions[]" 
												value="<?php echo esc_attr( $ext_id ); ?>"
												<?php checked( in_array( $ext_id, $enabled_extensions, true ) || ( $is_first_save && empty( $enabled_extensions ) ) ); ?>
											/>
											<span class="gllb-slider"></span>
										</label>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
					</div>

					<!-- Settings Tab Placeholder -->
					<div id="settings" class="gllb-tab-pane">
						<div class="gllb-empty-state">
							<span class="dashicons dashicons-admin-settings"></span>
							<h3><?php esc_html_e( 'Settings Coming Soon', 'gl-layout-builder' ); ?></h3>
							<p><?php esc_html_e( ' Global settings for all blocks will be available here.', 'gl-layout-builder' ); ?></p>
						</div>
					</div>

				</div>
			</main>
			
			<!-- Notification -->
			<div class="gllb-notification" id="gllb-notification"></div>
		</div>

			<!-- Notification -->
			<div class="gllb-notification" id="gllb-notification"></div>
		</div>
		<?php
	}
}
