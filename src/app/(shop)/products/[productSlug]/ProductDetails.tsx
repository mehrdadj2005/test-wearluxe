import { IProduct } from "@/types/product";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

function ProductDetails({ product }: { product: IProduct }) {

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }} >
                <Typography sx={{ borderLeft: { xs: null, md: "1px solid rgba(0, 0, 0, 0.12)" }, paddingY: 1, fontWeight: 900 }}>مشخصات محصول</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
                <List sx={{ width: '100%', padding: 0 }}>
                    <ListItem sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography>محصول</Typography>
                        <Typography>{product.name}</Typography>
                    </ListItem>

                    <ListItem sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "var(--color-primary-50)" }} >
                        <Typography>سایز</Typography>
                        <Typography>{product.size}</Typography>
                    </ListItem>
                    <ListItem sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography>نوع</Typography>
                        <Typography>{product.type}</Typography>
                    </ListItem>

                    <ListItem sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "var(--color-primary-50)" }} >
                        <Typography>رنگ ها</Typography>
                        <Typography>{product.colors.join(", ")}</Typography>
                    </ListItem>

                    <ListItem sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography>جنس</Typography>
                        <Typography>{product.material}</Typography>
                    </ListItem>

                    {Object.entries(product.sizes).map(([key, value], index) =>
                        <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between", backgroundColor: index % 2 === 0 ? "var(--color-primary-50)" : "transparent" }} >
                            <Typography>سایز {key}</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Typography>عرض: {value.dimensions.width}</Typography>
                                <Typography>طول: {value.dimensions.height}</Typography>
                            </Box>
                        </ListItem>
                    )}

                </List>
            </Grid>
        </Grid>
    );
}

export default ProductDetails;