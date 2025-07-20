# Production Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Pre-deployment Checklist**
```bash
# Verify all images exist
npm run verify-images

# Build the project
npm run build

# Test locally
npm start
```

### 2. **Deploy to Production**

#### **Option A: Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

#### **Option B: Other Platforms**
1. Ensure `public/` folder is included in deployment
2. Set environment variables if needed
3. Deploy the built application

## 🔧 Production Configuration

### **Environment Variables**
```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=your-api-url
```

### **Static Assets**
- All images in `public/assets/` are automatically served
- No additional configuration needed for Vercel
- For other platforms, ensure static file serving is enabled

## 🖼️ Image Handling in Production

### **Current Setup**
- ✅ **Fallback System**: Automatic placeholder images if local images fail
- ✅ **Error Handling**: Graceful degradation with ProductImage component
- ✅ **Optimization**: Next.js image optimization enabled
- ✅ **Verification**: Script to check all images before deployment

### **If Images Don't Load in Production**

1. **Check File Structure**:
   ```
   public/
   ├── assets/
   │   ├── chair.png
   │   ├── dinner.png
   │   └── ... (other images)
   ```

2. **Verify Deployment**:
   - Check if `public/assets/` folder is included
   - Test direct image URLs: `yourdomain.com/assets/chair.png`
   - Check browser console for 404 errors

3. **Fallback System**:
   - If local images fail, placeholder images will show
   - No broken image icons will appear

## 🛠️ Troubleshooting

### **Common Issues**

#### **Issue: Images show as broken**
**Solution**:
```bash
# Run verification script
npm run verify-images

# Check file permissions
ls -la public/assets/

# Ensure files are included in deployment
```

#### **Issue: Build fails**
**Solution**:
- The build should complete successfully
- Error pages (404/500) warnings are normal and don't prevent deployment

#### **Issue: Images load slowly**
**Solution**:
- Images are automatically optimized by Next.js
- Consider using a CDN for better performance
- Optimize image sizes before upload

### **Platform-Specific Issues**

#### **Vercel**
- ✅ Automatic static asset serving
- ✅ Image optimization included
- ✅ No additional configuration needed

#### **Netlify**
- Ensure `public/` folder is in deployment
- Add `_redirects` file if needed
- Check build settings

#### **Custom Server**
- Serve `public/` folder as static assets
- Configure proper MIME types
- Enable gzip compression

## 📊 Monitoring

### **Check Image Status**
```bash
# Verify all images exist
npm run verify-images

# Check build output
npm run build
```

### **Production Monitoring**
1. **Browser Console**: Check for 404 errors
2. **Network Tab**: Monitor image load times
3. **User Reports**: Monitor fallback image usage

## 🎯 Best Practices

### **Before Deployment**
1. ✅ Run `npm run verify-images`
2. ✅ Test build locally: `npm run build && npm start`
3. ✅ Check all image paths are correct
4. ✅ Ensure fallback system works

### **After Deployment**
1. ✅ Test all pages load correctly
2. ✅ Verify images display properly
3. ✅ Check fallback system works
4. ✅ Monitor for any 404 errors

## 🆘 Emergency Fixes

### **If Images Completely Fail**
1. **Immediate Fix**: Fallback images will show automatically
2. **Quick Fix**: Update image paths in `src/app/data/products.ts`
3. **Long-term Fix**: Upload missing images to `public/assets/`

### **If Build Fails**
1. **Remove prebuild script**: Comment out `"prebuild"` in package.json
2. **Skip verification**: Deploy without image verification
3. **Fix later**: Address image issues after deployment

---

**Note**: The fallback system ensures users always see something, even if local images fail to load. This prevents broken image icons and maintains a good user experience. 