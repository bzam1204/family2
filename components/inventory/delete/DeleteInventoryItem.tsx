'use client'

import React, { useState, useEffect } from 'react';
import axiosInstance from "@/lib/axiosInstance";
import LoadingSpinner from '@/components/common/LoadingSpinner';
import DeleteInventoryItemCard from './DeleteInventoryItemCard';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';


interface InventoryItem {
  id: string;
  name: string;
}

const DeleteInventoryItem: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/inventory-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        await axiosInstance.delete(`/inventory-items?id=${selectedItem.id}`);
        setItems(prevItems => prevItems.filter(item => item.id !== selectedItem.id));
      } catch (error) {
        console.error('Failed to delete item:', error);
      } finally {
        setIsDialogOpen(false);
        setSelectedItem(null);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delete Inventory Items</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Nenhum item disponível no momento.</p>
      ) : (
        <ul className="flex flex-col gap-2 justify-center w-full p-4">
          {items.map(item => (
            <DeleteInventoryItemCard key={item.id} item={item} onDeleteClick={handleDeleteClick} />
          ))}
        </ul>
      )}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedItem?.name ?? ''}
      />
    </div>
  );
};

export default DeleteInventoryItem;
