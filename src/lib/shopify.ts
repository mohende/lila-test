// src/lib/shopify.ts

import { ShopifyOrder } from "@/types/sales";
import { prisma } from "./prisma";
import { SaleStatus } from "@prisma/client";

// Fetch sales data from Shopify API
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

// Save sales data to the database
export const saveSalesData = async (shopifyOrders: ShopifyOrder[]) => {
  const sales = [];
  for (const order of shopifyOrders) {
    const sale = await prisma.sale.upsert({
      where: { shopifyOrderId: order.id.toString() },
      update: {},
      create: {
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
        totalPrice: parseFloat(order.total_price),
      },
    });
    sales.push(sale);
  }

  return sales;
};
