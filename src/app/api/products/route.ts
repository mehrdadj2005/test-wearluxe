// // src/app/api/products/route.ts
// import { promises as fs } from "fs";
// import { useSearchParams } from "next/navigation";
// import { NextResponse } from "next/server";
// import path from "path";

// export async function GET() {
//   const searchParams = useSearchParams();

//   if (searchParams.include(categoryId)) {
//   } else {
//   }

//   try {
//     const filePath = path.join(process.cwd(), "src", "data", "db.json");
//     const file = await fs.readFile(filePath, "utf-8");
//     const json = JSON.parse(file);

//     return NextResponse.json(json.products);
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

// برای گرفتن categoryId از URL query
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const filePath = path.join(process.cwd(), "src", "data", "db.json");
    const file = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(file);

    let filteredProducts = json.products;

    if (categoryId) {
      filteredProducts = json.products.filter(
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
