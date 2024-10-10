"use client";
import { orderStatusOptions, Sale } from "@/types/sales";
import { useEffect, useState } from "react";

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("any");

  useEffect(() => {
    let data = [];
    const fetchSales = async () => {
      const res = await fetch(`/api/sales?status=${selectedStatus}`);
      data = await res.json();
      setSales(data);
    };

    fetchSales();
  }, [selectedStatus]);

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Sales Data</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 p-2 mb-4"
        >
          {orderStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Number Of Products</th>
            <th className="border border-gray-300 p-2">Total Price</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => (
            <tr key={sale.id} className="text-center">
              <td className="border border-gray-300 p-2">{sale.id}</td>
              <td className="border border-gray-300 p-2">
                {sale.customerName}
              </td>
              <td className="border border-gray-300 p-2">
                {sale.numberOfProducts}
              </td>
              <td className="border border-gray-300 p-2">{sale.totalPrice}</td>
              <td className="border border-gray-300 p-2">
                {new Date(sale.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;
