import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { DeliveryBoy } from "../../../lib/DeliveryBoyModel";
import connect from "../../../lib/db";



export async function POST(req) {
  try {
    connect();
    const { email, password, phoneNumber, address, name } = await req.json();

    if (!email || !password || !phoneNumber || !address || !name) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }

    const checkUser = await DeliveryBoy.findOne({ email });
    if (!checkUser) {
      const newUser = new DeliveryBoy({
        email, password, phoneNumber, address, name
      });

      await newUser.save();

      return NextResponse.json(
        {
          message: "Successfully Created User",
        },
        {
          status: HttpStatusCode.Created,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "User Already Exists",
        },
        {
          status: HttpStatusCode.Conflict,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: HttpStatusCode.InternalServerError,
      }
    );
  }
}
