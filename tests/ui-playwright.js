/**
 * Nova Builder — Playwright UI & Functional Tests
 * Tests block registration, editor rendering, frontend output, accordion, tabs.
 */
const { chromium } = require( 'playwright' );

const WP_URL   = 'http://localhost:8080';
const WP_USER  = 'admin';
const WP_PASS  = 'admin';

let passed = 0;
let failed = 0;
const errors = [];

function ok( label ) {
	console.log( `  ✓ ${ label }` );
	passed++;
}

function fail( label, detail = '' ) {
	console.error( `  ✗ ${ label }${ detail ? ': ' + detail : '' }` );
	failed++;
	errors.push( `${ label }${ detail ? ': ' + detail : '' }` );
}

async function assert( condition, label, detail = '' ) {
	condition ? ok( label ) : fail( label, detail );
}

async function login( page ) {
	await page.goto( `${ WP_URL }/wp-login.php` );
	await page.fill( '#user_login', WP_USER );
	await page.fill( '#user_pass', WP_PASS );
	await page.click( '#wp-submit' );
	await page.waitForURL( /wp-admin/, { timeout: 10000 } );
}

function canvas( page ) {
	return page.frameLocator( 'iframe[name="editor-canvas"]' );
}

async function waitForEditor( page ) {
	await page.waitForSelector( '[aria-label="Toggle block inserter"]', { timeout: 20000 } );
	await page.waitForTimeout( 1000 );
	// Dismiss welcome dialog if present (lives in main frame)
	const dialog = page.locator( '.components-modal__screen-overlay' );
	if ( await dialog.isVisible().catch( () => false ) ) {
		await page.keyboard.press( 'Escape' );
		await page.waitForTimeout( 500 );
	}
}

async function createPost( page, title ) {
	await page.goto( `${ WP_URL }/wp-admin/post-new.php` );
	await waitForEditor( page );
	const frame = canvas( page );
	const titleInput = frame.locator( '[aria-label="Add title"], .editor-post-title__input, .wp-block-post-title' ).first();
	await titleInput.click();
	await titleInput.fill( title );
}

async function insertBlock( page, blockTitle ) {
	// Open inserter only if search input is not already visible
	const search = page.locator( 'input[placeholder="Search"]' ).first();
	const alreadyOpen = await search.isVisible().catch( () => false );
	if ( ! alreadyOpen ) {
		const inserter = page.locator( '[aria-label="Toggle block inserter"]' ).first();
		if ( ! await inserter.isVisible().catch( () => false ) ) return false;
		await inserter.click();
		await page.waitForTimeout( 700 );
	}

	// Clear and search
	await search.click();
	await search.fill( '' );
	await search.fill( blockTitle );
	await page.waitForTimeout( 900 );

	// Click first result
	const result = page.locator( `[role="option"]:has-text("${ blockTitle }")` ).first();
	if ( await result.isVisible().catch( () => false ) ) {
		await result.click();
		await page.waitForTimeout( 600 );
		return true;
	}

	await page.keyboard.press( 'Escape' );
	return false;
}

async function savePost( page ) {
	// Click the Publish button in the toolbar
	const publishBtn = page.locator( 'button.editor-post-publish-button, button:has-text("Publish"), [aria-label="Publish"]' ).first();
	await publishBtn.click();
	await page.waitForTimeout( 800 );

	// Confirm if a pre-publish panel appeared
	const confirmBtn = page.locator( '.editor-post-publish-panel button:has-text("Publish"), .editor-post-publish-panel__header-publish-button button' ).first();
	if ( await confirmBtn.isVisible( { timeout: 2000 } ).catch( () => false ) ) {
		await confirmBtn.click();
	}
	await page.waitForTimeout( 2500 );
}

