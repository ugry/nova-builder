import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

/**
 * SpacingControl — wraps BoxControl for padding/margin with linked sides.
 *
 * @param {object} props
 * @param {string} props.label   - "Padding" or "Margin"
 * @param {object} props.values  - { top, right, bottom, left } all strings with unit
 * @param {Function} props.onChange
 */
export default function SpacingControl( { label, values = {}, onChange } ) {
	const normalized = {
		top:    values.top    || '',
		right:  values.right  || '',
		bottom: values.bottom || '',
		left:   values.left   || '',
	};

	return (
		<BoxControl
			label={ label }
			values={ normalized }
			onChange={ onChange }
			units={ [
				{ value: 'px',  label: 'px',  default: 0 },
				{ value: 'em',  label: 'em',  default: 0 },
				{ value: 'rem', label: 'rem', default: 0 },
				{ value: '%',   label: '%',   default: 0 },
				{ value: 'vw',  label: 'vw',  default: 0 },
				{ value: 'vh',  label: 'vh',  default: 0 },
			] }
		/>
	);
}

/**
 * Convert a spacing object { top, right, bottom, left } to a CSS shorthand string.
 */
export function spacingToCSS( values = {} ) {
	if ( ! values || ! Object.values( values ).some( Boolean ) ) return undefined;
	const { top = '0', right = '0', bottom = '0', left = '0' } = values;
	return `${ top } ${ right } ${ bottom } ${ left }`;
}
