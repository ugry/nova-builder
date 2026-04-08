import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';
import { buildIconBoxStyle, IconBoxContent } from './shared';

export default function Edit( { attributes, setAttributes } ) {
	const {
		icon, iconSize, iconColor, iconBg, iconBgSize, iconBgRadius,
		layout, title, description, titleColor, descColor, textAlign,
		padding, boxBg, boxRadius, boxShadow, className,
	} = attributes;

	const wrapStyle = buildIconBoxStyle( { padding, boxBg, boxRadius, boxShadow, textAlign } );
	const blockProps = useBlockProps( {
		className: [ 'nb-icon-box', `nb-icon-box--${ layout }`, className ].filter( Boolean ).join( ' ' ),
		style: wrapStyle,
	} );

	const iconEl = (
		<span
			className="nb-icon-box__icon-wrap"
			style={ {
				width:           iconBg ? iconBgSize : undefined,
				height:          iconBg ? iconBgSize : undefined,
				backgroundColor: iconBg || undefined,
				borderRadius:    iconBg ? iconBgRadius : undefined,
				display:         'inline-flex',
				alignItems:      'center',
				justifyContent:  'center',
				flexShrink:      0,
			} }
		>
			<span
				className={ `dashicons dashicons-${ icon } nb-icon-box__icon` }
				style={ { fontSize: iconSize, color: iconColor, width: iconSize, height: iconSize } }
				aria-hidden="true"
			/>
		</span>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon', 'nova-builder' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Icon (Dashicons name)', 'nova-builder' ) }
						value={ icon }
						onChange={ ( v ) => setAttributes( { icon: v } ) }
						placeholder="star-filled"
					/>
					<TextControl label={ __( 'Icon Size', 'nova-builder' ) } value={ iconSize } onChange={ ( v ) => setAttributes( { iconSize: v } ) } placeholder="40px" />
					<p className="components-base-control__label">{ __( 'Icon Color', 'nova-builder' ) }</p>
					<ColorPicker color={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } />
					<TextControl label={ __( 'Background Size', 'nova-builder' ) } value={ iconBgSize } onChange={ ( v ) => setAttributes( { iconBgSize: v } ) } placeholder="80px" />
					<TextControl label={ __( 'Background Radius', 'nova-builder' ) } value={ iconBgRadius } onChange={ ( v ) => setAttributes( { iconBgRadius: v } ) } placeholder="50%" />
					<p className="components-base-control__label">{ __( 'Icon Background', 'nova-builder' ) }</p>
					<ColorPicker color={ iconBg } onChange={ ( v ) => setAttributes( { iconBg: v } ) } enableAlpha />
				</PanelBody>

				<PanelBody title={ __( 'Layout & Style', 'nova-builder' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Icon Position', 'nova-builder' ) }
						value={ layout }
						options={ [
							{ label: __( 'Top', 'nova-builder' ),   value: 'top' },
							{ label: __( 'Left', 'nova-builder' ),  value: 'left' },
							{ label: __( 'Right', 'nova-builder' ), value: 'right' },
						] }
						onChange={ ( v ) => setAttributes( { layout: v } ) }
					/>
					<SelectControl
						label={ __( 'Text Align', 'nova-builder' ) }
						value={ textAlign }
						options={ [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ] }
						onChange={ ( v ) => setAttributes( { textAlign: v } ) }
					/>
					<p className="components-base-control__label">{ __( 'Box Background', 'nova-builder' ) }</p>
					<ColorPicker color={ boxBg } onChange={ ( v ) => setAttributes( { boxBg: v } ) } enableAlpha />
					<TextControl label={ __( 'Box Border Radius', 'nova-builder' ) } value={ boxRadius } onChange={ ( v ) => setAttributes( { boxRadius: v } ) } placeholder="12px" />
					<ToggleControl label={ __( 'Box Shadow', 'nova-builder' ) } checked={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Padding', 'nova-builder' ) } values={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'nova-builder' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Title Color', 'nova-builder' ) }</p>
					<ColorPicker color={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<p className="components-base-control__label">{ __( 'Description Color', 'nova-builder' ) }</p>
					<ColorPicker color={ descColor } onChange={ ( v ) => setAttributes( { descColor: v } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ layout === 'right' ? (
					<>
						<div className="nb-icon-box__content">
							<RichText tagName="h4" className="nb-icon-box__title" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'Title…', 'nova-builder' ) } style={ { color: titleColor || undefined } } allowedFormats={ [ 'core/bold', 'core/italic' ] } />
							<RichText tagName="p" className="nb-icon-box__desc" value={ description } onChange={ ( v ) => setAttributes( { description: v } ) } placeholder={ __( 'Description…', 'nova-builder' ) } style={ { color: descColor || undefined } } />
						</div>
						{ iconEl }
					</>
				) : (
					<>
						{ iconEl }
						<div className="nb-icon-box__content">
							<RichText tagName="h4" className="nb-icon-box__title" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'Title…', 'nova-builder' ) } style={ { color: titleColor || undefined } } allowedFormats={ [ 'core/bold', 'core/italic' ] } />
							<RichText tagName="p" className="nb-icon-box__desc" value={ description } onChange={ ( v ) => setAttributes( { description: v } ) } placeholder={ __( 'Description…', 'nova-builder' ) } style={ { color: descColor || undefined } } />
						</div>
					</>
				) }
			</div>
		</>
	);
}
