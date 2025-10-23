import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "db.json");
const section = "collections";

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);
    return Response.json(db[section] || {});
  } catch {
    return Response.json({ error: `Failed to fetch ${section}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newCollection = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    db[section] = db[section] || {};

    const { name, value } = newCollection;
    if (!name || !Array.isArray(value)) {
      return Response.json({ error: "Invalid collection format (needs name & array)" }, { status: 400 });
    }

    db[section][name] = value;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Collection '${name}' added/updated successfully`,
      data: db[section][name],
    });
  } catch {
    return Response.json({ error: `Failed to add/update collection` }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { name, items } = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[section] || !db[section][name]) {
      return Response.json({ error: `Collection '${name}' not found` }, { status: 404 });
    }

    db[section][name] = items;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Collection '${name}' updated successfully`,
      data: db[section][name],
    });
  } catch {
    return Response.json({ error: `Failed to update collection` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { name } = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    if (!db[section] || !db[section][name]) {
      return Response.json({ error: `Collection '${name}' not found` }, { status: 404 });
    }

    delete db[section][name];
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Collection '${name}' deleted successfully`,
    });
  } catch {
    return Response.json({ error: `Failed to delete collection` }, { status: 500 });
  }
}
