import { type NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.hiveintelligence.xyz/v1/search";
const API_KEY = process.env.HIVE_API_KEY;

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Hive API key not configured" },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.prompt) {
    return NextResponse.json(
      { error: "Missing 'prompt' in request body" },
      { status: 400 }
    );
  }

  const hiveRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await hiveRes.json();
  return NextResponse.json(data, { status: hiveRes.status });
}
