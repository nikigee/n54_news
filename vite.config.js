import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const SITE_NAME = 'Network 54'

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function getSiteOrigin() {
  const configured = process.env.SITE_URL || process.env.VITE_SITE_URL
  if (configured) return configured.replace(/\/+$/, '')

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`

  return ''
}

function toAbsoluteUrl(origin, relativePath) {
  if (!relativePath) return ''
  if (/^https?:\/\//i.test(relativePath)) return relativePath
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return origin ? `${origin}${normalized}` : normalized
}

function pickEmbedImage(article) {
  const isDiscordFriendly = (url) => Boolean(url) && !/\.avif(\?|$)/i.test(url)
  if (isDiscordFriendly(article.img_url)) return article.img_url

  if (article.content) {
    const matches = [...article.content.matchAll(/<img[^>]+src="([^"]+)"/gi)]
    for (const match of matches) {
      if (isDiscordFriendly(match[1])) return match[1]
    }
  }

  return '/og-image.jpg'
}

function replaceMetaTag(html, attrName, attrValue, content) {
  const escapedContent = escapeHtml(content)
  const regex = new RegExp(
    `(<meta\\s+${attrName}="${attrValue}"\\s+content=")[^"]*(")`,
    'i',
  )
  return html.replace(regex, `$1${escapedContent}$2`)
}

function articleEmbedPagesPlugin() {
  let outDir = 'dist'
  let rootDir = process.cwd()

  return {
    name: 'n54-article-embed-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
      rootDir = config.root
    },
    transformIndexHtml(html) {
      const origin = getSiteOrigin()
      if (!origin) return html

      let updated = html
      updated = replaceMetaTag(updated, 'property', 'og:image', toAbsoluteUrl(origin, '/og-image.jpg'))
      updated = replaceMetaTag(updated, 'name', 'twitter:image', toAbsoluteUrl(origin, '/og-image.jpg'))
      updated = updated.replace(
        '<meta property="og:type" content="website">',
        `<meta property="og:type" content="website">\n    <meta property="og:url" content="${escapeHtml(origin)}/">`,
      )
      return updated
    },
    closeBundle() {
      const distPath = path.resolve(rootDir, outDir)
      const templatePath = path.join(distPath, 'index.html')
      const dataPath = path.resolve(rootDir, 'src/assets/article_data.json')

      if (!fs.existsSync(templatePath) || !fs.existsSync(dataPath)) return

      const origin = getSiteOrigin()
      const baseHtml = fs.readFileSync(templatePath, 'utf8')
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      const allArticles = [
        ...(data.featured ?? []),
        ...(data.new_articles ?? []),
        ...(data.articles ?? []),
        ...(data.advert ?? []),
      ]

      const articlesDir = path.join(distPath, 'article')
      fs.mkdirSync(articlesDir, { recursive: true })

      for (const article of allArticles) {
        if (!article?.id) continue

        const pageTitle = `${article.title} | ${SITE_NAME}`
        const description = article.description || `${article.brand || SITE_NAME} — ${article.title}`
        const imageUrl = toAbsoluteUrl(origin, pickEmbedImage(article))
        const pageUrl = toAbsoluteUrl(origin, `/article/${article.id}`)

        let html = baseHtml
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`)
        html = replaceMetaTag(html, 'name', 'description', description)
        html = replaceMetaTag(html, 'property', 'og:type', 'article')
        html = replaceMetaTag(html, 'property', 'og:site_name', article.brand ? `${SITE_NAME} · ${article.brand}` : SITE_NAME)
        html = replaceMetaTag(html, 'property', 'og:title', article.title)
        html = replaceMetaTag(html, 'property', 'og:description', description)
        html = replaceMetaTag(html, 'property', 'og:image', imageUrl)
        html = replaceMetaTag(html, 'name', 'twitter:title', article.title)
        html = replaceMetaTag(html, 'name', 'twitter:description', description)
        html = replaceMetaTag(html, 'name', 'twitter:image', imageUrl)

        // Remove homepage-specific dimensions since article images vary in size
        html = html.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*">/gi, '')

        if (origin) {
          html = replaceMetaTag(html, 'property', 'og:url', pageUrl)
        }

        fs.writeFileSync(path.join(articlesDir, `${article.id}.html`), html, 'utf8')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    articleEmbedPagesPlugin(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
