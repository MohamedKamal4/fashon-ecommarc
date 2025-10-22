    
export function addProducts(formData , setMsg , setAllData , setProductDetails , setIsLoading) {
  setIsLoading(true)
  const randomNumbers = Math.floor(100 + Math.random() * 900);

  fetch(`http://localhost:3000/api/data/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      brand: "VALERIO COSTA",
      quantity: formData.quantity,
      discription: formData.discription,
      price: formData.price,
      originalPrice: formData.originalPrice,
      currency: "USD",
      soldCount: randomNumbers, 
      sizes: formData.sizes,
      images: [
        formData.images.first,
        formData.images.socend,
      ],
      inStock: true,
      category: formData.category,
      MainImage: formData.MainImage,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        setAllData((prev) => [...prev , res.data])
        setProductDetails({
            state: false ,
            data: {}
        })
        setIsLoading(false)
        setMsg(
            <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
                product added
            </p>
        );
    })
    .catch((err) => {
        setMsg(
            <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
                Error adding product
            </p>
        );
        console.error("Error adding product:", err);
    });
}
