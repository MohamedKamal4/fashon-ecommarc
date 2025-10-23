import { NextResponse } from "next/server";
import { readData, writeData, syncOrdersWithUsers } from "../../utils/syncOrders.js";

export async function GET(req, { params }) {
  try {
    const { orderId } = params;
    const orders = syncOrdersWithUsers();
    const order = orders.find(o => String(o.id) === String(orderId));

    if (!order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { orderId } = params;
    const body = await req.json();
    const db = readData();

    let updated = false;
    db.users.forEach(user => {
      user.orders = user.orders?.map(o => {
        if (String(o.id) === String(orderId)) {
          updated = true;
          return { ...o, ...body };
        }
        return o;
      });
    });

    if (!updated)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Order updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { orderId } = params;
    const db = readData();

    db.users.forEach(u => {
      u.orders = (u.orders || []).filter(o => String(o.id) !== String(orderId));
    });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
