import Container from "@/components/container";
import { formatPrice } from "@/helper/helper";
import { getProducts } from "@/services/getProduct";
import { ArrowLeft } from "@mui/icons-material";
import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import ProductError from "./error";
import ProductActionGroup from "./ProductActionGroup";
import ProductDetails from "./ProductDetails";

export default async function ProductPage(params: { productSlug: any }) {
  const allProducts = await getProducts();

  const data = allProducts.find(
    (p) => String(p.id) === String(params.productSlug)
  );

  if (!data) return <ProductError error="محصولی یافت نشد" />;

  return (
    <Container>
      <Grid container spacing={3} sx={{ paddingY: { xs: 10, md: 10 } }}>
        {/* نمایش تصویر محصول */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Image
            src={
              Array.isArray(data.images) && data.images[0] ? data.images[0] : ""
            }
            alt={data.name}
            width={500}
            height={500}
            className="w-full"
          />
        </Grid>

        {/* مشخصات محصول */}
        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5">{data.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              {data.discountedPercentage > 0 && (
                <Typography color="primary" variant="h6">
                  {data.discountedPercentage}%
                </Typography>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  sx={{
                    backgroundColor: "var(--color-primary-200)",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    textDecoration: data.discountedPercentage
                      ? "line-through"
                      : "none",
                  }}
                >
                  {formatPrice(data.price)}
                </Typography>
                {data.discountedPercentage > 0 && (
                  <>
                    <ArrowLeft />
                    <Typography
                      sx={{
                        backgroundColor: "var(--color-primary-400)",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {formatPrice(data.discountedPrice)}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            <List sx={{ py: 2 }}>
              <ListItem>
                <Typography variant="body2">سایز:</Typography>
                <Typography sx={{ ml: 1 }}>
                  {typeof data.sizes === "object" && data.sizes
                    ? Object.keys(data.sizes).join(", ")
                    : "-"}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body2">رنگ:</Typography>
                <Typography sx={{ ml: 1 }}>
                  {Array.isArray(data.colors) ? data.colors.join(", ") : "-"}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body2">موجودی:</Typography>
                <Typography sx={{ ml: 1 }}>
                  {data.stock ? "موجود" : "ناموجود"}
                </Typography>
              </ListItem>

              <ListItem sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography variant="body2">توضیحات:</Typography>
                <Typography sx={{ ml: 1 }}>{data.description}</Typography>
              </ListItem>
            </List>
          </Box>

          <Divider />

          <ProductActionGroup product={data} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ProductDetails product={data} />
        </Grid>
      </Grid>
    </Container>
  );
}
