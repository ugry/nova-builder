import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		items, expandMode, defaultOpen, iconStyle,
		titleBg, titleColor, contentBg, contentColor,
		borderColor, borderRadius, className,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className:    [ 'nb-accordion', className ].filter( Boolean ).join( ' ' ),
		'data-mode':  expandMode,
		style: { '--nb-acc-border': borderColor, '--nb-acc-radius': borderRadius },
	} );

	return (
		<div { ...blockProps }>
			{ items.map( ( item, i ) => (
				<div
					key={ i }
					className={ `nb-accordion__item${ i === defaultOpen ? ' is-open' : '' }` }
					style={ {
						borderColor,
						borderRadius: i === 0 ? `${ borderRadius } ${ borderRadius } 0 0` : i === items.length - 1 ? `0 0 ${ borderRadius } ${ borderRadius }` : 0,
					} }
				>
					<button
						className="nb-accordion__trigger"
						aria-expanded={ i === defaultOpen ? 'true' : 'false' }
						style={ { backgroundColor: titleBg, color: titleColor || undefined } }
					>
						<span>{ item.title }</span>
						{ iconStyle !== 'none' && (
							<span className="nb-accordion__icon" aria-hidden="true">
								{ iconStyle === 'plus' ? '+' : '▼' }
							</span>
						) }
					</button>
					<div
						className="nb-accordion__content"
						hidden={ i !== defaultOpen }
						style={ { backgroundColor: contentBg, color: contentColor || undefined } }
					>
						<p>{ item.content }</p>
					</div>
				</div>
			) ) }
		</div>
	);
}
