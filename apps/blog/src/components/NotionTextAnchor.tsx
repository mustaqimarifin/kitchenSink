'use client'
import Link from 'next/link'
import React from 'react'

import { openPane } from './AppState'

export const TextAnchor = ({
  id,
  paneContent,
  href,
  children,
}: {
  id: string
  href: string
  paneContent: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <React.Fragment key={id}>
      <Link
        shallow
        prefetch={false}
        passHref
        href={href}
        onClick={(e) => {
          openPane(href, paneContent)
          e.preventDefault()
        }}
        className="underline decoration-neutral-600 decoration-dashed decoration-1 underline-offset-2 hover:decoration-neutral-700">
        {children}
      </Link>
    </React.Fragment>
  )
}
