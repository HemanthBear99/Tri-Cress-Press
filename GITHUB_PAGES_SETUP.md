# 🚀 How to Enable GitHub Pages

Follow these simple steps to make your site live on GitHub Pages:

## Step 1: Navigate to Repository Settings

1. Go to your repository: https://github.com/HemanthBear99/Tri-Cress-Press
2. Click on **Settings** (top navigation bar)

## Step 2: Enable GitHub Pages

1. In the left sidebar, scroll down and click on **Pages**
2. Under **"Build and deployment"** section:
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **"main"** (or your default branch)  
   - **Folder**: Select **"/docs"**
3. Click **"Save"**

## Step 3: Wait for Deployment

1. GitHub will start building your site
2. Wait 2-3 minutes for the deployment to complete
3. Refresh the Pages settings page to see the deployment status

## Step 4: Access Your Live Site

Your site will be available at:
```
https://hemanthbear99.github.io/Tri-Cress-Press/
```

You'll see a message at the top of the Pages settings page with a "Visit site" button.

---

## What's Deployed?

The GitHub Pages deployment includes:
- ✅ A beautiful landing page showcasing your project
- ✅ Project features and technology stack
- ✅ Links to the GitHub repository
- ✅ Deployment instructions

**Note**: This is a static landing page. The full Next.js application with all features (auth, payments, CMS) requires Vercel deployment. See [DEPLOYMENT.md](DEPLOYMENT.md) for full app deployment.

---

## Optional: Custom Domain

If you want to use a custom domain (e.g., www.tricrestpress.com):

1. In the GitHub Pages settings, enter your custom domain
2. Add a CNAME record in your domain provider's DNS settings:
   - Type: CNAME
   - Name: www (or @)
   - Value: hemanthbear99.github.io
3. Wait for DNS propagation (can take up to 24 hours)
4. Enable "Enforce HTTPS" in GitHub Pages settings

---

## Troubleshooting

### "Site not loading"
- Wait a few more minutes - first deployment can take 5-10 minutes
- Check that you selected the correct branch and "/docs" folder
- Make sure the repository is public

### "404 Error"
- Ensure the branch is "main" and folder is "/docs"
- Check that the docs/index.html file exists in your repository

### Need Help?
Open an issue on the [GitHub repository](https://github.com/HemanthBear99/Tri-Cress-Press/issues) for support.

---

## Next Steps

After your landing page is live, consider:

1. **Deploy Full App to Vercel**: Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide
2. **Add Custom Domain**: Make it professional
3. **Configure Environment Variables**: For Sanity, Stripe, and Clerk
4. **Enable Analytics**: Track visitors and performance

---

**Your landing page will be live at**: https://hemanthbear99.github.io/Tri-Cress-Press/

Enjoy your live site! 🎉
