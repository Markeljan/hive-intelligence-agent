import { type NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.hiveintelligence.xyz/v1/search";
const API_KEY = process.env.HIVE_API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Hive API key not configured" },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const prompt = searchParams.get("prompt");
  const includeDataSources = searchParams.get("include_data_sources");
  if (!prompt) {
    return NextResponse.json(
      { error: "Missing 'prompt' in query parameters" },
      { status: 400 }
    );
  }

  const payload = {
    prompt,
    include_data_sources: includeDataSources
      ? Boolean(includeDataSources)
      : undefined,
  };

  const hiveRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await hiveRes.json();
  return NextResponse.json(data, { status: hiveRes.status });
}
