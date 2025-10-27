export async function RequestData() {
  try {
    const [resSale, resBestSeller] = await Promise.all([
      fetch('http://localhost:3000/api/data/sale'),
      fetch('http://localhost:3000/api/data/bestSellers'),
    ]);

    const [saleData, bestSellerData] = await Promise.all([
      resSale.json(),
      resBestSeller.json(),
    ]);

    return {
      saleData,
      bestSellerData,
    };

  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
