import Card from '../componands/cards/card'
import Head from '../componands/pagesHead/head'
import BlackLine from '../componands/homePageComponands/more/blackLine'

export const revalidate = 2592000; 

export default async function SalePage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    let data = [];

    try {
        const res = await fetch(`${baseUrl}/api/data/sale`, {
            next: { revalidate: 2592000 },
        });

        if (!res.ok) throw new Error("Failed to fetch best sellers");

        data = await res.json();
    } catch (error) {
        console.error("❌ Error fetching sale data:", error.message);
    }

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
