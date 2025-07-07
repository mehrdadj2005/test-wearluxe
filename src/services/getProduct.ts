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

// -----------------------------------------------------

// export const getProduct = async <T>(
//   url: string
// ): Promise<{ data: T; error: string }> => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}${url}`, {
//       next: { revalidate: 0 }, // اگر ISR نمی‌خوای، این بمونه
//     });

//     if (!res.ok) throw new Error("خطا در ارتباط با سرور");

//     const data: T = await res.json();
//     return { data, error: "" };
//   } catch (error) {
//     return {
//       data: {} as T,
//       error: error instanceof Error ? error.message : "خطایی رخ داده",
//     };
//   }
// };

// -----------------------------------------------------

/**
 * Fetches data from the given API endpoint.
 *
 * Automatically selects base URL from environment variables based on the environment.
 * Gracefully handles errors and invalid responses.
 *
 * @template T - Expected shape of the API response
 * @param endpoint - Relative API endpoint (e.g. `/products?id=1`)
 * @returns A Promise resolving to an object:
 *          - data: Parsed API response of type T
 *          - error: String describing error (empty if success)
 */
export const getProduct = async <T>(
  endpoint: string
): Promise<{ data: T; error: string }> => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 0 }, // disable ISR (optional)
    });

    if (!response.ok) {
      throw new Error("ارتباط با سرور با خطا مواجه شد.");
    }

    const jsonData: unknown = await response.json();

    if (
      !jsonData ||
      (typeof jsonData !== "object" && !Array.isArray(jsonData))
    ) {
      throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
    }

    return { data: jsonData as T, error: "" };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "خطایی ناشناخته رخ داده است.";

    // fallback: return empty array or object depending on generic T
    const fallback: T = Array.isArray([] as T) ? ([] as T) : ({} as T);

    return {
      data: fallback,
      error: errorMessage,
    };
  }
};
