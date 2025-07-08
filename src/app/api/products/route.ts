// src/app/api/products/route.ts
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// گرفتن categoryId از URL (مثل: /api/products?categoryId=1)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    // مسیر صحیح فایل دیتا
    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    let filteredProducts = json.products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product: { categoryId: string | number }) =>
          String(product.categoryId) === categoryId
      );
    }

    return NextResponse.json(filteredProducts);
  } catch (err) {
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
