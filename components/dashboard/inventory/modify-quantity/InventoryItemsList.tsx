'use client'

import React, { useEffect, useState } from 'react';
import ModifyQuantityCard from "@/components/dashboard/inventory/modify-quantity/ModifyQuantityCard";
import axiosInstance from "@/lib/axiosInstance";
import { InventoryItem } from "@prisma/client";
import LoadingSpinner from "@/components/LoadingSpinner";

const InventoryItemsList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get<InventoryItem[]>("/inventory-items");
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-1 justify-center w-full p-4">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No inventory items available to modify.</p>
      ) : (
        items.map((item) => (
          <ModifyQuantityCard key={item.id} inventoryItem={item} />
        ))
      )}
    </div>
  );
};

export default InventoryItemsList;
