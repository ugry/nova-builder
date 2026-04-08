import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { layout, gap, verticalAlign, stackOnMobile, reverseOnMobile, className } = attributes;
	const alignMap = { top: 'flex-start', center: 'center', bottom: 'flex-end', stretch: 'stretch' };

	const blockProps = useBlockProps.save( {
		className: [
			'nb-columns',
			`nb-columns--${ layout }`,
			stackOnMobile   ? 'nb-columns--stack-mobile'   : '',
			reverseOnMobile ? 'nb-columns--reverse-mobile' : '',
			className,
		].filter( Boolean ).join( ' ' ),
		style: {
			'--nb-col-gap':      gap || '30px',
			'--nb-col-align':    alignMap[ verticalAlign ] || 'flex-start',
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
