import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/data/db.json");

function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🟢 GET: جلب قائمة المفضلات
export async function GET(req, { params }) {
  const { userId } = params;
  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user.favoriteList || []);
}

// 🟡 POST: إضافة منتج للمفضلة
export async function POST(req, { params }) {
  const { userId } = params;
  const body = await req.json();
  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const exists = user.favoriteList.some(item => String(item.id) === String(body.id));
  if (exists) return NextResponse.json({ message: "Already in favorites" }, { status: 400 });

  user.favoriteList.push(body);
  writeData(data);

  return NextResponse.json({ message: "Added to favorites", favorite: body });
}

// 🔵 PUT: تعديل عنصر داخل المفضلة (مثلاً تحديث الاسم أو الصورة)
export async function PUT(req, { params }) {
  const { userId } = params;
  const body = await req.json();
  const { id, ...updatedFields } = body;

  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const index = user.favoriteList.findIndex(item => String(item.id) === String(id));
  if (index === -1) return NextResponse.json({ message: "Item not found" }, { status: 404 });

  user.favoriteList[index] = { ...user.favoriteList[index], ...updatedFields };
  writeData(data);

  return NextResponse.json({ message: "Favorite updated", item: user.favoriteList[index] });
}

// 🔴 DELETE: حذف من المفضلة
export async function DELETE(req, { params }) {
  const { userId } = params;
  const { searchParams } = new URL(req.url);
  const favId = searchParams.get("id");

  const data = readData();
  const user = data.users.find(u => String(u.id) === String(userId));

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  user.favoriteList = user.favoriteList.filter(item => String(item.id) !== String(favId));
  writeData(data);

  return NextResponse.json({ message: "Removed from favorites" });
}
