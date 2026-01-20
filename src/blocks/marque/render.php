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
$gllb_speed          = isset( $attributes['speed'] ) ? max( 1, intval( $attributes['speed'] ) ) : 30;
$gllb_direction      = ! empty( $attributes['direction'] ) ? sanitize_text_field( $attributes['direction'] ) : 'left';
$gllb_orientation    = ! empty( $attributes['orientation'] ) ? sanitize_text_field( $attributes['orientation'] ) : 'horizontal';
$gllb_pause_on_hover = ! empty( $attributes['pauseOnHover'] );
$gllb_gap            = isset( $attributes['gap'] ) ? max( 0, intval( $attributes['gap'] ) ) : 40;
$gllb_height         = isset( $attributes['height'] ) ? max( 200, intval( $attributes['height'] ) ) : 500;

// Render inner blocks.
$gllb_inner_blocks_content = '';
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $gllb_inner_block ) {
		$gllb_inner_blocks_content .= $gllb_inner_block->render();
	}
}

// Build wrapper classes and styles
$gllb_wrapper_classes = array( 'marquee-wrapper', 'marquee-' . esc_attr( $gllb_orientation ) );
$gllb_wrapper_class = implode( ' ', $gllb_wrapper_classes );

$gllb_wrapper_styles = array();
if ( $gllb_orientation === 'vertical' ) {
	$gllb_wrapper_styles[] = 'height: ' . esc_attr( $gllb_height ) . 'px';
}
$gllb_wrapper_style = ! empty( $gllb_wrapper_styles ) ? ' style="' . implode( '; ', $gllb_wrapper_styles ) . ';"' : '';

// Build container classes.
$gllb_container_classes = array( 'marquee-container', 'marquee-' . esc_attr( $gllb_orientation ) );
if ( $gllb_pause_on_hover ) {
	$gllb_container_classes[] = 'pause-on-hover';
}
$gllb_container_class = implode( ' ', $gllb_container_classes );

// Determine animation name based on orientation and direction
$gllb_animation_name = 'marquee-scroll-' . esc_attr( $gllb_direction );
if ( $gllb_orientation === 'vertical' ) {
	$gllb_animation_name = ( $gllb_direction === 'left' || $gllb_direction === 'up' ) ? 'marquee-scroll-up' : 'marquee-scroll-down';
}

// Build container styles.
$gllb_container_styles = array(
	'--animation-duration: ' . $gllb_speed . 's',
	'--animation-name: ' . $gllb_animation_name,
	'--marquee-gap: ' . $gllb_gap . 'px',
);
$gllb_container_style = ' style="' . implode( '; ', $gllb_container_styles ) . ';"';

// Marquee content styles with padding at the end.
if ( $gllb_orientation === 'horizontal' ) {
	$gllb_content_style_first = ' style="gap: ' . esc_attr( $gllb_gap ) . 'px; padding-right: ' . esc_attr( $gllb_gap ) . 'px;"';
	$gllb_content_style_second = ' style="gap: ' . esc_attr( $gllb_gap ) . 'px;"';
} else {
	$gllb_content_style_first = ' style="gap: ' . esc_attr( $gllb_gap ) . 'px; padding-bottom: ' . esc_attr( $gllb_gap ) . 'px;"';
	$gllb_content_style_second = ' style="gap: ' . esc_attr( $gllb_gap ) . 'px;"';
}

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes( array( 'class' => $gllb_wrapper_class ) ) ); ?> <?php echo wp_kses_post( $gllb_wrapper_style ); ?>>
    <div class="<?php echo esc_attr( $gllb_container_class ); ?>"
        <?php echo wp_kses_post( $gllb_container_style ); ?>>
        <div class="marquee-content" <?php echo wp_kses_post( $gllb_content_style_first ); ?>>
            <?php echo wp_kses_post( $gllb_inner_blocks_content ); ?>
        </div>
        <div class="marquee-content" aria-hidden="true" <?php echo wp_kses_post( $gllb_content_style_second ); ?>>
            <?php echo wp_kses_post( $gllb_inner_blocks_content ); ?>
        </div>
    </div>
</div>