import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker, Button, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { items, tabStyle, activeColor, tabBg, contentBg, borderColor, className } = attributes;
	const [ active, setActive ] = useState( 0 );

	const updateItem = ( i, key, val ) => setAttributes( { items: items.map( ( item, idx ) => idx === i ? { ...item, [ key ]: val } : item ) } );
	const addItem    = () => setAttributes( { items: [ ...items, { label: __( 'New Tab', 'nova-builder' ), content: '' } ] } );
	const removeItem = ( i ) => setAttributes( { items: items.filter( ( _, idx ) => idx !== i ) } );

	const blockProps = useBlockProps( {
		className: [ 'nb-tabs', `nb-tabs--${ tabStyle }`, className ].filter( Boolean ).join( ' ' ),
		style: { '--nb-tabs-active': activeColor, '--nb-tabs-border': borderColor },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Tabs Settings', 'nova-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Tab Style', 'nova-builder' ) }
						value={ tabStyle }
						options={ [
							{ label: __( 'Underline', 'nova-builder' ), value: 'underline' },
							{ label: __( 'Filled', 'nova-builder' ),    value: 'filled' },
							{ label: __( 'Boxed', 'nova-builder' ),     value: 'boxed' },
						] }
						onChange={ ( v ) => setAttributes( { tabStyle: v } ) }
					/>
					<p className="components-base-control__label">{ __( 'Active Tab Color', 'nova-builder' ) }</p>
					<ColorPicker color={ activeColor } onChange={ ( v ) => setAttributes( { activeColor: v } ) } />
					<p className="components-base-control__label">{ __( 'Border Color', 'nova-builder' ) }</p>
					<ColorPicker color={ borderColor } onChange={ ( v ) => setAttributes( { borderColor: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Tab Items', 'nova-builder' ) } initialOpen={ false }>
					{ items.map( ( item, i ) => (
						<div key={ i } style={ { border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 4 } }>
							<strong>{ __( 'Tab', 'nova-builder' ) } { i + 1 }</strong>
							<TextControl label={ __( 'Label', 'nova-builder' ) } value={ item.label } onChange={ ( v ) => updateItem( i, 'label', v ) } />
							<TextareaControl label={ __( 'Content', 'nova-builder' ) } value={ item.content } onChange={ ( v ) => updateItem( i, 'content', v ) } rows={ 3 } />
							<Button isSmall isDestructive onClick={ () => removeItem( i ) } disabled={ items.length <= 1 }>{ __( 'Remove', 'nova-builder' ) }</Button>
						</div>
					) ) }
					<Button isPrimary onClick={ addItem }>{ __( '+ Add Tab', 'nova-builder' ) }</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="nb-tabs__nav" role="tablist">
					{ items.map( ( item, i ) => (
						<button
							key={ i }
							className={ `nb-tabs__tab${ active === i ? ' is-active' : '' }` }
							role="tab"
							onClick={ () => setActive( i ) }
							style={ {
								backgroundColor: active === i && tabStyle === 'filled' ? activeColor : tabBg || undefined,
								color:           active === i ? activeColor : undefined,
								borderBottomColor: active === i && tabStyle === 'underline' ? activeColor : undefined,
							} }
						>
							{ item.label }
						</button>
					) ) }
				</div>
				<div
					className="nb-tabs__content"
					style={ { backgroundColor: contentBg, border: `1px solid ${ borderColor }`, borderTop: tabStyle === 'underline' ? 'none' : undefined } }
				>
					<p>{ items[ active ]?.content }</p>
				</div>
			</div>
		</>
	);
}
