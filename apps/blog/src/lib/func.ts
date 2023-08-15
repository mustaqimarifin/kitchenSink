import fg from 'fast-glob'
import * as fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  author: z.string(),
  excerpt: z.string(),
  title: z.string(),
  date: z.string(z.date()),
  image: z.string().nullish(),
  tags: z.array(z.string()),
  category: z.string().optional(),
})

export type MetaData = z.infer<typeof PostSchema>

const postsDirectory: string = path.join(process.cwd(), 'src/app/data')

/* const entries = await fg(['src/app/data'])
console.log(`entries`, entries) */
const fileNames: string[] = await fs.readdir(postsDirectory)
//const fileNames2: string[] = await fs.readdir(path.parse(entries).name)
console.log(`path`, fileNames)

export async function getPageData(id: string): Promise<MetaData> {
  const { postData } = require(`src/app/data/${id}`)

  const meta: MetaData = { ...postData, id: id.replace(/\.mdx/, '') }

  //const newID = postData.id.replace(/\.mdx/, '')

  return meta
}

export async function getAllPostsMeta(): Promise<MetaData[]> {
  const posts: MetaData[] = []

  for (const file of fileNames) {
    const postData = await getPageData(file)
    posts.push(postData)
  }
  posts.sort((a: MetaData, b: MetaData) => {
    return a.date < b.date ? 1 : -1
  })
  console.log('meta', posts)

  return posts
}

/* export function convertDate(date: string): string {
  return new Date(date).toDateString();
}
 */
