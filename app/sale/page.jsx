import Card from '../componands/cards/card'
import Head from '../componands/pagesHead/head'
import BlackLine from '../componands/homePageComponands/more/blackLine'
import AllData from "../../db.json"; 

export default async function SalePage() {
  const data = AllData.sale

    return (
        <>
            <Head pageName={'sale'} />
            <section>
                <BlackLine title={'Sale'} />
                <div className="container m-auto relative">
                    <Card data={data} sale={true} />
                </div>
            </section>
        </>
    );
}
