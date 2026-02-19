To run this application locally

npm commands - 

npm run dev
npm run start

build command - npm run build


Authentication with OAuth in Production

Setting up Google OAuth worked locally but failed after deployment. The issue was related to redirect URLs and handling the OAuth callback properly in a production environment.

Handling Cookies in Next.js App Router

Managing authentication sessions with cookies in Next.js 16 was challenging because cookies can only be modified inside Route Handlers or Server Actions. This required separating server and client logic correctly.

Server-Side Authentication

Protecting the dashboard using server-side authentication required understanding how to read sessions securely without causing cookie modification errors.

Environment Variables in Deployment

Ensuring that environment variables were correctly configured in Vercel was necessary for authentication to work in production.

Understanding SSR with Supabase

Integrating Supabase with the Next.js App Router required learning how to properly use server and browser clients for authentication and data fetching.