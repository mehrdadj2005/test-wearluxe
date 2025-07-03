// app/api/products/route.ts

import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "db.json");
    const file = await filePath;
    const json = JSON.parse(file);

    return NextResponse.json(json.products);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در خواندن اطلاعات محصولات" },
      { status: 500 }
    );
  }
}
