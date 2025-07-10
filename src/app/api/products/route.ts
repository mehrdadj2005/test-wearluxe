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

import { IProduct } from "@/types/product";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const sortParam = searchParams.get("sort");

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    let filtered = json.products;

    // فیلتر دسته‌بندی
    if (categoryId) {
      filtered = filtered.filter(
        (item: IProduct) => item.categoryId === categoryId
      );
    }

    // فیلتر رنگ انگلیسی
    if (color) {
      filtered = filtered.filter(
        (item: IProduct) => item.color?.toLowerCase() === color.toLowerCase()
      );
    }

    // فیلتر سایز فقط اگر اون سایز موجود باشه (stock: true)
    if (size) {
      filtered = filtered.filter((item: IProduct) => {
        const sizes = item.sizes || {};
        const targetSize = sizes[size];
        return targetSize?.stock === true;
      });
    }

    // مرتب‌سازی
    if (sortParam) {
      switch (sortParam) {
        case "sales-desc":
          filtered.sort((a: IProduct, b: IProduct) => b.sales - a.sales);
          break;
        case "rating-desc":
          filtered.sort((a: IProduct, b: IProduct) => b.rating - a.rating);
          break;
        case "publishTimeSort-desc":
          filtered.sort(
            (a: IProduct, b: IProduct) =>
              new Date(b.publishTimeSort).getTime() -
              new Date(a.publishTimeSort).getTime()
          );
          break;
        case "price-asc":
          filtered.sort((a: IProduct, b: IProduct) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a: IProduct, b: IProduct) => b.price - a.price);
          break;
      }
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("خطا:", error);
    return NextResponse.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
