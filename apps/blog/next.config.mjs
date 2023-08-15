import withMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'one-dark-pro',
  keepBackground: false,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ''),
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties?.className?.push('line--highlighted')
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ['word--highlighted']
  },
}

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    serverActions: true,
    //mdxRs: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'beebom.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'shorturl.at',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default withMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})(nextConfig)
