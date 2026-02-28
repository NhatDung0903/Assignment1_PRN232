# Migration Guide: Assignment 1 → Assignment 2

This guide explains how to migrate your database and test the new features.

## Step 1: Run Database Migration

Since you already have a database with products, you need to create and run a migration for the new User, Order, and OrderItem models.

### Option A: If You Want Fresh Database (Recommended for Testing)

```bash
# Drop all data and recreate with new schema
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Run all migrations
# 4. Run seed file (if you have one)
```

### Option B: If You Want to Keep Existing Products

```bash
# Create a new migration
npx prisma migrate dev --name add_user_order_models

# This will:
# 1. Detect schema changes
# 2. Create a new migration file
# 3. Apply it to your database
# 4. Keep existing products
```

## Step 2: Generate Prisma Client

```bash
npx prisma generate
```

## Step 3: Start Development Server

```bash
npm run dev
```

## Step 4: Test the Application

### 1. Register a New User
- Navigate to: `http://localhost:3000/register`
- Create an account with:
  - Email: `test@example.com`
  - Password: `password123`
- You'll be automatically logged in

### 2. Browse Products
- Go to: `http://localhost:3000/products`
- Click "Add to Cart" on any product
- See the cart badge update in navigation

### 3. View Cart
- Click the cart icon in navigation (or go to `/cart`)
- Update quantities
- Remove items
- See total calculation

### 4. Place an Order
- With items in cart, click "Place Order"
- Order is created and payment is simulated
- Redirected to order history

### 5. View Order History
- Go to: `http://localhost:3000/orders`
- See all your past orders
- View order details with products

### 6. Test Authorization
- Logout from the menu
- Try to add/edit/delete a product → Should get 401 error
- Can still view products without login
- Login again to restore access

### 7. Admin Dashboard
- Go to: `http://localhost:3000/admin`
- View product statistics
- Manage products (when logged in)

## Database Schema Changes

### New Models Added:

**User Model:**
- Stores user credentials (email, hashed password)
- Has role field (user/admin)
- Related to orders

**Order Model:**
- Tracks user purchases
- Has totalAmount and status (pending/paid)
- Related to user and order items

**OrderItem Model:**
- Stores individual products in an order
- Captures price snapshot at order time
- Related to order and product

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Orders
- `GET /api/orders` - List user's orders (auth required)
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders/:id` - Get order details (auth required)
- `PATCH /api/orders/:id` - Update order status (auth required)

### Products (Updated)
- `GET /api/products` - List products (public)
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

## Environment Variables

Make sure you have these in your `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-strong-secret-key-min-32-chars"
NODE_ENV="development"
```

## Troubleshooting

### Problem: "Property 'user' does not exist on type 'PrismaClient'"
**Solution:** Run `npx prisma generate` to regenerate the client after schema changes.

### Problem: Migration fails with "Can't reach database server"
**Solution:** Check your DATABASE_URL in `.env` file. Make sure your database is running and accessible.

### Problem: Cart doesn't persist after page reload
**Solution:** The cart uses localStorage. Check browser console for errors. Clear localStorage if needed.

### Problem: 401 Unauthorized when creating products
**Solution:** Make sure you're logged in. Check that the auth cookie is set in browser DevTools > Application > Cookies.

### Problem: TypeScript errors in IDE
**Solution:** Restart your TypeScript server in VS Code (Command Palette > "TypeScript: Restart TS Server")

## Key Features to Test

### Authentication Flow
✅ Registration with validation  
✅ Login with credential verification  
✅ Logout and session clearing  
✅ Protected routes redirect to login  
✅ Auth state persists on page reload  

### Shopping Cart
✅ Add products from product list  
✅ Add products with custom quantity from detail page  
✅ Update quantities in cart  
✅ Remove items from cart  
✅ Cart persists in localStorage  
✅ Cart count badge in navigation  

### Order Management
✅ Create order from cart  
✅ Payment simulation (status → paid)  
✅ View order history  
✅ See order details with products  
✅ Orders are user-specific  

### UI/UX
✅ Responsive design (mobile/desktop)  
✅ Dynamic navigation based on auth state  
✅ Loading states and error handling  
✅ Form validation with error messages  
✅ Visual feedback for actions  

## Next Steps (Optional Enhancements)

1. **Email Verification**: Add email confirmation on registration
2. **Password Reset**: Implement forgot password flow
3. **Profile Page**: Let users update their information
4. **Admin Features**: Add user management for admin role
5. **Order Cancellation**: Allow users to cancel pending orders
6. **Product Reviews**: Add rating and review system
7. **Search & Filters**: Enhanced product search
8. **Payment Integration**: Real payment gateway (Stripe, PayPal)
9. **Shipping**: Add shipping address and tracking
10. **Notifications**: Real-time order status updates

## Support

If you encounter any issues:
1. Check the console logs (browser & terminal)
2. Verify database connection
3. Ensure all migrations are applied
4. Check that Prisma client is generated
5. Review the ASSIGNMENT2_README.md for detailed documentation

## Credits

Built with Next.js 16 (App Router), Prisma, PostgreSQL, and Tailwind CSS.
