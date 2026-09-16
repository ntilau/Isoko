# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Isoko.app e-commerce website built as a frontend-only static site that consumes a REST API hosted on Heroku. The project consists of:

- **Frontend**: HTML, CSS, and vanilla JavaScript
- **Backend**: REST API hosted at `https://alibaba-backend.herokuapp.com` (not included in this repository) - this is the backend service powering the Isoko.app frontend
- **Local Development**: Served using Python's built-in HTTP server

## Project Structure

```
Isoko/
├── index.html                 # Main landing page
├── homepart.html              # Homepage content
├── signin.html                # User sign-in page
├── signUp.html                # User registration page
├── shoppingcart.html          # Shopping cart page
├── openproduct.html           # Product detail page
├── apparels.html              # Apparel category page
├── electronics.html           # Electronics category page
├── electronics-subcategory.html # Electronics subcategory page
├── carpart.html               # Vehicle parts & accessories page
├── apparel.html               # Apparel products page
│
├── components/                # Reusable UI components
│   ├── navbar.js              # Navigation bar functionality
│   ├── footer.js              # Footer functionality
│   └── homepagefooter.js      # Homepage footer functionality
│
├── script/                    # Page-specific JavaScript
│   ├── apparel.js             # Apparel page logic
│   ├── carpart.js             # Vehicle parts page logic
│   ├── electronics.js         # Electronics page logic
│   ├── openproduct.js         # Product detail page logic
│   └── shoppingcart.js        # Shopping cart logic
│
├── style/                     # CSS stylesheets
│   ├── navbar.css             # Navigation bar styles
│   ├── footer.css             # Footer styles
│   ├── homepagefooter.css     # Homepage footer styles
│   ├── homepart.css           # Homepage styles
│   ├── shoppingcart.css       # Shopping cart styles
│   ├── openproduct.css        # Product detail page styles
│   ├── apparel.css            # Apparel page styles
│   ├── apparels.css           # Apparels category styles
│   ├── electronics.css        # Electronics category styles
│   ├── electronics-subcategory.css # Electronics subcategory styles
│   └── carpart.css            # Vehicle parts styles
│
├── footerImg/                 # Image assets for footer
│   ├── facebook.png
│   ├── twitter.png
│   ├── insta.png
│   ├── youtube.png
│   ├── supplier.png
│   ├── appstore.png
│   └── googleplay.png
│
└── .claude/
    └── settings.local.json    # Claude Code permission settings
```

## Development Setup

### Prerequisites
- Modern web browser
- Node.js (v14 or higher) - for running local backend
- Apache2 web server (optional, for production-like development)

### Running Locally
You have two options for local development:

#### Option 1: Python Built-in Server (Simple)
```bash
# Start the development server (typically runs on port 8080)
python -m http.server 8080

# Access the site at http://localhost:8080
```

#### Option 2: Apache2 (Production-like)
```bash
# Copy files to Apache document root (adjust path as needed)
sudo cp -r * /var/www/html/

# Ensure proper permissions
sudo chown -R www-data:www-data /var/www/html/

# Access the site at http://localhost/
```

Note: You may see the Python server already running in the background, as indicated by processes in the system.

### Running the Local Backend (Required for Development)

### Prerequisites
- Python 3.x (for local development server)
- Modern web browser
- Node.js (v14 or higher) - for running local backend

### Running Locally
The project is served using Python's built-in HTTP server:

```bash
# Start the development server (typically runs on port 8080)
python -m http.server 8080

# Access the site at http://localhost:8080
```

Note: You may see servers already running in the background, as indicated by processes in the system.

### Running the Local Backend (Required for Development)
The frontend is configured to work with a local backend. The Heroku backend option has been removed - you must run the local backend for full functionality.

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev  # Uses nodemon for auto-restart during development
# OR
npm start    # Standard Node.js mode

# The backend will run on http://localhost:5000
```

### API Endpoints
The frontend consumes the local backend API:
- Base URL: `http://localhost:5000`
- Authentication: Uses token-based auth stored in localStorage
- Key endpoints:
  - `POST /register` - User registration
  - `POST /login` - User login
  - `GET /users/{token}` - User authentication/validation
  - `GET /electronics/{category}` - Product data retrieval
  - `GET /` - Health check

### Frontend Configuration
The frontend has already been configured to work with the local backend. All API endpoint URLs have been updated from `https://alibaba-backend.herokuapp.com` to `http://localhost:5000`.

**Updated files:**
- `index.html` - `users/${token}` endpoint
- `signin.html` - `/login` endpoint
- `signUp.html` - `/register` endpoint
- `shoppingcart.html` - `users/${token}` endpoint
- `openproduct.html` - `users/${token}` endpoint
- `electronics.html` - `users/${token}` endpoint
- `electronics-subcategory.html` - `users/${token}` endpoint
- `script/electronics.js` - `electronics/${url}` endpoint

**To revert to Heroku backend (not recommended):**
Copy files from the backup directory:
```bash
cp backend-url-backup-*/* .
```

**To reapply local backend configuration:**
Run the update script again:
```bash
./scripts/update-backend-url.sh
```

### API Endpoints
The frontend consumes a REST API hosted at:
- Base URL: `https://alibaba-backend.herokuapp.com` (the backend service for Isoko.app)
- Authentication: Uses token-based auth stored in localStorage
- Key endpoints observed:
  - `GET /users/{token}` - User authentication/validation
  - `GET /{category}/{subcategory}` - Product data retrieval
  - (Other endpoints may exist but weren't observed in the code)

## Common Development Tasks

### Editing Pages
1. Modify HTML files in the root directory for structure/content
2. Update corresponding CSS files in the `style/` directory
3. Update JavaScript files in the `script/` directory for page-specific logic
4. Update component files in the `components/` directory for shared UI elements

### Working with Components
- **navbar.js**: Handles navigation bar functionality including responsive menu
- **footer.js**: Manages footer content and social media links
- **homepagefooter.js**: Controls homepage-specific footer elements

### Styling
- CSS follows a pattern: `[page-name].css` for page-specific styles
- Component-specific styles: `navbar.css`, `footer.css`, etc.
- Global styles may be embedded in HTML or scattered across multiple files

### JavaScript Patterns
- Uses vanilla JS with `fetch()` API for HTTP requests
- Authentication tokens stored in `localStorage`
- Common pattern: `fetch('https://alibaba-backend.herokuapp.com/endpoint')` (backend service for Isoko.app)
- Event listeners attached using `addEventListener` or inline `onclick` attributes

## Important Notes

### Backend Dependency
- This repository contains only the frontend
- The backend API is hosted separately on Heroku
- For full functionality including user authentication, product browsing, and cart management, the backend must be accessible
- If the Heroku backend is unavailable, API calls will fail and certain features won't work

### File Relationships
- HTML files reference CSS via `<link>` tags in `<head>`
- HTML files reference JavaScript via `<script>` tags before closing `</body>`
- Component JavaScript files are typically included on pages that use them
- All API calls use the same Heroku backend URL

### Troubleshooting
- If pages don't load correctly, check browser console for JavaScript errors
- Network tab in dev tools will show API call successes/failures
- CSS issues can be inspected using browser dev tools
- Ensure Python server is running if accessing via `localhost:8080`

## Deployment
The frontend can be deployed to any static file hosting service:
- Currently deployed at: http://143.47.179.233
- Other options: Netlify, Vercel, GitHub Pages, AWS S3
- Any web server capable of serving static files

No build step is required - copy all files to the static hosting service preserving directory structure.