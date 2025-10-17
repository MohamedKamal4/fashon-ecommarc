import Card from "../../componands/cards/card";
import Head from "../../componands/pagesHead/head";

export const revalidate = 2592000;

export default async function CollectionPage({ params }) {
  const { collections } = await params;

  const res = await fetch("http://localhost:3000/api/data/collections", {
    next: { revalidate: 2592000 },
  });

  if (!res.ok) throw new Error("Failed to fetch collections");

  const allCollections = await res.json();
  const data = allCollections[collections] || [];

  return (
    <>
      <Head pageName={collections} />
      <section className="mt-30">
        <div className="container m-auto relative">
          <Card data={data} collections={collections} />
        </div>
      </section>
    </>
  );
}
