import { HttpStatusCode } from "axios";
import connect from "../../../lib/db";
import { NextResponse } from "next/server";
import { UserModel } from "../../../lib/UserModel";

export async function POST(req) {
  try {
    connect()
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Authentication failed" }, { status: HttpStatusCode.NotFound });
    }
    const data = await UserModel.findOne({ email });
    if (!data) {
      return NextResponse.json({ message: "User does not exists" }, { status: HttpStatusCode.NotFound });
    }
    else if (password !== data.password) {
      return NextResponse.json({ message: "Password is Incorrect" }, { status: HttpStatusCode.NotFound });
    }
    else if (password === data.password) {
      return NextResponse.json({ message: "User Exists", dataResult: data }, { status: HttpStatusCode.Found });
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
