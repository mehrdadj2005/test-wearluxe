"use client";
import { IProduct } from "@/types/product";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function ProductCard({ item }: { item: IProduct }) {
  const discountValid = item.discountedPrice > 0;

  return (
    <Card
      // className="w-full h-full !max-w-[270px] flex flex-col overflow-hidden cursor-pointer select-none !content-stretch"
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "270px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none",
        alignContent: "stretch",
        boxShadow: "none",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #fff",
        ":hover": {
          border: "1px solid var(--color-neutral-600)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <CardMedia
        component="img"
        image={item.images[0]}
        alt={item.name}
        className="w-full h-[224px] object-cover border-b border-neutral-200"
      />

      <CardContent className="flex flex-col justify-between items-center h-fit !pb-2">
        <Typography
          variant="body2"
          className="text-neutral-800 text-xs line-clamp-2 sm:!pb-2"
        >
          {item.name}
        </Typography>

        <Box className="flex justify-between">
          {/* <Box className="flex flex-col justify-end h-11">
            {discountValid && (
              <Typography
                variant="inherit"
                className="bg-primary-400 text-neutral-200 text-[12px] px-2 py-0.5 rounded w-fit"
              >
                {item.discountedPercentage}%
              </Typography>
            )}
          </Box> */}

          <Box className="text-center flex flex-col items-center">
            {discountValid ? (
              <>
                <Box className="text-xs line-through text-neutral-400">
                  {item.price.toLocaleString()}
                </Box>
                <Box className="text-xs font-semibold">
                  {(item.price - item.discountedPrice).toLocaleString()}{" "}
                  <Typography
                    variant="overline"
                    className="inline-block md:hidden h-6"
                  >
                    ت
                  </Typography>
                  <Typography
                    variant="overline"
                    className="hidden md:inline-block h-6"
                  >
                    تومان
                  </Typography>
                </Box>
              </>
            ) : (
              <Box className="text-xs font-semibold h-6 flex items-end">
                {item.price.toLocaleString()} تومان
              </Box>
            )}
          </Box>
        </Box>
        <Button
          variant="text"
          sx={{
            background: "none",
            border: "1px solid var(--color-neutral-300)",
            color: "var(--color-neutral-700)",
            padding: "6px 28px",
            mt: 1,
            ":hover": {
              border: "1px solid var(--color-neutral-600)",
              background: "var(--color-neutral-200)",
            },
            transition: "all 0.3s ease",
          }}
        >
          افزودن به سبد خرید
        </Button>
      </CardContent>
    </Card>
  );
}
