-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "paymentMethod" TEXT DEFAULT 'cod',
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postalCode" TEXT;
