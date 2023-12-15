-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'SUCCESS', 'CANCELED');

-- CreateTable
CREATE TABLE "Product" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "quantity" INTEGER NOT NULL,
    "remainQuantity" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "introduction" VARCHAR NOT NULL,
    "highlights" VARCHAR[],
    "descriptions" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" VARCHAR(30) NOT NULL,
    "shippingAddressId" VARCHAR(30) NOT NULL,
    "billingAddressId" VARCHAR(30) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'CREATED',
    "assessmentId" TEXT NOT NULL,
    "fingerprintId" TEXT NOT NULL,
    "subFingerprintId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" VARCHAR(30) NOT NULL,
    "orderId" VARCHAR(30) NOT NULL,
    "productId" VARCHAR(30) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" VARCHAR(30) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "stressAddress" TEXT NOT NULL,
    "addressLevel4" TEXT NOT NULL,
    "addressLevel2" TEXT NOT NULL,
    "addressLevel3" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_assessmentId_key" ON "Order"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_productId_key" ON "OrderItem"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddCheck
ALTER TABLE "Product" ADD CONSTRAINT "Product_quantity_check" CHECK ("quantity" >= 0);

-- AddCheck
ALTER TABLE "Product" ADD CONSTRAINT "Product_remainQuantity_check" CHECK ("remainQuantity" >= 0);

-- AddCheck
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_quantity_check" CHECK ("quantity" > 0);
