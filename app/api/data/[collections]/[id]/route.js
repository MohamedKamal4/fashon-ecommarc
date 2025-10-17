import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

// 🔵 GET — جلب عنصر واحد من أي قسم (products, orders, collections...)
export async function GET(req, { params }) {
  const { collections, id } = params;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    // تحقق من وجود القسم
    const section = db[collections];
    if (!section) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    // ابحث عن العنصر داخل القسم
    const item = section.find((el) => Number(el.id) === Number(id));

    if (!item) {
      return Response.json({ error: `Item with id ${id} not found in ${collections}` }, { status: 404 });
    }

    return Response.json(item);
  } catch (error) {
    console.error("Error reading item:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 🟠 PUT — تعديل عنصر داخل أي قسم
export async function PUT(req, { params }) {
  const { collections, id } = params;

  try {
    const updatedData = await req.json();
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const section = db[collections];
    if (!section) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    const index = section.findIndex((el) => Number(el.id) === Number(id));
    if (index === -1) {
      return Response.json({ error: `Item with id ${id} not found in ${collections}` }, { status: 404 });
    }

    section[index] = { ...section[index], ...updatedData };
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Item with id ${id} updated successfully in ${collections}`,
      data: section[index],
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// 🔴 DELETE — حذف عنصر من أي قسم
export async function DELETE(req, { params }) {
  const { collections, id } = params;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    const section = db[collections];
    if (!section) {
      return Response.json({ error: `Section '${collections}' not found` }, { status: 404 });
    }

    const newSection = section.filter((el) => Number(el.id) !== Number(id));

    if (newSection.length === section.length) {
      return Response.json({ error: `Item with id ${id} not found in ${collections}` }, { status: 404 });
    }

    db[collections] = newSection;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2));

    return Response.json({
      success: true,
      message: `Item with id ${id} deleted successfully from ${collections}`,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
