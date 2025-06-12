"use client"

import { decreaseItemQuantity, getCurrentQuantityById, ICart, increaseItemQuantity } from "@/app/cart/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function CartQuantityButton({ item }: { item: ICart }) {
    const dispatch = useDispatch();
    const itemQuantity = useSelector(getCurrentQuantityById(item));

    return (

        <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => dispatch(increaseItemQuantity(item))}>
                <Add />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{itemQuantity}</Typography>
            <IconButton onClick={() => dispatch(decreaseItemQuantity(item))}>
                <Remove />
            </IconButton>
        </Box>
    );
}

export default CartQuantityButton;