import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");

async function readDB() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeDB(db) {
  await fs.writeFile(filePath, JSON.stringify(db, null, 2));
}

export async function GET(req, { params }) {
  const { userId, orderId, itemId } = params;
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const item = order.items?.find((i) => String(i.id) === String(itemId));
  if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(req, { params }) {
  const { userId, orderId, itemId } = params;
  const updatedData = await req.json();
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const itemIndex = order.items?.findIndex((i) => String(i.id) === String(itemId));
  if (itemIndex === -1) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  order.items[itemIndex] = { ...order.items[itemIndex], ...updatedData };

  await writeDB(db);
  return NextResponse.json(order.items[itemIndex]);
}

export async function DELETE(req, { params }) {
  const { userId, orderId, itemId } = params;
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.items = order.items?.filter((i) => String(i.id) !== String(itemId));

  await writeDB(db);
  return NextResponse.json({ success: true });
}
