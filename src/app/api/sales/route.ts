import { fetchSalesData, saveSalesData } from "@/lib/shopify";
import { NextResponse } from "next/server";
import { SaleStatus } from "@prisma/client";

/**
 * route to get sales using the sale status
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as SaleStatus;

    const salesData = await fetchSalesData(status || "Any");
    const savedSales = await saveSalesData(salesData);

    return NextResponse.json(savedSales);
  } catch (error) {
    return NextResponse.json({ error: error! }, { status: 500 });
  }
}
