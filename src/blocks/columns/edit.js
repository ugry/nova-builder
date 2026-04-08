import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const LAYOUT_PRESETS = [
	{ label: __( 'Equal', 'nova-builder' ),       value: 'equal' },
	{ label: __( '1/3 + 2/3', 'nova-builder' ),   value: '1-2' },
	{ label: __( '2/3 + 1/3', 'nova-builder' ),   value: '2-1' },
	{ label: __( '1/4 + 3/4', 'nova-builder' ),   value: '1-3' },
	{ label: __( '3/4 + 1/4', 'nova-builder' ),   value: '3-1' },
	{ label: __( '1/4 + 1/2 + 1/4', 'nova-builder' ), value: '1-2-1' },
];

const VERTICAL_ALIGNS = [
	{ label: __( 'Top', 'nova-builder' ),     value: 'top' },
	{ label: __( 'Center', 'nova-builder' ),  value: 'center' },
	{ label: __( 'Bottom', 'nova-builder' ),  value: 'bottom' },
	{ label: __( 'Stretch', 'nova-builder' ), value: 'stretch' },
];

const COLUMN_TEMPLATES = {
	1: [ [ 'nova-builder/column' ] ],
	2: [ [ 'nova-builder/column' ], [ 'nova-builder/column' ] ],
	3: [ [ 'nova-builder/column' ], [ 'nova-builder/column' ], [ 'nova-builder/column' ] ],
	4: [ [ 'nova-builder/column' ], [ 'nova-builder/column' ], [ 'nova-builder/column' ], [ 'nova-builder/column' ] ],
};

export default function Edit( { attributes, setAttributes } ) {
	const { columnCount, layout, gap, verticalAlign, stackOnMobile, reverseOnMobile, className } = attributes;

	const alignMap = { top: 'flex-start', center: 'center', bottom: 'flex-end', stretch: 'stretch' };

	const blockProps = useBlockProps( {
		className: [
			'nb-columns',
			`nb-columns--${ layout }`,
			stackOnMobile  ? 'nb-columns--stack-mobile'   : '',
			reverseOnMobile ? 'nb-columns--reverse-mobile' : '',
			className,
		].filter( Boolean ).join( ' ' ),
		style: {
			display:        'flex',
			flexWrap:       'wrap',
			gap:             gap || undefined,
			alignItems:     alignMap[ verticalAlign ] || 'flex-start',
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Columns', 'nova-builder' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Number of Columns', 'nova-builder' ) }
						value={ columnCount }
						onChange={ ( val ) => setAttributes( { columnCount: val } ) }
						min={ 1 }
						max={ 6 }
					/>
					<SelectControl
						label={ __( 'Layout Preset', 'nova-builder' ) }
						value={ layout }
						options={ LAYOUT_PRESETS }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
						help={ __( 'Applies proportional widths to columns. Override per-column width in each column block.', 'nova-builder' ) }
					/>
					<TextControl
						label={ __( 'Column Gap', 'nova-builder' ) }
						value={ gap }
						onChange={ ( val ) => setAttributes( { gap: val } ) }
						placeholder="30px"
					/>
					<SelectControl
						label={ __( 'Vertical Alignment', 'nova-builder' ) }
						value={ verticalAlign }
						options={ VERTICAL_ALIGNS }
						onChange={ ( val ) => setAttributes( { verticalAlign: val } ) }
					/>
					<ToggleControl
						label={ __( 'Stack on Mobile', 'nova-builder' ) }
						checked={ stackOnMobile }
						onChange={ ( val ) => setAttributes( { stackOnMobile: val } ) }
					/>
					{ stackOnMobile && (
						<ToggleControl
							label={ __( 'Reverse Order on Mobile', 'nova-builder' ) }
							checked={ reverseOnMobile }
							onChange={ ( val ) => setAttributes( { reverseOnMobile: val } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [ 'nova-builder/column' ] }
					template={ COLUMN_TEMPLATES[ columnCount ] || COLUMN_TEMPLATES[ 2 ] }
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
