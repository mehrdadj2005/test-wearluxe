"use client"

import { Grid } from "@mui/material";
import "@/app/globals.css";
import Container from "@/components/container";
import OrderSummary from "@/app/cart/orderSummary";

export default function CartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Container>
            <Grid container spacing={4} sx={{ paddingY: 4 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    {children}
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <OrderSummary />
                </Grid>
            </Grid>
        </Container>
    );
}
