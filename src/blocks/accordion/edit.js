import { useState } from '@wordpress/element';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, ColorPicker, Button, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const {
		items, expandMode, defaultOpen, iconStyle,
		titleBg, titleColor, contentBg, contentColor,
		borderColor, borderRadius, className,
	} = attributes;

	const [ openIndex, setOpenIndex ] = useState( defaultOpen );

	const updateItem = ( index, key, value ) => {
		const next = items.map( ( item, i ) => i === index ? { ...item, [ key ]: value } : item );
		setAttributes( { items: next } );
	};

	const addItem    = () => setAttributes( { items: [ ...items, { title: __( 'New Item', 'nova-builder' ), content: '' } ] } );
	const removeItem = ( i ) => setAttributes( { items: items.filter( ( _, idx ) => idx !== i ) } );
	const moveItem   = ( i, dir ) => {
		const next = [ ...items ];
		const swap = i + dir;
		if ( swap < 0 || swap >= next.length ) return;
		[ next[ i ], next[ swap ] ] = [ next[ swap ], next[ i ] ];
		setAttributes( { items: next } );
	};

	const blockProps = useBlockProps( {
		className: [ 'nb-accordion', className ].filter( Boolean ).join( ' ' ),
		style: { '--nb-acc-border': borderColor, '--nb-acc-radius': borderRadius },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings', 'nova-builder' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Expand Mode', 'nova-builder' ) }
						value={ expandMode }
						options={ [
							{ label: __( 'Single (close others)', 'nova-builder' ), value: 'single' },
							{ label: __( 'Multiple', 'nova-builder' ),             value: 'multiple' },
						] }
						onChange={ ( v ) => setAttributes( { expandMode: v } ) }
					/>
					<SelectControl
						label={ __( 'Icon Style', 'nova-builder' ) }
						value={ iconStyle }
						options={ [
							{ label: __( 'Plus / Minus', 'nova-builder' ), value: 'plus' },
							{ label: __( 'Arrow', 'nova-builder' ),        value: 'arrow' },
							{ label: __( 'None', 'nova-builder' ),         value: 'none' },
						] }
						onChange={ ( v ) => setAttributes( { iconStyle: v } ) }
					/>
					<TextControl label={ __( 'Border Radius', 'nova-builder' ) } value={ borderRadius } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Colors', 'nova-builder' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Title Background', 'nova-builder' ) }</p>
					<ColorPicker color={ titleBg } onChange={ ( v ) => setAttributes( { titleBg: v } ) } enableAlpha />
					<p className="components-base-control__label">{ __( 'Title Text', 'nova-builder' ) }</p>
					<ColorPicker color={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<p className="components-base-control__label">{ __( 'Content Background', 'nova-builder' ) }</p>
					<ColorPicker color={ contentBg } onChange={ ( v ) => setAttributes( { contentBg: v } ) } enableAlpha />
					<p className="components-base-control__label">{ __( 'Border Color', 'nova-builder' ) }</p>
					<ColorPicker color={ borderColor } onChange={ ( v ) => setAttributes( { borderColor: v } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Items', 'nova-builder' ) } initialOpen={ false }>
					{ items.map( ( item, i ) => (
						<div key={ i } style={ { border: '1px solid #ddd', padding: 12, marginBottom: 8, borderRadius: 4 } }>
							<strong>{ __( 'Item', 'nova-builder' ) } { i + 1 }</strong>
							<TextControl label={ __( 'Title', 'nova-builder' ) } value={ item.title } onChange={ ( v ) => updateItem( i, 'title', v ) } />
							<TextareaControl label={ __( 'Content', 'nova-builder' ) } value={ item.content } onChange={ ( v ) => updateItem( i, 'content', v ) } rows={ 3 } />
							<div style={ { display: 'flex', gap: 4 } }>
								<Button isSmall isSecondary onClick={ () => moveItem( i, -1 ) } disabled={ i === 0 }>↑</Button>
								<Button isSmall isSecondary onClick={ () => moveItem( i,  1 ) } disabled={ i === items.length - 1 }>↓</Button>
								<Button isSmall isDestructive onClick={ () => removeItem( i ) } disabled={ items.length <= 1 }>{ __( 'Remove', 'nova-builder' ) }</Button>
							</div>
						</div>
					) ) }
					<Button isPrimary onClick={ addItem }>{ __( '+ Add Item', 'nova-builder' ) }</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ items.map( ( item, i ) => {
					const isOpen = openIndex === i;
					const icon = iconStyle === 'plus' ? ( isOpen ? '−' : '+' ) : iconStyle === 'arrow' ? ( isOpen ? '▲' : '▼' ) : null;
					return (
						<div key={ i } className={ `nb-accordion__item${ isOpen ? ' is-open' : '' }` } style={ { borderColor, borderRadius: i === 0 ? `${ borderRadius } ${ borderRadius } 0 0` : i === items.length - 1 ? `0 0 ${ borderRadius } ${ borderRadius }` : 0 } }>
							<button
								className="nb-accordion__trigger"
								style={ { backgroundColor: titleBg, color: titleColor || undefined } }
								onClick={ () => setOpenIndex( isOpen ? -1 : i ) }
							>
								<span>{ item.title }</span>
								{ icon && <span className="nb-accordion__icon" aria-hidden="true">{ icon }</span> }
							</button>
							{ isOpen && (
								<div className="nb-accordion__content" style={ { backgroundColor: contentBg, color: contentColor || undefined } }>
									<p>{ item.content }</p>
								</div>
							) }
						</div>
					);
				} ) }
			</div>
		</>
	);
}
