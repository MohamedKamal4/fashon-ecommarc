export default function Toest({msg}){

    return(
        <div className={`fixed ${msg === null ? 'bottom-[-200px]' : 'bottom-[20px]'} z-[1000000] transition-[5s] size-fit left-[20px]`}>
            {msg}
        </div>
    )
}