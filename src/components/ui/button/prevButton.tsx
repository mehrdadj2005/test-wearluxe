"use client"

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function PrevButton({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <Button variant="outlined" onClick={() => router.back()}>{children}</Button>
    );
}

export default PrevButton;