export default function NavDashboard({ 
    //---------main--------
    result ,
    //---------------------
    //-------products------
    dataList ,
    setDataList 
    //---------------------
}) {
    const productsList = [
        { listName: 'all' },
        { listName: 'pants' },
        { listName: 'tshirts' },
        { listName: 'shirts' },
        { listName: 'hoodies' },
        { listName: 'shoes' },
        { listName: 'jackets' },
    ];

    const products = () => (
        <div className="w-full">
            <ul className="flex w-full z-50 justify-center items-center py-2 gap-5 bg-black">
                {productsList.map((li, index) => (
                    <li key={index}>
                        <button onClick={() => {
                            setDataList(li.listName)
                        }} className={`text-[10px] cursor-pointer px-5 py-2 font-bold font-mono uppercase ${dataList === li.listName ? 'bg-white text-black' : 'text-white'}`}>
                            {li.listName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            {result === 'products' && products()}
        </>
    );
}
