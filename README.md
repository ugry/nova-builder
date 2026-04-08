# Nova Builder

A Gutenberg-native WordPress page builder with zero shortcode lock-in and clean semantic HTML output. The modern WPBakery replacement.

## Features

- **Zero lock-in** — content stored as standard Gutenberg blocks
- **Clean semantic HTML** — no shortcodes, no proprietary markup
- **Gutenberg-native** — works inside the standard block editor
- **Lightweight** — built with `@wordpress/scripts`, no jQuery
- **GPL-2.0-or-later** — fully open source

## Included Blocks

| Block | Description |
|-------|-------------|
| Section | Full-width layout container with background options |
| Columns / Column | Responsive multi-column grid |
| Heading | Advanced heading with typography controls |
| Button | CTA button with style variants |
| Accordion | Accessible expand/collapse panels |
| Tabs | Tabbed content panels |
| Icon Box | Icon + heading + text card |
| CTA | Call-to-action section |
| Divider | Styled horizontal rule |
| Spacer | Vertical whitespace control |

## Requirements

- WordPress 6.2+
- PHP 8.0+
- Node.js 18+ (for development)

## Installation

### From WordPress.org
Search for **Nova Builder** in the plugin directory and click Install.

### Manual
1. Download the latest release zip.
2. Go to **Plugins → Add New → Upload Plugin**.
3. Upload the zip and activate.

## Development

```bash
npm install
npm run build      # production build
npm run start      # watch mode
npm run lint:js    # lint JavaScript
npm run lint:css   # lint CSS
```

Build output goes to `build/`.

## License

GPL-2.0-or-later — see [LICENSE](LICENSE).
