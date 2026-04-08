import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heightDesktop, heightTablet, heightMobile } = attributes;
	return (
		<div
			{ ...useBlockProps.save( { className: 'nb-spacer' } ) }
			style={ {
				'--nb-spacer-desktop': heightDesktop,
				'--nb-spacer-tablet':  heightTablet,
				'--nb-spacer-mobile':  heightMobile,
			} }
			aria-hidden="true"
		/>
	);
}
