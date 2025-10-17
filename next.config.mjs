// next.config.mjs
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const baseConfig = {
  experimental: { typedRoutes: true }
}

const withMDX = createMDX({
  // You can add remark/rehype plugins here later
})

export default withMDX({
  ...baseConfig,
  pageExtensions: ['ts', 'tsx', 'mdx']   // ← allows .mdx pages/components
})
