import { FoodItemModel } from "../../../lib/FoodItemModel";
import { RestaurentModel } from "../../../lib/RestaurentModel";
import connect from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    connect();
    const id = params.id;
    const allItems = await FoodItemModel.find({ restoId: id });
    const details = await RestaurentModel.findById({ _id: id }).select("-password");
    return NextResponse.json({ success: true, allItems, details })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

