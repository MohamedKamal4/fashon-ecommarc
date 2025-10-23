import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");

// ✅ جلب منتج من sale
export async function GET(req, context) {
  try {
    const { itemId } = await context.params;
    const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const product = db.sale.find(p => String(p.id) === String(itemId));

    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ✅ إضافة منتج جديد
export async function POST(req) {
  try {
    const newProduct = await req.json();
    const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    newProduct.id = Date.now();
    db.sale.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
    return NextResponse.json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
  }
}

// ✅ تعديل منتج
export async function PUT(req, context) {
  try {
    const { itemId } = await context.params;
    const updatedData = await req.json();
    const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = db.sale.findIndex(p => String(p.id) === String(itemId));
    if (index === -1) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    db.sale[index] = { ...db.sale[index], ...updatedData };
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

    return NextResponse.json({ message: "Product updated", updated: db.sale[index] });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// ✅ حذف منتج
export async function DELETE(req, context) {
  try {
    const { itemId } = await context.params;
    const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const filtered = db.sale.filter(p => String(p.id) !== String(itemId));
    if (filtered.length === db.sale.length)
      return NextResponse.json({ message: "Product not found" }, { status: 404 });

    db.sale = filtered;
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
