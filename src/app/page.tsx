import HeroSection from "@/components/layout/hero";
import ProductSlider from "@/components/products/productSlider";
import { getProduct } from "@/services/getProduct";
import { IBanner } from "@/types/banners";
import { IOption } from "@/types/options";
import { IProduct } from "@/types/product";
import { Box, CardMedia, Container, Typography } from "@mui/material";

export default async function HomePage() {
  const { data: dataShirts = [] } = await getProduct<IProduct[]>(
    "http://localhost:4000/products"
  );
  const { data: dataPants = [] } = await getProduct<IProduct[]>(
    "http://localhost:4000/products"
  );
  const { data: dataCaps = [] } = await getProduct<IProduct[]>(
    "http://localhost:4000/products"
  );
  const { data: dataSets = [] } = await getProduct<IProduct[]>(
    "http://localhost:4000/products"
  );
  const { data: dataOptions = [] } = await getProduct<IOption[]>(
    "http://localhost:4000//options"
  );
  const { data: landingBaner = [] } = await getProduct<IBanner[]>(
    "http://localhost:4000/banners"
  );

  console.log("Shirts Data:", dataShirts);
  console.log("Pants Data:", dataPants);

  return (
    <>
      <HeroSection />

      {/* آپشن‌ها */}
      {dataOptions.length > 0 && (
        <Container
          className="!px:w-full !px-3/4"
          sx={{
            backgroundColor: "var(--color-neutral-200)",
            borderRadius: "18px",
            display: "flex",
            padding: "30px 0",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {dataOptions.map((option) => (
            <Box
              key={option.id}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <CardMedia
                component="img"
                image={option.src}
                alt={option.name}
                sx={{
                  width: "40px",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "var(--color-neutral-600)" }}
              >
                {option.name}
              </Typography>
            </Box>
          ))}
        </Container>
      )}

      {/* لیست محصولات */}
      {dataShirts.length > 0 && (
        <ProductSlider sx={{ pt: "20px" }} data={dataShirts} />
      )}
      {dataCaps.length > 0 && (
        <ProductSlider sx={{ pt: "20px" }} data={dataCaps} />
      )}
      {dataPants.length > 0 && (
        <ProductSlider sx={{ pt: "20px" }} data={dataPants} />
      )}

      {/* بنر وسطی */}
      {landingBaner?.[0] && (
        <Container sx={{ width: "100%", height: "200px", pt: "20px" }}>
          <CardMedia
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            component="img"
            image={landingBaner[0].src}
            alt={landingBaner[0].alt}
          />
        </Container>
      )}

      {dataSets.length > 0 && (
        <ProductSlider sx={{ pt: "20px" }} data={dataSets} />
      )}
    </>
  );
}