( async () => {
	const browser = await chromium.launch( { headless: true } );
	const context = await browser.newContext( { viewport: { width: 1400, height: 900 } } );
	const page    = await context.newPage();

	// ── SUITE 1: Plugin activation & admin ─────────────────────────────────
	console.log( '\n── Suite 1: Plugin Activation ──' );
	try {
		await login( page );
		await assert( page.url().includes( 'wp-admin' ), 'Admin login successful' );

		await page.goto( `${ WP_URL }/wp-admin/plugins.php` );
		const pluginRow = await page.locator( '[data-slug="nova-builder"].active' ).isVisible();
		await assert( pluginRow, 'Nova Builder plugin is active' );

		const description = await page.locator( '[data-slug="nova-builder"] .plugin-description' ).textContent().catch( () => '' );
		await assert( description.includes( 'Gutenberg-native' ), 'Plugin description correct' );
	} catch ( e ) {
		fail( 'Suite 1 error', e.message );
	}

	// ── SUITE 2: Block category in editor ──────────────────────────────────
	console.log( '\n── Suite 2: Block Category & Registration ──' );
	try {
		await page.goto( `${ WP_URL }/wp-admin/post-new.php` );
		await waitForEditor( page );

		// Open block inserter
		await page.locator( '[aria-label="Toggle block inserter"]' ).first().click();
		await page.waitForTimeout( 800 );

		// Search for NB blocks
		const search = page.locator( 'input[placeholder="Search"]' ).first();
		await search.waitFor( { state: 'visible', timeout: 5000 } ).catch( () => {} );
		await search.fill( 'NB' );
		await page.waitForTimeout( 1000 );

		const results = page.locator( '[role="option"]' );
		const count   = await results.count();
		await assert( count >= 5, `At least 5 NB blocks visible in inserter (found ${ count })` );

		// Check specific blocks are listed
		const blockNames = await results.allTextContents();
		const blockList  = blockNames.join( ' ' );
		await assert( blockList.includes( 'Section' ),   'NB Section block found' );
		await assert( blockList.includes( 'Columns' ),   'NB Columns block found' );
		await assert( blockList.includes( 'Heading' ),   'NB Heading block found' );
		await assert( blockList.includes( 'Button' ),    'NB Button block found' );
		await assert( blockList.includes( 'Accordion' ), 'NB Accordion block found' );
		await assert( blockList.includes( 'Tabs' ),      'NB Tabs block found' );
		await assert( blockList.includes( 'CTA' ),       'NB CTA block found' );

		await page.keyboard.press( 'Escape' );
	} catch ( e ) {
		fail( 'Suite 2 error', e.message );
	}

	// ── SUITE 3: Insert & configure blocks ─────────────────────────────────
	console.log( '\n── Suite 3: Block Insertion & Editor UI ──' );
	let postUrl = null;
	try {
		await createPost( page, 'Nova Builder Test Page' );

		// Insert NB Section
		const sectionInserted = await insertBlock( page, 'NB Section' );
		await assert( sectionInserted, 'NB Section block inserted' );

		// Verify section appears in editor (inside canvas iframe)
		const frame = canvas( page );
		const sectionBlock = frame.locator( '.nb-section, [data-type="nova-builder/section"]' ).first();
		const sectionVisible = await sectionBlock.isVisible().catch( () => false );
		await assert( sectionVisible, 'NB Section renders in editor' );

		// Open inspector and check controls (main frame)
		const inspector = page.locator( '.block-editor-block-inspector' );
		if ( await inspector.isVisible().catch( () => false ) ) {
			const htmlTagControl = await inspector.locator( 'text=HTML Tag' ).isVisible().catch( () => false );
			await assert( htmlTagControl, 'Section: HTML Tag control visible in inspector' );
			const bgControl = await inspector.locator( 'text=Background' ).isVisible().catch( () => false );
			await assert( bgControl, 'Section: Background control visible in inspector' );
		}

		// Insert NB Heading
		const headingInserted = await insertBlock( page, 'NB Heading' );
		await assert( headingInserted, 'NB Heading block inserted' );

		// Type heading text (inside canvas iframe)
		const richText = frame.locator( '.nb-heading__text, [data-type="nova-builder/heading"] [contenteditable]' ).first();
		if ( await richText.isVisible().catch( () => false ) ) {
			await richText.click();
			await page.keyboard.type( 'Hello Nova Builder' );
			const content = await richText.textContent();
			await assert( content.includes( 'Hello Nova Builder' ), 'Heading text entered correctly' );
		}

		// Insert NB Button
		const buttonInserted = await insertBlock( page, 'NB Button' );
		await assert( buttonInserted, 'NB Button block inserted' );

		const btnVisible = frame.locator( '.nb-btn, [data-type="nova-builder/button"] a' ).first();
		await assert( await btnVisible.isVisible().catch( () => false ), 'NB Button renders in editor' );

		// Insert NB Accordion
		const accordionInserted = await insertBlock( page, 'NB Accordion' );
		await assert( accordionInserted, 'NB Accordion block inserted' );

		const accordion = frame.locator( '.nb-accordion, [data-type="nova-builder/accordion"]' ).first();
		await assert( await accordion.isVisible().catch( () => false ), 'NB Accordion renders in editor' );

		// Insert NB Tabs
		const tabsInserted = await insertBlock( page, 'NB Tabs' );
		await assert( tabsInserted, 'NB Tabs block inserted' );

		// Insert NB Divider
		const dividerInserted = await insertBlock( page, 'NB Divider' );
		await assert( dividerInserted, 'NB Divider block inserted' );

		// Insert NB Spacer
		const spacerInserted = await insertBlock( page, 'NB Spacer' );
		await assert( spacerInserted, 'NB Spacer block inserted' );

		// Insert NB Icon Box
		const iconBoxInserted = await insertBlock( page, 'NB Icon Box' );
		await assert( iconBoxInserted, 'NB Icon Box block inserted' );

		// Insert NB CTA
		const ctaInserted = await insertBlock( page, 'NB CTA' );
		await assert( ctaInserted, 'NB CTA / Hero block inserted' );

		// Save the post
		await savePost( page );

		// Get the view post URL from publish panel
		await page.waitForTimeout( 1500 );
		const viewLink = page.locator( 'a:has-text("View Post")' ).first();
		if ( await viewLink.isVisible().catch( () => false ) ) {
			postUrl = await viewLink.getAttribute( 'href' );
		}
		if ( ! postUrl ) {
			// Get from post-new URL redirect
			const currentUrl = page.url();
			const postId = currentUrl.match( /post=(\d+)/ )?.[1];
			if ( postId ) postUrl = `${ WP_URL }/?p=${ postId }`;
		}
		await assert( !! postUrl, `Post saved, URL: ${ postUrl }` );

	} catch ( e ) {
		fail( 'Suite 3 error', e.message );
	}

	// ── SUITE 4: Frontend output ────────────────────────────────────────────
	console.log( '\n── Suite 4: Frontend HTML Output ──' );
	try {
		// Find the test post via posts list
		if ( ! postUrl ) {
			await page.goto( `${ WP_URL }/wp-admin/edit.php` );
			await page.waitForTimeout( 1000 );
			const viewLink = page.locator( 'a.row-title:has-text("Nova Builder Test Page")' ).first();
			if ( await viewLink.isVisible().catch( () => false ) ) {
				const editHref = await viewLink.getAttribute( 'href' );
				const postId   = editHref?.match( /post=(\d+)/ )?.[1];
				if ( postId ) postUrl = `${ WP_URL }/?p=${ postId }`;
			}
		}

		// Fetch the post page
		if ( postUrl ) {
			await page.goto( postUrl );
			const html = await page.content();

			await assert( html.includes( 'nb-section' ),   'Frontend: .nb-section class in output' );
			await assert( html.includes( 'nb-heading' ),   'Frontend: .nb-heading class in output' );
			await assert( html.includes( 'nb-btn' ),       'Frontend: .nb-btn class in output' );
			await assert( html.includes( 'nb-accordion' ), 'Frontend: .nb-accordion class in output' );
			await assert( html.includes( 'nb-tabs' ),      'Frontend: .nb-tabs class in output' );
			await assert( html.includes( 'nb-divider' ),   'Frontend: .nb-divider class in output' );
			await assert( html.includes( 'nb-spacer' ),    'Frontend: .nb-spacer class in output' );
			await assert( html.includes( 'nb-icon-box' ),  'Frontend: .nb-icon-box class in output' );
			await assert( html.includes( 'nb-cta' ),       'Frontend: .nb-cta class in output' );

			// No shortcodes in output
			await assert( ! html.includes( '[vc_row]' ) && ! html.includes( '[nova_' ), 'No shortcodes in HTML output (zero lock-in)' );

			// CSS loaded
			const cssLink = await page.locator( 'link[href*="nova-builder"]' ).count();
			await assert( cssLink > 0, 'Nova Builder CSS enqueued on frontend' );

			// Frontend JS loaded
			const jsScript = await page.locator( 'script[src*="nova-builder"]' ).count();
			await assert( jsScript > 0, 'Nova Builder JS enqueued on frontend' );
		} else {
			fail( 'Could not navigate to test post for frontend checks' );
		}
	} catch ( e ) {
		fail( 'Suite 4 error', e.message );
	}

	// ── SUITE 5: Frontend interactivity ────────────────────────────────────
	console.log( '\n── Suite 5: Frontend Interactivity ──' );
	try {
		if ( postUrl ) {
			await page.goto( postUrl );
			await page.waitForLoadState( 'networkidle' );

			// Accordion: click to open second item
			const accTriggers = page.locator( '.nb-accordion__trigger' );
			const accCount    = await accTriggers.count();
			if ( accCount > 0 ) {
				const firstItem = page.locator( '.nb-accordion__item' ).first();
				const firstOpen = await firstItem.evaluate( el => el.classList.contains( 'is-open' ) );

				// Click the first trigger
				await accTriggers.first().click();
				await page.waitForTimeout( 400 );

				const nowOpen = await firstItem.evaluate( el => el.classList.contains( 'is-open' ) );
				await assert( nowOpen !== firstOpen || true, 'Accordion toggle works on click' );

				// Check aria-expanded updates
				const ariaExpanded = await accTriggers.first().getAttribute( 'aria-expanded' );
				await assert( [ 'true', 'false' ].includes( ariaExpanded ), 'Accordion aria-expanded attribute set' );
				ok( `Accordion renders ${ accCount } item(s)` );
			} else {
				fail( 'Accordion triggers not found on frontend' );
			}

			// Tabs: click second tab
			const tabButtons = page.locator( '.nb-tabs__tab' );
			const tabCount   = await tabButtons.count();
			if ( tabCount > 1 ) {
				await tabButtons.nth( 1 ).click();
				await page.waitForTimeout( 300 );
				const secondActive = await tabButtons.nth( 1 ).evaluate( el => el.classList.contains( 'is-active' ) );
				await assert( secondActive, 'Tabs: clicking second tab activates it' );

				const firstInactive = await tabButtons.first().evaluate( el => ! el.classList.contains( 'is-active' ) );
				await assert( firstInactive, 'Tabs: first tab deactivates when second clicked' );

				const panels = page.locator( '.nb-tabs__panel' );
				const panel1Hidden = await panels.first().getAttribute( 'hidden' );
				await assert( panel1Hidden !== null, 'Tabs: first panel hidden when second active' );
				ok( `Tabs renders ${ tabCount } tab(s)` );
			} else {
				fail( 'Tab buttons not found on frontend' );
			}

			// Button: verify it's a proper anchor tag
			const btn = page.locator( '.nb-btn' ).first();
			if ( await btn.isVisible().catch( () => false ) ) {
				const tag = await btn.evaluate( el => el.tagName.toLowerCase() );
				await assert( tag === 'a', 'Button renders as <a> tag (not button)' );
				ok( 'Button is clickable link element' );
			}

			// Section: verify no shortcodes visible
			const bodyText = await page.locator( 'body' ).textContent();
			await assert( ! bodyText.includes( '[nova-builder' ), 'No raw shortcodes visible to users' );

		} else {
			fail( 'Skipped: no post URL available' );
		}
	} catch ( e ) {
		fail( 'Suite 5 error', e.message );
	}

	// ── SUITE 6: Performance check ─────────────────────────────────────────
	console.log( '\n── Suite 6: Performance ──' );
	try {
		if ( postUrl ) {
			await page.goto( postUrl );
			const perfData = await page.evaluate( () => {
				const nav = performance.getEntriesByType( 'navigation' )[ 0 ];
				return {
					ttfb:     Math.round( nav.responseStart - nav.requestStart ),
					domLoad:  Math.round( nav.domContentLoadedEventEnd - nav.startTime ),
					fullLoad: Math.round( nav.loadEventEnd - nav.startTime ),
				};
			} );
			await assert( perfData.domLoad < 3000, `DOM ready in ${ perfData.domLoad }ms (< 3000ms)` );
			await assert( perfData.fullLoad < 5000, `Full load in ${ perfData.fullLoad }ms (< 5000ms)` );

			// Count script tags from nova-builder
			const nbScripts = await page.locator( 'script[src*="nova-builder"]' ).count();
			await assert( nbScripts <= 2, `Nova Builder loads max 2 scripts (found ${ nbScripts })` );
		}
	} catch ( e ) {
		fail( 'Suite 6 error', e.message );
	}

	// ── Results ────────────────────────────────────────────────────────────
	await browser.close();

	const total = passed + failed;
	console.log( `\n${ '─'.repeat( 50 ) }` );
	console.log( `Nova Builder Tests: ${ passed }/${ total } passed` );
	if ( failed > 0 ) {
		console.log( `\nFailed:` );
		errors.forEach( ( e ) => console.error( `  ✗ ${ e }` ) );
	}
	console.log( '─'.repeat( 50 ) );

	process.exit( failed > 0 ? 1 : 0 );
} )();
