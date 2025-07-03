import ProductDetailsFilter from "@/app/(shop)/products/category/[categorySlug]/productDetailsFilter";
import ProductDetailsSort from "@/app/(shop)/products/category/[categorySlug]/productDetailsSort";
import Container from "@/components/container";
import PaginationWithLinks from "@/components/pagination";
import ProductCard from "@/components/products/productCard";
import { getProducts } from "@/services/getProduct";
import { Box } from "@mui/material";
import Link from "next/link";

interface ICategoryPageProps {
  searchParams: { [key: string]: string };
  params: { categorySlug: string };
}

export default async function CategoryPage({
  searchParams,
  params,
}: ICategoryPageProps) {
  const categoryId = params.categorySlug;
  const page = Number(searchParams.page || 1);
  const limit = 12;

  // دریافت محصولات دسته‌بندی‌شده
  const allProducts = await getProducts(categoryId);

  // تعداد کل صفحات
  const totalPages = Math.ceil(allProducts.length / limit);

  // صفحه‌بندی دستی
  const paginatedProducts = allProducts.slice((page - 1) * limit, page * limit);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", xl: "row" },
        pt: 2,
      }}
    >
      <Box sx={{ display: { xs: "none", xl: "flex" } }}>
        <ProductDetailsFilter showDrawerFilter={false} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: { xs: "flex", xl: "none" } }}>
            <ProductDetailsFilter showDrawerFilter={false} />
          </Box>
          <ProductDetailsSort showDrawerSort={false} />
        </Box>
        <Box
          sx={{
            width: "100%",
            px: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {paginatedProducts.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                width: { xs: "50%", sm: "33.3333%", lg: "25%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href={`/products/${item.id}`}>
                <ProductCard item={item} />
              </Link>
            </Box>
          ))}
        </Box>

        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              py: "12px",
            }}
          >
            <PaginationWithLinks
              count={totalPages}
              categorySlug={categoryId}
              filters=""
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
