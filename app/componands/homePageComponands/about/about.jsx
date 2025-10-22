import BlackLine from "../more/blackLine";

export default function About(){

    return(
        <section className="bg-black" id="about">
            <BlackLine title={'ABOUT US'} />
            <div className=" container m-auto flex h-screen gap-5 flex-col justify-center items-center">
                <p className=" text-[10px] md:text-[12px] w-[90%] text-center font-bold font-mono text-white">
                    At <span className=" text-[12px] md:text-[15px]">BOLD & WORTH</span> we believe fashion is more than clothing – it’s a statement. Founded with the vision of empowering individuals to express themselves fearlessly, our brand merges bold design with timeless worth.
                </p>
                <p className=" text-[10px] md:text-[12px] w-[90%] text-center font-bold font-mono text-white">
                    From sharp tailoring to effortless streetwear, every piece we create is crafted with attention to detail, premium fabrics, and a commitment to sustainability. We’re not just about looking good – we’re about feeling unstoppable.
                </p>
                <p className=" text-[10px] md:text-[12px] w-[90%] text-center font-bold font-mono text-white">
                    Our collections are designed for those who dare to stand out, break the mold, and wear their confidence proudly.<br /> Whether you’re dressing for the office, the weekend, or a night out, <span className=" text-[12px] md:text-[15px]">BOLD & WORTH</span> ensures you look as fearless as you feel.
                </p>
                <p className=" text-[12px] w-[90%] text-center font-bold font-mono text-white uppercase">Join the movement. Wear your worth.</p>
                <div className="w-[90%] md:w-[60%]">
                    <form className="w-full flex bg-white">
                        <input className="text-black border-0 text-[8px] md:text-[10px] px-5 pb-2 pt-2 md:pt-1 w-[70%] outline-0 bg-transparent focus:outline-0 placeholder:text-[8px] md:placeholder:text-[10px] placeholder:m-0 flex items-center placeholder:text-black placeholder:font-mono placeholder:font-bold" type="email" placeholder="YOUR EMAIL" />
                        <button type="button" className="text-black cursor-pointer border-0 px-5 py-2 w-[30%] outline-0 bg-transparent text-[8px] md:text-[10px] text-center font-bold font-mono">SUBSCRIBE NOW</button>
                    </form>
                </div>
            </div>
        </section>
    )
}