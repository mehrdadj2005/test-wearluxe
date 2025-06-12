"use client";

import { ArrowBack, Search } from "@mui/icons-material";
import { Input, InputAdornment } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Represents a search box component that allows users to input search queries.
 *
 * This component renders an input field with two adornments:
 * - A start adornment displaying a search icon.
 * - An optional end adornment displaying a navigation icon (ArrowBack) when the search query is longer than 2 characters.
 *
 * The component listens for the "Enter" key press. If the entered search query has more than 2 characters, it updates the URL's query parameter "title"
 * with the search value and navigates to the products page. It also provides a click handler on the navigation icon for triggering the same behavior.
 *
 * @component
 * @example
 * // Render the Searchbox component
 * <Searchbox />
 */
function Searchbox() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    function handleSearch(e: KeyboardEvent) {
      if (e.key === "Enter")
        if (search.length > 2) {
          const currentUrl = new URLSearchParams(searchParams.toString());
          currentUrl.set("title", search);
          router.push(`/products?${currentUrl.toString()}`);
          setSearch("");
        }
    }

    window.addEventListener("keydown", handleSearch);

    return () => {
      window.removeEventListener("keydown", handleSearch);
    };
  }, [search, searchParams]);

  const handleNavigation = () => {
    if (search) {
      const currentUrl = new URLSearchParams(searchParams.toString());
      currentUrl.set("title", search);
      router.push(`/products?${currentUrl.toString()}`);
      setSearch("");
    }
  };

  return (
    <Input
      value={search}
      fullWidth
      placeholder="جسنجو کنید..."
      onChange={(e) => setSearch(e.target.value)}
      startAdornment={
        <InputAdornment position="end">
          <Search sx={{ color: "#fff" }} />
        </InputAdornment>
      }
      endAdornment={
        search.length > 2 ? (
          <InputAdornment position="end">
            <ArrowBack
              className="cursor-pointer"
              onClick={handleNavigation}
              sx={{ color: "#fff" }}
            />
          </InputAdornment>
        ) : null
      }
      sx={{
        border: "1px solid",
        borderColor: "grey.400",
        borderBottom: "none",
        borderRadius: 1,
        padding: 1,
        color: "#fff",
      }}
    />
  );
}

export default Searchbox;
