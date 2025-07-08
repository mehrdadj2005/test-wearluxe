// /**
//  * Fetches data from the given API endpoint.
//  *
//  * Automatically selects base URL from environment variables based on the environment.
//  * Gracefully handles errors and invalid responses.
//  *
//  * @template T - Expected shape of the API response
//  * @param endpoint - Relative API endpoint (e.g. `/products?id=1`)
//  * @returns A Promise resolving to an object:
//  *          - data: Parsed API response of type T
//  *          - error: String describing error (empty if success)
//  */
// export const getProduct = async <T>(
//   endpoint: string
// ): Promise<{ data: T; error: string }> => {
//   try {
//     const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       next: { revalidate: 0 }, // disable ISR (optional)
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("ارتباط با سرور با خطا مواجه شد.");
//     }

//     const jsonData: unknown = await response.json();

//     if (
//       !jsonData ||
//       (typeof jsonData !== "object" && !Array.isArray(jsonData))
//     ) {
//       throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
//     }

//     return { data: jsonData as T, error: "" };
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "خطایی ناشناخته رخ داده است.";

//     // fallback: return empty array or object depending on generic T
//     const fallback: T = Array.isArray([] as T) ? ([] as T) : ({} as T);

//     return {
//       data: fallback,
//       error: errorMessage,
//     };
//   }
// };

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
