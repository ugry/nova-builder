import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, RangeControl, ToggleControl, ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';
import BackgroundControl, { backgroundToStyle } from '../../components/BackgroundControl';

const HTML_TAGS = [
	{ label: 'section', value: 'section' },
	{ label: 'div',     value: 'div' },
	{ label: 'header',  value: 'header' },
	{ label: 'footer',  value: 'footer' },
	{ label: 'main',    value: 'main' },
	{ label: 'article', value: 'article' },
	{ label: 'aside',   value: 'aside' },
];

const ANIMATIONS = [
	{ label: __( 'None', 'nova-builder' ),       value: '' },
	{ label: __( 'Fade In', 'nova-builder' ),     value: 'nb-anim-fade-in' },
	{ label: __( 'Fade Up', 'nova-builder' ),     value: 'nb-anim-fade-up' },
	{ label: __( 'Fade Down', 'nova-builder' ),   value: 'nb-anim-fade-down' },
	{ label: __( 'Slide Left', 'nova-builder' ),  value: 'nb-anim-slide-left' },
	{ label: __( 'Slide Right', 'nova-builder' ), value: 'nb-anim-slide-right' },
	{ label: __( 'Zoom In', 'nova-builder' ),     value: 'nb-anim-zoom-in' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		htmlTag, minHeight, contentWidth, containerMaxWidth,
		padding, margin, background, overlayColor, overlayOpacity,
		borderRadius, animation, anchorId, className,
	} = attributes;

	const bgStyle   = backgroundToStyle( background );
	const hasOverlay = !! overlayColor;

	const wrapStyle = {
		...bgStyle,
		minHeight:    minHeight || undefined,
		padding:      spacingToCSS( padding ) || undefined,
		margin:       spacingToCSS( margin )  || undefined,
		borderRadius: borderRadius || undefined,
		position:     'relative',
	};

	const blockProps = useBlockProps( {
		style:     wrapStyle,
		className: [ 'nb-section', animation, className ].filter( Boolean ).join( ' ' ),
		id:        anchorId || undefined,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'nova-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'HTML Tag', 'nova-builder' ) }
						value={ htmlTag }
						options={ HTML_TAGS }
						onChange={ ( val ) => setAttributes( { htmlTag: val } ) }
					/>
					<SelectControl
						label={ __( 'Content Width', 'nova-builder' ) }
						value={ contentWidth }
						options={ [
							{ label: __( 'Boxed (centered container)', 'nova-builder' ), value: 'boxed' },
							{ label: __( 'Full Width', 'nova-builder' ),                 value: 'full' },
						] }
						onChange={ ( val ) => setAttributes( { contentWidth: val } ) }
					/>
					{ contentWidth === 'boxed' && (
						<TextControl
							label={ __( 'Max Width', 'nova-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) => setAttributes( { containerMaxWidth: val } ) }
							placeholder="1200px"
						/>
					) }
					<TextControl
						label={ __( 'Min Height', 'nova-builder' ) }
						value={ minHeight }
						onChange={ ( val ) => setAttributes( { minHeight: val } ) }
						placeholder="auto, 100vh, 500px…"
					/>
					<TextControl
						label={ __( 'Anchor ID', 'nova-builder' ) }
						value={ anchorId }
						onChange={ ( val ) => setAttributes( { anchorId: val } ) }
						placeholder="my-section"
					/>
				</PanelBody>

				<PanelBody title={ __( 'Background', 'nova-builder' ) } initialOpen={ false }>
					<BackgroundControl
						value={ background }
						onChange={ ( val ) => setAttributes( { background: val } ) }
					/>
				</PanelBody>

				{ background.imageUrl && (
					<PanelBody title={ __( 'Overlay', 'nova-builder' ) } initialOpen={ false }>
						<p className="components-base-control__label">{ __( 'Overlay Color', 'nova-builder' ) }</p>
						<ColorPicker
							color={ overlayColor }
							onChange={ ( val ) => setAttributes( { overlayColor: val } ) }
							enableAlpha
						/>
						{ overlayColor && (
							<RangeControl
								label={ __( 'Overlay Opacity', 'nova-builder' ) }
								value={ overlayOpacity }
								onChange={ ( val ) => setAttributes( { overlayOpacity: val } ) }
								min={ 0 }
								max={ 1 }
								step={ 0.05 }
							/>
						) }
					</PanelBody>
				) }

				<PanelBody title={ __( 'Spacing', 'nova-builder' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'nova-builder' ) }
						values={ padding }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
					/>
					<SpacingControl
						label={ __( 'Margin', 'nova-builder' ) }
						values={ margin }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
					/>
					<TextControl
						label={ __( 'Border Radius', 'nova-builder' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						placeholder="0px, 8px, 50%…"
					/>
				</PanelBody>

				<PanelBody title={ __( 'Animation', 'nova-builder' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Entrance Animation', 'nova-builder' ) }
						value={ animation }
						options={ ANIMATIONS }
						onChange={ ( val ) => setAttributes( { animation: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ hasOverlay && (
					<span
						className="nb-section__overlay"
						style={ {
							position:        'absolute',
							inset:           0,
							backgroundColor: overlayColor,
							opacity:         overlayOpacity,
							pointerEvents:   'none',
							borderRadius:    borderRadius || undefined,
						} }
					/>
				) }
				<div
					className="nb-section__inner"
					style={ {
						maxWidth:     contentWidth === 'boxed' ? containerMaxWidth : undefined,
						marginLeft:   contentWidth === 'boxed' ? 'auto' : undefined,
						marginRight:  contentWidth === 'boxed' ? 'auto' : undefined,
						position:     'relative',
					} }
				>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
