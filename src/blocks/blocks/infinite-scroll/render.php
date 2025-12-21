<?php
/**
 * Render the Infinite Scroll block.
 *
 * @package Gutenberg Infinite Scroll
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string  Rendered block output.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Get block attributes with defaults.
$gutenlayouts_infinite_scroll_loading_text     = $attributes['loadingText'] ?? __( 'Loading more posts...', 'gutenlayouts' );
$gutenlayouts_infinite_scroll_no_more_text     = $attributes['noMoreText'] ?? __( 'No more posts to load', 'gutenlayouts' );
$gutenlayouts_infinite_scroll_trigger_distance = $attributes['triggerDistance'] ?? 100;
$gutenlayouts_infinite_scroll_justify_content  = $attributes['justifyContent'] ?? 'center';

// Get query context.
$gutenlayouts_infinite_scroll_query     = $block->context['query'] ?? array();
$gutenlayouts_infinite_scroll_max_pages = $gutenlayouts_infinite_scroll_query['pages'] ?? 0;

// Initialize interactivity state.
wp_interactivity_state(
	'gutenlayouts/infinite-scroll',
	array(
		'hasMore'  => $gutenlayouts_infinite_scroll_max_pages > 1 && ( $gutenlayouts_infinite_scroll_query['paged'] ?? 1 ) < $gutenlayouts_infinite_scroll_max_pages,
		'paged'    => $gutenlayouts_infinite_scroll_query['paged'] ?? 1,
		'maxPages' => $gutenlayouts_infinite_scroll_max_pages,
	)
);

// Context for the interactive elements.
$gutenlayouts_infinite_scroll_context = array(
	'queryId'   => $block->context['queryId'] ?? 0,
	'isLoading' => false,
);

// Build wrapper attributes.
$gutenlayouts_infinite_scroll_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'data-wp-interactive' => 'gutenlayouts/infinite-scroll',
		'data-wp-context'     => wp_json_encode( $gutenlayouts_infinite_scroll_context ),
		'class'               => "justify-{$gutenlayouts_infinite_scroll_justify_content}",
	)
);
?>

<div <?php echo wp_kses_post( $gutenlayouts_infinite_scroll_wrapper_attributes ); ?>>
    <div class="wp-block-gutenlayouts-infinite-scroll__trigger" data-wp-watch="callbacks.infiniteScroll"
        data-trigger-distance="<?php echo esc_attr( $gutenlayouts_infinite_scroll_trigger_distance ); ?>"
        data-wp-bind--hidden="!state.hasMore">
        <div class="wp-block-gutenlayouts-infinite-scroll__loading" data-wp-class--is-visible="context.isLoading">
            <div class="wp-block-gutenlayouts-infinite-scroll__loading-spinner"></div>
            <span><?php echo esc_html( $gutenlayouts_infinite_scroll_loading_text ); ?></span>
        </div>
    </div>

    <p class="wp-block-gutenlayouts-infinite-scroll__no-more-content" data-wp-bind--hidden="state.hasMore">
        <?php echo esc_html( $gutenlayouts_infinite_scroll_no_more_text ); ?>
    </p>
</div>