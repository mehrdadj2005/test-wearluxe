"use client"

import { Box, Typography } from "@mui/material";

function ProductError({ error }: { error: string }) {
    return (
        <Box sx={{ padding: 2, height: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h5">{error}</Typography>
        </Box>
    );
}

export default ProductError;