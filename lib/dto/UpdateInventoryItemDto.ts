export type UpdateInventoryItemDto = {
  id : string;
  name? : string;
  quantity? : number;
  mediaPrice? : string | null;
  description? : string | null;
  idealQuantity? : number | null;
  minQuantity? : number | null;
};
