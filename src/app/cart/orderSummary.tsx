"use client"

import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { useSelector } from "react-redux";
import { formatPrice } from "@/helper/helper";
import { useEffect, useState } from "react";

function OrderSummary() {
    const [clientRendered, setClientRendered] = useState(false);
    const totalPrice = useSelector(getTotalCartPrice)
    const cartItems = useSelector(getTotalCartQuantity)
    const getTotalPrice = clientRendered ? totalPrice : 0;
    const getCartItems = clientRendered ? cartItems : 0;


    useEffect(() => {
        setClientRendered(true)
    }, [])


    return (
        <Paper elevation={2} sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom>
                خلاصه سفارش
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>جمع سبد خرید</Typography>
                <Typography>{formatPrice(getTotalPrice)}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>هزینه ارسال</Typography>
                <Typography>{formatPrice(150000)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">مبلغ قابل پرداخت</Typography>
                <Typography variant="h6">{formatPrice(getTotalPrice + 150000)}</Typography>
            </Box>

            {getCartItems ? (
                <Link href="/cart/checkout">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        ادامه فرآیند خرید
                    </Button>
                </Link>
            ) : (
                <Button
                    disabled
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                >
                    ادامه فرآیند خرید
                </Button>
            )}
        </Paper>
    );
}

export default OrderSummary;