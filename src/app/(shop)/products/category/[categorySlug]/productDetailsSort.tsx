"use client";
import { dataSort } from "@/config/productDatailsFilter";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Drawer,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../../../../../components/container";
import SwitchButton from "../../../../../components/SwitchButton";

export default function ProductDetailsSort({
  showDrawerSort,
}: {
  showDrawerSort: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const [openSortDrawer, setOpenSortDrawer] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [stock, setStock] = useState<boolean>(false);

  const urlBase = params.categorySlug;

  useEffect(() => {
    setOpenSortDrawer(showDrawerSort);
  }, [showDrawerSort]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (stock) {
      params.set("stock", "true");
    } else {
      params.delete("stock");
    }
    router.push(`/products/category/${urlBase}?${params.toString()}`);
  }, [stock, searchParams, urlBase, router]);

  const toggleDrawerSort = (open: boolean) => setOpenSortDrawer(open);

  const handleSortProduct = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("_sort", id);

    router.push(`/products/category/${urlBase}?${params.toString()}`);
  };

  return (
    <Box sx={{ width: { xl: "100%", xs: "auto" } }}>
      <Box sx={{ display: { xs: "flex", xl: "none" } }}>
        <Button
          variant="outlined"
          onClick={() => setOpenSortDrawer(!openSortDrawer)}
        >
          مرتب سازی
        </Button>
      </Box>

      <Box
        sx={{
          display: { xs: "none", xl: "flex" },
          height: 56,
          px: 4,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ height: "fit-content", fontSize: "1rem" }}
          >
            {dataSort.title}
          </Typography>
          {dataSort.filters.map((item) => (
            <Button
              key={item.id}
              variant="text"
              sx={{
                color: "#262626",
                border: "1px solid #e5e5e5",
                "&:hover": {
                  border: "1px solid #d4d4d4",
                  backgroundColor: "#f3f4f6",
                },
                ...(select == item.id && {
                  backgroundColor: "#f3f4f6",
                  boxShadow: "0 25px 50px -12px #171717",
                }),
              }}
              onClick={() => {
                setSelect(item.id);
                handleSortProduct(item.id);
              }}
              size="small"
            >
              {item.name}
            </Button>
          ))}
        </Box>
        <Box>
          <SwitchButton
            label=":فقط کالاهای موجود"
            checked={stock}
            onChange={() => setStock(!stock)}
          />
        </Box>
      </Box>

      <Drawer
        role="presentation"
        anchor="right"
        open={openSortDrawer}
        onClose={() => toggleDrawerSort(false)}
        onClick={() => {
          setTimeout(() => {
            toggleDrawerSort(false);
          }, 500);
        }}
        PaperProps={{
          sx: {
            width: { xs: "70%", sm: "40%" },
          },
        }}
        sx={{
          display: { xs: "flex", xl: "none" },
        }}
      >
        <Container sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Button variant="text">
              {<CloseIcon sx={{ color: "#262626" }} />}
            </Button>
          </Box>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {dataSort.filters.map((item) => (
              <Box
                key={item.id}
                sx={{ p: 1, pr: 0 }}
                onClick={() => {
                  setSelect(item.id);
                  handleSortProduct(item.id);
                }}
              >
                <FormControlLabel
                  defaultChecked={select == item.id}
                  checked={select == item.id}
                  control={
                    <Radio sx={select == item.id ? { color: "#a3e635" } : {}} />
                  }
                  label={item.name}
                  dir="ltr"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                />
              </Box>
            ))}
          </RadioGroup>
        </Container>
      </Drawer>
    </Box>
  );
}
