import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

type Product = {
  id: string;
  name: string;
  // سایر ویژگی‌های محصول که نیاز داری
};

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    const product = json.products.find((item: Product) => item.id === id);

    if (!product) {
      return NextResponse.json(
        { error: "محصول مورد نظر پیدا نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "خطا در دریافت محصول." },
      { status: 500 }
    );
  }
}
