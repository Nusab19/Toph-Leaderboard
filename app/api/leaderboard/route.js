export const runtime = "edge";

import { NextResponse } from "next/server";

import makeRequest from "@helpers/makeRequest";

export async function GET() {
  const response = await makeRequest("Data/leaderboard.json");
  if (response.ok) {
    return new NextResponse(response.content, {
      status: 200,
    });
  } else {
    return new NextResponse(response, {
      status: 500,
    });
  }
}
