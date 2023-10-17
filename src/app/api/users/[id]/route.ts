import { NextRequest, NextResponse } from "next/server";
import users from "../../../../../data/users";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id);
  console.log({ userId });
  const user = users.find((user_) => user_.id === userId);
  if (!user) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(user);
}
