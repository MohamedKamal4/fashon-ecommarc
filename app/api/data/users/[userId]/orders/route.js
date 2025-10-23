import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { syncOrdersWithUsers } from "../../../utils/syncOrders";

const filePath = path.join(process.cwd(), "app/api/data/db.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🟢 GET: جلب كل الأوردرات الخاصة بالمستخدم
export async function GET(req, { params }) {
  const { userId } = params;
  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    syncOrdersWithUsers();

  return NextResponse.json(user.orders || []);
}

// 🟡 POST: إضافة أوردر جديد
export async function POST(req, { params }) {
  const { userId } = params;
  const body = await req.json();
  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const newOrder = { id: Date.now(), ...body };
  user.orders.push(newOrder);

  writeData(data);
    syncOrdersWithUsers();

  return NextResponse.json({ message: "Order added", order: newOrder });
}

// 🔵 PUT: تعديل أوردر معين
export async function PUT(req, { params }) {
  const { userId } = params;
  const body = await req.json();
  const { id, ...updatedFields } = body;

  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const index = user.orders.findIndex(o => String(o.id) === String(id));
  if (index === -1) return NextResponse.json({ message: "Order not found" }, { status: 404 });

  user.orders[index] = { ...user.orders[index], ...updatedFields };
  writeData(data);
    syncOrdersWithUsers();

  return NextResponse.json({ message: "Order updated", order: user.orders[index] });
}

// 🔴 DELETE: حذف أوردر
export async function DELETE(req, { params }) {
  const { userId } = params;
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("id");

  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  user.orders = user.orders.filter(o => String(o.id) !== String(orderId));
  writeData(data);
    syncOrdersWithUsers();

  return NextResponse.json({ message: "Order deleted successfully" });
}
