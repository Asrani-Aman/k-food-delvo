import { RestaurentModel } from "../../lib/RestaurentModel";
import { NextResponse } from "next/server";
import connect from "../../lib/db";

export async function GET(req) {
  try {

    const queryParams = req.nextUrl.searchParams;

    let filter = {}

    if (queryParams.get('location')) {
      filter = { city: { $regex: new RegExp(queryParams.get('location'), 'i') } };
    }

    else if (queryParams.get('restaurent')) {
      filter.push({ restaurantName: { $regex: new RegExp(queryParams.get('restaurent'), 'i') } });
    }


    connect();

    const result = await RestaurentModel.find(filter);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message, success: false });
  }
}
