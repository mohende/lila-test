import { SaleStatus } from "@prisma/client";

export type Sale = {
  id: number;
  shopifyOrderId: string;
  customerName: string;
  numberOfProducts: number;
  totalPrice: number;
  createdAt: string;
};

export type ShopifyOrder = {
  id: string;
  customer: {
    first_name: string;
    last_name: string;
  };
  cancelled_at: Date;
  closed_at: Date;
  line_items: { name: string }[];
  total_price: string;
};

export const orderStatusOptions: {
  value: SaleStatus | "Any";
  label: string;
}[] = [
  { value: "Any", label: "Any" },
  { value: SaleStatus.open, label: "Open" },
  { value: SaleStatus.closed, label: "Archived" },
  { value: SaleStatus.cancelled, label: "Canceled" },
];
