export function deleteProducts(productDetails , setProductDetails , setMsg , setAllData , setIsLoading) {
    setIsLoading(true)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    fetch(`${baseUrl}/api/data/products/${productDetails.data.id}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then((res) => {
        setProductDetails({ state: false, data: {} });
        setMsg(
            <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
                product deleted
            </p>
        );
        setAllData((prev) =>
            prev.filter((item) => item.id !== productDetails.data.id)
        );
        setIsLoading(false)
    })
    .catch((err) => {
        console.error(err);
        setMsg(
            <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                product deletion failure
            </p>
        );
    });
}