import { NextResponse } from "next/server";
import makeRequest from "@/helpers/makeRequest";


export const revalidate = 60;


export async function POST(req) {
  const { userName } = await req.json();
  if (!userName)
    return new NextResponse("No username provided", { status: 400 });

  const response = await makeRequest("Data/users/all.json");
  if (response.ok) {
    const data = JSON.parse(response.content);
    const fastest = data["fastest"][userName] || [];
    const lightest = data["lightest"][userName] || [];
    const shortest = data["shortest"][userName] || [];
    const resp = {
      ok: true,
      content: [fastest, lightest, shortest],
    };
    return new NextResponse(JSON.stringify(resp), {
      status: 200,
    });
  } else {
    return new NextResponse(response, {
      status: 500,
    });
  }
}
