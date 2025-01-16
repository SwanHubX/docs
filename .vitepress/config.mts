import { defineConfig } from 'vitepress'
import { zh } from './zh'
import { en } from './en'
import { getPosts } from './theme/utils/posts'
import * as fs from 'node:fs'
import * as path from 'node:path'

export default defineConfig({
  rewrites: {
    'zh/:rest*': ':rest*'
  },

  themeConfig: {
    search: {
      provider: 'local'
    },
    posts: await getPosts()
  },

  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', ...en },
  },

  async buildEnd() {
    const posts = await getPosts()
    const themeDir = path.join(__dirname, 'theme')
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true })
    }
    fs.writeFileSync(
      path.join(themeDir, 'posts.json'),
      JSON.stringify(posts, null, 2)
    )
  }
})