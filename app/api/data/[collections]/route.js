import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET(req, { params }) {
  const { collections } = params;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[collections]) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    return Response.json(db[collections]);
  } catch (error) {
    return Response.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { collections } = params;

  try {
    const newItem = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[collections]) db[collections] = [];

    const newObject = { id: Date.now(), ...newItem };
    db[collections].push(newObject);

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Item added to ${collections}`,
      data: newObject,
    });
  } catch (error) {
    return Response.json({ error: "Failed to write to database" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { collections } = params;

  try {
    const updatedItem = await req.json(); 
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[collections]) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    const index = db[collections].findIndex((item) => item.id === updatedItem.id);
    if (index === -1) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    db[collections][index] = { ...db[collections][index], ...updatedItem };
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Item updated in ${collections}`,
      data: db[collections][index],
    });
  } catch (error) {
    return Response.json({ error: "Failed to update database" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { collections } = params;

  try {
    const { id } = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[collections]) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    const newList = db[collections].filter((item) => item.id !== id);
    db[collections] = newList;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Item with id ${id} deleted from ${collections}`,
    });
  } catch (error) {
    return Response.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
