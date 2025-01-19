export type UpdateQuantityInventoryItemDto = {
  id : string;
  familyId : string;
  quantity : number;
  currentPrice : string | null;
};
