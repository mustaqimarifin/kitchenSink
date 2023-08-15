import Image from 'next/image'
import Link from 'next/link'

import { type MetaData } from '$/lib/func'
import { convertDate } from '$/lib/utils'

interface BlogCardProps {
  data: Pick<MetaData, 'id' | 'image' | 'title' | 'excerpt' | 'date'>
}

export default function BlogCard({ data }: BlogCardProps) {
  return (
    <Link href={`/posts/${data.id}`}>
      <div className="overflow-hidden transition-all duration-200 bg-white border-2 shadow-md ease rounded-2xl border-stone-100 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800">
        <Image
          src={data.image}
          alt={data.title ?? 'Blog Post'}
          width={500}
          height={400}
          className="object-cover w-full h-64"
        />
        <div className="px-5 py-8 border-t h-36 border-stone-200 dark:border-stone-700 dark:bg-black">
          <h3 className="text-xl tracking-wide font-title dark:text-white">
            {data.title}
          </h3>
          <p className="my-2 italic truncate text-md text-stone-600 dark:text-stone-400">
            {data.excerpt}
          </p>
          <p className="my-2 text-sm text-stone-600 dark:text-stone-400">
            Published {convertDate(data.date)}
          </p>
        </div>
      </div>
    </Link>
  )
}
