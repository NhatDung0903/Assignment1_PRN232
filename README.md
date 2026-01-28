# Clothing E-Commerce Website

A simple full-stack e-commerce website for clothing products built with Next.js, TypeScript, TailwindCSS, and PostgreSQL with Prisma ORM.

## Features

- Product CRUD operations (Create, Read, Update, Delete)
- REST API with proper validation using Zod
- Responsive UI with TailwindCSS
- PostgreSQL database with Prisma ORM
- Next.js App Router

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add your PostgreSQL connection strings (recommended: Neon - https://neon.tech):
     ```
     DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
     DIRECT_URL="postgresql://username:password@hostname/database?sslmode=require"
     ```

3. **Run database migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed the database with sample data**:
   ```bash
   npx prisma db seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Home Page**: Hero section with featured products grid, search, filter, sort, and pagination
- **Products Page**: All products with full filtering and pagination
- **Product Detail**: Individual product view with edit/delete actions
- **Admin Dashboard**: Stats cards and admin table for product management
- **Create/Edit Modals**: Modal-based forms for adding/editing products
- **Mobile Navigation**: Bottom navigation for mobile devices
- **Toast Notifications**: User feedback for actions
- **API Documentation**: Floating panel with CRUD endpoint details

## Deployment

- Set the `DATABASE_URL` and `DIRECT_URL` environment variables on your deployment platform (e.g., Vercel).
- The app uses relative API URLs, so no additional configuration is needed for production.

## Project Structure

```
src/
├── app/
│   ├── api/products/
│   │   ├── route.ts          # GET, POST /api/products
│   │   └── [id]/
│   │       └── route.ts      # GET, PUT, DELETE /api/products/:id
│   ├── products/
│   │   ├── [id]/
│   │   │   ├── page.tsx      # Product detail page
│   │   │   ├── edit/
│   │   │   │   └── page.tsx  # Edit product page
│   │   │   └── not-found.tsx # 404 page for products
│   │   └── new/
│   │       └── page.tsx      # Create product page
│   ├── layout.tsx            # Root layout with NavBar
│   └── page.tsx              # Home page (product list)
├── components/
│   ├── NavBar.tsx            # Navigation component
│   ├── ProductCard.tsx       # Product card component
│   └── ProductForm.tsx       # Reusable form for create/edit
└── generated/prisma/         # Prisma client
```

## Deployment

This project is designed to be deployed on Vercel. Make sure to:

1. Set the `DATABASE_URL` environment variable in your Vercel project settings
2. Run `npx prisma migrate deploy` for production database setup

## Product Model

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Float
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
