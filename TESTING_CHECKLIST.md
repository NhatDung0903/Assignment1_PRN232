# Assignment 2 - Testing Checklist

Use this checklist to verify all features are working correctly.

## Setup & Installation ✅

- [ ] `npm install` completed successfully
- [ ] `npx prisma generate` completed
- [ ] Database migration applied
- [ ] `.env` file configured with DATABASE_URL and JWT_SECRET
- [ ] `npm run build` successful
- [ ] `npm run dev` running on http://localhost:3000

## 1. Authentication System 🔐

### Registration
- [ ] Navigate to `/register`
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `password123` (min 6 chars)
- [ ] Enter confirm password: `password123`
- [ ] Click "Sign Up"
- [ ] ✅ User created and automatically logged in
- [ ] ✅ Navigation shows email and "Logout" button
- [ ] ✅ Redirected to `/products`

### Login
- [ ] Logout first
- [ ] Navigate to `/login`
- [ ] Enter registered email and password
- [ ] Click "Sign In"
- [ ] ✅ Successfully logged in
- [ ] ✅ Cookie set in browser (DevTools > Application > Cookies)
- [ ] ✅ Navigation updated with user email

### Logout
- [ ] Click "Logout" in navigation
- [ ] ✅ Cookie cleared
- [ ] ✅ Navigation shows "Login" and "Register"
- [ ] ✅ Redirected to home page

## 2. Authorization (Access Control) 🛡️

### Unauthenticated Users
- [ ] Logout (if logged in)
- [ ] Navigate to `/products`
- [ ] ✅ Can view all products
- [ ] Try to add/edit/delete product via API
- [ ] ✅ Receives 401 Unauthorized error
- [ ] Try to access `/orders`
- [ ] ✅ Redirected to `/login`

### Authenticated Users
- [ ] Login first
- [ ] Navigate to `/products/new`
- [ ] ✅ Can create new products
- [ ] Click "Edit" on any product
- [ ] ✅ Can update product
- [ ] Click "Delete" on product
- [ ] ✅ Can delete product
- [ ] Navigate to `/orders`
- [ ] ✅ Can view orders page

## 3. Shopping Cart 🛒

### Add to Cart
- [ ] Navigate to `/products`
- [ ] Click "Add to Cart" on any product
- [ ] ✅ Button shows "✓ Added!" briefly
- [ ] ✅ Cart badge in nav shows count (1)
- [ ] Add another product
- [ ] ✅ Badge count increases (2)

### View Cart
- [ ] Click cart icon in navigation
- [ ] ✅ Redirected to `/cart`
- [ ] ✅ All added products displayed
- [ ] ✅ Each item shows: image, name, price, quantity
- [ ] ✅ Total amount calculated correctly

### Update Quantity
- [ ] Click "+" button on item
- [ ] ✅ Quantity increases
- [ ] ✅ Subtotal updates
- [ ] ✅ Total recalculates
- [ ] Click "-" button
- [ ] ✅ Quantity decreases
- [ ] ✅ Totals update

### Remove Item
- [ ] Click trash/remove icon on item
- [ ] ✅ Item removed from cart
- [ ] ✅ Total recalculates
- [ ] ✅ Badge count updates

### Cart Persistence
- [ ] Add items to cart
- [ ] Refresh page (F5)
- [ ] ✅ Cart items still present
- [ ] ✅ Count badge shows correct number
- [ ] Close browser and reopen
- [ ] ✅ Cart still persists (localStorage)

### Empty Cart State
- [ ] Remove all items from cart
- [ ] ✅ Shows "Your Cart is Empty" message
- [ ] ✅ Displays "Browse Products" button

## 4. Order Management 📦

### Place Order (Authenticated)
- [ ] Login (if not already)
- [ ] Add products to cart (at least 2 items)
- [ ] View cart at `/cart`
- [ ] Review order summary
- [ ] ✅ Total amount shows correctly
- [ ] ✅ Item count correct
- [ ] Click "Place Order"
- [ ] ✅ Order created successfully
- [ ] ✅ Payment simulated (status → paid)
- [ ] ✅ Cart cleared
- [ ] ✅ Redirected to `/orders`

### Place Order (Unauthenticated)
- [ ] Logout
- [ ] Add items to cart
- [ ] Go to `/cart`
- [ ] ✅ Shows "Please sign in to checkout" message
- [ ] Click "Place Order"
- [ ] ✅ Redirected to `/login`

