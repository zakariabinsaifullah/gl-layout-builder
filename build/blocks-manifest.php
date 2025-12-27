<?php
// This file is generated. Do not modify it manually.
return array(
	'extensions' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'editorScript' => 'file:./index.js'
	),
	'gamp' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/gmap',
		'version' => '0.1.0',
		'title' => 'Google Map',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'blockStyle' => array(
				'type' => 'object'
			),
			'address' => array(
				'type' => 'string',
				'default' => 'New York'
			),
			'zoom' => array(
				'type' => 'number',
				'default' => '10'
			),
			'height' => array(
				'type' => 'number'
			),
			'mapBorder' => array(
				'type' => 'object',
				'default' => array(
					'top' => '',
					'right' => '',
					'bottom' => '',
					'left' => ''
				)
			),
			'mapRadius' => array(
				'type' => 'number'
			)
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'icon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/icon',
		'version' => '0.1.0',
		'title' => 'Icon',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'supports' => array(
			'reusable' => false,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'__experimentalBorder' => array(
				'__experimentalSkipSerialization' => true,
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => false,
					'padding' => true
				)
			),
			'shadow' => array(
				'__experimentalSkipSerialization' => true
			)
		),
		'attributes' => array(
			'tagName' => array(
				'type' => 'string',
				'default' => 'div'
			),
			'iconName' => array(
				'type' => 'string',
				'default' => 'wordpress'
			),
			'customSvgCode' => array(
				'type' => 'string'
			),
			'iconType' => array(
				'type' => 'string',
				'default' => 'fill'
			),
			'strokeWidth' => array(
				'type' => 'number',
				'default' => 1.2
			),
			'iconSize' => array(
				'type' => 'number',
				'default' => 60
			),
			'width' => array(
				'type' => 'number'
			),
			'justifyContent' => array(
				'type' => 'string'
			),
			'href' => array(
				'type' => 'string'
			),
			'linkTarget' => array(
				'type' => 'string'
			),
			'linkRel' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'marque' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/marque',
		'version' => '0.1.0',
		'title' => 'marque',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'speed' => array(
				'type' => 'number',
				'default' => 30
			),
			'direction' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'pauseOnHover' => array(
				'type' => 'boolean',
				'default' => false
			),
			'gap' => array(
				'type' => 'number',
				'default' => 40
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'horizontal'
			),
			'height' => array(
				'type' => 'number'
			)
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'progressbar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/progressbar',
		'version' => '0.1.0',
		'title' => 'Progressbar',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'parent' => array(
			'gutenlayouts/progressbars'
		),
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'blockStyle' => array(
				'type' => 'object'
			),
			'progress' => array(
				'type' => 'number',
				'default' => 50
			),
			'label' => array(
				'type' => 'string',
				'default' => 'Progress Bar'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'line'
			),
			'paColor' => array(
				'type' => 'string'
			),
			'pinColor' => array(
				'type' => 'string'
			),
			'labelSize' => array(
				'type' => 'number'
			),
			'labelColor' => array(
				'type' => 'number'
			),
			'perceColor' => array(
				'type' => 'string'
			),
			'perceSize' => array(
				'type' => 'number'
			),
			'thickNess' => array(
				'type' => 'number'
			),
			'progressSize' => array(
				'type' => 'number'
			)
		),
		'usesContext' => array(
			'gutenlayouts/layout'
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'progressbars' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/progressbars',
		'version' => '0.1.0',
		'title' => 'Progressbars',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'blockStyle' => array(
				'type' => 'object'
			),
			'rating' => array(
				'type' => 'number',
				'default' => 4.5
			),
			'label' => array(
				'type' => 'string',
				'default' => 'Progress Bar'
			),
			'progress' => array(
				'type' => 'number',
				'default' => 50
			),
			'thickNess' => array(
				'type' => 'number'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'line'
			)
		),
		'providesContext' => array(
			'gutenlayouts/layout' => 'layout'
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'rating' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/rating',
		'version' => '0.1.0',
		'title' => 'Rating',
		'category' => 'gutenlayouts',
		'description' => 'Add a customizable svg icon to your content.',
		'supports' => array(
			'anchor' => true,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'blockStyle' => array(
				'type' => 'object'
			),
			'rating' => array(
				'type' => 'number',
				'default' => 4.5
			),
			'totalRating' => array(
				'type' => 'number',
				'default' => 5
			),
			'enableRating' => array(
				'type' => 'boolean',
				'default' => false
			),
			'nrPos' => array(
				'type' => 'string',
				'default' => 'nr_right'
			),
			'ratingSize' => array(
				'type' => 'number'
			),
			'ratingNsize' => array(
				'type' => 'number'
			),
			'ratingColor' => array(
				'type' => 'string'
			),
			'nuRatColor' => array(
				'type' => 'string'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/slider',
		'version' => '1.0.0',
		'title' => 'Slider',
		'category' => 'gutenlayouts',
		'icon' => 'slides',
		'description' => 'A customizable slider block for showcasing images or content.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'status' => array(
				'type' => 'boolean',
				'default' => false
			),
			'blockStyle' => array(
				'type' => 'object'
			),
			'arrowsOutside' => array(
				'type' => 'boolean',
				'default' => true
			),
			'height' => array(
				'type' => 'number'
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'delay' => array(
				'type' => 'number',
				'default' => 3000
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showArrows' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showPagination' => array(
				'type' => 'boolean',
				'default' => true
			),
			'radius' => array(
				'type' => 'number'
			),
			'paginationColor' => array(
				'type' => 'string'
			),
			'paginationSize' => array(
				'type' => 'number'
			),
			'navColor' => array(
				'type' => 'string'
			),
			'navbgColor' => array(
				'type' => 'string'
			),
			'navSize' => array(
				'type' => 'number'
			)
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => array(
			'file:./index.js',
			'gu-swiper-script'
		),
		'editorStyle' => array(
			'file:./index.css',
			'gu-swiper-style'
		),
		'style' => array(
			'file:./style-index.css',
			'gu-swiper-style'
		),
		'viewScript' => array(
			'file:./view.js',
			'gu-swiper-script'
		)
	),
	'infinite-scroll' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/infinite-scroll',
		'version' => '0.1.0',
		'title' => 'Infinite Scroll',
		'category' => 'gutenlayouts',
		'ancestor' => array(
			'core/query'
		),
		'icon' => 'update',
		'description' => 'Automatically load more posts as you scroll.',
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'enableContrastChecker' => false,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'units' => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw'
				),
				'__experimentalDefaultControls' => array(
					'margin' => false,
					'padding' => true
				)
			),
			'interactivity' => true
		),
		'attributes' => array(
			'loadingText' => array(
				'type' => 'string',
				'default' => 'Loading more posts...'
			),
			'noMoreText' => array(
				'type' => 'string',
				'default' => 'No more posts to load'
			),
			'triggerDistance' => array(
				'type' => 'number',
				'default' => 200
			),
			'justifyContent' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'textdomain' => 'gutenlayouts',
		'usesContext' => array(
			'queryId',
			'query'
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	),
	'marquee' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'gutenlayouts/marquee',
		'version' => '0.1.0',
		'title' => 'Marquee',
		'category' => 'gutenlayouts',
		'icon' => 'slides',
		'description' => 'Display content in a horizontal scrolling marquee.',
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'color' => array(
				'enableContrastChecker' => false,
				'background' => true,
				'gradients' => true,
				'text' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'spacing' => array(
				'blockGap' => array(
					'horizontal',
					'vertical'
				),
				'margin' => true,
				'padding' => true,
				'units' => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw'
				),
				'__experimentalDefaultControls' => array(
					'blockGap' => true,
					'margin' => false,
					'padding' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true,
					'style' => true
				)
			)
		),
		'attributes' => array(
			'speed' => array(
				'type' => 'number',
				'default' => 30
			),
			'direction' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'pauseOnHover' => array(
				'type' => 'boolean',
				'default' => false
			),
			'gap' => array(
				'type' => 'number',
				'default' => 40
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'styles' => array(
			array(
				'name' => 'horizontal-fade',
				'label' => 'Horizontal fade'
			)
		),
		'example' => array(
			
		),
		'textdomain' => 'gutenlayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
