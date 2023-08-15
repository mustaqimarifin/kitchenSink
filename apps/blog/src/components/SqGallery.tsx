
import Image from 'next/image'
import Link from 'next/link'

//import { type Photos, type TestGallery } from '$/config/marketing'
import { type MetaData } from '$/lib/func'
import { convertDate } from '$/lib/utils'



export const BlogCard = (data: any[]) => {
return (
  <section className="cf w-100 pa2-ns">
          {data.map((s) => (
           
                <article className="w-full fl w-50-m w-25-ns pa2-ns">
                      <div className="aspect-ratio aspect-ratio--1x1">
      <img src={s.src} className="bg-center db cover aspect-ratio--object" />
    </div>
    <a href="#0" className="ph2 ph0-ns pb3 link db">
      <h3 className="f5 f4-ns mb0 black-90">{s.title}</h3>
      <h3 className="f6 f5 fw4 mt2 black-60">{s.sub} </h3>
  </a>
                </article>


         

             ))}  
    </section>
)
     
}
            

  
  
