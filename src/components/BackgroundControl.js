import { TabPanel, ColorPicker, TextControl, SelectControl, RangeControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function BackgroundControl( { value = {}, onChange } ) {
	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );

	const tabs = [
		{
			name:  'none',
			title: __( 'None', 'nova-builder' ),
			content: <p style={ { padding: '8px 0', color: '#888' } }>{ __( 'No background.', 'nova-builder' ) }</p>,
		},
		{
			name:  'color',
			title: __( 'Color', 'nova-builder' ),
			content: (
				<ColorPicker
					color={ value.color || '#ffffff' }
					onChange={ set( 'color' ) }
					enableAlpha
				/>
			),
		},
		{
			name:  'gradient',
			title: __( 'Gradient', 'nova-builder' ),
			content: (
				<TextControl
					label={ __( 'CSS Gradient', 'nova-builder' ) }
					value={ value.gradient || '' }
					onChange={ set( 'gradient' ) }
					placeholder="linear-gradient(135deg, #667eea, #764ba2)"
					help={ __( 'Any valid CSS gradient string.', 'nova-builder' ) }
				/>
			),
		},
		{
			name:  'image',
			title: __( 'Image', 'nova-builder' ),
			content: (
				<>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => onChange( { ...value, imageUrl: media.url, imageId: media.id } ) }
							allowedTypes={ [ 'image' ] }
							value={ value.imageId }
							render={ ( { open } ) => (
								<div>
									{ value.imageUrl && (
										<img
											src={ value.imageUrl }
											alt=""
											style={ { width: '100%', marginBottom: 8, borderRadius: 4 } }
										/>
									) }
									<button
										className="components-button is-secondary is-small"
										onClick={ open }
									>
										{ value.imageUrl
											? __( 'Change Image', 'nova-builder' )
											: __( 'Select Image', 'nova-builder' ) }
									</button>
									{ value.imageUrl && (
										<button
											className="components-button is-link is-destructive is-small"
											onClick={ () => onChange( { ...value, imageUrl: '', imageId: null } ) }
											style={ { marginLeft: 8 } }
										>
											{ __( 'Remove', 'nova-builder' ) }
										</button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ value.imageUrl && (
						<>
							<SelectControl
								label={ __( 'Position', 'nova-builder' ) }
								value={ value.imagePosition || 'center center' }
								options={ [
									{ label: 'Center Center', value: 'center center' },
									{ label: 'Top Center',    value: 'top center' },
									{ label: 'Bottom Center', value: 'bottom center' },
									{ label: 'Left Center',   value: 'left center' },
									{ label: 'Right Center',  value: 'right center' },
								] }
								onChange={ set( 'imagePosition' ) }
							/>
							<SelectControl
								label={ __( 'Size', 'nova-builder' ) }
								value={ value.imageSize || 'cover' }
								options={ [
									{ label: 'Cover',   value: 'cover' },
									{ label: 'Contain', value: 'contain' },
									{ label: 'Auto',    value: 'auto' },
								] }
								onChange={ set( 'imageSize' ) }
							/>
						</>
					) }
				</>
			),
		},
	];

	const initialTab = value.imageUrl ? 'image' : value.gradient ? 'gradient' : value.color ? 'color' : 'none';

	return (
		<TabPanel
			tabs={ tabs }
			initialTabName={ initialTab }
			onSelect={ ( tab ) => {
				if ( tab === 'none' ) onChange( {} );
			} }
		>
			{ ( tab ) => tab.content }
		</TabPanel>
	);
}

export function backgroundToStyle( bg = {} ) {
	if ( ! bg || Object.keys( bg ).length === 0 ) return {};
	const style = {};
	if ( bg.color )    style.backgroundColor = bg.color;
	if ( bg.gradient ) style.backgroundImage = bg.gradient;
	if ( bg.imageUrl ) {
		style.backgroundImage    = `url(${ bg.imageUrl })`;
		style.backgroundPosition = bg.imagePosition || 'center center';
		style.backgroundSize     = bg.imageSize || 'cover';
		style.backgroundRepeat   = 'no-repeat';
	}
	return style;
}
