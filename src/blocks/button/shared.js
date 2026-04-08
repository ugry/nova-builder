export function buildButtonStyle( { style, bgColor, textColor, borderColor, borderRadius } ) {
	const base = { borderRadius: borderRadius || '6px' };
	switch ( style ) {
		case 'filled':
			return { ...base, backgroundColor: bgColor, color: textColor, borderColor: bgColor };
		case 'outlined':
			return { ...base, backgroundColor: 'transparent', color: bgColor, borderColor: bgColor, borderWidth: '2px', borderStyle: 'solid' };
		case 'ghost':
			return { ...base, backgroundColor: 'transparent', color: bgColor, border: 'none' };
		case 'link':
			return { ...base, backgroundColor: 'transparent', color: bgColor, border: 'none', padding: 0, textDecoration: 'underline' };
		default:
			return base;
	}
}
