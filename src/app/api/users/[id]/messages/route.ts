import { NextRequest, NextResponse } from "next/server";
import messages from "../../../../../../data/messages";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;
  const userMessages = messages.find((msg) => msg.userId === parseInt(userId));
  if (!userMessages) {
    return NextResponse.json({}, { status: 200 });
  }

  return NextResponse.json(userMessages, { status: 200 });
}
