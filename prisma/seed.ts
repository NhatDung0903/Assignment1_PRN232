import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Classic White T-Shirt',
        description: 'Soft cotton tee, easy to match with any outfit.',
        price: 9.99,
        image: 'https://via.placeholder.com/300x200?text=White+Tshirt',
      },
      {
        name: 'Black Hoodie',
        description: 'Warm hoodie suitable for daily wear.',
        price: 29.99,
        image: 'https://via.placeholder.com/300x200?text=Black+Hoodie',
      },
      {
        name: 'Slim Fit Jeans',
        description: 'Stretch material, comfortable for daily use.',
        price: 39.0,
        image: 'https://via.placeholder.com/300x200?text=Slim+Jeans',
      },
      {
        name: 'Denim Jacket',
        description: 'Blue denim jacket with a modern fit.',
        price: 49.5,
        image: 'https://via.placeholder.com/300x200?text=Denim+Jacket',
      },
      {
        name: 'Summer Dress',
        description: 'Lightweight dress for summer days.',
        price: 35.75,
        image: 'https://via.placeholder.com/300x200?text=Summer+Dress',
      },
      {
        name: 'Sport Sneakers',
        description: 'Comfortable sneakers for sports and casual wear.',
        price: 59.99,
        image: 'https://via.placeholder.com/300x200?text=Sneakers',
      },
      {
        name: 'Leather Belt',
        description: 'Genuine leather belt, durable and stylish.',
        price: 19.99,
        image: 'https://via.placeholder.com/300x200?text=Leather+Belt',
      },
      {
        name: 'Baseball Cap',
        description: 'Adjustable cap for outdoor activities.',
        price: 14.5,
        image: 'https://via.placeholder.com/300x200?text=Cap',
      },
    ],
    skipDuplicates: true, // tránh seed trùng nếu chạy lại
  });

  console.log('✅ Seed completed with sample products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
