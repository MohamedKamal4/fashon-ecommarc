import SimilerProducts from "./similerProduct";

export default async function SimilerData({ id, productCategoryName }) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/data/collections`, {
      next: { revalidate: 2592000 },
    });

    const data = await res.json()

    return (
      <>
        <SimilerProducts id={id} data={data[productCategoryName]} productCategoryName={productCategoryName} />
      </>
    )
}
