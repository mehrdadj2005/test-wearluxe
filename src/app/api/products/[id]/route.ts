import { IProduct } from "@/types/product";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const filePath = path.join(process.cwd(), "src/data/db.json");
  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  const product = data.products.find((item: IProduct) => item.id === params.id);

  if (!product) {
    return new Response("محصول پیدا نشد", { status: 404 });
  }

  return Response.json(product);
}
