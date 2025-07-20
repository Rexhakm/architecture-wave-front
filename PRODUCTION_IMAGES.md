# Production Image Handling Guide

## 🚀 Overview

This guide explains how to handle local images when deploying to production and ensures they display correctly.

## ✅ What's Been Implemented

### 1. **ProductImage Component**
- **Location**: `src/app/components/ProductImage.tsx`
- **Features**: 
  - Automatic fallback to placeholder images
  - Error handling for missing images
  - Optimized for Next.js Image component

### 2. **Fallback System**
- **Fallback URL**: `https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Product+Image`
- **Automatic switching**: When local images fail to load
- **No broken images**: Users always see something

### 3. **Image Verification Script**
- **Location**: `scripts/verify-images.js`
- **Usage**: `npm run verify-images`
- **Purpose**: Checks all local images before deployment

## 🔧 Configuration

### Next.js Config (`next.config.js`)
```javascript
const nextConfig = {
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "verify-images": "node scripts/verify-images.js",
    "prebuild": "npm run verify-images"
  }
}
```

## 📁 File Structure

```
public/
├── assets/
│   ├── chair.png          # Main product image
│   ├── dinner.png         # Kitchen category image
│   ├── Vector-*.png       # Various UI elements
│   ├── image-*.png        # Additional images
│   └── Rectangle*.png     # Design elements
```

## 🚀 Deployment Checklist

### Before Deployment
1. **Run image verification**:
   ```bash
   npm run verify-images
   ```

2. **Check all images exist**:
   - Ensure all images are in `public/assets/`
   - Verify file permissions
   - Check file sizes (optimize if needed)

3. **Test locally**:
   ```bash
   npm run build
   npm start
   ```

### Production Deployment

#### Option 1: Vercel (Recommended)
- Images in `public/` folder are automatically served
- No additional configuration needed
- Automatic optimization enabled

#### Option 2: Other Platforms
- Ensure `public/` folder is included in deployment
- Configure static file serving
- Set up proper MIME types

#### Option 3: Custom Server
- Serve `public/` folder as static assets
- Configure proper caching headers
- Enable gzip compression

## 🛠️ Troubleshooting

### Images Not Loading in Production

1. **Check file paths**:
   ```bash
   npm run verify-images
   ```

2. **Verify deployment**:
   - Check if `public/assets/` is included
   - Verify file permissions (644)
   - Test direct URL access

3. **Check browser console**:
   - Look for 404 errors
   - Check network tab for failed requests

### Common Issues

#### Issue: Images show as broken
**Solution**: 
- Run `npm run verify-images`
- Ensure images are in correct location
- Check file permissions

#### Issue: Images load slowly
**Solution**:
- Optimize image sizes
- Use WebP format
- Enable CDN caching

#### Issue: Fallback images showing
**Solution**:
- Check if local images exist
- Verify file paths are correct
- Ensure deployment includes all files

## 📊 Performance Optimization

### Image Optimization
1. **Compress images**:
   ```bash
   # Using ImageOptim, TinyPNG, or similar
   # Target: < 200KB per image
   ```

2. **Use modern formats**:
   - WebP for better compression
   - AVIF for next-gen browsers
   - PNG for transparency

3. **Responsive images**:
   - Different sizes for different devices
   - Automatic format selection

### CDN Setup (Optional)
```javascript
// In next.config.js
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
  }
}
```

## 🔍 Monitoring

### Production Monitoring
1. **Error tracking**: Monitor for image 404s
2. **Performance**: Track image load times
3. **User experience**: Monitor fallback usage

### Analytics
- Track which images fail to load
- Monitor fallback image usage
- Measure page load performance

## 📝 Best Practices

1. **Always use ProductImage component**:
   ```jsx
   <ProductImage 
     src="/assets/chair.png" 
     alt="Product Name"
     className="object-cover"
   />
   ```

2. **Provide meaningful alt text**:
   - Improves accessibility
   - Better SEO
   - Fallback for screen readers

3. **Optimize images before upload**:
   - Compress to reasonable sizes
   - Use appropriate formats
   - Test on different devices

4. **Regular maintenance**:
   - Run verification script regularly
   - Update fallback images as needed
   - Monitor performance metrics

## 🆘 Support

If you encounter issues:

1. Run `npm run verify-images`
2. Check browser console for errors
3. Verify deployment includes all files
4. Test with fallback images
5. Contact development team

---

**Note**: This system ensures that even if local images fail to load, users will always see placeholder images instead of broken image icons. 