'use client'

import Image from "next/image";
import { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import ProductDetails from "../../details/[productCategoryName]/[id]/page";

export default function Card({ data , collections}) {
  //  حساب الجروبات مرّة واحدة فقط لما الـ data تتغير
  const groupedData = useMemo(() => {
    const groups = [];
    for (let i = 0; i < data.length; i += 5) groups.push(data.slice(i, i + 5));
    return groups;
  }, [data]);

  //  استخراج العناصر اللي مش مكتملة 5 فقط لما الجروبات تتغير
  const notFull = useMemo(
    () => groupedData.filter((group) => group.length !== 5).flat(),
    [groupedData]
  );

  //  تهيئة AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center">
      {/*  عرض الجروبات */}
      {groupedData.map((group, index) => (
        <div
          key={`group-${group[0]?.id || index}`}
          className={`w-full flex ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
        >
          {group.length === 5 && (
            <>
              {/*  أول 4 عناصر */}
              <div data-aos="fade-up" className="w-[50%] p-5 flex flex-wrap h-full">
                {group.slice(0, 4).map((el) => (
                  <div key={el.id} className="w-[50%] py-2 px-8 h-[50%]">
                    <Link href={`/details/${collections}/${el.id}`}>
                    <div className="relative card h-[80%] w-full">
                      <Image
                        src={el.MainImage}
                        alt={el.name}
                        fill
                        sizes="50vw"
                        loading="lazy"
                      />
                    </div>
                    </Link>
                    <div className="w-full text-[10px] py-5 font-bold font-mono h-[20%]">
                      <h1>{el.name}</h1>
                      <div className="flex gap-3">
                        <span>{el.price} $</span>
                        <span>-</span>
                        <span className="line-through text-red-500">
                          {el.originalPrice} $
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/*  العنصر الخامس الكبير */}
              <div data-aos="fade-up" className="w-[50%]">
                {group.slice(4, 5).map((el) => (
                  <div key={el.id} className="w-[100%]">
                    <Link href={`/details/${collections}/${el.id}`}>
                      <div className="w-full hover:text-white card h-fit relative">
                        <Image
                          src={el.images[0]}
                          alt={el.name}
                          width={800}
                          height={1280}
                          loading="lazy"
                        />
                        <div className="w-full absolute z-50 top-0 left-0 text-[10px] p-5 font-bold font-mono h-[20%]">
                          <h1>{el.name}</h1>
                          <div className="flex gap-3">
                            <span>{el.price} $</span>
                            <span>-</span>
                            <span className="line-through text-red-500">
                              {el.originalPrice} $
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {/*  العناصر المتبقية لو مفيش 5 عناصر في آخر جروب */}
      {!!notFull.length && (
        <div data-aos="fade-up" className="w-full mt-30 flex justify-center">
          {notFull.map((el) => (
            <div className="w-[25%] h-[500px] p-5" key={el.id}>
              <Link href={`/details/${collections}/${el.id}`}>
              <div className="w-full card h-[80%] relative">
                <Image
                  src={el.MainImage}
                  fill
                  alt={el.name}
                  sizes="25vw"
                  loading="lazy"
                />
              </div>
              </Link>
              <div className="w-full text-[10px] py-5 font-bold font-mono h-[20%]">
                <h1>{el.name}</h1>
                <div className="flex gap-3">
                  <span>{el.price} $</span>
                  <span>-</span>
                  <span className="line-through text-red-500">
                    {el.originalPrice} $
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
