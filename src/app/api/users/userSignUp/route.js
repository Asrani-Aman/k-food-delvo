import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { UserModel } from "../../../lib/UserModel";


export async function POST(req) {
  try {
    connect();
    const { email, password, city, phoneNumber, address, username } = await req.json();

    if (!email || !password || !city || !phoneNumber || !address || !username) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }

    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      const newUser = new UserModel({
        email, password, city, phoneNumber, address, username
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
