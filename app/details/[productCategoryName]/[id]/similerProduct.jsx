'use client'

import { useMemo } from "react"
import BlackLine from '../../../componands/homePageComponands/more/blackLine'
import Card from "../../../componands/cards/card"

export default function SimilerProducts({ id, data , productCategoryName }) {
 
  const similerProducts = useMemo(() => {
    if (!data) return []
    return data.filter((item) => item.id !== id)
  }, [data, id])

  return (
    <section className="py-30">
      <BlackLine title={'SIMILER'} />
      <div className="container m-auto pt-30">
        <Card data={similerProducts} collections={productCategoryName} />
      </div>
    </section>
  )
}
