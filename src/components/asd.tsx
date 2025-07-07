"use client";
import { getProduct } from "@/services/getProduct";
import { ICategory } from "@/types/category";
import { useEffect, useState } from "react";

export default function Asd() {
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getProduct<ICategory[]>(
        "http://localhost:4000/categories"
      );
      setCategory(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {category.map((cat) => (
          <li key={cat.id}>{cat.title}</li>
        ))}
      </ul>
    </div>
  );
}
