import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 🧠 تحديد مسار ملف قاعدة البيانات
const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");

// 🧩 قراءة البيانات
function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("❌ Error reading DB:", err);
    throw new Error("Failed to read DB");
  }
}

// 🧩 كتابة البيانات
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Error writing DB:", err);
    throw new Error("Failed to write DB");
  }
}

// =======================================================
// 🟢 GET: جلب عنصر واحد داخل الكولكشن
// =======================================================
export async function GET(req, { params }) {
  const { itemId } = params;
  const db = readData();

  // غير "tshirts" باسم الكولكشن الحالي
  const collection = db.collections.tshirts;

  const item = collection.find((el) => String(el.id) === String(itemId));
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  return NextResponse.json(item);
}

// =======================================================
// 🟡 POST: إضافة عنصر جديد
// =======================================================
export async function POST(req) {
  const newItem = await req.json();
  const db = readData();

  const newId = Date.now();
  const itemWithId = { id: newId, ...newItem };
  db.collections.tshirts.push(itemWithId);

  writeData(db);
  return NextResponse.json(itemWithId, { status: 201 });
}

// =======================================================
// 🟠 PUT: تعديل عنصر
// =======================================================
export async function PUT(req, { params }) {
  const { itemId } = params;
  const updates = await req.json();
  const db = readData();

  const index = db.collections.tshirts.findIndex(
    (el) => String(el.id) === String(itemId)
  );

  if (index === -1)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  db.collections.tshirts[index] = {
    ...db.collections.tshirts[index],
    ...updates,
  };

  writeData(db);
  return NextResponse.json(db.collections.tshirts[index]);
}

// =======================================================
// 🔴 DELETE: حذف عنصر
// =======================================================
export async function DELETE(req, { params }) {
  const { itemId } = params;
  const db = readData();

  const exists = db.collections.tshirts.some(
    (el) => String(el.id) === String(itemId)
  );
  if (!exists)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  db.collections.tshirts = db.collections.tshirts.filter(
    (el) => String(el.id) !== String(itemId)
  );

  writeData(db);
  return NextResponse.json({ success: true });
}
