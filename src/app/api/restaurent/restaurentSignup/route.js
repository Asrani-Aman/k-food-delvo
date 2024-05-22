import { HttpStatusCode } from "axios";
import { RestaurentModel } from "../../../lib/RestaurentModel";
import connect from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const { email, password, city, phoneNumber, address, restaurantName } = await req.json();

    if (!email || !password || !city || !phoneNumber || !address || !restaurantName) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }

    const checkUser = await RestaurentModel.findOne({ email });
    if (!checkUser) {
      const newUser = new RestaurentModel({
        email, password, city, phoneNumber, address, restaurantName
      });

      await newUser.save();

      return NextResponse.json(
        {
          newUser,
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
