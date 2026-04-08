import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';
import BackgroundControl, { backgroundToStyle } from '../../components/BackgroundControl';

export default function Edit( { attributes, setAttributes } ) {
	const { width, padding, background, verticalAlign, className } = attributes;

	const style = {
		...backgroundToStyle( background ),
		width:          width || undefined,
		flex:           width ? `0 0 ${ width }` : '1',
		padding:        spacingToCSS( padding ) || undefined,
		display:        'flex',
		flexDirection:  'column',
		justifyContent: verticalAlign || undefined,
	};

	const blockProps = useBlockProps( {
		className: [ 'nb-column', className ].filter( Boolean ).join( ' ' ),
		style,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Column', 'nova-builder' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Width Override', 'nova-builder' ) }
						value={ width }
						onChange={ ( val ) => setAttributes( { width: val } ) }
						placeholder={ __( 'e.g. 40%, 300px — leave empty for equal', 'nova-builder' ) }
					/>
					<SelectControl
						label={ __( 'Vertical Content Alignment', 'nova-builder' ) }
						value={ verticalAlign }
						options={ [
							{ label: __( 'Default', 'nova-builder' ),  value: '' },
							{ label: __( 'Top', 'nova-builder' ),      value: 'flex-start' },
							{ label: __( 'Center', 'nova-builder' ),   value: 'center' },
							{ label: __( 'Bottom', 'nova-builder' ),   value: 'flex-end' },
						] }
						onChange={ ( val ) => setAttributes( { verticalAlign: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Spacing', 'nova-builder' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'nova-builder' ) }
						values={ padding }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background', 'nova-builder' ) } initialOpen={ false }>
					<BackgroundControl
						value={ background }
						onChange={ ( val ) => setAttributes( { background: val } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks />
			</div>
		</>
	);
}
