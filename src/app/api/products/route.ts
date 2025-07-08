// // src/app/api/products/route.ts
// import { promises as fs } from "fs";
// import { NextResponse } from "next/server";
// import path from "path";

// // گرفتن categoryId از URL (مثل: /api/products?categoryId=1)
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const categoryId = searchParams.get("categoryId");

//     // مسیر صحیح فایل دیتا
//     const filePath = path.join(process.cwd(), "src", "data", "db.json");
//     const file = await fs.readFile(filePath, "utf-8");
//     const json = JSON.parse(file);

//     let filteredProducts = json.products;

//     if (categoryId) {
//       filteredProducts = filteredProducts.filter(
//         (product: { categoryId: string | number }) =>
//           String(product.categoryId) === categoryId
//       );
//     }

//     return NextResponse.json(filteredProducts);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "خطا در دریافت محصولات" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/products/route.ts
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const sort = searchParams.get("sort");

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    let filteredProducts = json.products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(
        (product: { categoryId: number }) =>
          String(product.categoryId) === categoryId
      );
    }

    if (color) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.colors?.includes(color)
      );
    }

    if (size) {
      filteredProducts = filteredProducts.filter((product: any) =>
        product.sizes?.includes(size)
      );
    }

    if (sort === "price-asc") {
      filteredProducts.sort((a: any, b: any) => a.price - b.price);
    } else if (sort === "price-desc") {
      filteredProducts.sort((a: any, b: any) => b.price - a.price);
    } else if (sort === "newest") {
      filteredProducts.sort((a: any, b: any) => b.id - a.id);
    }

    return NextResponse.json(filteredProducts);
  } catch (err) {
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
