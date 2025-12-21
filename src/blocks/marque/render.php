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
$speed          = isset( $attributes['speed'] ) ? max( 1, intval( $attributes['speed'] ) ) : 30;
$direction      = ! empty( $attributes['direction'] ) ? sanitize_text_field( $attributes['direction'] ) : 'left';
$orientation    = ! empty( $attributes['orientation'] ) ? sanitize_text_field( $attributes['orientation'] ) : 'horizontal';
$pause_on_hover = ! empty( $attributes['pauseOnHover'] );
$gap            = isset( $attributes['gap'] ) ? max( 0, intval( $attributes['gap'] ) ) : 40;
$height         = isset( $attributes['height'] ) ? max( 200, intval( $attributes['height'] ) ) : 500;

// Render inner blocks.
$inner_blocks_content = '';
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $inner_block ) {
		$inner_blocks_content .= $inner_block->render();
	}
}

// Build wrapper classes and styles
$wrapper_classes = array( 'marquee-wrapper', 'marquee-' . esc_attr( $orientation ) );
$wrapper_class = implode( ' ', $wrapper_classes );

$wrapper_styles = array();
if ( $orientation === 'vertical' ) {
	$wrapper_styles[] = 'height: ' . esc_attr( $height ) . 'px';
}
$wrapper_style = ! empty( $wrapper_styles ) ? ' style="' . implode( '; ', $wrapper_styles ) . ';"' : '';

// Build container classes.
$container_classes = array( 'marquee-container', 'marquee-' . esc_attr( $orientation ) );
if ( $pause_on_hover ) {
	$container_classes[] = 'pause-on-hover';
}
$container_class = implode( ' ', $container_classes );

// Determine animation name based on orientation and direction
$animation_name = 'marquee-scroll-' . esc_attr( $direction );
if ( $orientation === 'vertical' ) {
	$animation_name = ( $direction === 'left' || $direction === 'up' ) ? 'marquee-scroll-up' : 'marquee-scroll-down';
}

// Build container styles.
$container_styles = array(
	'--animation-duration: ' . $speed . 's',
	'--animation-name: ' . $animation_name,
	'--marquee-gap: ' . $gap . 'px',
);
$container_style = ' style="' . implode( '; ', $container_styles ) . ';"';

// Marquee content styles with padding at the end.
if ( $orientation === 'horizontal' ) {
	$content_style_first = ' style="gap: ' . esc_attr( $gap ) . 'px; padding-right: ' . esc_attr( $gap ) . 'px;"';
	$content_style_second = ' style="gap: ' . esc_attr( $gap ) . 'px;"';
} else {
	$content_style_first = ' style="gap: ' . esc_attr( $gap ) . 'px; padding-bottom: ' . esc_attr( $gap ) . 'px;"';
	$content_style_second = ' style="gap: ' . esc_attr( $gap ) . 'px;"';
}

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes( array( 'class' => $wrapper_class ) ) ); ?> <?php echo wp_kses_post( $wrapper_style ); ?>>
    <div class="<?php echo esc_attr( $container_class ); ?>"
        <?php echo wp_kses_post( $container_style ); ?>>
        <div class="marquee-content" <?php echo wp_kses_post( $content_style_first ); ?>>
            <?php echo wp_kses_post( $inner_blocks_content ); ?>
        </div>
        <div class="marquee-content" aria-hidden="true" <?php echo wp_kses_post( $content_style_second ); ?>>
            <?php echo wp_kses_post( $inner_blocks_content ); ?>
        </div>
    </div>
</div>