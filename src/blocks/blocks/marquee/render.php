<?php
/**
 * Server-side rendering for the marquee block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Set defaults and sanitize attributes.
$gutenlayouts_marquee_speed          = isset( $attributes['speed'] ) ? max( 1, intval( $attributes['speed'] ) ) : 30;
$gutenlayouts_marquee_direction      = ! empty( $attributes['direction'] ) ? sanitize_text_field( $attributes['direction'] ) : 'left';
$gutenlayouts_marquee_pause_on_hover = ! empty( $attributes['pauseOnHover'] );
$gutenlayouts_marquee_gap            = isset( $attributes['gap'] ) ? max( 0, intval( $attributes['gap'] ) ) : 40;

// Render inner blocks.
$gutenlayouts_marquee_inner_blocks_content = '';
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $gutenlayouts_marquee_inner_block ) {
		$gutenlayouts_marquee_inner_blocks_content .= $gutenlayouts_marquee_inner_block->render();
	}
}

// Build container classes.
$gutenlayouts_marquee_container_classes = array( 'marquee-container' );
if ( $gutenlayouts_marquee_pause_on_hover ) {
	$gutenlayouts_marquee_container_classes[] = 'pause-on-hover';
}
$gutenlayouts_marquee_container_class = implode( ' ', $gutenlayouts_marquee_container_classes );

// Build container styles.
$gutenlayouts_marquee_container_styles = array(
	'--animation-duration: ' . $gutenlayouts_marquee_speed . 's',
	'--animation-name: marquee-scroll-' . esc_attr( $gutenlayouts_marquee_direction ),
);
$gutenlayouts_marquee_container_style  = ' style="' . implode( '; ', $gutenlayouts_marquee_container_styles ) . ';"';

// Marquee content styles.
$gutenlayouts_marquee_content_style = ' style="gap: ' . esc_attr( $gutenlayouts_marquee_gap ) . 'px; padding: 0 ' . esc_attr( $gutenlayouts_marquee_gap / 2 ) . 'px;"';

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?>>
    <div class="<?php echo esc_attr( $gutenlayouts_marquee_container_class ); ?>"
        <?php echo wp_kses_post( $gutenlayouts_marquee_container_style ); ?>>
        <div class="marquee-content" <?php echo wp_kses_post( $gutenlayouts_marquee_content_style ); ?>>
            <?php echo wp_kses_post( $gutenlayouts_marquee_inner_blocks_content ); ?></div>
        <div class="marquee-content" <?php echo wp_kses_post( $gutenlayouts_marquee_content_style ); ?>>
            <?php echo wp_kses_post( $gutenlayouts_marquee_inner_blocks_content ); ?></div>
    </div>
</div>