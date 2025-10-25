export default function NavDashboard({ 
    //---------main--------
    result ,
    //---------------------
    //-------products------
    dataList ,
    setDataList,
    //---------------------
    //--------users--------
    results,
    setResults ,
    searchUserName ,
    setSearchUserName ,
    onSubmition
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

    const usersList = [
        { listName: 'all' },
        { listName: 'active' },
        { listName: 'blocked' }
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

    const users = () => (
        <div className="w-full">
            <ul className="flex w-full z-50 justify-center items-center py-2 gap-5 bg-black">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmition()
                }} className="w-[50%]">
                    <input value={searchUserName} onChange={(e) => {
                        setSearchUserName(e.target.value)
                    }} className="bg-white w-full text-black py-2 placeholder:text-[10px] placeholder:uppercase placeholder:text-black placeholder:font-bold placeholder:font-mono px-2 focus:outline-0 text-[10px]" type="text" placeholder="search by user name..." />
                </form>
                {usersList.map((li, index) => (
                    <li key={index}>
                        <button onClick={() => {
                            setResults(li.listName)
                        }} className={`text-[10px] cursor-pointer px-5 py-2 font-bold font-mono uppercase ${results === li.listName ? 'bg-white text-black' : 'text-white'}`}>
                            {li.listName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            {result === 'products' && products()}
            {result === 'users' && users()}
        </>
    );
}
