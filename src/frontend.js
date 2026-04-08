/**
 * Nova Builder — Frontend JS
 * Handles accordion and tabs interactivity.
 * Zero dependencies. Runs after DOMContentLoaded.
 */
( function () {
	'use strict';

	// ── Accordion ──────────────────────────────────────────────────────────────
	function initAccordions() {
		document.querySelectorAll( '.nb-accordion' ).forEach( function ( accordion ) {
			const mode     = accordion.dataset.mode || 'single';
			const triggers = accordion.querySelectorAll( '.nb-accordion__trigger' );

			triggers.forEach( function ( trigger ) {
				trigger.addEventListener( 'click', function () {
					const item    = trigger.closest( '.nb-accordion__item' );
					const content = item.querySelector( '.nb-accordion__content' );
					const isOpen  = item.classList.contains( 'is-open' );

					// Close all if single mode
					if ( mode === 'single' && ! isOpen ) {
						accordion.querySelectorAll( '.nb-accordion__item.is-open' ).forEach( function ( openItem ) {
							openItem.classList.remove( 'is-open' );
							openItem.querySelector( '.nb-accordion__trigger' ).setAttribute( 'aria-expanded', 'false' );
							const c = openItem.querySelector( '.nb-accordion__content' );
							c.hidden = true;
							updateIcon( openItem.querySelector( '.nb-accordion__icon' ), false );
						} );
					}

					// Toggle current
					if ( isOpen ) {
						item.classList.remove( 'is-open' );
						trigger.setAttribute( 'aria-expanded', 'false' );
						content.hidden = true;
						updateIcon( item.querySelector( '.nb-accordion__icon' ), false );
					} else {
						item.classList.add( 'is-open' );
						trigger.setAttribute( 'aria-expanded', 'true' );
						content.hidden = false;
						updateIcon( item.querySelector( '.nb-accordion__icon' ), true );
					}
				} );
			} );
		} );
	}

	function updateIcon( iconEl, isOpen ) {
		if ( ! iconEl ) return;
		const text = iconEl.textContent.trim();
		if ( text === '+' || text === '−' ) {
			iconEl.textContent = isOpen ? '−' : '+';
		} else if ( text === '▼' || text === '▲' ) {
			iconEl.textContent = isOpen ? '▲' : '▼';
		}
	}

	// ── Tabs ───────────────────────────────────────────────────────────────────
	function initTabs() {
		document.querySelectorAll( '.nb-tabs' ).forEach( function ( tabsBlock ) {
			const nav    = tabsBlock.querySelector( '.nb-tabs__nav' );
			const panels = tabsBlock.querySelectorAll( '.nb-tabs__panel' );
			const tabs   = nav ? nav.querySelectorAll( '.nb-tabs__tab' ) : [];

			tabs.forEach( function ( tab, i ) {
				tab.addEventListener( 'click', function () {
					// Deactivate all
					tabs.forEach( function ( t ) {
						t.classList.remove( 'is-active' );
						t.setAttribute( 'aria-selected', 'false' );
					} );
					panels.forEach( function ( p ) {
						p.hidden = true;
					} );
					// Activate clicked
					tab.classList.add( 'is-active' );
					tab.setAttribute( 'aria-selected', 'true' );
					if ( panels[ i ] ) panels[ i ].hidden = false;
				} );
			} );
		} );
	}

	// ── Animations (Intersection Observer) ────────────────────────────────────
	function initAnimations() {
		const animClasses = [
			'nb-anim-fade-in', 'nb-anim-fade-up', 'nb-anim-fade-down',
			'nb-anim-slide-left', 'nb-anim-slide-right', 'nb-anim-zoom-in',
		];

		const selector = animClasses.map( ( c ) => '.' + c ).join( ', ' );
		const els      = document.querySelectorAll( selector );

		if ( ! els.length ) return;

		const observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'nb-anim--visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15 }
		);

		els.forEach( function ( el ) { observer.observe( el ); } );
	}

	// ── Boot ───────────────────────────────────────────────────────────────────
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			initAccordions();
			initTabs();
			initAnimations();
		} );
	} else {
		initAccordions();
		initTabs();
		initAnimations();
	}
} )();
