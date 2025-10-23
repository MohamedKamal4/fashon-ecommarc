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

export async function GET(req, { params }) {
  const { userId, orderId } = params;
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  return NextResponse.json(order.items || []);
}

export async function POST(req, { params }) {
  const { userId, orderId } = params;
  const newItem = await req.json();
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const itemWithId = { ...newItem, id: Date.now() };
  order.items = order.items ? [...order.items, itemWithId] : [itemWithId];

  await writeDB(db);
  return NextResponse.json(itemWithId, { status: 201 });
}

export async function PUT(req, { params }) {
  const { userId, orderId } = params;
  const updatedItems = await req.json();
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.items = updatedItems;
  await writeDB(db);

  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { userId, orderId } = params;
  const db = await readDB();

  const user = db.users.find((u) => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  order.items = [];
  await writeDB(db);

  return NextResponse.json({ success: true });
}
