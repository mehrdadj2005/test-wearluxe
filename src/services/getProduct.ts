// /**
//  * Fetches product data from the provided URL (relative path).
//  *
//  * Uses base API URL from environment variables and handles errors gracefully.
//  * Compatible with both local and deployed (Vercel) environments.
//  *
//  * @param endpoint - API endpoint path like `/products?categoryId=1`
//  * @returns A Promise resolving to an object containing:
//  *          - data: The product data of generic type T
//  *          - error: Error message string if any error occurs
//  */
// export const getProduct = async <T>(
//   endpoint: string
// ): Promise<{ data: T; error: string }> => {
//   try {
//     const BASE_URL = process.env.API_URL || "http://localhost:4000";
//     const res = await fetch(`${BASE_URL}${endpoint}`, {
//       next: { revalidate: 0 },
//     });

//     if (!res.ok) {
//       throw new Error("خطا در برقراری ارتباط، لطفاً دوباره تلاش کنید.");
//     }

//     const data: T = await res.json();

//     if (!data || typeof data !== "object") {
//       throw new Error("داده‌ای یافت نشد.");
//     }

//     return { data, error: "" };
//   } catch (error: unknown) {
//     let message = "خطایی رخ داده است";
//     if (error instanceof Error) {
//       message = error.message;
//     }

//     // Return an empty array or object depending on T
//     const fallbackData = Array.isArray([] as T) ? ([] as T) : ({} as T);
//     return { data: fallbackData, error: message };
//   }
// };

export const getProduct = async <T>(
  url: string
): Promise<{ data: T; error: string }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`, {
      next: { revalidate: 0 }, // اگر ISR نمی‌خوای، این بمونه
    });

    if (!res.ok) throw new Error("خطا در ارتباط با سرور");

    const data: T = await res.json();
    return { data, error: "" };
  } catch (error) {
    return {
      data: {} as T,
      error: error instanceof Error ? error.message : "خطایی رخ داده",
    };
  }
};
