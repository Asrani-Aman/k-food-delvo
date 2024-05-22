import { FoodItemModel } from "../../../../lib/FoodItemModel";
import connect from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    connect()
    const id = params.id
    let response = await FoodItemModel.find({ restoId: id });
    return NextResponse.json({ foodItemsData: response, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}


export async function DELETE(request, { params }) {
  try {
    connect();
    const { item_id } = await request.json();
    const id = params.id;
    let response = await FoodItemModel.deleteOne({ restoId: id, _id: item_id });
    let data = await FoodItemModel.find({ restoId: id });
    return NextResponse.json({ result: response, success: true, data })
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}