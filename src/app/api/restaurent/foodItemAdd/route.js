import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { FoodItemModel } from "../../../lib/FoodItemModel";

export async function POST(req) {
  try {
    connect();
    const { name, price, description, imageUrl, restoId } = await req.json();

    if (!name || !imageUrl || !price || !description) {
      return NextResponse.json({ message: "missingFields" }, { status: HttpStatusCode.BadRequest });
    }

    const newFoodItem = new FoodItemModel({ name, price, description, imageUrl, restoId });
    const result = await newFoodItem.save();
    return NextResponse.json({ message: "success", status: HttpStatusCode.Created, result })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: HttpStatusCode.InternalServerError });
  }
}
