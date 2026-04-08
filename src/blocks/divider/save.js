import { useBlockProps } from '@wordpress/block-editor';
import { spacingToCSS } from '../../components/SpacingControl';

export default function save( { attributes } ) {
	const { style, width, color, thickness, align, margin } = attributes;

	const hrStyle = {
		borderStyle:  style,
		borderColor:  color,
		borderWidth:  `0 0 ${ thickness } 0`,
		width,
		display:      'block',
		marginTop:    margin?.top    || '20px',
		marginBottom: margin?.bottom || '20px',
		marginLeft:   align === 'left' ? '0' : 'auto',
		marginRight:  align === 'right' ? '0' : 'auto',
	};

	return (
		<div { ...useBlockProps.save( { className: 'nb-divider' } ) }>
			<hr style={ hrStyle } />
		</div>
	);
}
