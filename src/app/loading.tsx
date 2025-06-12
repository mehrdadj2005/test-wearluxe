import Container from "@/components/container";
import { CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Container className="flex flex-col gap-1 justify-center items-center h-dvh">
      <CircularProgress />
      <Typography>صبر کنید...</Typography>
    </Container>
  );
}

export default Loading;
