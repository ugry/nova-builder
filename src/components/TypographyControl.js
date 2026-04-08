import { PanelBody, SelectControl, RangeControl, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const FONT_WEIGHTS = [
	{ label: __( 'Default', 'nova-builder' ),   value: '' },
	{ label: __( 'Thin (100)', 'nova-builder' ), value: '100' },
	{ label: __( 'Light (300)', 'nova-builder' ), value: '300' },
	{ label: __( 'Normal (400)', 'nova-builder' ), value: '400' },
	{ label: __( 'Medium (500)', 'nova-builder' ), value: '500' },
	{ label: __( 'Semi-Bold (600)', 'nova-builder' ), value: '600' },
	{ label: __( 'Bold (700)', 'nova-builder' ), value: '700' },
	{ label: __( 'Black (900)', 'nova-builder' ), value: '900' },
];

const TEXT_TRANSFORMS = [
	{ label: __( 'Default', 'nova-builder' ),    value: '' },
	{ label: __( 'None', 'nova-builder' ),        value: 'none' },
	{ label: __( 'Uppercase', 'nova-builder' ),   value: 'uppercase' },
	{ label: __( 'Lowercase', 'nova-builder' ),   value: 'lowercase' },
	{ label: __( 'Capitalize', 'nova-builder' ),  value: 'capitalize' },
];

const TEXT_DECORATIONS = [
	{ label: __( 'Default', 'nova-builder' ),    value: '' },
	{ label: __( 'None', 'nova-builder' ),        value: 'none' },
	{ label: __( 'Underline', 'nova-builder' ),   value: 'underline' },
	{ label: __( 'Line-through', 'nova-builder' ), value: 'line-through' },
];

export default function TypographyControl( { value = {}, onChange } ) {
	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );

	return (
		<>
			<Flex>
				<FlexItem>
					<RangeControl
						label={ __( 'Font Size (px)', 'nova-builder' ) }
						value={ value.fontSize || '' }
						onChange={ set( 'fontSize' ) }
						min={ 8 }
						max={ 120 }
						allowReset
					/>
				</FlexItem>
			</Flex>
			<SelectControl
				label={ __( 'Font Weight', 'nova-builder' ) }
				value={ value.fontWeight || '' }
				options={ FONT_WEIGHTS }
				onChange={ set( 'fontWeight' ) }
			/>
			<SelectControl
				label={ __( 'Text Transform', 'nova-builder' ) }
				value={ value.textTransform || '' }
				options={ TEXT_TRANSFORMS }
				onChange={ set( 'textTransform' ) }
			/>
			<SelectControl
				label={ __( 'Text Decoration', 'nova-builder' ) }
				value={ value.textDecoration || '' }
				options={ TEXT_DECORATIONS }
				onChange={ set( 'textDecoration' ) }
			/>
			<RangeControl
				label={ __( 'Line Height', 'nova-builder' ) }
				value={ value.lineHeight || '' }
				onChange={ set( 'lineHeight' ) }
				min={ 0.5 }
				max={ 4 }
				step={ 0.1 }
				allowReset
			/>
			<RangeControl
				label={ __( 'Letter Spacing (px)', 'nova-builder' ) }
				value={ value.letterSpacing || '' }
				onChange={ set( 'letterSpacing' ) }
				min={ -5 }
				max={ 20 }
				step={ 0.5 }
				allowReset
			/>
		</>
	);
}

export function typographyToStyle( t = {} ) {
	const style = {};
	if ( t.fontSize )      style.fontSize      = `${ t.fontSize }px`;
	if ( t.fontWeight )    style.fontWeight     = t.fontWeight;
	if ( t.textTransform ) style.textTransform  = t.textTransform;
	if ( t.textDecoration ) style.textDecoration = t.textDecoration;
	if ( t.lineHeight )    style.lineHeight     = t.lineHeight;
	if ( t.letterSpacing ) style.letterSpacing  = `${ t.letterSpacing }px`;
	return style;
}
