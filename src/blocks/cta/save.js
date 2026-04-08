import { useBlockProps, RichText } from '@wordpress/block-editor';
import { spacingToCSS } from '../../components/SpacingControl';
import { backgroundToStyle } from '../../components/BackgroundControl';
import { buildButtonStyle } from '../button/shared';

export default function save( { attributes } ) {
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
		padding: spacingToCSS( padding ) || undefined,
	};

	const blockProps = useBlockProps.save( {
		className: [ 'nb-cta', className ].filter( Boolean ).join( ' ' ),
		style: wrapStyle,
	} );

	return (
		<div { ...blockProps }>
			{ showOverlay && (
				<span className="nb-cta__overlay" style={ { backgroundColor: overlayColor } } aria-hidden="true" />
			) }
			<div className="nb-cta__inner" style={ { textAlign: contentAlign } }>
				<RichText.Content tagName="h2" className="nb-cta__title"    value={ title }    style={ { color: titleColor } } />
				<RichText.Content tagName="p"  className="nb-cta__subtitle" value={ subtitle } style={ { color: subtitleColor } } />
				<div className="nb-cta__buttons">
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
	);
}
