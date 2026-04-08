<?php
namespace NovaBuilder;

class Blocks {

	public function register(): void {
		add_action( 'init', function (): void {
			$block_dirs = glob( NB_DIR . 'build/blocks/*', GLOB_ONLYDIR );
			if ( ! $block_dirs ) {
				return;
			}
			foreach ( $block_dirs as $dir ) {
				register_block_type( $dir );
			}
		} );

		add_action( 'init', [ $this, 'register_block_category' ] );
	}

	public function register_block_category(): void {
		add_filter( 'block_categories_all', function ( array $categories ): array {
			return array_merge(
				[
					[
						'slug'  => 'nova-builder',
						'title' => __( 'Nova Builder', 'nova-builder' ),
						'icon'  => 'layout',
					],
				],
				$categories
			);
		} );
	}
}
