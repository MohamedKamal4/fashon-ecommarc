import SimilerProducts from "./similerProduct";

export default async function SimilerData({ id, productCategoryName }) {

    const res = await fetch("http://localhost:3000/api/data/collections", {
      next: { revalidate: 2592000 },
    });

    const data = await res.json()

    return (
      <>
        <SimilerProducts id={id} data={data[productCategoryName]} productCategoryName={productCategoryName} />
      </>
    )
}
