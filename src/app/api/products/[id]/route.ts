import { products } from "@/data/db.json";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  // 'fs' is actually the products array imported from db.json

  const { id } = params;
  alert(id);
  console.log(id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
