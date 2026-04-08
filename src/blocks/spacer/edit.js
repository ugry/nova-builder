import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { heightDesktop, heightTablet, heightMobile } = attributes;

	const blockProps = useBlockProps( {
		className: 'nb-spacer',
		style: {
			'--nb-spacer-desktop': heightDesktop,
			'--nb-spacer-tablet':  heightTablet,
			'--nb-spacer-mobile':  heightMobile,
			height:                heightDesktop,
			display:               'block',
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Spacer Height', 'nova-builder' ) } initialOpen={ true }>
					<TextControl label={ __( 'Desktop', 'nova-builder' ) } value={ heightDesktop } onChange={ ( v ) => setAttributes( { heightDesktop: v } ) } placeholder="60px" />
					<TextControl label={ __( 'Tablet', 'nova-builder' ) }  value={ heightTablet }  onChange={ ( v ) => setAttributes( { heightTablet: v } ) }  placeholder="40px" />
					<TextControl label={ __( 'Mobile', 'nova-builder' ) }  value={ heightMobile }  onChange={ ( v ) => setAttributes( { heightMobile: v } ) }  placeholder="30px" />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } aria-hidden="true" />
		</>
	);
}
