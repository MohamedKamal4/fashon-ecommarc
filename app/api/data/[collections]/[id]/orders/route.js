import { promises as fs } from "fs";
import path from "path";

const filePath = path.resolve("./db.json");

// 🟢 جلب الطلبات الخاصة بكل يوزر
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const user = db.users.find((u) => String(u.id) === String(id));

    if (!user) {
      return Response.json({ error: `User ${id} not found` }, { status: 404 });
    }

    const userOrders = user.orders || [];
    if (userOrders.length === 0) {
      return Response.json({ message: `No orders found for user ${id}` });
    }

    return Response.json(userOrders);
  } catch (error) {
    console.error("Error reading user orders:", error);
    return Response.json({ error: "Failed to read database" }, { status: 500 });
  }
}

// 🟠 إضافة طلب جديد لمستخدم محدد
export async function POST(req, { params }) {
  const { id } = params;

  try {
    const newOrder = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const userIndex = db.users.findIndex((u) => String(u.id) === String(id));
    if (userIndex === -1) {
      return Response.json({ error: `User ${id} not found` }, { status: 404 });
    }

    // إضافة الطلب داخل اليوزر نفسه
    db.users[userIndex].orders = db.users[userIndex].orders || [];

    const order = {
      id: Date.now(),
      ...newOrder,
      createdAt: new Date().toISOString(),
    };

    db.users[userIndex].orders.push(order);

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Order added for user ${id}`,
      data: order,
    });
  } catch (error) {
    console.error("Error saving user order:", error);
    return Response.json({ error: "Failed to save order" }, { status: 500 });
  }
}
