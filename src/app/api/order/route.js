import { OrderModel } from "../../lib/OrderModel";
import { RestaurentModel } from "../../lib/RestaurentModel";
import connect from "../../lib/db";
import { NextResponse } from "next/server";


export async function GET(request) {
  const userId = request.nextUrl.searchParams.get('id');
  let success = false
  connect();
  let result = await OrderModel.find({ userId: userId });
  console.log(result);
  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await RestaurentModel.findOne({ _id: item.restoId })
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    )
    result = restoData;
    success = true
  }
  return NextResponse.json({ result, success })
}


export async function POST(request) {
  try {
    const payload = await request.json()
    console.log(payload);
    connect()
    const newObject = new OrderModel(payload);
    await newObject.save();
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error })
  }
}

