'use client'
import { Fragment, useEffect, useState } from "react";
import Brecks from "./brecks";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
export const revalidate = 2592000;

export default function NewProducts() {
    const [groupedProducts, setGroupedProducts] = useState([]);
    const [scrollDir, setScrollDir] = useState("down");
    const [isClient , setIsClient] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const captions = [
        "Step into winter with confidence — our men's collection blends timeless style with modern warmth for every occasion.",
        "This season, redefine your look with coats crafted for elegance, comfort, and durability.",
        "Discover the essence of masculine sophistication through our exclusive winter lineup.",
        "Every detail in our new collection tells a story of confidence, craftsmanship, and bold individuality.",
        "Classic silhouettes reimagined with luxurious fabrics — made for the man who values refinement.",
        "Stay warm without compromising on style — designed to make you stand out effortlessly.",
        "True elegance lies in subtlety, and our collection captures that with every stitch.",
        "Elevate your everyday look with outerwear that commands attention and respect.",
        "Winter fashion isn’t just about layers — it’s about layering personality with confidence.",
        "Every piece is a symbol of resilience, sophistication, and modern masculinity.",
        "Redefine winter comfort with textures that speak luxury and simplicity in harmony.",
        "Inspired by nature, built for the city — our designs fuse strength and softness.",
        "Deep, rich colors meet fine tailoring in this season’s most exclusive collection.",
        "One jacket can change your entire mood — find yours in our latest arrivals.",
        "Weather the cold in confidence with outerwear made to move with you.",
        "Every stitch is a statement — designed for men who lead, not follow.",
        "Make every day a new opportunity to express strength through refined fashion.",
        "Comfort meets sophistication in a perfect balance of design and performance.",
        "For the office or outdoors, our collection adapts to your lifestyle with ease.",
        "Style that never fades — only evolves with your confidence.",
        "Premium fabrics designed to keep you warm, stylish, and effortlessly sharp.",
        "European-inspired tailoring crafted for the modern gentleman.",
        "Luxury and simplicity blend seamlessly in our winter essentials.",
        "Add confidence to your stride with coats that make an impression.",
        "Versatile, refined, and undeniably bold — that’s winter with us.",
        "Style is not a choice, it’s an identity — and we’re here to define yours.",
        "Each layer tells a story of taste, quality, and timeless charm.",
        "Bold design, premium materials, and unmatched craftsmanship.",
        "The power of winter fashion lies in understated confidence.",
        "Wrap yourself in comfort and confidence this cold season.",
        "Elegance begins with the right details — and we’ve mastered them all.",
        "Sophisticated yet effortless — the perfect mix for any winter day.",
        "Stand out in every crowd with style that speaks for itself.",
        "Comfort doesn’t mean compromise — it means smart design.",
        "Create your own signature look with our versatile winter pieces.",
        "Trends fade, but your true style lasts forever.",
        "Winter is the season of distinction — express yours in every outfit.",
        "Our designs balance tradition with innovation for the modern man.",
        "Your jacket should do more than keep you warm — it should inspire confidence.",
        "Feel the warmth of premium craftsmanship made to last for years.",
        "From casual to formal, our collection adapts to every moment.",
        "Power, presence, and perfection — the essence of our winter collection.",
        "Every man deserves outerwear that reflects his ambition and strength.",
        "Elegance is not about effort — it’s about attitude, precision, and poise.",
        "Define your presence with layers built to impress and endure.",
        "The perfect balance between sophistication and practicality.",
        "Engineered for style. Designed for life. Made for you.",
        "Master the art of layering with pieces that elevate every outfit.",
        "Our winter essentials are more than clothing — they’re confidence in fabric form.",
        "Every moment is an opportunity to dress with intention and style.",
        "Where warmth meets modern design — that’s our promise to you.",
        "Luxury that feels as good as it looks — refined for every man.",
        "Step outside and feel unstoppable with our durable winter coats.",
        "For men who lead by example — your style should speak first.",
        "Tailored for distinction, designed for your everyday moments.",
        "Turn every winter day into a runway with pieces made to inspire.",
        "A refined touch of masculinity, wrapped in warmth and confidence.",
        "Winter elegance has never looked this effortless — explore the collection.",
        "From minimal to bold, every piece is built to complement your journey.",
        "Because real style isn’t loud — it’s quietly powerful.",
        "Discover comfort, class, and character in every layer you wear."
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${baseUrl}/api/data/products` , {
                next: { revalidate: 2592000 }
            });
            const data = await res.json();
            const allProducts = data.filter(el =>
            ['jackets', 'pants', 'hoodies'].includes(el.category)
            );
            const groups = [];
            for (let i = 0; i < allProducts.length; i += 6) {
                groups.push(allProducts.slice(i, i + 6));
            }
            const notFull = groups.filter((group) => group.length === 6);
            setGroupedProducts(notFull);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let lastScroll = window.scrollY;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const direction = currentScroll > lastScroll ? "down" : "up";
            if (direction !== scrollDir) {
                setScrollDir(direction);
                AOS.refresh();
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollDir]);
  
    useEffect(() => {
        setIsClient(true);
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            easing: 'ease-in-out',
        });
    }, []);

    if(!isClient) return null;

    return (
        <>
            <section
                data-aos={scrollDir === 'down' ? 'zoom-out' : 'zoom-in'}
                className="flex justify-center items-center my-50">
                <div className='relative w-[85%] xl:w-[30%] h-[300px] overflow-hidden'>
                    <Image
                        src='/images/new/master.jpg'
                        alt=''
                        fill
                        sizes="85vw"
                        className="scale-200"
                    />
                </div>
            </section>

            {groupedProducts.map((group, index) => (
                <Fragment key={index}>
                    <section data-aos={scrollDir === 'down' ? 'zoom-out' : 'zoom-in'}>
                        <Brecks
                            num ={ index === 0 ? "one" :
                            index === 1 ? "two" :
                            index === 2 ? "three" :
                            index === 3 ? "four" :
                            index === 4 ? "five" :
                            index === 5 ? "six" :
                            index === 6 ? "seven" :
                            index === 7 ? "eight" :
                            index === 8 ? "nine" : "ten"}
                        />
                    </section>

                    <section>
                        <div className="container m-auto flex flex-wrap">
                            {group.map((el, i) => {
                                const caption = captions[(index * 6 + i) % captions.length];
                                return (
                                    <div className={`w-full flex justify-center my-30 xl:my-0 items-center flex-col ${i % 2 !== 0 ? ' xl:flex-row-reverse' : 'xl:flex-row'}`} key={i}>
                                        <div className="w-[85%] xl:w-[50%] flex flex-col gap-10 items-center justify-center xl:px-20">
                                            <div className=" w-[80%] md:w-[40%] xl:w-[60%] h-[300px] xl:h-[400px] relative">
                                                <Image
                                                    src={el?.MainImage}
                                                    alt=''
                                                    fill                                                  
                                                    />
                                            </div>
                                            <p className="text-[10px] pb-5 xl:pb-0 font-bold leading-relaxed text-gray-700 italic">
                                                {caption}
                                            </p>
                                        </div>
                                        <div className="w-[85%] xl:w-[50%]">
                                            <Link href={`/details/${el.category}/${el.id}`}>
                                                <div className="w-full">
                                                    <Image
                                                        src={el?.images[0]}
                                                        alt=''
                                                        width={800}
                                                        height={1280}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </Fragment>
            ))}
        </>
    );
}
