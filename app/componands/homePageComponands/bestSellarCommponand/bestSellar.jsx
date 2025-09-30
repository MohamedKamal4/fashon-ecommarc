import BestSellarSlide from './slide'

export default async function BestSellar(){

    
    const bestSellar = [
        {
        "id": 1,
        "name": "CHECK STRUCTURE JACKET",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Relaxed fit jacket made in fabric with cotton. High collar and long sleeve finished in buttoned cuff. Welt pockets at hip. Interior pocket detail. Front zip fastening.",
        "price": "319",
        "originalPrice": "362",
        "currency": "USD",
        "soldCount": 450,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'1.png',
        "images": [
            "https://static.zara.net/assets/public/839b/a364/45ed4c5e96ae/3a8eb215b290/06754897099-p/06754897099-p.jpg?ts=1758270025136&w=750",
            "https://static.zara.net/assets/public/cc41/8edb/db314d8a92f1/919c453e85cd/06754897099-a3/06754897099-a3.jpg?ts=1758270022386&w=563"
        ],
        "inStock": true,
        "category": "jacket",
        "MainImage": "https://static.zara.net/assets/public/9424/bb1b/1e0e47938039/f3cb0fe745c6/06754897099-000-e1/06754897099-000-e1.jpg?ts=1758278913912&w=563"
        },
        {
        "id": 2,
        "name": "STRAIGHT FIT CARGO JEANS",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Straight leg jeans with a relaxed fit from the hip to the ankle, featuring side pockets. Mid-rise. Non-stretch fabric.Front pockets and patch pockets on the back. Patch pockets with flaps on the legs. Faded effect. Zip fly and button fastening.",
        "price": "310",
        "originalPrice": "320",
        "currency": "USD",
        "soldCount": 359,
        "sizes": [
            "30",
            "32",
            "34",
            "36",
            "38",
            "40"
        ],
        'home':'2.png',
        "images": [
            "https://static.zara.net/assets/public/9bae/ae69/adbf43968ca8/26dfa7c1b6fe/08062373800-a3/08062373800-a3.jpg?ts=1758271377270&w=563",
            "https://static.zara.net/assets/public/41aa/4aae/6f7c4c1787dd/e06625fd01e3/08062373800-a5/08062373800-a5.jpg?ts=1758271377215&w=563"
        ],
        "inStock": true,
        "category": "jeans",
        "MainImage": 'https://static.zara.net/assets/public/963e/fd43/3d3d423b94b3/438dfc69d884/08062373800-e1/08062373800-e1.jpg?ts=1758202171922&w=563'
        },
        {
        "id": 3,
        "name": "TEXTURED T-SHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": 'Regular fit T-shirt with a round neckline and short sleeves.',
        "price": "384",
        "originalPrice": "400",
        "currency": "USD",
        "soldCount": 352,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'3.png',
        "images": [
            "https://static.zara.net/assets/public/9413/2b0b/97824a94847e/7e9ca0bc67a7/09240417524-a3/09240417524-a3.jpg?ts=1747395935603&w=563",
            "https://static.zara.net/assets/public/e54f/6ef6/b5f44388b57f/ff8691c959c8/09240417524-a2/09240417524-a2.jpg?ts=1747395935807&w=563"
        ],
        "inStock": true,
        "category": "t - shirts",
        "MainImage": 'https://static.zara.net/assets/public/1969/df72/511e48f7ad68/f96da17ac2e5/09240417524-e1/09240417524-e1.jpg?ts=1747215482925&w=563'
        },
        {
        "id": 4,
        "name": "WASHED EFFECT STRIPED SHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Relaxed fit shirt made from cotton fabric. Featuring a spread collar, long sleeve finished with buttoned cuffs, a washed effect, a hem with side vents and a button-up front.",
        "price": "474",
        "originalPrice": "490",
        "currency": "USD",
        "soldCount": 378,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'4.png',
        "images": [
            "https://static.zara.net/assets/public/4725/42df/975c40bbb53d/00231872eb80/05679769798-a3/05679769798-a3.jpg?ts=1749027406458&w=563",
            "https://static.zara.net/assets/public/9372/56f3/77d1413487ae/952bd7dda68f/05679769798-a4/05679769798-a4.jpg?ts=1749027406548&w=563"
        ],
        "inStock": true,
        "category": "shirt",
        "MainImage": 'https://static.zara.net/assets/public/2771/a83c/e5d540a8b67f/3d2af6fe85ef/05679769798-e1/05679769798-e1.jpg?ts=1748934877786&w=563'
        },
        {
        "id": 5,
        "name": "WASHED QUARTER-ZIP SWEATSHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Boxy fit sweatshirt. High neck with a front zip fastening. Long sleeves. Washed effect. Ribbed trims.",
        "price": "474",
        "originalPrice": "490",
        "currency": "USD",
        "soldCount": 482,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'5.png',
        "images": [
            "https://static.zara.net/assets/public/9e4b/322e/72624f77870a/0ebc40ee19ba/03443335826-a1/03443335826-a1.jpg?ts=1758123379741&w=850",
            "https://static.zara.net/assets/public/abb7/17e9/6df14a3c8740/e9db33824e91/03443335826-a3/03443335826-a3.jpg?ts=1758123379475&w=563"
        ],
        "inStock": true,
        "category": "sweetshirt",
        "MainImage": 'https://static.zara.net/assets/public/c8d6/8273/b6f7467fac06/7c4cfa5c22f2/03443335826-e1/03443335826-e1.jpg?ts=1758031876223&w=563'
        },
        {
        "id": 6,
        "name": "BASIC HOODIE",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Relaxed fit hoodie sweatshirt made of cotton fabric with a looped lining. Hoodie neck and long sleeves. Front kangaroo pocket. Ribbed trims.",
        "price": "415",
        "originalPrice": "440",
        "currency": "USD",
        "soldCount": 302,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'6.png',
        "images": [
            "https://static.zara.net/assets/public/abd2/ea22/7bda419cb92a/3bf0d166ec56/00761370406-a1/00761370406-a1.jpg?ts=1755075878083&w=850",
            "https://static.zara.net/assets/public/004b/97dd/6be749d08195/4e679b6224cb/00761370406-a3/00761370406-a3.jpg?ts=1755075877108&w=563"
        ],
        "inStock": true,
        "category": "hoodie",
        "MainImage": 'https://static.zara.net/assets/public/8194/b294/84da48e5b438/b0c63f16dbe2/00761370406-e1/00761370406-e1.jpg?ts=1754922129691&w=563'
        },
        {
        "id": 7,
        "name": "RELAXED PUFFER JACKET",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Relaxed fit pueffer jacket made from technical fabric that repels water on contact. The fabric helps keep you dry during short periods of light drizzle. It also offers good protection against wind penetration.High collar with an integrated hood detail. Long sleeves finished with elasticated cuffs. Welt pockets at the hip and an inside pocket detail. Hem adjustable with elasticated sides. Zip-up front fastening.",
        "price": "490",
        "originalPrice": "530",
        "currency": "USD",
        "soldCount": 722,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'7.png',
        "images": [
            "https://static.zara.net/assets/public/9395/1451/370f404faa16/2229f267514b/03918415800-a3/03918415800-a3.jpg?ts=1756380972464&w=563",
            "https://static.zara.net/assets/public/8695/8a84/64874a7bb4f4/6d988d4618ca/03918415800-a5/03918415800-a5.jpg?ts=1756380972221&w=563"
        ],
        "inStock": true,
        "category": "jacket",
        "MainImage": 'https://static.zara.net/assets/public/d9ff/dc19/a4f7440a811e/af58932362fc/03918415800-e1/03918415800-e1.jpg?ts=1756372480336&w=563'
        },
        {
        "id": 8,
        "name": "FLARED FIT JEANS",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Fitted at the top and opening into a flare from the knee. Mid-rise. Rigid fabric.Five pockets. Washed effect. Zip fly and button fastening.",
        "price": "410",
        "originalPrice": "460",
        "currency": "USD",
        "soldCount": 482,
        "sizes": [
            "30",
            "32",
            "34",
            "36",
            "38",
            "40"
        ],
        'home':'8.png',
        "images": [
            "https://static.zara.net/assets/public/0bc3/4058/58064397bb1a/bee678154a60/00840304406-a1/00840304406-a1.jpg?ts=1756390617292&w=850",
            "https://static.zara.net/assets/public/7296/3ef0/4e35439abf86/532e256e218f/00840304406-a2/00840304406-a2.jpg?ts=1756390617123&w=563"
        ],
        "inStock": true,
        "category": "jeans",
        "MainImage": 'https://static.zara.net/assets/public/006c/e537/3b4d4fd29335/869b1c5cee66/00840304406-e1/00840304406-e1.jpg?ts=1756976187009&w=563'
        },
        {
        "id": 9,
        "name": "WASHED PRINT KNIT T-SHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": "Relaxed fit knitted T-shirt in cotton yarn. Waffle-knit texture. Crew neck and short sleeves. Contrasting combination prints on the front. Washed effect. Irregular trims.The garment has a unique appearance thanks to its special washing process. For this reason, the colour may differ slightly from that shown in the photo.",
        "price": "370",
        "originalPrice": "410",
        "currency": "USD",
        "soldCount": 1082,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'9.png',
        "images": [
            "https://static.zara.net/assets/public/c260/14d7/2c4a4c77a0fa/cac1a99316ea/04805322519-p/04805322519-p.jpg?ts=1758030387525&w=750",
            "https://static.zara.net/assets/public/a696/dc8a/e525428598b5/79b42d91b16a/04805322519-a1/04805322519-a1.jpg?ts=1758030465351&w=850"
        ],
        "inStock": true,
        "category": "t-shirt",
        "MainImage": 'https://static.zara.net/assets/public/3c18/9529/4129487ca1e3/005d332d58e4/04805322519-e1/04805322519-e1.jpg?ts=1758006253283&w=563'
        },
        {
        "id": 10,
        "name": "100% LINEN SHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": 'Regular fit shirt made of linen fabric. Features a lapel collar and long sleeves with buttoned cuffs. Chest patch pocket. Button-up front.',
        "price": "390",
        "originalPrice": "450",
        "currency": "USD",
        "soldCount": 912,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'10.png',
        "images": [
            "https://static.zara.net/assets/public/416c/c0e1/e62b48919465/1e979bea8a5e/01063310250-a1/01063310250-a1.jpg?ts=1740495610477&w=850",
            "https://static.zara.net/assets/public/8c0a/9986/2f5040559c18/dbf49713e2ae/01063310250-a3/01063310250-a3.jpg?ts=1740495610306&w=563"
        ],
        "inStock": true,
        "category": "shirt",
        "MainImage": 'https://static.zara.net/assets/public/b8c4/39ca/a0da4c68a46d/9118378bbe08/01063310250-e1/01063310250-e1.jpg?ts=1740473421153&w=563'
        },
        {
        "id": 11,
        "name": "RELAXED FIT CREW NECK SWEATSHIRT",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": 'Relaxed fit sweatshirt made of cotton fabric with a looped interior - Crew neck and long sleeves - Ribbed trims.',
        "price": "490",
        "originalPrice": "550",
        "currency": "USD",
        "soldCount": 792,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'11.png',
        "images": [
            "https://static.zara.net/assets/public/4bf7/a512/00604570bd63/6267c693da39/04231308803-a1/04231308803-a1.jpg?ts=1758284566334&w=850",
            "https://static.zara.net/assets/public/0b3e/b632/ed9b4041921c/735013de3d34/04231308803-a3/04231308803-a3.jpg?ts=1758284566207&w=563"
        ],
        "inStock": true,
        "category": "sweetshirt",
        "MainImage": 'https://static.zara.net/assets/public/7387/1b3d/8d2c4e7a808c/184ec5d11c7c/04231308803-e1/04231308803-e1.jpg?ts=1758010761034&w=563'
        },
        {
        "id": 12,
        "name": "BOXY FIT HOODIE",
        "brand": "VALERIO COSTA",
        "quantity": 10,
        "discription": 'Boxy fit hoodie made in compact cotton fabric with a looped lining. Hoodie collar and long sleeves. Front kangaroo pockets. Elasticated trims. Zip-up fastening on the front. Washed effect.The garment has a unique appearance thanks to its special washing process. For this reason, its colour may differ slightly from the photo.',
        "price": "490",
        "originalPrice": "550",
        "currency": "USD",
        "soldCount": 792,
        "sizes": [
            "L",
            "M",
            "S",
            "XL",
            "XXL"
        ],
        'home':'12.png',
        "images": [
            "https://static.zara.net/assets/public/d8d5/d6d7/5c9648f4b07c/c6496a4beba5/04729302110-a1/04729302110-a1.jpg?ts=1754581727842&w=850",
            "https://static.zara.net/assets/public/f869/b371/2c31415caf53/12cd92fe1aea/04729302110-a3/04729302110-a3.jpg?ts=1754581727811&w=563"
        ],
        "inStock": true,
        "category": "hoodie",
        "MainImage": 'https://static.zara.net/assets/public/2709/8250/69774794bc58/11c0ff66af4e/04729302110-e1/04729302110-e1.jpg?ts=1754557414755&w=563'
        },
    ]

    return(
        <>
            <BestSellarSlide data={bestSellar} />
        </>
    )
}