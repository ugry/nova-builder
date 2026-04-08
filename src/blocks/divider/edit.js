import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';

export default function Edit( { attributes, setAttributes } ) {
	const { style, width, color, thickness, align, margin } = attributes;

	const hrStyle = {
		borderStyle:   style,
		borderColor:   color,
		borderWidth:   `0 0 ${ thickness } 0`,
		width,
		margin:        `${ spacingToCSS( margin ) || '20px 0' }`,
		marginLeft:    align === 'left' ? '0' : align === 'right' ? 'auto' : 'auto',
		marginRight:   align === 'right' ? '0' : align === 'left' ? 'auto' : 'auto',
		display:       'block',
	};

	const blockProps = useBlockProps( { className: 'nb-divider' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Divider', 'nova-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Style', 'nova-builder' ) }
						value={ style }
						options={ [
							{ label: 'Solid',  value: 'solid' },
							{ label: 'Dashed', value: 'dashed' },
							{ label: 'Dotted', value: 'dotted' },
							{ label: 'Double', value: 'double' },
						] }
						onChange={ ( v ) => setAttributes( { style: v } ) }
					/>
					<TextControl label={ __( 'Width', 'nova-builder' ) }  value={ width }     onChange={ ( v ) => setAttributes( { width: v } ) }     placeholder="100%" />
					<TextControl label={ __( 'Thickness', 'nova-builder' ) } value={ thickness } onChange={ ( v ) => setAttributes( { thickness: v } ) } placeholder="1px" />
					<SelectControl
						label={ __( 'Alignment', 'nova-builder' ) }
						value={ align }
						options={ [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ] }
						onChange={ ( v ) => setAttributes( { align: v } ) }
					/>
					<p className="components-base-control__label">{ __( 'Color', 'nova-builder' ) }</p>
					<ColorPicker color={ color } onChange={ ( v ) => setAttributes( { color: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nova-builder' ) } values={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } />
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<hr style={ hrStyle } />
			</div>
		</>
	);
}
