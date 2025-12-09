<?php
// This file is generated. Do not modify it manually.
return array(
	'extensions' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'editorScript' => 'file:./index.js'
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
	'infinite-scroll' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'blocklayouts/infinite-scroll',
		'version' => '0.1.0',
		'title' => 'Infinite Scroll',
		'category' => 'blocklayouts',
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
		'textdomain' => 'blocklayouts',
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
		'name' => 'blocklayouts/marquee',
		'version' => '0.1.0',
		'title' => 'Marquee',
		'category' => 'blocklayouts',
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
		'textdomain' => 'blocklayouts',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
