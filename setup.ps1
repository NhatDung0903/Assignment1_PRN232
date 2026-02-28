# Quick Setup Script for Assignment 2

Write-Host "🚀 Setting up Assignment 2 E-Commerce Project..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client generated" -ForegroundColor Green
Write-Host ""

# Step 3: Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "📝 Please create .env file with:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "DATABASE_URL=postgresql://..." -ForegroundColor Gray
    Write-Host "JWT_SECRET=your-secret-key" -ForegroundColor Gray
    Write-Host "NODE_ENV=development" -ForegroundColor Gray
    Write-Host ""
    Write-Host "See .env.example for reference" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Do you want to continue without .env? (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
}

# Step 4: Run migrations (optional)
Write-Host "🗄️  Database Migration Options:" -ForegroundColor Yellow
Write-Host "1. Fresh database (reset + migrate)" -ForegroundColor White
Write-Host "2. Keep existing data (migrate only)" -ForegroundColor White
Write-Host "3. Skip migration" -ForegroundColor White
Write-Host ""
$choice = Read-Host "Select option (1/2/3)"

switch ($choice) {
    "1" {
        Write-Host "🔄 Resetting database..." -ForegroundColor Yellow
        npx prisma migrate reset --force
        Write-Host "✅ Database reset complete" -ForegroundColor Green
    }
    "2" {
        Write-Host "🔄 Running migrations..." -ForegroundColor Yellow
        npx prisma migrate dev --name add_user_order_models
        Write-Host "✅ Migrations complete" -ForegroundColor Green
    }
    "3" {
        Write-Host "⏭️  Skipping migrations" -ForegroundColor Yellow
    }
    default {
        Write-Host "⚠️  Invalid choice, skipping migrations" -ForegroundColor Yellow
    }
}
Write-Host ""

# Step 5: Build check
Write-Host "🏗️  Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

# Success message
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Open: http://localhost:3000" -ForegroundColor White
Write-Host "3. Register a user at: /register" -ForegroundColor White
Write-Host "4. Test features: cart, orders, auth" -ForegroundColor White
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "- ASSIGNMENT2_README.md - Full documentation" -ForegroundColor White
Write-Host "- MIGRATION_GUIDE.md - Migration instructions" -ForegroundColor White
Write-Host "- ASSIGNMENT2_SUMMARY.md - Features summary" -ForegroundColor White
Write-Host ""
Write-Host "Ready to start? Run: npm run dev" -ForegroundColor Yellow
