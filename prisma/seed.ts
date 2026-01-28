import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: "Classic White T-Shirt",
        description: "Soft cotton tee, easy to match with any outfit.",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      },
      {
        name: "Denim Jacket",
        description: "Blue denim jacket with a modern fit.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      },
      {
        name: "Black Hoodie",
        description: "Warm hoodie suitable for daily wear.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      },
      {
        name: "Slim Fit Jeans",
        description: "Stretch material, comfortable for daily use.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      },
      {
        name: "Summer Dress",
        description: "Lightweight dress for summer days.",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      },
      {
        name: "Leather Boots",
        description: "Durable leather boots for all seasons.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      },
      {
        name: "Casual Sneakers",
        description: "Comfortable sneakers for everyday wear.",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      },
      {
        name: "Wool Sweater",
        description: "Cozy wool sweater for cold weather.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      },
      {
        name: "Cotton Shorts",
        description: "Breathable cotton shorts for summer.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      },
      {
        name: "Silk Scarf",
        description: "Elegant silk scarf to accessorize.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=400",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed done");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
