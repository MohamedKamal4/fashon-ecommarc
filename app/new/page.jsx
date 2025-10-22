import BtnList from "./btnList";
import data from "../../db.json"; 

export const revalidate = 2592000;

export default async function New() {
  // ✅ جلب البيانات مباشرة بدون fetch
  const collections = data.collections || {};
  const AllProducts = [
    ...(collections.jackets || []),
    ...(collections.hoodies || []),
    ...(collections.pants || []),
  ];

  return <BtnList data={collections} AllProducts={AllProducts} />;
}
