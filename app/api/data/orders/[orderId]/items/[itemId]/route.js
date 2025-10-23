import { NextResponse } from "next/server";
import { readData, writeData, syncOrdersWithUsers } from "../../../utils/syncOrders.js";

// ✅ GET - جلب عنصر واحد من عناصر الأوردر
export async function GET(req, { params }) {
  try {
    const { orderId, itemId } = params;
    const orders = syncOrdersWithUsers();

    const order = orders.find(o => String(o.id) === String(orderId));
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const item = (order.items || []).find(i => String(i.id) === String(itemId));
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (err) {
    console.error("❌ GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
  }
}

// ✅ POST - إضافة عنصر جديد داخل نفس الأوردر
export async function POST(req, { params }) {
  try {
    const { orderId } = params;
    const body = await req.json();
    const db = readData();

    let addedItem = null;
    let found = false;

    db.users.forEach(user => {
      user.orders?.forEach(order => {
        if (String(order.id) === String(orderId)) {
          order.items = order.items || [];
          const newItem = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...body
          };
          order.items.push(newItem);
          addedItem = newItem;
          found = true;
        }
      });
    });

    if (!found)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({
      message: "Item added successfully",
      item: addedItem
    });
  } catch (err) {
    console.error("❌ POST Error:", err);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

// ✅ PUT - تعديل بيانات عنصر معين داخل الأوردر
export async function PUT(req, { params }) {
  try {
    const { orderId, itemId } = params;
    const body = await req.json();
    const db = readData();

    let updated = false;

    db.users.forEach(user => {
      user.orders?.forEach(order => {
        if (String(order.id) === String(orderId)) {
          order.items = order.items.map(item => {
            if (String(item.id) === String(itemId)) {
              updated = true;
              return { ...item, ...body, updatedAt: new Date().toISOString() };
            }
            return item;
          });
        }
      });
    });

    if (!updated)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (err) {
    console.error("❌ PUT Error:", err);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// ✅ DELETE - حذف عنصر واحد من داخل الأوردر
export async function DELETE(req, { params }) {
  try {
    const { orderId, itemId } = params;
    const db = readData();

    let deleted = false;

    db.users.forEach(user => {
      user.orders?.forEach(order => {
        if (String(order.id) === String(orderId)) {
          const before = order.items?.length || 0;
          order.items = (order.items || []).filter(i => String(i.id) !== String(itemId));
          if ((order.items?.length || 0) < before) deleted = true;
        }
      });
    });

    if (!deleted)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

    writeData(db);
    syncOrdersWithUsers();

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
