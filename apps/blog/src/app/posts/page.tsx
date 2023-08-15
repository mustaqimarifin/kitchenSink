import Image from 'next/image'
import Link from 'next/link'

import BlogCard from '$/components/Card'
import { getAllPostsMeta } from '$/lib/func'
import { name,vibes } from '$/lib/info'
import { convertDate } from '$/lib/utils'

export default async function Blog({ params }: { params: { domain: string } }) {
  const posts = await getAllPostsMeta()

  if (!posts) return <div>Loading...</div>

  return (
    <>
      <div className="w-full mb-20">
        {posts.length > 0 ? (
          <div className="w-full max-w-screen-xl mx-auto md:mb-28 lg:w-5/6">
            <Link href={`/posts/${posts[0].id}`}>
              <div className="relative w-full mx-auto overflow-hidden group h-80 sm:h-150 lg:rounded-xl">
                <Image
                  alt={posts[0].title ?? ''}
                  //blurDataURL={posts[0].imageBlurhash ?? placeholderBlurhash}
                  className="object-cover w-full h-full group-hover:scale-105 group-hover:duration-300"
                  width={1300}
                  height={630}
                  //placeholder="blur"
                  src={posts[0].image ?? '/placeholder.png'}
                />
              </div>
              <div className="w-5/6 mx-auto mt-10 lg:w-full">
                <h2 className="my-10 text-4xl font-title dark:text-white md:text-6xl">
                  {posts[0].title}
                </h2>
                <p className="w-full text-base dark:text-white md:text-lg lg:w-2/3">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-start w-full space-x-4">
                  <div className="relative flex-none w-8 h-8 overflow-hidden rounded-full">
                    <Image
                      alt={name}
                      className="rounded-full grayscale"
                      src={vibes}
                      placeholder="blur"
                      width={100}
                      priority
                    />
                  </div>
                  <p className="inline-block ml-3 text-sm font-semibold align-middle whitespace-nowrap dark:text-white md:text-base">
                    penis
                  </p>
                  <div className="h-6 border-l border-stone-600 dark:border-stone-400" />
                  <p className="w-10/12 m-auto my-5 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
                    {convertDate(posts[0].date)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Image
              alt="missing post"
              src="https://illustrations.popsy.co/gray/success.svg"
              width={400}
              height={400}
              className="dark:hidden"
            />
            <Image
              alt="missing post"
              src="https://illustrations.popsy.co/white/success.svg"
              width={400}
              height={400}
              className="hidden dark:block"
            />
            <p className="text-2xl font-title text-stone-600 dark:text-stone-400">
              No posts yet.
            </p>
          </div>
        )}
      </div>

      {posts.length > 1 && (
        <div className="max-w-screen-xl mx-5 mb-20 lg:mx-24 2xl:mx-auto">
          <h2 className="mb-10 text-4xl font-title dark:text-white md:text-5xl">
            More stories
          </h2>
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.slice(1).map((metadata, index) => (
              <BlogCard key={index} data={metadata} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
