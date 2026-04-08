import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';
import BackgroundControl, { backgroundToStyle } from '../../components/BackgroundControl';
import { buildButtonStyle } from '../button/shared';

export default function Edit( { attributes, setAttributes } ) {
	const {
		title, subtitle,
		btn1Text, btn1Url, btn1Style, btn1Color,
		btn2Text, btn2Url, btn2Style, btn2Color, showBtn2,
		background, overlayColor, showOverlay,
		minHeight, contentAlign, titleColor, subtitleColor,
		padding, className,
	} = attributes;

	const wrapStyle = {
		...backgroundToStyle( background ),
		minHeight,
		padding:  spacingToCSS( padding ) || undefined,
		position: 'relative',
		display:  'flex',
		alignItems: 'center',
	};

	const blockProps = useBlockProps( {
		className: [ 'nb-cta', className ].filter( Boolean ).join( ' ' ),
		style: wrapStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Background', 'nova-builder' ) } initialOpen={ true }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
					<ToggleControl label={ __( 'Show Overlay', 'nova-builder' ) } checked={ showOverlay } onChange={ ( v ) => setAttributes( { showOverlay: v } ) } />
					{ showOverlay && (
						<>
							<p className="components-base-control__label">{ __( 'Overlay Color', 'nova-builder' ) }</p>
							<ColorPicker color={ overlayColor } onChange={ ( v ) => setAttributes( { overlayColor: v } ) } enableAlpha />
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'nova-builder' ) } initialOpen={ false }>
					<TextControl label={ __( 'Min Height', 'nova-builder' ) } value={ minHeight } onChange={ ( v ) => setAttributes( { minHeight: v } ) } />
					<SelectControl
						label={ __( 'Content Align', 'nova-builder' ) }
						value={ contentAlign }
						options={ [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ] }
						onChange={ ( v ) => setAttributes( { contentAlign: v } ) }
					/>
					<SpacingControl label={ __( 'Padding', 'nova-builder' ) } values={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Colors', 'nova-builder' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Title Color', 'nova-builder' ) }</p>
					<ColorPicker color={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<p className="components-base-control__label">{ __( 'Subtitle Color', 'nova-builder' ) }</p>
					<ColorPicker color={ subtitleColor } onChange={ ( v ) => setAttributes( { subtitleColor: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Button 1', 'nova-builder' ) } initialOpen={ false }>
					<TextControl label={ __( 'Text', 'nova-builder' ) } value={ btn1Text } onChange={ ( v ) => setAttributes( { btn1Text: v } ) } />
					<TextControl label={ __( 'URL', 'nova-builder' ) }  value={ btn1Url }  onChange={ ( v ) => setAttributes( { btn1Url: v } ) } />
					<SelectControl label={ __( 'Style', 'nova-builder' ) } value={ btn1Style } options={ [ { label: 'Filled', value: 'filled' }, { label: 'Outlined', value: 'outlined' }, { label: 'Ghost', value: 'ghost' } ] } onChange={ ( v ) => setAttributes( { btn1Style: v } ) } />
					<p className="components-base-control__label">{ __( 'Color', 'nova-builder' ) }</p>
					<ColorPicker color={ btn1Color } onChange={ ( v ) => setAttributes( { btn1Color: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Button 2', 'nova-builder' ) } initialOpen={ false }>
					<ToggleControl label={ __( 'Show Second Button', 'nova-builder' ) } checked={ showBtn2 } onChange={ ( v ) => setAttributes( { showBtn2: v } ) } />
					{ showBtn2 && (
						<>
							<TextControl label={ __( 'Text', 'nova-builder' ) } value={ btn2Text } onChange={ ( v ) => setAttributes( { btn2Text: v } ) } />
							<TextControl label={ __( 'URL', 'nova-builder' ) }  value={ btn2Url }  onChange={ ( v ) => setAttributes( { btn2Url: v } ) } />
							<SelectControl label={ __( 'Style', 'nova-builder' ) } value={ btn2Style } options={ [ { label: 'Filled', value: 'filled' }, { label: 'Outlined', value: 'outlined' }, { label: 'Ghost', value: 'ghost' } ] } onChange={ ( v ) => setAttributes( { btn2Style: v } ) } />
							<p className="components-base-control__label">{ __( 'Color', 'nova-builder' ) }</p>
							<ColorPicker color={ btn2Color } onChange={ ( v ) => setAttributes( { btn2Color: v } ) } />
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ showOverlay && (
					<span className="nb-cta__overlay" style={ { position: 'absolute', inset: 0, backgroundColor: overlayColor, pointerEvents: 'none' } } />
				) }
				<div className="nb-cta__inner" style={ { textAlign: contentAlign, position: 'relative', width: '100%', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' } }>
					<RichText tagName="h2" className="nb-cta__title" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } placeholder={ __( 'Hero title…', 'nova-builder' ) } style={ { color: titleColor } } allowedFormats={ [ 'core/bold', 'core/italic' ] } />
					<RichText tagName="p"  className="nb-cta__subtitle" value={ subtitle } onChange={ ( v ) => setAttributes( { subtitle: v } ) } placeholder={ __( 'Subtitle…', 'nova-builder' ) } style={ { color: subtitleColor } } allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] } />
					<div className="nb-cta__buttons" style={ { display: 'flex', gap: 16, justifyContent: contentAlign === 'center' ? 'center' : contentAlign === 'right' ? 'flex-end' : 'flex-start', flexWrap: 'wrap', marginTop: 32 } }>
						<a href={ btn1Url } className="nb-btn nb-btn--md" style={ buildButtonStyle( { style: btn1Style, bgColor: btn1Color, textColor: '#fff', borderColor: btn1Color, borderRadius: '6px' } ) }>
							{ btn1Text }
						</a>
						{ showBtn2 && (
							<a href={ btn2Url } className="nb-btn nb-btn--md" style={ buildButtonStyle( { style: btn2Style, bgColor: btn2Color, textColor: btn2Color, borderColor: btn2Color, borderRadius: '6px' } ) }>
								{ btn2Text }
							</a>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
