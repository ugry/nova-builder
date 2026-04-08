import { useBlockProps, RichText } from '@wordpress/block-editor';
import { spacingToCSS } from '../../components/SpacingControl';
import { typographyToStyle } from '../../components/TypographyControl';

export default function save( { attributes } ) {
	const {
		content, level, textAlign, color, typography,
		showDivider, dividerColor, dividerWidth,
		padding, margin, className,
	} = attributes;

	const Tag = `h${ level }`;

	const style = {
		...typographyToStyle( typography ),
		color:     color || undefined,
		textAlign: textAlign || undefined,
		padding:   spacingToCSS( padding ) || undefined,
		margin:    spacingToCSS( margin )  || undefined,
	};

	const blockProps = useBlockProps.save( {
		className: [ 'nb-heading', className ].filter( Boolean ).join( ' ' ),
		style,
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName={ Tag }
				className="nb-heading__text"
				value={ content }
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
					aria-hidden="true"
				/>
			) }
		</div>
	);
}
