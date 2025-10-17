import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 🔹 قراءة قاعدة البيانات
function readDB() {
  const filePath = path.join(process.cwd(), "db.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// 🔹 كتابة التغييرات
function writeDB(data) {
  const filePath = path.join(process.cwd(), "db.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ✅ GET - جلب عنصر داخل الأوردر
export async function GET(request, { params }) {
  const { collections, id, orderId, itemId } = params;
  const db = readDB();

  const userCollection = db[collections];
  if (!userCollection)
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });

  const user = userCollection.find((u) => String(u.id) === String(id));
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order)
    return NextResponse.json({ message: "Order not found" }, { status: 404 });

  const item = order.items?.find((i) => String(i.id) === String(itemId));
  if (!item)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  return NextResponse.json(item);
}

// ✅ PUT - تعديل عنصر داخل الأوردر
export async function PUT(request, { params }) {
  const { collections, id, orderId, itemId } = params;
  const body = await request.json();
  const db = readDB();

  const userCollection = db[collections];
  if (!userCollection)
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });

  const user = userCollection.find((u) => String(u.id) === String(id));
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order)
    return NextResponse.json({ message: "Order not found" }, { status: 404 });

  const itemIndex = order.items?.findIndex((i) => String(i.id) === String(itemId));
  if (itemIndex === -1 || itemIndex === undefined)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  // تحديث العنصر
  order.items[itemIndex] = { ...order.items[itemIndex], ...body };
  writeDB(db);

  return NextResponse.json({
    message: "Item updated successfully",
    updatedItem: order.items[itemIndex],
  });
}

// ✅ DELETE - حذف عنصر من الأوردر
export async function DELETE(request, { params }) {
  const { collections, id, orderId, itemId } = params;
  const db = readDB();

  const userCollection = db[collections];
  if (!userCollection)
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });

  const user = userCollection.find((u) => String(u.id) === String(id));
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order)
    return NextResponse.json({ message: "Order not found" }, { status: 404 });

  const itemIndex = order.items?.findIndex((i) => String(i.id) === String(itemId));
  if (itemIndex === -1 || itemIndex === undefined)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  order.items.splice(itemIndex, 1);
  writeDB(db);

  return NextResponse.json({ message: "Item deleted successfully" });
}
