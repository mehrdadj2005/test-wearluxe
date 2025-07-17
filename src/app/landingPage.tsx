"use client";
import { getProduct } from "@/services/getProduct";
import { IBanner } from "@/types/banners";
import { IOption } from "@/types/options";
import { IProduct } from "@/types/product";

import ProductSlider from "@/components/products/productSlider";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [dataShirts, setDataShirts] = useState<IProduct[]>([]);
  const [dataPants, setDataPants] = useState<IProduct[]>([]);
  const [dataCaps, setDataCaps] = useState<IProduct[]>([]);
  const [dataSets, setDataSets] = useState<IProduct[]>([]);

  const [dataOptions, setDataOptions] = useState<IOption[]>([]);
  const [landingBaner, setLandingBaner] = useState<IBanner[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      const { data: dataShirts = [] } = await getProduct<IProduct[]>(
        "/products?categoryId=1"
      );
      setDataShirts(dataShirts);

      const { data: dataPants = [] } = await getProduct<IProduct[]>(
        "/products?categoryId=2"
      );
      setDataPants(dataPants);

      const { data: dataCaps = [] } = await getProduct<IProduct[]>(
        "/products?categoryId=3"
      );
      setDataCaps(dataCaps);

      const { data: dataSets = [] } = await getProduct<IProduct[]>(
        "/products?categoryId=4"
      );
      setDataSets(dataSets);

      const { data: dataOptions = [] } = await getProduct<IOption[]>(
        "/options"
      );
      setDataOptions(dataOptions);

      const { data: landingBaner = [] } = await getProduct<IBanner[]>(
        "/banners"
      );
      setLandingBaner(landingBaner);
    };
    fetchdata();
  }, []);

  return (
    <>
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
