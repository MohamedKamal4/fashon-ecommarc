import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");
const mainSection = "collections";
const sectionType = "shoes";

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    const items = db[mainSection]?.[sectionType] || [];
    return Response.json(items);
  } catch {
    return Response.json({ error: `Failed to fetch ${sectionType}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newItem = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    db[mainSection] = db[mainSection] || {};
    db[mainSection][sectionType] = db[mainSection][sectionType] || [];

    const item = {
      id: Date.now(),
      ...newItem,
      createdAt: new Date().toISOString(),
    };

    db[mainSection][sectionType].push(item);
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${sectionType} item added successfully`,
      data: item,
    });
  } catch {
    return Response.json({ error: `Failed to add to ${sectionType}` }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const updatedItem = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const items = db[mainSection]?.[sectionType] || [];
    const index = items.findIndex((i) => i.id === updatedItem.id);

    if (index === -1)
      return Response.json({ error: `${sectionType} item not found` }, { status: 404 });

    items[index] = { ...items[index], ...updatedItem };
    db[mainSection][sectionType] = items;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${sectionType} item updated successfully`,
      data: items[index],
    });
  } catch {
    return Response.json({ error: `Failed to update ${sectionType}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const items = db[mainSection]?.[sectionType] || [];
    const filtered = items.filter((i) => i.id !== id);

    if (filtered.length === items.length)
      return Response.json({ error: `${sectionType} item not found` }, { status: 404 });

    db[mainSection][sectionType] = filtered;
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `${sectionType} item deleted successfully`,
    });
  } catch {
    return Response.json({ error: `Failed to delete from ${sectionType}` }, { status: 500 });
  }
}
