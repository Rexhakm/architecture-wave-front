# Absolute URLs Configuration

This project has been configured to use absolute URLs throughout the application for better SEO, social sharing, and cross-domain compatibility.

## Environment Configuration

Add the following environment variable to your `.env.local` file:

```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

Replace `https://yourdomain.com` with your actual domain name.

## URL Utility Functions

The project includes a utility file at `src/app/utils/urlUtils.ts` with the following functions:

### `abs(url?: string | null)`
Converts a relative URL to an absolute URL using the configured base URL.

```typescript
import { abs } from '../utils/urlUtils';

// Convert relative URL to absolute
const absoluteUrl = abs('/articles/my-article'); 
// Returns: https://yourdomain.com/articles/my-article
```

### `getBaseUrl()`
Returns the configured base URL without trailing slash.

### `isAbsoluteUrl(url: string)`
Checks if a URL is already absolute.

### `ensureAbsoluteUrl(url: string)`
Ensures a URL is absolute, converting relative URLs if necessary.

## Usage Examples

### In Components
```typescript
import { abs } from '../utils/urlUtils';

// Use in Link components
<Link href={abs('/articles/my-article') || '/articles/my-article'}>
  Read Article
</Link>

// Use in anchor tags
<a href={abs('/about-us') || '/about-us'}>About Us</a>
```

### In Metadata
```typescript
// For Open Graph and Twitter Card meta tags
const articleUrl = abs(`/articles/${article.slug}`);
const imageUrl = abs('/default-image.jpg');
```

### In Background Images
```typescript
style={{
  backgroundImage: `url(${abs('/assets/image.png') || '/assets/image.png'})`
}}
```

## Fallback Strategy

The implementation includes fallback values to ensure the application continues to work even if the environment variable is not set:

```typescript
href={abs('/path') || '/path'}
```

This means:
- If `NEXT_PUBLIC_BASE_URL` is set: uses absolute URL
- If `NEXT_PUBLIC_BASE_URL` is not set: falls back to relative URL

## Benefits

1. **Better SEO**: Search engines prefer absolute URLs
2. **Social Sharing**: Social media platforms can properly resolve URLs
3. **Cross-domain**: Works correctly when content is embedded on other domains
4. **Analytics**: Better tracking of external referrers
5. **Email**: Links in emails work correctly regardless of domain

## Files Updated

The following files have been updated to use absolute URLs:

- `src/app/components/Header.tsx`
- `src/app/components/Footer.tsx`
- `src/app/home.tsx`
- `src/app/shop/page.tsx`
- `src/app/shop/[id]/page.tsx`
- `src/app/category/[slug]/page.tsx`
- `src/app/articles/[slug]/page.jsx`
- `src/app/about-us/page.tsx`
- `src/app/contact-us/page.tsx`
- `src/app/not-found.tsx`

## Testing

After setting the environment variable, test that:

1. All internal links work correctly
2. Social media sharing generates proper URLs
3. SEO meta tags contain absolute URLs
4. Background images load correctly
5. The application works in both development and production

## Deployment

Make sure to set the `NEXT_PUBLIC_BASE_URL` environment variable in your production environment with the correct domain name. 