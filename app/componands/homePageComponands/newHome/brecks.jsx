import Image from "next/image";

export default function Brecks({num}) {

    const brecks = {
        one: {
            imgDir: 'left',
            src: '/images/new/new1.jpg',
            caption: ' This winter isn’t just about staying warm — it’s about owning every moment with confidence, comfort, and effortless style. Step out, feel the chill, and let your outfit speak louder than words.'
        },
        two: {
            imgDir: 'center',
            src: '/images/new/new2.jpg',
            caption: 'Layers that tell a story — soft textures, deep tones, and timeless cuts designed for every winter mood. Because true style never fades with the cold.',
        },
        three: {
            imgDir: 'right',
            src: '/images/new/new3.jpg',
            caption: 'As the temperature drops, your style should rise. Discover the perfect balance between warmth and bold expression this season.',
        },
        four: {
            imgDir: 'center',
            src: '/images/new/new4.jpg',
            caption: 'Wrapped in comfort, made for movement, and styled for the city. This winter, redefine what cozy elegance really means.',
        },
        five: {
            imgDir: 'left',
            src: '/images/new/new5.jpg',
            caption: 'From misty mornings to cold night lights — every piece is crafted to capture the essence of winter, made for those who find beauty in the chill.',
        },
        six: {
            imgDir: 'center',
            src: '/images/new/new6.jpg',
            caption: 'Step into the season where comfort meets confidence. Each detail, each texture, each layer made to remind you that warmth can still be powerful.',
        },
        seven: {
            imgDir: 'right',
            src: '/images/new/new7.jpg',
            caption: 'Cold air, calm mind, bold look. This collection brings together timeless silhouettes and winter-ready comfort for the modern explorer.',
        },
        eight: {
            imgDir: 'center',
            src: '/images/new/new8.jpg',
            caption: 'When the world slows down for winter, your energy doesn’t have to. Wrap yourself in pieces that move with you, wherever the season takes you.',
        },
        nine: {
            imgDir: 'left',
            src: '/images/new/new9.jpg',
            caption: 'Designed to warm your body and inspire your spirit. This winter is all about finding strength in simplicity and elegance in every layer.',
        },
        ten: {
            imgDir: 'center',
            src: '/images/new/new10.jpg',
            caption: 'Don’t just dress for the cold — embrace it. Every stitch, every fold, and every fabric tells a story of winter reborn.',
        },
    }


    return(
        <div className={`container my-30 flex justify-center items-center m-auto h-screen ${brecks[num]?.imgDir === 'right' ? 'flex-row-reverse' : brecks[num]?.imgDir === 'center' ? 'flex-col' : '' }`}>
            <div className={`relative ${brecks[num]?.imgDir === 'center' ?  num === 'four' || num === 'ten' ? 'w-[30%] h-[70%]' : 'w-[40%] h-[50%]' : 'w-[50%] h-full'}`}>
                <Image
                    src={brecks[num]?.src}
                    alt=''
                    fill
                    sizes={brecks[num]?.imgDir === 'center' ?  num === 'four' || num === 'ten' ? '30vw' : '40vw' : '50vw'}
                />
                <div className=" absolute top-0 left-0 size-full bg-black/50"></div>
            </div>
            <div className={`${brecks[num]?.imgDir === 'center' ?  num === 'four' || num === 'ten' ? 'w-[30%] h-fit py-2' : 'w-[40%] h-fit py-2' : 'w-[50%] h-full p-50'} flex justify-center items-center text-[10px] font-bold font-mono uppercase text-black/50`}>
                <h1>{brecks[num]?.caption}</h1>
            </div>
        </div>
    )
}