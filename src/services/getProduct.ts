// /**
//  * Fetches product data from the provided URL.
//  *
//  * This function makes an asynchronous HTTP request to retrieve product information.
//  * It includes caching options using the revalidate configuration to optimize repeated requests.
//  * If the fetch operation fails or the product data is not found, the function returns an error message.
//  *
//  * @param url - The URL endpoint from which to fetch the product data.
//  * @returns A Promise resolving to an object containing:
//  *          - data: The product information of type IProduct. In case of an error, this will be an empty object.
//  *          - error: An error message string if an error occurs; otherwise, an empty string.
//  */
// export const getProduct = async <T>(
//   url: string
// ): Promise<{ data: T; error: string }> => {
//   try {
//     // Enable caching with revalidation
//     const res = await fetch(url, { next: { revalidate: 0 } });
//     if (!res.ok)
//       throw new Error("خطا در برقراری ارتباط, لطفا دوباره امتحان کنید.");
//     const data: T = await res.json();
//     if (!data || typeof data !== "object") throw new Error("محصولی یافت نشد.");
//     return { data, error: "" };
//   } catch (error: unknown) {
//     let message = "خطایی رخ داده است";
//     if (error instanceof Error) {
//       message = error.message;
//     }
//     return { data: {} as T, error: message };
//   }
// };

// lib/products.ts
// import { promises as fs } from "fs";
// import path from "path";

// export async function getProducts(categoryId?: string) {
//   const filePath = path.join(process.cwd(), "src", "data", "db.json");
//   const file = await fs.readFile(filePath, "utf-8");
//   const json = JSON.parse(file);

//   let products = json.products;
//   if (categoryId) {
//     products = products.filter(
//       (p: { categoryId: string }) => String(p.categoryId) === String(categoryId)
//     );
//   }

//   return products;
// }

// services/getProduct.ts
import { IProduct } from "@/types/product";
import { promises as fs } from "fs";
import path from "path";

export async function getProducts(categoryId?: string): Promise<IProduct[]> {
  const filePath = path.join(process.cwd(), "src", "data", "db.json");
  const file = await fs.readFile(filePath, "utf-8");
  const json = JSON.parse(file);

  let products = json.products as IProduct[];

  if (categoryId) {
    products = products.filter(
      (p) => String(p.categoryId) === String(categoryId)
    );
  }

  return products;
}
