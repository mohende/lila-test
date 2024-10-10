// src/lib/shopify.ts

import { Sale, ShopifyOrder } from "@/types/sales";
import { prisma } from "./prisma";
import { SaleStatus } from "@prisma/client";

/**
 * Fetch sales data from Shopify API
 * using Data.now to avoid cached data
 */
export const fetchSalesData = async (
  status: SaleStatus
): Promise<ShopifyOrder[]> => {
  const response = await fetch(
    `https://${
      process.env.SHOPIFY_STORE_URL
    }/admin/api/2023-07/orders.json?status=${status}&timestamp=${Date.now()}"`,
    {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sales data from Shopify");
  }

  const data = await response.json();
  return data.orders as ShopifyOrder[];
};

/**
 * prepare each sale from shopify orders
 * update it if it doesn't exist in our databse otherwise create it
 */
export const saveSalesData = async (shopifyOrders: ShopifyOrder[]) => {
  const sales = [];

  for (const order of shopifyOrders) {
    const saleToSave: Sale = {
      shopifyOrderId: order.id.toString(),
      status: order.cancelled_at
        ? SaleStatus.cancelled
        : order.closed_at
        ? SaleStatus.closed
        : SaleStatus.open,
      customerName: order.customer
        ? `${order.customer?.first_name} ${order.customer?.last_name}`
        : "",
      numberOfProducts: order.line_items?.length,
      productsName: order.line_items.map((item) => item.name),
      totalPrice: parseFloat(order.total_price),
    };

    const sale = await prisma.sale.upsert({
      where: { shopifyOrderId: order.id.toString() },
      update: saleToSave,
      create: {
        ...saleToSave,
      },
    });
    sales.push(sale);
  }

  return sales;
};
