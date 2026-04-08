=== Nova Builder ===
Contributors: ugry
Tags: page builder, gutenberg, blocks, drag and drop, visual editor
Requires at least: 6.2
Tested up to: 6.7
Requires PHP: 8.0
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A Gutenberg-native page builder with zero shortcode lock-in and clean semantic HTML output. The modern WPBakery replacement.

== Description ==

Nova Builder is a free, open-source page builder built entirely on top of the WordPress Block Editor (Gutenberg). Unlike legacy builders, Nova Builder produces clean semantic HTML with no shortcodes, no proprietary markup, and no vendor lock-in.

**Why Nova Builder?**

* **Zero lock-in** — content is stored as standard Gutenberg blocks. Deactivate the plugin and your content stays intact.
* **Clean HTML output** — semantic markup, no div soup, no inline CSS overrides.
* **Gutenberg-native** — works inside the standard block editor, not a separate page builder UI.
* **Lightweight** — no jQuery, no bloated libraries. Uses @wordpress/scripts and React.
* **Modern WPBakery replacement** — all the layout power, none of the shortcode baggage.

**Included Blocks**

* Section — full-width layout container with background options
* Columns / Column — responsive multi-column grid
* Heading — advanced heading with typography controls
* Button — CTA button with style variants
* Accordion — accessible expand/collapse panels
* Tabs — tabbed content panels
* Icon Box — icon + heading + text card
* CTA (Call to Action) — prominent action section
* Divider — styled horizontal rule
* Spacer — vertical whitespace control

== Installation ==

1. Upload the `nova-builder` folder to `/wp-content/plugins/`.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Open any page or post in the Block Editor — Nova Builder blocks appear under the **Nova Builder** category in the block inserter.

== Frequently Asked Questions ==

= Will my content break if I deactivate Nova Builder? =
No. Content is stored as standard block markup. You may see raw block comments, but no data is lost.

= Does this replace the default WordPress editor? =
No. Nova Builder adds blocks to the existing Gutenberg editor. It does not replace or override the editor UI.

= Is this compatible with Full Site Editing (FSE)? =
Yes. All blocks are registered as standard Gutenberg blocks and work in the site editor.

= Does it work with any theme? =
Yes. Output is semantic HTML and inherits your theme's styles. Works with block themes and classic themes.

== Screenshots ==

1. Block inserter showing Nova Builder block category.
2. Section and Columns blocks in the editor.
3. Accordion block with multiple panels.
4. Frontend output — clean semantic HTML.

== Changelog ==

= 1.0.0 =
* Initial release.
* Blocks: Section, Columns, Column, Heading, Button, Accordion, Tabs, Icon Box, CTA, Divider, Spacer.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
