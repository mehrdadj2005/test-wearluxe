import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId");

    const filePath = path.join(process.cwd(), "data", "db.json");
    const file = await filePath;
    const json = JSON.parse(file);

    let products = json.products;
    if (categoryId) {
      products = products.filter(
        (p: any) => String(p.categoryId) === String(categoryId)
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در خواندن اطلاعات محصولات" },
      { status: 500 }
    );
  }
}
