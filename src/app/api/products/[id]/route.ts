import { promises as fs } from "fs";
import path from "path";

type Product = {
  id: string;
  name: string;
  price: number;
  // سایر فیلدهایی که نیاز داری رو اینجا اضافه کن
};

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), "src/data/db.json");
  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  const product = data.products.find((item: Product) => item.id === id);

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return Response.json(product);
}
