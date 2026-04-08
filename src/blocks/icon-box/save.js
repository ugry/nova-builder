import { useBlockProps, RichText } from '@wordpress/block-editor';
import { buildIconBoxStyle } from './shared';

export default function save( { attributes } ) {
	const {
		icon, iconSize, iconColor, iconBg, iconBgSize, iconBgRadius,
		layout, title, description, titleColor, descColor, textAlign,
		padding, boxBg, boxRadius, boxShadow, className,
	} = attributes;

	const wrapStyle = buildIconBoxStyle( { padding, boxBg, boxRadius, boxShadow, textAlign } );

	const blockProps = useBlockProps.save( {
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
			} }
		>
			<span
				className={ `dashicons dashicons-${ icon } nb-icon-box__icon` }
				style={ { fontSize: iconSize, color: iconColor, width: iconSize, height: iconSize } }
				aria-hidden="true"
			/>
		</span>
	);

	const content = (
		<div className="nb-icon-box__content">
			<RichText.Content tagName="h4" className="nb-icon-box__title" value={ title } style={ { color: titleColor || undefined } } />
			<RichText.Content tagName="p"  className="nb-icon-box__desc"  value={ description } style={ { color: descColor || undefined } } />
		</div>
	);

	return (
		<div { ...blockProps }>
			{ layout === 'right' ? <>{ content }{ iconEl }</> : <>{ iconEl }{ content }</> }
		</div>
	);
}
