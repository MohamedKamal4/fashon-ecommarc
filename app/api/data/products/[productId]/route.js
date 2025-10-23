import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");
async function readDB() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Failed to read DB:", error);
    throw new Error("Failed to read DB");
  }
}

async function writeDB(db) {
  try {
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error("❌ Failed to write DB:", error);
    throw new Error("Failed to write DB");
  }
}

// 🟢 GET — جلب المنتج حسب ID
export async function GET(req, { params }) {
  const { productId } = params;
  const db = await readDB();

  const product = db.products.find((p) => String(p.id) === String(productId));
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

// 🟡 POST — إضافة منتج جديد
export async function POST(req) {
  const newProduct = await req.json();
  const db = await readDB();

  const productWithId = { ...newProduct, id: Date.now() };
  db.products.push(productWithId);

  await writeDB(db);
  return NextResponse.json(productWithId, { status: 201 });
}

// 🟠 PUT — تعديل منتج موجود
export async function PUT(req, { params }) {
  const { productId } = params;
  const updatedData = await req.json();
  const db = await readDB();

  const index = db.products.findIndex((p) => String(p.id) === String(productId));
  if (index === -1)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  db.products[index] = { ...db.products[index], ...updatedData };

  await writeDB(db);
  return NextResponse.json(db.products[index]);
}

// 🔴 DELETE — حذف منتج
export async function DELETE(req, { params }) {
  const { productId } = params;
  const db = await readDB();

  const productExists = db.products.some((p) => String(p.id) === String(productId));
  if (!productExists)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  db.products = db.products.filter((p) => String(p.id) !== String(productId));

  await writeDB(db);
  return NextResponse.json({ success: true });
}