### View Order History
- [ ] Login (if not already)
- [ ] Navigate to `/orders`
- [ ] ✅ All orders listed
- [ ] ✅ Each order shows:
  - [ ] Order number (#ID)
  - [ ] Date created
  - [ ] Total amount
  - [ ] Status badge (PAID/PENDING)
  - [ ] List of products with quantities
  - [ ] Product images
  - [ ] Individual item prices

### Order Details
- [ ] Click on any order in history
- [ ] ✅ Order details expanded/visible
- [ ] ✅ All order items shown
- [ ] ✅ Product information correct
- [ ] ✅ Quantities match cart at order time
- [ ] ✅ Prices are snapshot from order time

## 5. Product Management (CRUD) 🏪

### View Products (Public)
- [ ] Navigate to `/products`
- [ ] ✅ Product grid displays
- [ ] ✅ Each card shows: image, name, description, price
- [ ] ✅ Filters work (search, price range, sort)
- [ ] ✅ Pagination works (if >8 products)

### Create Product (Auth Required)
- [ ] Login first
- [ ] Navigate to `/products/new`
- [ ] Fill in form: name, description, price, image URL
- [ ] Submit form
- [ ] ✅ Product created
- [ ] ✅ Appears in product list
- [ ] Try without login
- [ ] ✅ API returns 401

### Update Product (Auth Required)
- [ ] Click "Edit" on product card
- [ ] Modal/page opens with form
- [ ] Update name/price/etc
- [ ] Submit changes
- [ ] ✅ Product updated
- [ ] ✅ Changes reflected immediately

### Delete Product (Auth Required)
- [ ] Click "Delete" on product
- [ ] Confirm deletion in modal
- [ ] ✅ Product removed from list
- [ ] ✅ Stats updated (admin page)

### Product Detail Page
- [ ] Click "View Details" on product
- [ ] ✅ Redirected to `/products/{id}`
- [ ] ✅ Full product information shown
- [ ] ✅ Quantity selector visible
- [ ] Select quantity (e.g., 3)
- [ ] Click "Add to Cart"
- [ ] ✅ Added with selected quantity
- [ ] ✅ Cart badge updates correctly

## 6. UI/UX Features 🎨

### Responsive Design
- [ ] Desktop view (>1024px)
  - [ ] ✅ Top navigation visible
  - [ ] ✅ 4-column product grid
  - [ ] ✅ Sidebar layouts work
- [ ] Tablet view (768-1023px)
  - [ ] ✅ 2-column product grid
  - [ ] ✅ Navigation adapts
- [ ] Mobile view (<768px)
  - [ ] ✅ 1-column product grid
  - [ ] ✅ Bottom navigation visible
  - [ ] ✅ Cart icon in bottom nav

### Navigation
- [ ] Top Navigation (Desktop)
  - [ ] ✅ Logo/brand visible
  - [ ] ✅ Home, Products, Orders links
  - [ ] ✅ Cart icon with badge
  - [ ] ✅ Login/Register OR Email/Logout
- [ ] Bottom Navigation (Mobile)
  - [ ] ✅ Home, Products, Cart, Login/Orders icons
  - [ ] ✅ Active route highlighted
  - [ ] ✅ Badge on cart icon

### Loading States
- [ ] Navigate between pages
- [ ] ✅ Loading spinners show
- [ ] Form submissions
- [ ] ✅ Button shows "Loading..." or spinner

### Error Handling
- [ ] Try login with wrong password
- [ ] ✅ Error message displayed
- [ ] Try register with existing email
- [ ] ✅ Clear error feedback
- [ ] Network error simulation
- [ ] ✅ Error messages shown

### Form Validation
- [ ] Registration form
  - [ ] ✅ Email format validation
  - [ ] ✅ Password min length (6 chars)
  - [ ] ✅ Password confirmation match
- [ ] Login form
  - [ ] ✅ Required field validation
- [ ] Product form
  - [ ] ✅ Name required
  - [ ] ✅ Price must be positive
  - [ ] ✅ Image URL format

### Visual Feedback
- [ ] Add to cart
  - [ ] ✅ Button changes to "✓ Added!"
  - [ ] ✅ Badge animates
- [ ] Hover effects
  - [ ] ✅ Cards scale slightly
  - [ ] ✅ Buttons have hover states
- [ ] Transitions
  - [ ] ✅ Smooth animations (300ms)

## 7. Payment Simulation 💳

### Checkout Flow
- [ ] Cart with items
- [ ] Click "Place Order"
- [ ] ✅ Order created with status "pending"
- [ ] ✅ Automatic API call to update status
- [ ] ✅ Status changes to "paid"
- [ ] ✅ Order marked as completed
- [ ] View in order history
- [ ] ✅ Badge shows "PAID" in green

## 8. Admin Dashboard 📊

### Statistics
- [ ] Navigate to `/admin`
- [ ] ✅ Total products count
- [ ] ✅ Total value calculated
- [ ] ✅ Average price shown
- [ ] Create/delete products
- [ ] ✅ Stats update in real-time

### Product Table
- [ ] ✅ All products listed in table
- [ ] ✅ ID, Name, Price columns
- [ ] ✅ Action buttons: View, Edit, Delete
- [ ] ✅ Delete removes from table immediately

## 9. Technical Requirements ⚙️

### Database
- [ ] ✅ User table exists with hashed passwords
- [ ] ✅ Order table with userId foreign key
- [ ] ✅ OrderItem table with relations
- [ ] ✅ Migrations applied successfully
- [ ] Query products
  - [ ] ✅ Returns data correctly
- [ ] Query orders with items
  - [ ] ✅ Includes nested orderItems and products

### API Endpoints
Test with browser DevTools Network tab:
- [ ] `GET /api/products` (public)
  - [ ] ✅ 200 OK, returns products array
- [ ] `POST /api/products` (auth required)
  - [ ] Without token: ✅ 401 Unauthorized
  - [ ] With token: ✅ 201 Created
- [ ] `POST /api/auth/register`
  - [ ] ✅ 201 Created on success
  - [ ] ✅ 400 Bad Request on validation error
- [ ] `POST /api/auth/login`
  - [ ] ✅ 200 OK with user object
  - [ ] ✅ 401 on wrong credentials
- [ ] `GET /api/orders` (auth required)
  - [ ] ✅ 401 without token
  - [ ] ✅ 200 with orders array

### TypeScript
- [ ] Run `npm run build`
- [ ] ✅ No compilation errors
- [ ] ✅ All types resolved
- [ ] IDE (VS Code)
  - [ ] ✅ No red squiggly lines (after TS restart)
  - [ ] ✅ IntelliSense works

### Code Quality
- [ ] ✅ Consistent formatting
- [ ] ✅ Meaningful variable names
- [ ] ✅ Comments where needed
- [ ] ✅ No console errors in browser
- [ ] ✅ No warnings in terminal

## 10. Edge Cases & Error Scenarios 🐛

### Cart Edge Cases
- [ ] Add same product twice
  - [ ] ✅ Quantity increases, not duplicate
- [ ] Decrease quantity to 0
  - [ ] ✅ Item removed from cart
- [ ] Large quantity (100+)
  - [ ] ✅ Handles correctly

### Order Edge Cases
- [ ] Empty cart checkout
  - [ ] ✅ Shows "Cart is empty" message
- [ ] Order without login
  - [ ] ✅ Prompts to login
- [ ] Network failure during order
  - [ ] ✅ Error message shown

### Auth Edge Cases
- [ ] Register with existing email
  - [ ] ✅ Error: "User already exists"
- [ ] Login with wrong password
  - [ ] ✅ Error: "Invalid credentials"
- [ ] Access /orders without login
  - [ ] ✅ Redirects to /login
- [ ] Expired token
  - [ ] ✅ Prompts re-login

## Summary Score

Total Checkboxes: _____ / _____
Passed: _____ (___%)

### Critical Features (Must Pass)
- [ ] ✅ Authentication works (register, login, logout)
- [ ] ✅ Authorization enforced (401 on protected routes)
- [ ] ✅ Cart adds/updates/removes items
- [ ] ✅ Orders created and persist
- [ ] ✅ Payment simulation updates status
- [ ] ✅ UI responsive on all devices
- [ ] ✅ No TypeScript errors on build

### Bonus Features
- [ ] ✅ Admin dashboard with stats
- [ ] ✅ Mobile bottom navigation
- [ ] ✅ Loading states and animations
- [ ] ✅ Form validation with feedback
- [ ] ✅ Error handling throughout

---

## Notes

Record any issues or observations:

```
Date: ___________
Tester: ___________

Issues found:
-
-

Passed: YES / NO

Comments:




```

---

**Legend:**
- ✅ = Feature works correctly
- ❌ = Feature broken/missing
- ⚠️ = Partial functionality

**Testing Environment:**
- Browser: ___________
- Database: ___________
- Node Version: ___________
