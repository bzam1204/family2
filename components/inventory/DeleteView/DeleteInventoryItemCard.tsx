import { Card } from "@/components/ui/card";
import { DeleteButton } from './DeleteButton';
import { InventoryItem } from '@prisma/client';

interface DeleteInventoryItemCardProps {
  item: InventoryItem;
}

export const DeleteInventoryItemCard: React.FC<DeleteInventoryItemCardProps> = ({ item }) => {

  return (
    <Card className="flex justify-center px-4 py-2 items-center shadow-md bg-white">
      <div className="text-lg flex-[4] p-0 md:text-xl font-semibold">{item.name}</div>
      <div className="flex-[2] flex gap-2 justify-end">
        <DeleteButton item={item} />
      </div>
    </Card>
  );
};
