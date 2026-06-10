# Rashmi Shree Architecture Blueprint

## Overview
- Frontend: React 18 + Vite 6 + Tailwind + Zustand
- Backend: Cloudflare Workers + Hono
- Auth: Firebase Google + Firebase Phone OTP + JWT
- Data: PostgreSQL (Neon) + Cloudflare R2 storage
- Deployment: Cloudflare Pages + Workers

## Core Flows
1. Buyer signs in through Firebase or OTP.
2. Frontend calls Cloudflare Worker APIs with JWT.
3. Worker uses PostgreSQL for catalog, users, cart, wishlist, orders, reviews, and notifications.
4. Product media and assets are stored in Cloudflare R2.
5. Admin and seller dashboards consume analytics and moderation APIs.
