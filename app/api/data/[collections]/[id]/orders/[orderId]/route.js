import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 🧩 قراءة ملف db.json
function readDB() {
  const filePath = path.join(process.cwd(), "db.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// 🧩 كتابة التعديلات في db.json
function writeDB(data) {
  const filePath = path.join(process.cwd(), "db.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ✅ GET - جلب بيانات أوردر محدد
export async function GET(request, { params }) {
  const { collections, id, orderId } = params;
  const db = readDB();

  // التأكد من وجود الكوليكشن
  const collection = db[collections];
  if (!collection) {
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });
  }

  // البحث عن المستخدم
  const user = collection.find((u) => String(u.id) === String(id));
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // البحث عن الأوردر
  const order = user.orders?.find((o) => String(o.id) === String(orderId));
  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

// ✅ PUT - تعديل أوردر معين
export async function PUT(request, { params }) {
  const { collections, id, orderId } = params;
  const body = await request.json();
  const db = readDB();

  const collection = db[collections];
  if (!collection) {
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });
  }

  const userIndex = collection.findIndex((u) => String(u.id) === String(id));
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const user = collection[userIndex];

  if (!user.orders || !Array.isArray(user.orders)) {
    return NextResponse.json({ message: "User has no orders" }, { status: 404 });
  }

  const orderIndex = user.orders.findIndex(
    (o) => String(o.id) === String(orderId)
  );
  if (orderIndex === -1) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  // 🧠 تحديث الأوردر دون تكرار
  const updatedOrder = {
    ...user.orders[orderIndex],
    ...body,
  };

  // ✅ استبدال الأوردر القديم بالجديد
  user.orders.splice(orderIndex, 1, updatedOrder);

  // 💾 حفظ التغييرات
  db[collections][userIndex] = user;
  writeDB(db);

  return NextResponse.json({
    message: "Order updated successfully",
    updatedOrder,
  });
}


// ✅ DELETE - حذف أوردر معين
export async function DELETE(request, { params }) {
  const { collections, id, orderId } = params;
  const db = readDB();

  const collection = db[collections];
  if (!collection) {
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });
  }

  const userIndex = collection.findIndex((u) => String(u.id) === String(id));
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const orderIndex = collection[userIndex].orders.findIndex(
    (o) => String(o.id) === String(orderId)
  );
  if (orderIndex === -1) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  // حذف الأوردر
  collection[userIndex].orders.splice(orderIndex, 1);
  db[collections] = collection;
  writeDB(db);

  return NextResponse.json({ message: "Order deleted successfully" });
}
