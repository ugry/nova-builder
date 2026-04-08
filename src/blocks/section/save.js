import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { spacingToCSS } from '../../components/SpacingControl';
import { backgroundToStyle } from '../../components/BackgroundControl';

export default function save( { attributes } ) {
	const {
		htmlTag: Tag = 'section',
		minHeight, contentWidth, containerMaxWidth,
		padding, margin, background, overlayColor, overlayOpacity,
		borderRadius, animation, anchorId, className,
	} = attributes;

	const bgStyle = backgroundToStyle( background );

	const wrapStyle = {
		...bgStyle,
		minHeight:    minHeight || undefined,
		padding:      spacingToCSS( padding ) || undefined,
		margin:       spacingToCSS( margin )  || undefined,
		borderRadius: borderRadius || undefined,
		position:     overlayColor ? 'relative' : undefined,
	};

	const blockProps = useBlockProps.save( {
		style:     wrapStyle,
		className: [ 'nb-section', animation, className ].filter( Boolean ).join( ' ' ),
		id:        anchorId || undefined,
	} );

	return (
		<Tag { ...blockProps }>
			{ overlayColor && (
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
					aria-hidden="true"
				/>
			) }
			<div
				className="nb-section__inner"
				style={ {
					maxWidth:    contentWidth === 'boxed' ? containerMaxWidth : undefined,
					marginLeft:  contentWidth === 'boxed' ? 'auto' : undefined,
					marginRight: contentWidth === 'boxed' ? 'auto' : undefined,
					position:    'relative',
				} }
			>
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}
