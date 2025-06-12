import { Box } from "@mui/material";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  sx?: object;
  className?: string;
}

const Container = ({ children, sx, className }: ContainerProps) => {
  return (
    <Box
      sx={{
        ...sx,
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        paddingLeft: "16px",
        paddingRight: " 16px",
        xl: { padding: "0 32px" },
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

export default Container;
