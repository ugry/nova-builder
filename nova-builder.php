<?php
/**
 * Plugin Name: Nova Builder
 * Plugin URI:  https://novabuilder.io
 * Description: A Gutenberg-native page builder with zero shortcode lock-in and clean semantic HTML output. The modern WPBakery replacement.
 * Version:     1.0.0
 * Requires at least: 6.2
 * Requires PHP: 8.0
 * Author:      Nova Builder
 * License:     GPL-2.0-or-later
 * Text Domain: nova-builder
 * Domain Path: /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'NB_VERSION', '1.0.0' );
define( 'NB_FILE',    __FILE__ );
define( 'NB_DIR',     plugin_dir_path( __FILE__ ) );
define( 'NB_URL',     plugin_dir_url( __FILE__ ) );
define( 'NB_MIN_PHP', '8.0' );
define( 'NB_MIN_WP',  '6.2' );

spl_autoload_register( function ( string $class ): void {
	$prefix = 'NovaBuilder\\';
	if ( ! str_starts_with( $class, $prefix ) ) {
		return;
	}
	$name     = substr( $class, strlen( $prefix ) );
	$filename = 'class-' . strtolower( preg_replace( '/([a-z])([A-Z])/', '$1-$2', $name ) ) . '.php';
	$path     = NB_DIR . 'includes/' . $filename;
	if ( file_exists( $path ) ) {
		require $path;
	}
} );

add_action( 'plugins_loaded', function (): void {
	if ( version_compare( PHP_VERSION, NB_MIN_PHP, '<' ) ) {
		add_action( 'admin_notices', function (): void {
			echo '<div class="notice notice-error"><p>' .
				esc_html( sprintf( __( 'Nova Builder requires PHP %s or higher.', 'nova-builder' ), NB_MIN_PHP ) ) .
				'</p></div>';
		} );
		return;
	}
	load_plugin_textdomain( 'nova-builder', false, NB_DIR . 'languages' );
	\NovaBuilder\Plugin::instance()->boot();
} );
