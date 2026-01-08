# Step-by-Step Guide: Deploying Your Wedding Invitation App on Hostinger

## Prerequisites
- Hostinger hosting account (Web Hosting or VPS)
- Access to File Manager or FTP credentials
- Your project built and ready

---

## Step 1: Build Your Application for Production

### 1.1 Clean and Build
```bash
# Navigate to your project directory
cd /Users/ayushsrivastava/Desktop/Invite-git/charuandshubham

# Install dependencies (if not already installed)
npm install

# Build the production version
npm run build
```

This will create a `dist` folder with all optimized production files.

### 1.2 Verify Build Output
After building, check that the `dist` folder contains:
- `index.html`
- `assets/` folder with all your images, CSS, and JS files
- Any other static files

---

## Step 2: Access Hostinger Control Panel

### 2.1 Login to Hostinger
1. Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Login with your Hostinger credentials
3. Select your domain/hosting account

### 2.2 Access File Manager
1. In the hPanel dashboard, find **"Files"** section
2. Click on **"File Manager"**
3. Navigate to your domain's root directory (usually `public_html`)

---

## Step 3: Upload Your Files

### Option A: Using File Manager (Recommended for beginners)

1. **Clear existing files (if any)**
   - In File Manager, select all files in `public_html`
   - Delete them (keep a backup if needed)

2. **Upload your dist folder contents**
   - Navigate to your local `dist` folder
   - Select ALL files and folders inside `dist` (not the dist folder itself)
   - Upload them to `public_html`

3. **File structure should be:**
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].css
   │   ├── index-[hash].js
   │   ├── pg1-[hash].jpeg
   │   ├── pg2-[hash].jpeg
   │   └── ... (all other assets)
   ├── placeholder.svg
   └── robots.txt
   ```

### Option B: Using FTP (Faster for large files)

1. **Get FTP credentials from Hostinger**
   - Go to hPanel → **"Files"** → **"FTP Accounts"**
   - Note down: FTP Host, Username, Password

2. **Use FTP client (FileZilla, Cyberduck, etc.)**
   - Connect using the FTP credentials
   - Navigate to `public_html` directory
   - Upload all contents from your local `dist` folder

---

## Step 4: Configure for Single Page Application (SPA)

Since this is a React SPA, you need to handle routing properly.

### 4.1 Create `.htaccess` file (for Apache servers)

1. In File Manager, go to `public_html`
2. Create a new file named `.htaccess`
3. Add the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

4. Save the file

### 4.2 For Nginx servers (if applicable)

If your Hostinger plan uses Nginx, create a `nginx.conf` file or contact support for configuration.

---

## Step 5: Verify Deployment

### 5.1 Check Your Website
1. Open your browser
2. Visit your domain (e.g., `https://yourdomain.com`)
3. Verify:
   - ✅ Homepage loads correctly
   - ✅ All images display properly
   - ✅ Navigation works
   - ✅ All pages/routes are accessible
   - ✅ Background music plays (if enabled)

### 5.2 Test on Different Devices
- Desktop browser
- Mobile device
- Tablet

### 5.3 Check Browser Console
- Open Developer Tools (F12)
- Check for any 404 errors or missing assets
- Verify no JavaScript errors

---

## Step 6: SSL Certificate (HTTPS)

### 6.1 Enable SSL
1. In hPanel, go to **"SSL"** section
2. Enable **"Let's Encrypt SSL"** (free)
3. Wait for activation (usually a few minutes)

### 6.2 Force HTTPS (Optional)
Add to your `.htaccess`:

```apache
# Force HTTPS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## Step 7: Performance Optimization

### 7.1 Enable Gzip Compression
Already included in `.htaccess` above.

### 7.2 Optimize Images (Optional)
- Compress large images before uploading
- Use WebP format for better compression
- Ensure images are optimized in your build

### 7.3 CDN (Optional)
Consider using Cloudflare CDN for better global performance:
1. Sign up for free Cloudflare account
2. Add your domain
3. Update nameservers in Hostinger

---

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution:** Ensure `.htaccess` file is correctly configured (Step 4.1)

### Issue: Images not loading
**Solution:** 
- Check file paths in browser console
- Ensure all files in `dist/assets` are uploaded
- Verify file permissions (should be 644 for files, 755 for folders)

### Issue: White screen / blank page
**Solution:**
- Check browser console for errors
- Verify `index.html` is in root directory
- Check that all JS/CSS files are uploaded
- Clear browser cache

### Issue: Slow loading
**Solution:**
- Enable compression (already in `.htaccess`)
- Optimize images
- Consider CDN
- Check file sizes

### Issue: Build errors
**Solution:**
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

---

## Quick Deployment Script

Create a `deploy.sh` script for easy future deployments:

```bash
#!/bin/bash
echo "Building production version..."
npm run build

echo "Build complete! Files are in the 'dist' folder."
echo "Upload the contents of 'dist' folder to your Hostinger public_html directory."
```

Make it executable:
```bash
chmod +x deploy.sh
```

---

## Important Notes

1. **Always backup** before deleting files on the server
2. **Test locally** using `npm run preview` before deploying
3. **Keep your build** - don't delete the `dist` folder after deployment
4. **Version control** - commit your code to Git before deploying
5. **Environment variables** - If you have any, ensure they're set in Hostinger's environment settings

---

## Updating Your Website

When you make changes:

1. Make changes in your code
2. Run `npm run build` again
3. Upload only the changed files (or all files if unsure)
4. Clear browser cache to see changes

---

## Support

- **Hostinger Support:** [support.hostinger.com](https://support.hostinger.com)
- **Hostinger Knowledge Base:** [support.hostinger.com/en](https://support.hostinger.com/en)

---

## Summary Checklist

- [ ] Build the project (`npm run build`)
- [ ] Access Hostinger File Manager
- [ ] Upload all files from `dist` folder to `public_html`
- [ ] Create `.htaccess` file for SPA routing
- [ ] Enable SSL certificate
- [ ] Test website functionality
- [ ] Test on mobile devices
- [ ] Verify all images and assets load correctly
- [ ] Check browser console for errors

---

**Congratulations! Your wedding invitation website should now be live! 🎉**

