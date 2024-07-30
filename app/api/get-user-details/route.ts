import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = await axios.get(
    "https://proxy.scrapeops.io/v1/?api_key=9dd9ae0a-4f81-4c24-bc0e-8e82748aa12b&keep_headers=true&url=https://webapi.depop.com/api/v1/auth/identify/",
    {
      headers: {
        Authorization: `Bearer ${body.token}`,
        Referer: "https://www.depop.com/",
      },
    }
  );
  return NextResponse.json(result.data, { status: 200 });
};
