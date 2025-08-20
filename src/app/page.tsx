import { getProduct } from "@/services/getProduct";
import { IBanner } from "@/types/banners";
import { IOption } from "@/types/options";
import { IProduct } from "@/types/product";

// import LandingPage from "./landingPage";

import HeroSection from "@/components/layout/hero";
import ProductSlider from "@/components/products/productSlider";
import { Box, CardMedia, Container, Typography } from "@mui/material";

export default async function HomePage() {
  // return (
  //   <>
  //     <LandingPage />
  //   </>
  // );

  let shirts = [];
  let pants = [];
  let caps = [];
  let sets = [];
  let options = [];
  let landingBaner = [];

  const { data: dataShirts = [] } = await getProduct<IProduct[]>(
    "/products?categoryId=1"
  );
  shirts = dataShirts;

  const { data: dataPants = [] } = await getProduct<IProduct[]>(
    "/products?categoryId=2"
  );
  pants = dataPants;

  const { data: dataCaps = [] } = await getProduct<IProduct[]>(
    "/products?categoryId=3"
  );
  caps = dataCaps;

  const { data: dataSets = [] } = await getProduct<IProduct[]>(
    "/products?categoryId=4"
  );
  sets = dataSets;

  const { data: dataOptions = [] } = await getProduct<IOption[]>("/options");
  options = dataOptions;

  const { data: dataLandingBaner = [] } = await getProduct<IBanner[]>(
    "/banners"
  );
  landingBaner = dataLandingBaner;

  return (
    <>
      <HeroSection />

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
          {options.map((option) => (
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
      {shirts.length > 0 && (
        <ProductSlider sx={{ pt: "20px" }} data={dataShirts} />
      )}
      {caps.length > 0 && <ProductSlider sx={{ pt: "20px" }} data={dataCaps} />}
      {pants.length > 0 && (
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

      {sets.length > 0 && <ProductSlider sx={{ pt: "20px" }} data={dataSets} />}
    </>
  );
}
