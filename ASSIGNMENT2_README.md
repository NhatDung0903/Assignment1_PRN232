# CND Shop - E-Commerce Application (Assignment 2)

A full-stack e-commerce application built with Next.js, Prisma, PostgreSQL, and Tailwind CSS, featuring complete authentication, shopping cart, and order management.

## 🚀 New Features (Assignment 2)

### 1. Authentication & Authorization
- **User Registration & Login**: JWT-based authentication with secure password hashing (bcrypt)
- **Role-Based Access Control**: 
  - Unauthenticated users: Can view products only
  - Authenticated users: Can manage products (CRUD), use cart, and place orders
- **Session Management**: HTTP-only cookies with 7-day expiration
- **Protected API Routes**: Authentication middleware for all mutation operations

### 2. Shopping Cart
- **Client-Side State Management**: CartContext with React Context API
- **LocalStorage Persistence**: Cart data persists across sessions
- **Cart Features**:
  - Add products with quantity selection
  - Update quantities
  - Remove items
  - Real-time total calculation
  - Cart badge showing item count in navigation

### 3. Order Management
- **Order Creation**: Convert cart to order with single click
- **Order History**: View all past orders with details
- **Order Status Tracking**: Pending/Paid status
- **Payment Simulation**: Automatic status update after checkout
- **Order Details**: Complete order information including products, quantities, and prices

### 4. Enhanced UI/UX
- **Responsive Design**: Mobile-first approach with bottom navigation
- **Auth-Aware Navigation**: Dynamic header showing login/logout based on user state
- **Modern Design**: Gradient backgrounds, smooth transitions, and hover effects
- **Toast Notifications**: User feedback for important actions
- **Loading States**: Skeleton screens and spinners for better UX

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts    # User registration
│   │   │   ├── login/route.ts       # User login
│   │   │   ├── logout/route.ts      # User logout
│   │   │   └── me/route.ts          # Get current user
│   │   ├── orders/
│   │   │   ├── route.ts             # Create & list orders
│   │   │   └── [id]/route.ts        # Get & update order
│   │   └── products/
│   │       ├── route.ts             # CRUD with auth
│   │       └── [id]/route.ts        # Protected mutations
│   ├── cart/page.tsx                # Shopping cart page
│   ├── orders/page.tsx              # Order history page
│   ├── login/page.tsx               # Login page
│   ├── register/page.tsx            # Registration page
│   └── products/                    # Product pages
├── components/
│   ├── NavBar.tsx                   # Auth-aware navigation
│   ├── ProductCard.tsx              # Product card with cart
│   └── MobileBottomNav.tsx          # Mobile navigation
├── contexts/
│   ├── AuthContext.tsx              # Authentication state
│   └── CartContext.tsx              # Shopping cart state
└── lib/
    ├── auth.ts                      # Auth utilities (JWT, bcrypt)
    └── prisma.ts                    # Prisma client

prisma/
└── schema.prisma                    # Database schema with User, Order models
```

## 🗄️ Database Schema

### Models

#### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   (hashed with bcrypt)
  role      String   @default("user")
  orders    Order[]
}
```

#### Order
```prisma
model Order {
  id          Int         @id @default(autoincrement())
  userId      Int
  user        User        @relation(...)
  totalAmount Float
  status      String      @default("pending") // "pending" | "paid"
  orderItems  OrderItem[]
}
```

