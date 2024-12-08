import {InventoryItemService} from "@/services/inventory/inventoryService";

import {InventoryItem} from "@prisma/client";

export async function GET() {

  return Response.json(await InventoryItemService.getAll());
}

export async function POST(request: Request) {
  const {name, quantity} = await request.json();

  try {

    return Response.json(await InventoryItemService.create({name, quantity} as InventoryItem));
  } catch (error) {
    console.error(error);

    return Response.json("Ocorreu um erro no servidor: " + error);
  }
}

export async function PUT(request: Request) {
  const query = await request.json();

  console.log('query', query);

  try {

    return Response.json(await InventoryItemService.update(query));
  } catch (error) {
    console.error(error);

    return Response.json("Ocorreu um erro no servidor: " + error);
  }
}

export async function DELETE(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return Response.json("Item não encontrado.");
  }

  try {
    const item = await InventoryItemService.get(id)
    if (!item) {
      return Response.json("Item não encontrado.");
    }

    return Response.json(await InventoryItemService.remove(id));
  } catch (error) {
    console.error(error);

    return Response.json("Ocorreu um erro no servidor: " + error);
  }
}
