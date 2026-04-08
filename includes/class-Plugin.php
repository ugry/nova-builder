<?php
namespace NovaBuilder;

final class Plugin {

	private static ?self $instance = null;

	public static function instance(): self {
		return self::$instance ??= new self();
	}

	public function boot(): void {
		( new Blocks() )->register();
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor' ] );
	}

	public function enqueue_frontend(): void {
		if ( ! $this->page_has_nova_block() ) {
			return;
		}
		$asset = require NB_DIR . 'build/frontend.asset.php';
		wp_enqueue_script(
			'nova-builder-frontend',
			NB_URL . 'build/frontend.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
		wp_enqueue_style(
			'nova-builder-frontend',
			NB_URL . 'build/frontend.css',
			[],
			NB_VERSION
		);
	}

	public function enqueue_editor(): void {
		$asset = require NB_DIR . 'build/index.asset.php';
		wp_enqueue_script(
			'nova-builder-editor',
			NB_URL . 'build/index.js',
			array_merge( $asset['dependencies'], [ 'wp-blocks', 'wp-block-editor', 'wp-components', 'wp-element', 'wp-i18n' ] ),
			$asset['version'],
			true
		);
		wp_enqueue_style(
			'nova-builder-editor',
			NB_URL . 'build/index.css',
			[ 'wp-edit-blocks' ],
			NB_VERSION
		);
	}

	private function page_has_nova_block(): bool {
		$post = get_post();
		if ( ! $post ) {
			return false;
		}
		return str_contains( $post->post_content, '<!-- wp:nova-builder/' );
	}
}
