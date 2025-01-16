import { globby } from 'globby'
import matter from 'gray-matter'
import * as fs from 'node:fs'
import * as path from 'node:path'

interface Post {
  url: string
  frontmatter: {
    title: string
    description: string
    image: string
    author: string
    date: string
    [key: string]: any
  }
}

export async function getPosts(): Promise<Post[]> {
  const posts = await globby(['swanbook/*.md'], {
    ignore: ['swanbook/index.md']
  })

  const postsData = await Promise.all(
    posts.map(async (file) => {
      const content = fs.readFileSync(file, 'utf-8')
      const { data: frontmatter } = matter(content)
      
      return {
        url: `/${file.replace(/\.md$/, '.html')}`,
        frontmatter: {
          ...frontmatter,
          date: frontmatter.date ? new Date(frontmatter.date).toISOString().slice(0, 10) : '2000-01-01'
        }
      }
    })
  )

  return postsData.sort((a, b) => {
    return b.frontmatter.date.localeCompare(a.frontmatter.date)
  })
} 