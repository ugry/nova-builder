import { spacingToCSS } from '../../components/SpacingControl';

export function buildIconBoxStyle( { padding, boxBg, boxRadius, boxShadow, textAlign } ) {
	return {
		padding:         spacingToCSS( padding ) || undefined,
		backgroundColor: boxBg || undefined,
		borderRadius:    boxRadius || undefined,
		boxShadow:       boxShadow ? '0 4px 24px rgba(0,0,0,0.10)' : undefined,
		textAlign:       textAlign || undefined,
	};
}
