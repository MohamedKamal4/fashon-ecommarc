import fs from "fs";
import path from "path";

// 🔗 تحديد المسار لملف قاعدة البيانات
const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");

// 🧩 قراءة قاعدة البيانات
function readData() {
  try {
    const file = fs.readFileSync(filePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    console.error("❌ Failed to read DB:", error);
    throw new Error("Failed to read DB");
  }
}

// 🧩 كتابة البيانات في الملف
function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Failed to write DB:", error);
    throw new Error("Failed to write DB");
  }
}

// ✅ GET — جلب أوردر محدد لمستخدم معين
export async function GET(req, context) {
  const { userId, orderId } = await context.params;
  const db = readData();

  const user = db.users.find(u => String(u.id) === String(userId));
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const order = user.orders?.find(o => String(o.id) === String(orderId));
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });

  return Response.json(order);
}

// ✅ POST — إضافة أوردر جديد للمستخدم (مع ID مخصص)
export async function POST(req, context) {
  const { userId, orderId } = await context.params;
  const newOrder = await req.json();

  const db = readData();
  const userIndex = db.users.findIndex(u => String(u.id) === String(userId));

  if (userIndex === -1)
    return Response.json({ error: "User not found" }, { status: 404 });

  db.users[userIndex].orders = db.users[userIndex].orders || [];

  const orderExists = db.users[userIndex].orders.find(o => String(o.id) === String(orderId));
  if (orderExists)
    return Response.json({ error: "Order ID already exists" }, { status: 400 });

  const newOrderData = {
    id: orderId || Date.now(),
    createdAt: new Date().toISOString(),
    ...newOrder,
  };

  db.users[userIndex].orders.push(newOrderData);
  writeData(db);

  return Response.json({
    success: true,
    message: "Order added successfully",
    data: newOrderData,
  });
}

// ✅ PUT — تعديل أوردر موجود داخل المستخدم
export async function PUT(req, context) {
  const { userId, orderId } = await context.params;
  const updatedOrder = await req.json();

  const db = readData();
  const userIndex = db.users.findIndex(u => String(u.id) === String(userId));
  if (userIndex === -1)
    return Response.json({ error: "User not found" }, { status: 404 });

  const orderIndex = db.users[userIndex].orders?.findIndex(o => String(o.id) === String(orderId));
  if (orderIndex === -1)
    return Response.json({ error: "Order not found" }, { status: 404 });

  db.users[userIndex].orders[orderIndex] = {
    ...db.users[userIndex].orders[orderIndex],
    ...updatedOrder,
    updatedAt: new Date().toISOString(),
  };

  writeData(db);

  return Response.json({
    success: true,
    message: "Order updated successfully",
    data: db.users[userIndex].orders[orderIndex],
  });
}

// ✅ DELETE — حذف أوردر من المستخدم
export async function DELETE(req, context) {
  const { userId, orderId } = await context.params;
  const db = readData();

  const userIndex = db.users.findIndex(u => String(u.id) === String(userId));
  if (userIndex === -1)
    return Response.json({ error: "User not found" }, { status: 404 });

  const orders = db.users[userIndex].orders || [];
  const orderIndex = orders.findIndex(o => String(o.id) === String(orderId));

  if (orderIndex === -1)
    return Response.json({ error: "Order not found" }, { status: 404 });

  db.users[userIndex].orders.splice(orderIndex, 1);
  writeData(db);

  return Response.json({
    success: true,
    message: `Order with id ${orderId} deleted successfully`,
  });
}
