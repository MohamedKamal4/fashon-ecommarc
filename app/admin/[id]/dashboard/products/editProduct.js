export async function EditProduct(item, formData, setIsLoading, setMsg, setAllData, newSizes) {

  try {
    setIsLoading(true);

    const newData = {
      name: formData.name,
      discription: formData.discription,
      price: formData.price,
      originalPrice: formData.originalPrice,
      quantity: formData.quantity,
      sizes: newSizes,
      category: formData.category,
      images: [
            formData.images.first,
            formData.images.second,
      ],
      MainImage: formData.MainImage,
    };

    const res = await fetch(`http://localhost:3000/api/data/products/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    
    console.log(data)

    if (!res.ok) {
      throw new Error(data.error || "حدث خطأ أثناء تعديل المنتج");
    }

    setAllData(prev => prev.map(p => (p.id === item.id ? data : p)));

    setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-green-600 text-white uppercase">
            the product updated
        </p>
    )

  } catch (err) {
    console.error(err);
    setMsg(
        <p className="px-10 py-3 text-[10px] font-bold font-mono bg-red-600 text-white uppercase">
            Error edit product
        </p>
    )
  } finally {
    setIsLoading(false);
  }
}
