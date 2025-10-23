import { NextResponse } from "next/server";
import { readData, writeData, syncOrdersWithUsers } from "../../../utils/syncOrders.js";

export async function GET(req, { params }) {
  try {
    const { orderId } = params;
    const orders = syncOrdersWithUsers();
    const order = orders.find(o => String(o.id) === String(orderId));

    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json(order.items || []);
  } catch {
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const { orderId } = params;
    const body = await req.json();
    const db = readData();

    let found = false;
    db.users.forEach(u => {
      u.orders?.forEach(o => {
        if (String(o.id) === String(orderId)) {
          o.items = o.items || [];
          o.items.push({ id: Date.now(), ...body });
          found = true;
        }
      });
    });

    if (!found) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Item added successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { orderId } = params;
    const body = await req.json();
    const { id, ...updateData } = body;
    const db = readData();

    let updated = false;
    db.users.forEach(u => {
      u.orders?.forEach(o => {
        if (String(o.id) === String(orderId)) {
          o.items = o.items.map(item => {
            if (String(item.id) === String(id)) {
              updated = true;
              return { ...item, ...updateData };
            }
            return item;
          });
        }
      });
    });

    if (!updated) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Item updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { orderId } = params;
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    const db = readData();
    let deleted = false;

    db.users.forEach(u => {
      u.orders?.forEach(o => {
        if (String(o.id) === String(orderId)) {
          const before = o.items?.length || 0;
          o.items = o.items?.filter(item => String(item.id) !== String(itemId));
          if (before !== o.items.length) deleted = true;
        }
      });
    });

    if (!deleted)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
