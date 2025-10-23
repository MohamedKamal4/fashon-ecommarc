import BtnList from "./btnList";

export const revalidate = 2592000; 

export default async function New() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-app-name.vercel.app";

  let data = { jackets: [], hoodies: [], pants: [] }; 

  try {
    const res = await fetch(`${baseUrl}/api/data/collections`, {
      next: { revalidate: revalidate }
    });

    if (!res.ok) {
      console.error("Failed to fetch collections:", res.status);
    } else {
      data = await res.json();
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
  }

  const AllProducts = [...data.jackets, ...data.hoodies, ...data.pants];

  return <BtnList data={data} AllProducts={AllProducts} />;
}
