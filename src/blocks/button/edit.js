import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker, ToggleControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { buildButtonStyle } from './shared';

export default function Edit( { attributes, setAttributes } ) {
	const {
		text, url, target, rel,
		style, size, bgColor, textColor, borderColor, borderRadius,
		fullWidth, icon, iconPosition, align, className,
	} = attributes;

	const btnStyle = buildButtonStyle( { style, bgColor, textColor, borderColor, borderRadius } );

	const blockProps = useBlockProps( {
		className: [ 'nb-button-wrap', `nb-button-wrap--${ align }`, className ].filter( Boolean ).join( ' ' ),
		style: { textAlign: align },
	} );

	const btnClass = [
		'nb-btn',
		`nb-btn--${ style }`,
		`nb-btn--${ size }`,
		fullWidth ? 'nb-btn--full' : '',
	].filter( Boolean ).join( ' ' );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ [ 'left', 'center', 'right' ].map( ( a ) => (
						<ToolbarButton
							key={ a }
							icon={ `editor-${ a }` }
							isActive={ align === a }
							onClick={ () => setAttributes( { align: a } ) }
							label={ a }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Button', 'nova-builder' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'URL', 'nova-builder' ) }
						value={ url }
						onChange={ ( val ) => setAttributes( { url: val } ) }
						placeholder="https://"
					/>
					<SelectControl
						label={ __( 'Open in', 'nova-builder' ) }
						value={ target }
						options={ [
							{ label: __( 'Same tab', 'nova-builder' ),  value: '_self' },
							{ label: __( 'New tab', 'nova-builder' ),   value: '_blank' },
						] }
						onChange={ ( val ) => setAttributes( { target: val } ) }
					/>
					<SelectControl
						label={ __( 'Style', 'nova-builder' ) }
						value={ style }
						options={ [
							{ label: __( 'Filled', 'nova-builder' ),   value: 'filled' },
							{ label: __( 'Outlined', 'nova-builder' ), value: 'outlined' },
							{ label: __( 'Ghost', 'nova-builder' ),    value: 'ghost' },
							{ label: __( 'Link', 'nova-builder' ),     value: 'link' },
						] }
						onChange={ ( val ) => setAttributes( { style: val } ) }
					/>
					<SelectControl
						label={ __( 'Size', 'nova-builder' ) }
						value={ size }
						options={ [
							{ label: __( 'Small', 'nova-builder' ),  value: 'sm' },
							{ label: __( 'Medium', 'nova-builder' ), value: 'md' },
							{ label: __( 'Large', 'nova-builder' ),  value: 'lg' },
						] }
						onChange={ ( val ) => setAttributes( { size: val } ) }
					/>
					<ToggleControl
						label={ __( 'Full Width', 'nova-builder' ) }
						checked={ fullWidth }
						onChange={ ( val ) => setAttributes( { fullWidth: val } ) }
					/>
					<TextControl
						label={ __( 'Border Radius', 'nova-builder' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						placeholder="6px"
					/>
					<TextControl
						label={ __( 'Icon (Dashicon name)', 'nova-builder' ) }
						value={ icon }
						onChange={ ( val ) => setAttributes( { icon: val } ) }
						placeholder="arrow-right-alt"
						help={ __( 'Dashicons name, e.g. arrow-right-alt, download, external', 'nova-builder' ) }
					/>
					{ icon && (
						<SelectControl
							label={ __( 'Icon Position', 'nova-builder' ) }
							value={ iconPosition }
							options={ [
								{ label: __( 'Left', 'nova-builder' ),  value: 'left' },
								{ label: __( 'Right', 'nova-builder' ), value: 'right' },
							] }
							onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'nova-builder' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Background / Border Color', 'nova-builder' ) }</p>
					<ColorPicker color={ bgColor } onChange={ ( v ) => setAttributes( { bgColor: v, borderColor: v } ) } />
					<p className="components-base-control__label">{ __( 'Text Color', 'nova-builder' ) }</p>
					<ColorPicker color={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<a className={ btnClass } style={ btnStyle } href={ url || '#' }>
					{ icon && iconPosition === 'left' && (
						<span className={ `dashicons dashicons-${ icon } nb-btn__icon nb-btn__icon--left` } aria-hidden="true" />
					) }
					<RichText
						tagName="span"
						className="nb-btn__text"
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						placeholder={ __( 'Button text…', 'nova-builder' ) }
						allowedFormats={ [] }
					/>
					{ icon && iconPosition === 'right' && (
						<span className={ `dashicons dashicons-${ icon } nb-btn__icon nb-btn__icon--right` } aria-hidden="true" />
					) }
				</a>
			</div>
		</>
	);
}
