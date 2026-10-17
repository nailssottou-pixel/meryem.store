# Meryem Store

A responsive, modern storefront prototype built with plain HTML, CSS and JavaScript.

## Features
- Responsive layout with animated 3D-inspired artwork
- Product catalogue with category filters and search
- Shopping bag with quantity controls and subtotal
- Sign-in / create-account interface for demonstration
- Mobile navigation and newsletter interaction
- No build tools required

## Run locally
Open `index.html` in a browser, or use the VS Code Live Server extension.

## Publish for free with GitHub Pages
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. The workflow at `.github/workflows/deploy.yml` publishes the static site after a push to `main`.
4. Open the URL shown in **Settings → Pages** after the workflow finishes.

## Important demo limitations
This is a front-end prototype. The product catalogue, bag and demo account state use browser storage. The account form is **not secure authentication**; never use a real password or personal information. Checkout is not connected to a payment provider, no orders are placed, and prices/stock are examples. Before selling real products, add secure authentication, a backend, a payment provider, shipping/tax rules, privacy and terms pages, and real inventory/order management.

## Main files
- `index.html` — storefront page
- `styles/store.css` — responsive styles and animations
- `js/store.js` — product search, filters, bag and demo account UI
