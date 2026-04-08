import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { spacingToCSS } from '../../components/SpacingControl';
import { backgroundToStyle } from '../../components/BackgroundControl';

export default function save( { attributes } ) {
	const { width, padding, background, verticalAlign, className } = attributes;

	const style = {
		...backgroundToStyle( background ),
		'--nb-col-width': width || undefined,
		padding:          spacingToCSS( padding ) || undefined,
		justifyContent:   verticalAlign || undefined,
	};

	const blockProps = useBlockProps.save( {
		className: [ 'nb-column', className ].filter( Boolean ).join( ' ' ),
		style,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
