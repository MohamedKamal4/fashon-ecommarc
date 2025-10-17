import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return Response.json(JSON.parse(data));
  } catch (error) {
    return Response.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newData = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    db.orders = db.orders || [];
    const newOrder = {
      id: Date.now(),
      ...newData,
      createdAt: new Date().toISOString(),
    };

    db.orders.push(newOrder);

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
    return Response.json({
      success: true,
      message: "Order added successfully",
      data: newOrder,
    });
  } catch (error) {
    return Response.json({ error: "Failed to update database" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedOrder = await req.json(); 
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    db.orders = db.orders || [];
    const index = db.orders.findIndex((o) => o.id === updatedOrder.id);

    if (index === -1) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    db.orders[index] = { ...db.orders[index], ...updatedOrder };

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: "Order updated successfully",
      data: db.orders[index],
    });
  } catch (error) {
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    db.orders = db.orders || [];
    const newOrders = db.orders.filter((o) => o.id !== id);

    if (newOrders.length === db.orders.length) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    db.orders = newOrders;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Order with id ${id} deleted successfully`,
    });
  } catch (error) {
    return Response.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
