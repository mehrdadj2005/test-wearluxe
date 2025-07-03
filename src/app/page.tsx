import ProductSlider from "@/components/products/productSlider";

import { getProduct } from "@/services/getProduct";

export default async function HomePage() {
  // const { data: dataShirts } = await getProduct<any[]>(
  //   "http://localhost:4000/products?categoryId=1"
  // );

  const { data: dataShirts } = await getProduct<any[]>(
    "http://localhost:4000/products?categoryId=1"
  );

  console.log(dataShirts);
  // const dataShirts = allProducts.filter((item) => item.categoryId === "1");
  // const { data: dataShirts } = await getProduct<IProduct[]>(
  //   "http://localhost:4000/products?categoryId=1"
  // );

  // const { data: dataPants } = await getProduct<IProduct[]>(
  //   "http://localhost:4000/products?categoryId=2"
  // );
  // const { data: dataCaps } = await getProduct<IProduct[]>(
  //   "http://localhost:4000/products?categoryId=3"
  // );
  // const { data: dataSets } = await getProduct<IProduct[]>(
  //   "http://localhost:4000/products?categoryId=4"
  // );
  // const { data: dataOptions } = await getProduct<IOption[]>(
  //   "http://localhost:4000/options"
  // );
  // const { data: landingBaner } = await getProduct<IBanner[]>(
  //   "http://localhost:4000/banners"
  // );

  return (
    <>
      {/* <HeroSection /> */}
      {/* <Container
        className="!px:w-full !px-3/4"
        sx={{
          backgroundColor: "var(--color-neutral-200)",
           </Typography>
            </Box>
          ))}
      </Container> */}

      <ProductSlider sx={{ pt: "20px" }} data={dataShirts} />

      {/* <Container>
        <Box className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-8 md:px-16 py-4 md:py-8">
          <CardMedia
            component="img"
             <ProductSlider sx={{ pt: "20px" }} data={dataCaps} />
      <ProductSlider sx={{ pt: "20px" }} data={dataPants} />
      {landingBaner[0]?.src && (
        <Container>
          <CardMedia
            component="img"
            image={landingBaner[0].src}
            alt={landingBaner[0].alt}
            sx={{
              width: "100%",
              height: "200px",
              borderRadius: "12px",
            }}
          />
        </Container>
      )}
         <ProductSlider sx={{ pt: "20px" }} data={dataSets} /> */}
    </>
  );
}
