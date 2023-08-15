import fg from 'fast-glob'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

//import './mdx.css'
import { getAllPostsMeta, getPageData } from '$/lib/func'

export default async function Post({ params }: { params: { id: string } }) {
  //const entries = await fg(['../data'], { dot: true })
  const { id } = params
  const posts = await fg(`src/app/data/*.mdx`)
  console.log(`posts::`, posts)
  const Post = dynamic(() => import(`src/app/data/${id}.mdx`))
  const postData = await getPageData(`${id}.mdx`)
  const { title, author, date } = postData
  //const convertedDate = convertDate(date);

  if (!Post) return <div>Loading...</div>

  return (
    <section key={id}>
      <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
        <div>{title}</div>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        {/*  <ViewCounter allViews={allViews} slug={post.slug} trackView /> */}
      </div>
      <Suspense>
              <section className="flex flex-col max-w-2xl mx-4 mt-8 mb-40 antialiased bg-gray-50 md:flex-row lg:mx-auto">
        <div className="flex flex-col flex-auto min-w-0 px-2 mt-6 md:px-0">
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          <Post />
        </article>
        </div>
      </section>
      </Suspense>
      <p className="text-xs text-neutral-600 dark:text-neutral-400"></p>
    </section>
  )
}

// generate route segments
export async function generateStaticParams() {
  const posts = await getAllPostsMeta()

  return posts
}
