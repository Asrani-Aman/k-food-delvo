import { RestaurentModel } from "../../../lib/RestaurentModel";
import connect from "../../../lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  connect();

  let result = await RestaurentModel.find();
  result = result.map((item) => item.city.charAt(0).toUpperCase() + item.city.slice(1));
  result = [...new Set(result.map((item) => item))]
  return NextResponse.json({ success: true, locations: result })
}