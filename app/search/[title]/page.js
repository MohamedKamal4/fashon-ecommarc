import BlackLine from "../../componands/homePageComponands/more/blackLine";
import Card from "../../componands/cards/card";

export default async function SearchPage({ params }) {
  const { title } = await params;
  const searchTitle = title.toLowerCase();

  let data = null;
  let error = null;

  try {
    const res = await fetch("http://localhost:3000/api/data/collections");
    if (!res.ok) throw new Error("Failed to fetch data");
    data = await res.json();
  } catch (err) {
    console.error("Error fetching collections:", err);
    error = err.message;
  }

  const items = data?.[searchTitle];

  return (
    <>
        {items &&
            <main className="pt-40">
                <div className="relative overflow-hidden container p-10 flex-col m-auto bg-black flex gap-1 text-white text-[10px] font-bold font-mono uppercase">
                <h1>SEARCH</h1>
                <span className="w-[50px] h-[1px] bg-white"></span>
                <span>{title}</span>

                <div className="bg-white py-3 absolute rotate-45 w-full top-[5px] right-[-500px]">
                    <BlackLine title={title} />
                </div>
                <div className="bg-white py-3 absolute rotate-45 w-full top-[30px] right-[-300px]">
                    <BlackLine title={title} />
                </div>
                </div>
            </main>
        }

        <section>
            <div className="container m-auto relative min-h-screen flex justify-center items-center">
            {error ? (
                <p className="text-red-500 text-[10px] font-mono">
                Error loading data: {error}
                </p>
            ) : !items ? (
                <p className="text-black text-[10px] font-mono uppercase">No items found like [ {title} ]</p>
            ) : (
                <Card data={items} />
            )}
            </div>
        </section>
    </>
  );
}