#### OrderItem
```prisma
model OrderItem {
  id        Int      @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Float    // Price snapshot at order time
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or cloud like Neon)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prn232-ass1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   JWT_SECRET="your-strong-secret-key-change-in-production"
   NODE_ENV="development"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔐 Authentication Flow

### Registration
1. User submits email and password
2. Password is hashed with bcrypt (10 rounds)
3. User record created in database
4. JWT token generated and set as HTTP-only cookie
5. User automatically logged in

### Login
1. User submits credentials
2. Email lookup in database
3. Password verification with bcrypt
4. JWT token generated on success
5. Cookie set with 7-day expiration

### Authorization
- JWT token verified on each protected request
- User info extracted from token payload
- Unauthorized requests return 401 status

## 🛒 Shopping Cart Flow

1. **Add to Cart**: Product added to CartContext, synced to localStorage
2. **View Cart**: Navigate to `/cart` to see all items
3. **Update Quantity**: Use +/- buttons or remove items
4. **Checkout**: Click "Place Order" (requires authentication)
5. **Order Created**: Cart items converted to Order with OrderItems
6. **Payment Simulation**: Order status automatically set to "paid"
7. **Cart Cleared**: Success! Redirect to order history

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products (public)
- `POST /api/products` - Create product (requires auth)
- `GET /api/products/[id]` - Get product (public)
- `PUT /api/products/[id]` - Update product (requires auth)
- `DELETE /api/products/[id]` - Delete product (requires auth)

### Orders
- `GET /api/orders` - List user's orders (requires auth)
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders/[id]` - Get order details (requires auth)
- `PATCH /api/orders/[id]` - Update order status (requires auth)

## 🎨 Key Features Implemented

### User Experience
✅ Seamless authentication with persistent sessions  
✅ Real-time cart updates with visual feedback  
✅ Responsive design for all screen sizes  
✅ Clear visual indicators for auth state  
✅ Toast notifications for user actions  

### Security
✅ Passwords hashed with bcrypt  
✅ JWT tokens with secure HTTP-only cookies  
✅ Protected API routes with middleware  
✅ Input validation with Zod schemas  
✅ SQL injection prevention with Prisma ORM  

### Performance
✅ Client-side state management for cart  
✅ LocalStorage for cart persistence  
✅ Optimistic UI updates  
✅ Efficient database queries with Prisma  
✅ Minimal API calls with smart caching  

## 🧪 Testing the Application

### Registration & Login
1. Go to `/register` and create an account
2. Login at `/login` with your credentials
3. Check that NavBar shows your email and "Logout" button

### Shopping Cart
1. Browse products at `/products`
2. Click "Add to Cart" on any product
3. See cart badge update in navigation
4. Go to `/cart` to view items
5. Update quantities and remove items

### Order Placement
1. With items in cart, click "Place Order"
2. Order is created and payment simulated
3. Redirected to `/orders` to see order history
4. View order details with all items

### Authorization
1. Logout and try to access `/orders` → Redirected to login
2. Try to create/edit/delete products → 401 Unauthorized
3. Can still view products without authentication

## 🚀 Deployment

### Environment Variables for Production
```env
DATABASE_URL="your-production-db-url"
JWT_SECRET="strong-random-secret-key"
NODE_ENV="production"
```

### Build & Deploy
```bash
npm run build
npm start
```

## 📚 Technologies Used

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (compatible with Neon, Supabase, etc.)
- **Authentication**: JWT (jose), bcryptjs
- **Validation**: Zod
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom gradients

## 🎯 Assignment 2 Requirements Checklist

✅ **Database Schema Update**
- User model with email, password, role
- Order model with userId, totalAmount, status
- OrderItem model with relations

✅ **Authentication**
- Registration & Login with JWT
- Session management with cookies
- Authorization middleware

✅ **Authorization**
- Unauthenticated: GET only
- Authenticated: Full CRUD access

✅ **Cart & Order Logic**
- CartContext for state management
- Add, update, remove cart items
- Place order API endpoint

✅ **UI/UX Requirements**
- Auth pages (register, login)
- Cart page with checkout
- Order history page
- Auth-aware navigation

✅ **Payment Simulation**
- Order status changes to "paid" after checkout

✅ **Technical Standards**
- Server Actions and API Routes
- Comprehensive error handling
- Responsive design
- No type errors

## 📝 Notes

- Run `npx prisma migrate dev` after any schema changes
- JWT_SECRET should be changed in production
- Cart data is stored in browser localStorage
- Orders are immutable once created (prices snapshot)

## 🤝 Contributing

This is an educational project for Assignment 2. Feel free to extend it with additional features!

## 📄 License

MIT
