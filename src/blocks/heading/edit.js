import { useBlockProps, RichText, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPicker, ToggleControl, TextControl, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SpacingControl, { spacingToCSS } from '../../components/SpacingControl';
import TypographyControl, { typographyToStyle } from '../../components/TypographyControl';

const LEVELS = [ 1, 2, 3, 4, 5, 6 ];

export default function Edit( { attributes, setAttributes } ) {
	const {
		content, level, textAlign, color, typography,
		showDivider, dividerColor, dividerWidth,
		padding, margin, className,
	} = attributes;

	const Tag = `h${ level }`;

	const style = {
		...typographyToStyle( typography ),
		color:      color || undefined,
		textAlign:  textAlign || undefined,
		padding:    spacingToCSS( padding ) || undefined,
		margin:     spacingToCSS( margin )  || undefined,
	};

	const blockProps = useBlockProps( {
		className: [ 'nb-heading', className ].filter( Boolean ).join( ' ' ),
		style,
	} );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ LEVELS.map( ( l ) => (
						<ToolbarButton
							key={ l }
							isActive={ level === l }
							onClick={ () => setAttributes( { level: l } ) }
						>
							H{ l }
						</ToolbarButton>
					) ) }
				</ToolbarGroup>
				<ToolbarGroup>
					{ [ 'left', 'center', 'right' ].map( ( a ) => (
						<ToolbarButton
							key={ a }
							icon={ `editor-${ a }` }
							isActive={ textAlign === a }
							onClick={ () => setAttributes( { textAlign: a } ) }
							label={ a }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Heading', 'nova-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Level', 'nova-builder' ) }
						value={ String( level ) }
						options={ LEVELS.map( ( l ) => ( { label: `H${ l }`, value: String( l ) } ) ) }
						onChange={ ( val ) => setAttributes( { level: Number( val ) } ) }
					/>
					<p className="components-base-control__label">{ __( 'Color', 'nova-builder' ) }</p>
					<ColorPicker
						color={ color }
						onChange={ ( val ) => setAttributes( { color: val } ) }
						enableAlpha
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'nova-builder' ) } initialOpen={ false }>
					<TypographyControl
						value={ typography }
						onChange={ ( val ) => setAttributes( { typography: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Decorative Underline', 'nova-builder' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Divider Below Heading', 'nova-builder' ) }
						checked={ showDivider }
						onChange={ ( val ) => setAttributes( { showDivider: val } ) }
					/>
					{ showDivider && (
						<>
							<TextControl
								label={ __( 'Divider Width', 'nova-builder' ) }
								value={ dividerWidth }
								onChange={ ( val ) => setAttributes( { dividerWidth: val } ) }
								placeholder="60px"
							/>
							<p className="components-base-control__label">{ __( 'Divider Color', 'nova-builder' ) }</p>
							<ColorPicker
								color={ dividerColor }
								onChange={ ( val ) => setAttributes( { dividerColor: val } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Spacing', 'nova-builder' ) } initialOpen={ false }>
					<SpacingControl label={ __( 'Padding', 'nova-builder' ) } values={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nova-builder' ) }  values={ margin }  onChange={ ( v ) => setAttributes( { margin: v } ) }  />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName={ Tag }
					className="nb-heading__text"
					value={ content }
					onChange={ ( val ) => setAttributes( { content: val } ) }
					placeholder={ __( 'Write heading…', 'nova-builder' ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
				/>
				{ showDivider && (
					<span
						className="nb-heading__divider"
						style={ {
							display:         'block',
							width:           dividerWidth,
							height:          '3px',
							backgroundColor: dividerColor,
							marginTop:       '12px',
						} }
					/>
				) }
			</div>
		</>
	);
}
