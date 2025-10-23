import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/data/db.json");

export function readData() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🧠 دالة لتحديث db.orders لتكون نسخة متزامنة مع كل users[i].orders
export function syncOrdersWithUsers() {
  const db = readData();

  const allOrders = db.users.flatMap(user =>
    (user.orders || []).map(order => ({
      ...order,
      userId: user.id,
      userName: user.username,
      userEmail: user.email,
    }))
  );

  db.orders = allOrders;
  writeData(db);

  return allOrders;
}
