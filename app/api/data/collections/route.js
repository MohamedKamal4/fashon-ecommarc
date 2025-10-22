import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const db = JSON.parse(data);

    // نرجّع كل الأقسام مع بعض
    return Response.json(db);
  } catch (error) {
    console.error("Error reading collections:", error);
    return Response.json({ error: "Failed to read database" }, { status: 500 });
  }
}
