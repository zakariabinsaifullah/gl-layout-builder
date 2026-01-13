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
$gutenlayouts_speed          = isset( $attributes['speed'] ) ? max( 1, intval( $attributes['speed'] ) ) : 30;
$gutenlayouts_direction      = ! empty( $attributes['direction'] ) ? sanitize_text_field( $attributes['direction'] ) : 'left';
$gutenlayouts_orientation    = ! empty( $attributes['orientation'] ) ? sanitize_text_field( $attributes['orientation'] ) : 'horizontal';
$gutenlayouts_pause_on_hover = ! empty( $attributes['pauseOnHover'] );
$gutenlayouts_gap            = isset( $attributes['gap'] ) ? max( 0, intval( $attributes['gap'] ) ) : 40;
$gutenlayouts_height         = isset( $attributes['height'] ) ? max( 200, intval( $attributes['height'] ) ) : 500;

// Render inner blocks.
$gutenlayouts_inner_blocks_content = '';
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $gutenlayouts_inner_block ) {
		$gutenlayouts_inner_blocks_content .= $gutenlayouts_inner_block->render();
	}
}

// Build wrapper classes and styles
$gutenlayouts_wrapper_classes = array( 'marquee-wrapper', 'marquee-' . esc_attr( $gutenlayouts_orientation ) );
$gutenlayouts_wrapper_class = implode( ' ', $gutenlayouts_wrapper_classes );

$gutenlayouts_wrapper_styles = array();
if ( $gutenlayouts_orientation === 'vertical' ) {
	$gutenlayouts_wrapper_styles[] = 'height: ' . esc_attr( $gutenlayouts_height ) . 'px';
}
$gutenlayouts_wrapper_style = ! empty( $gutenlayouts_wrapper_styles ) ? ' style="' . implode( '; ', $gutenlayouts_wrapper_styles ) . ';"' : '';

// Build container classes.
$gutenlayouts_container_classes = array( 'marquee-container', 'marquee-' . esc_attr( $gutenlayouts_orientation ) );
if ( $gutenlayouts_pause_on_hover ) {
	$gutenlayouts_container_classes[] = 'pause-on-hover';
}
$gutenlayouts_container_class = implode( ' ', $gutenlayouts_container_classes );

// Determine animation name based on orientation and direction
$gutenlayouts_animation_name = 'marquee-scroll-' . esc_attr( $gutenlayouts_direction );
if ( $gutenlayouts_orientation === 'vertical' ) {
	$gutenlayouts_animation_name = ( $gutenlayouts_direction === 'left' || $gutenlayouts_direction === 'up' ) ? 'marquee-scroll-up' : 'marquee-scroll-down';
}

// Build container styles.
$gutenlayouts_container_styles = array(
	'--animation-duration: ' . $gutenlayouts_speed . 's',
	'--animation-name: ' . $gutenlayouts_animation_name,
	'--marquee-gap: ' . $gutenlayouts_gap . 'px',
);
$gutenlayouts_container_style = ' style="' . implode( '; ', $gutenlayouts_container_styles ) . ';"';

// Marquee content styles with padding at the end.
if ( $gutenlayouts_orientation === 'horizontal' ) {
	$gutenlayouts_content_style_first = ' style="gap: ' . esc_attr( $gutenlayouts_gap ) . 'px; padding-right: ' . esc_attr( $gutenlayouts_gap ) . 'px;"';
	$gutenlayouts_content_style_second = ' style="gap: ' . esc_attr( $gutenlayouts_gap ) . 'px;"';
} else {
	$gutenlayouts_content_style_first = ' style="gap: ' . esc_attr( $gutenlayouts_gap ) . 'px; padding-bottom: ' . esc_attr( $gutenlayouts_gap ) . 'px;"';
	$gutenlayouts_content_style_second = ' style="gap: ' . esc_attr( $gutenlayouts_gap ) . 'px;"';
}

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes( array( 'class' => $gutenlayouts_wrapper_class ) ) ); ?> <?php echo wp_kses_post( $gutenlayouts_wrapper_style ); ?>>
    <div class="<?php echo esc_attr( $gutenlayouts_container_class ); ?>"
        <?php echo wp_kses_post( $gutenlayouts_container_style ); ?>>
        <div class="marquee-content" <?php echo wp_kses_post( $gutenlayouts_content_style_first ); ?>>
            <?php echo wp_kses_post( $gutenlayouts_inner_blocks_content ); ?>
        </div>
        <div class="marquee-content" aria-hidden="true" <?php echo wp_kses_post( $gutenlayouts_content_style_second ); ?>>
            <?php echo wp_kses_post( $gutenlayouts_inner_blocks_content ); ?>
        </div>
    </div>
</div>