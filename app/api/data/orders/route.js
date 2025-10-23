import { NextResponse } from "next/server";
import { readData, writeData, syncOrdersWithUsers } from "../utils/syncOrders.js";

export async function GET() {
  try {
    const allOrders = syncOrdersWithUsers(); // مزامنة فورية
    return NextResponse.json(allOrders);
  } catch {
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, ...orderData } = body;
    const db = readData();

    const user = db.users.find(u => String(u.id) === String(userId));
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newOrder = { id: Date.now(), createdAt: new Date().toISOString(), ...orderData };
    user.orders = user.orders || [];
    user.orders.push(newOrder);

    writeData(db);
    syncOrdersWithUsers(); // ✅ تحديث القسم الرئيسي

    return NextResponse.json({ message: "Order added", order: newOrder });
  } catch {
    return NextResponse.json({ error: "Failed to add order" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updatedFields } = body;
    const db = readData();

    let found = false;
    db.users.forEach(user => {
      if (user.orders) {
        const i = user.orders.findIndex(o => String(o.id) === String(id));
        if (i !== -1) {
          user.orders[i] = { ...user.orders[i], ...updatedFields };
          found = true;
        }
      }
    });

    if (!found) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers(); // ✅ تحديث فوري

    return NextResponse.json({ message: "Order updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = readData();

    db.users.forEach(u => {
      u.orders = (u.orders || []).filter(o => String(o.id) !== String(id));
    });

    writeData(db);
    syncOrdersWithUsers(); // ✅ تحديث مباشر بعد الحذف

    return NextResponse.json({ message: "Order deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
