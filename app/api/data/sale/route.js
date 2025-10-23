import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");
const section = "sale";

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    return Response.json(db[section] || []);
  } catch {
    return Response.json({ error: `Failed to fetch ${section}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newData = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    db[section] = db[section] || [];

    const newItem = {
      id: Date.now(),
      ...newData,
      createdAt: new Date().toISOString(),
    };

    db[section].push(newItem);
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${section} item added successfully`,
      data: newItem,
    });
  } catch {
    return Response.json({ error: `Failed to add to ${section}` }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedItem = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    db[section] = db[section] || [];

    const index = db[section].findIndex((item) => item.id === updatedItem.id);
    if (index === -1)
      return Response.json({ error: `${section} item not found` }, { status: 404 });

    db[section][index] = { ...db[section][index], ...updatedItem };
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${section} item updated successfully`,
      data: db[section][index],
    });
  } catch {
    return Response.json({ error: `Failed to update ${section}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    db[section] = db[section] || [];

    const newList = db[section].filter((item) => item.id !== id);
    if (newList.length === db[section].length)
      return Response.json({ error: `${section} item not found` }, { status: 404 });

    db[section] = newList;
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${section} item deleted successfully`,
    });
  } catch {
    return Response.json({ error: `Failed to delete from ${section}` }, { status: 500 });
  }
}
