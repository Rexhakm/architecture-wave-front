# Architecture Wave Frontend

This is the frontend application for the Architecture Wave project.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Backend Configuration

The application always uses the production Strapi backend:

- **All Environments**: Uses `https://architecture-backend.onrender.com`

### Custom Backend URL

To use a custom backend URL, set the environment variable:
```bash
NEXT_PUBLIC_BACKEND_URL=your-custom-backend-url
```

## Project Structure
- `src/` - Source code
- `public/` - Static assets
- `pages/` - Next.js pages

## License
MIT 