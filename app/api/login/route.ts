import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = await axios.post(
    "https://proxy.scrapeops.io/v1/?api_key=9dd9ae0a-4f81-4c24-bc0e-8e82748aa12b&url=https://webapi.depop.com/api/v1/auth/login/",
    body,
    {
      headers: { Accept: "application/json" },
    }
  );
  return NextResponse.json(result.data, { status: 200 });
};
