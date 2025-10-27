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
    onSubmition,
    users,
    //---------------------
    //--------orders-------
    ordersResults ,
    setOrdersResults ,
    allOrders ,
    searchOrderUserName,
    setSearchOrderUserName ,
    onSubmitionOrserSearch
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

    const orderLists = [
        { listName: 'all orders' },
        { listName: 'pending orders' },
        { listName: 'completed orders' }
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

    const usersContent = () => (
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
                <li className="p-2 bg-white text-black text-[10px]">{users.length}</li>
            </ul>
        </div>
    )

    const orders = () => (
        <div className="w-full">
            <ul className="flex w-full z-50 justify-center items-center py-2 gap-5 bg-black">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onSubmitionOrserSearch()
                }} className="w-[50%]">
                    <input value={searchOrderUserName} onChange={(e) => {
                        setSearchOrderUserName(e.target.value)
                    }} className="bg-white w-full text-black py-2 placeholder:text-[10px] placeholder:uppercase placeholder:text-black placeholder:font-bold placeholder:font-mono px-2 focus:outline-0 text-[10px]" type="text" placeholder="search by user name..." />
                </form>
                {orderLists.map((li, index) => (
                    <li key={index}>
                        <button onClick={() => {
                            setOrdersResults(li.listName)
                        }} className={`text-[10px] cursor-pointer px-5 py-2 font-bold font-mono uppercase ${ordersResults === li.listName ? 'bg-white text-black' : 'text-white'}`}>
                            {li.listName}
                        </button>
                    </li>
                ))}
                <li className="p-2 bg-white text-black text-[10px]">{allOrders.length}</li>
            </ul>
        </div>
    )

    return (
        <>
            {result === 'products' && products()}
            {result === 'users' && usersContent()}
            {result === 'orders' && orders()}
        </>
    );
}
