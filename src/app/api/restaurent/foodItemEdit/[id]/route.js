import { FoodItemModel } from "../../../../lib/FoodItemModel";
import connect from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    connect();
    const id = params.id
    let response = await FoodItemModel.findById({ _id: id });
    return NextResponse.json({ foodItemsData: response, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}

export async function PUT(request, { params }) {
  try {
    connect();
    const result = await request.json();
    const item_id = params.id;
    let response = await FoodItemModel.findByIdAndUpdate(item_id, result);
    return NextResponse.json({ result: response, success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}