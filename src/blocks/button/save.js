import { useBlockProps, RichText } from '@wordpress/block-editor';
import { buildButtonStyle } from './shared';

export default function save( { attributes } ) {
	const {
		text, url, target, rel,
		style, size, bgColor, textColor, borderColor, borderRadius,
		fullWidth, icon, iconPosition, align, className,
	} = attributes;

	const btnStyle = buildButtonStyle( { style, bgColor, textColor, borderColor, borderRadius } );

	const blockProps = useBlockProps.save( {
		className: [ 'nb-button-wrap', `nb-button-wrap--${ align }`, className ].filter( Boolean ).join( ' ' ),
		style: { textAlign: align },
	} );

	const btnClass = [
		'nb-btn',
		`nb-btn--${ style }`,
		`nb-btn--${ size }`,
		fullWidth ? 'nb-btn--full' : '',
	].filter( Boolean ).join( ' ' );

	const linkRel = [ rel, target === '_blank' ? 'noopener noreferrer' : '' ].filter( Boolean ).join( ' ' ) || undefined;

	return (
		<div { ...blockProps }>
			<a
				className={ btnClass }
				style={ btnStyle }
				href={ url || '#' }
				target={ target !== '_self' ? target : undefined }
				rel={ linkRel }
			>
				{ icon && iconPosition === 'left' && (
					<span className={ `dashicons dashicons-${ icon } nb-btn__icon nb-btn__icon--left` } aria-hidden="true" />
				) }
				<RichText.Content tagName="span" className="nb-btn__text" value={ text } />
				{ icon && iconPosition === 'right' && (
					<span className={ `dashicons dashicons-${ icon } nb-btn__icon nb-btn__icon--right` } aria-hidden="true" />
				) }
			</a>
		</div>
	);
}
