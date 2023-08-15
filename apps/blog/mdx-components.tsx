import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { openPane } from '$/components/AppState'
function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')
}
const CustomLink = (props:any) => {
  const href = props.href

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))


  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }
  


  return <a target="_blank" rel="noopener noreferrer" {...props} />
}
//const rx = Math.floor(Math.random() * (255 - 0)) + 1

/* console.log(`my dick be ${rx}`)
 */

const H2 = ({ children }:any) => {
  const anchor = getAnchor(children)
  const link = `#${anchor}`
  return (
    <h3 id={anchor}>
      <a href={link} className="invisible transition duration-200 ease-in-out delay-150 hover:visible">
     {`ß${children}`}
      </a>
      
    </h3>
  )
}
const H3 = ({ children }:any) => {
  const anchor = getAnchor(children)
  const link = `#${anchor}`
  return (
    <h3 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {children}
    </h3>
  )
}
function RoundedImage(props:ImageProps) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props:any) {
  return (
    <div className="flex items-center p-1 px-4 py-3 mb-8 text-sm border rounded border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  )
}

type Card = {
  title:string
  pros?:string[]
  cons?:string[]

}
function ProsCard({ title, pros }:Card) {
  return (
    <div className="w-full p-6 my-4 border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex items-baseline mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConsCard({ title, cons }:Card) {
  return (
    <div className="w-full p-6 my-6 border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex items-baseline mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-red-500">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
const custom = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}</h1>,
    h2:H2,
    h3:H3,
    ...custom,
    /*  pre: (props: any) => (
      <Code className="mt-6 mb-4 overflow-x-auto font-mono" {...props} />
    ), */
    ...components,
  }
}
