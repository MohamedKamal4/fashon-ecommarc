import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/data/db.json");

// دوال مساعدة
function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error("❌ Error reading DB:", error);
    throw new Error("Failed to read DB");
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Error writing DB:", error);
    throw new Error("Failed to write DB");
  }
}

// 🟢 GET — جلب بيانات المستخدم حسب ID
export async function GET(req, { params }) {
  try {
    const { userId } = params;
    const db = readData();

    const user = db.users.find(u => String(u.id) === String(userId));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 🟡 PUT — تعديل بيانات المستخدم
export async function PUT(req, { params }) {
  try {
    const { userId } = params;
    const updatedUser = await req.json();
    const db = readData();

    const index = db.users.findIndex(u => String(u.id) === String(userId));
    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users[index] = { ...db.users[index], ...updatedUser };

    writeData(db);
    return NextResponse.json({
      message: "User updated successfully",
      user: db.users[index],
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 🟡 POST — (اختياري) إضافة بيانات فرعية للمستخدم مثل بيانات البروفايل أو الإعدادات
export async function POST(req, { params }) {
  try {
    const { userId } = params;
    const newData = await req.json();
    const db = readData();

    const user = db.users.find(u => String(u.id) === String(userId));
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // دمج البيانات الجديدة مع القديمة
    Object.assign(user, newData);
    writeData(db);

    return NextResponse.json({
      message: "User data added successfully",
      user,
    });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 🔴 DELETE — حذف المستخدم بالكامل
export async function DELETE(req, { params }) {
  try {
    const { userId } = params;
    const db = readData();

    const filteredUsers = db.users.filter(u => String(u.id) !== String(userId));

    if (filteredUsers.length === db.users.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    db.users = filteredUsers;
    writeData(db);

    return NextResponse.json({ message: `User ${userId} deleted successfully` });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
