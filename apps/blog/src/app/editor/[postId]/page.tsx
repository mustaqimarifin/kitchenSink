import { notFound, redirect } from 'next/navigation'

import Editor from '$/components/TipTap'

/* async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  })
} */

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  /*   const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  } */

  return <Editor />
}
