import BtnList from "./btnList";
import data from "../../db.json"; 

export const revalidate = 2592000;

export default async function New() {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/data/collections` , {
          next: { revalidate: 2592000 }
      });
      const data = await res.json();
      const AllProducts = [...data.jackets, ...data.hoodies, ...data.pants];
  return <BtnList data={collections} AllProducts={AllProducts} />;
}
