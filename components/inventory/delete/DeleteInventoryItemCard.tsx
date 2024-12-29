'use client'

import React from 'react';
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InventoryItem {
  id: string;
  name: string;
}

interface DeleteInventoryItemCardProps {
  item: InventoryItem;
  onDeleteClick: (item: InventoryItem) => void;
}

const DeleteInventoryItemCard: React.FC<DeleteInventoryItemCardProps> = ({ item, onDeleteClick }) => {
  return (
    <Card className="flex justify-center px-4 py-2 items-center shadow-md bg-white">
      <div className="text-lg flex-[4] p-0 md:text-xl font-semibold">{item.name}</div>
      <div className="flex-[2] flex gap-2 justify-end">
        <Button onClick={() => onDeleteClick(item)} className="flex items-center gap-1">
          <Trash className="w-4 h-4" />
          <span className="hidden md:inline">Delete</span>
        </Button>
      </div>
    </Card>
  );
};

export default DeleteInventoryItemCard;
