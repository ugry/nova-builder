import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { items, activeTab, tabStyle, activeColor, tabBg, contentBg, borderColor, className } = attributes;

	const blockProps = useBlockProps.save( {
		className: [ 'nb-tabs', `nb-tabs--${ tabStyle }`, className ].filter( Boolean ).join( ' ' ),
		style: { '--nb-tabs-active': activeColor, '--nb-tabs-border': borderColor },
	} );

	return (
		<div { ...blockProps }>
			<div className="nb-tabs__nav" role="tablist">
				{ items.map( ( item, i ) => (
					<button
						key={ i }
						className={ `nb-tabs__tab${ i === activeTab ? ' is-active' : '' }` }
						role="tab"
						aria-selected={ i === activeTab ? 'true' : 'false' }
						aria-controls={ `nb-tab-panel-${ i }` }
						id={ `nb-tab-${ i }` }
					>
						{ item.label }
					</button>
				) ) }
			</div>
			{ items.map( ( item, i ) => (
				<div
					key={ i }
					className="nb-tabs__panel"
					role="tabpanel"
					id={ `nb-tab-panel-${ i }` }
					aria-labelledby={ `nb-tab-${ i }` }
					hidden={ i !== activeTab }
					style={ { backgroundColor: contentBg, border: `1px solid ${ borderColor }` } }
				>
					<p>{ item.content }</p>
				</div>
			) ) }
		</div>
	);
}
