import Card from "../componands/cards/card";
import Head from "../componands/pagesHead/head";
import BlackLine from "../componands/homePageComponands/more/blackLine";
import AllData from "../../db.json"; 

export default function BestSellar() {
  const data = AllData.bestSellers
  return (
    <>
      <Head pageName="bestSellar" />
      <section>
        <BlackLine title="best Sellar" />
        <div className="container m-auto">
          {data.length > 0 ? (
            <Card data={data} solded={true} />
          ) : (
            <p className="text-center text-gray-500 py-10">
              No best sellers available at the moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
