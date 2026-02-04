# Deployment Guide

## GitHub Pages (Current Setup)

A simple landing page is deployed to GitHub Pages at: `https://hemanthbear99.github.io/Tri-Cress-Press/`

### How to Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" (or your default branch)
   - Folder: Select "/docs"
4. Click "Save"
5. Wait a few minutes for the deployment to complete
6. Your site will be available at: `https://hemanthbear99.github.io/Tri-Cress-Press/`

### Important Note

GitHub Pages only supports static HTML sites. The full Tricrest Press application requires:
- Server-side rendering (Next.js App Router)
- API routes (Stripe checkout)
- Authentication (Clerk)
- CMS backend (Sanity Studio)

Therefore, only a landing page is deployed to GitHub Pages. For the full application, use Vercel.

---

## Vercel Deployment (Recommended for Full App)

Vercel is the recommended platform for deploying Next.js applications with all features intact.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import your `HemanthBear99/Tri-Cress-Press` repository
4. Configure environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-23
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_URL=https://your-domain.vercel.app
   CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...
   ```
5. Click "Deploy"
6. Vercel will automatically deploy on every push to main

### Option 2: Deploy via GitHub Actions

A GitHub Actions workflow is included (`.github/workflows/deploy.yml`).

**Setup:**

1. Generate a Vercel token:
   - Go to Vercel → Settings → Tokens
   - Create a new token

2. Add secrets to GitHub repository:
   - Go to Repository Settings → Secrets and variables → Actions
   - Add secret: `VERCEL_TOKEN` with your Vercel token

3. Link your Vercel project:
   ```bash
   npm install --global vercel@latest
   vercel link
   ```

4. The workflow will automatically deploy on push to main

### Option 3: Deploy via CLI

```bash
# Install Vercel CLI
npm install --global vercel@latest

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## Environment Variables Required

### Sanity CMS
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-23
```

### Stripe Payments
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_URL=https://your-domain.com
```

### Clerk Authentication
```env
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

---

## Custom Domain Setup

### For Vercel:
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### For GitHub Pages:
1. Add a `CNAME` file to the `/docs` folder with your domain
2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `hemanthbear99.github.io`
3. Enable HTTPS in repository settings

---

## Troubleshooting

### Build Fails with Peer Dependency Errors
```bash
npm install --legacy-peer-deps
```

### Missing styled-components
```bash
npm install styled-components --legacy-peer-deps
```

### Environment Variables Not Working
- Ensure all required environment variables are set in Vercel dashboard
- Prefix public variables with `NEXT_PUBLIC_`
- Redeploy after adding new environment variables

---

## Monitoring and Analytics

After deployment, consider adding:
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and monitoring

---

## Cost Considerations

- **Vercel Free Tier**: Suitable for personal projects
  - 100 GB bandwidth
  - Unlimited deployments
  - Serverless function execution

- **GitHub Pages**: Completely free
  - 1 GB storage
  - 100 GB bandwidth per month
  - Static sites only

---

For support or questions, open an issue on GitHub or contact support@tricrestpress.com
