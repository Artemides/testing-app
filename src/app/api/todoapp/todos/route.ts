import { NextResponse } from "next/server";
import { todos } from "../../../../../data/todos";

export async function GET() {
  return NextResponse.json(todos, { status: 200 });
}
