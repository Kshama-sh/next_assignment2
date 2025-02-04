export const JSON_SERVER_URL = 'http://localhost:3001'

// pages/api/posts/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { search = '', page = 1, limit = 5 } = req.query
        
        let url = `http://localhost:3004/posts?`
        
        if (search) {
          url += `title_like=${search}&`
        }
        
        url += `_page=${page}&_limit=${limit}`

        const postsResponse = await fetch(url)
        const posts = await postsResponse.json()
        
        const totalCountResponse = await fetch(`http://localhost:3004/posts?title_like=${search}`)
        const totalPosts = await totalCountResponse.json()
        
        res.status(200).json({
          posts,
          totalPages: Math.ceil(totalPosts.length / Number(limit)),
          currentPage: Number(page)
        })
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' })
      }
      break

    case 'POST':
      try {
        const { title, author, content } = req.body

        if (!title || !author || !content) {
          return res.status(400).json({ error: 'Missing required fields' })
        }

        const newPost = {
          title,
          author,
          content,
          createdAt: new Date().toISOString()
        }

        const response = await fetch('http://localhost:3004/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPost)
        })

        const createdPost = await response.json()
        res.status(201).json(createdPost)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create post' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(`http://localhost:3004/posts/${id}`)
        const post = await response.json()
        res.status(200).json(post)
      } catch (error) {
        res.status(404).json({ error: 'Post not found' })
      }
      break

    case 'PUT':
      try {
        const { title, author, content } = req.body

        const updateData = {
          ...(title && { title }),
          ...(author && { author }),
          ...(content && { content })
        }

        const response = await fetch(`http://localhost:3004/posts/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
        })

        const updatedPost = await response.json()
        res.status(200).json(updatedPost)
      } catch (error) {
        res.status(500).json({ error: 'Failed to update post' })
      }
      break

    case 'DELETE':
      try {
        await fetch(`http://localhost:3004/posts/${id}`, {
          method: 'DELETE'
        })
        res.status(200).json({ message: 'Post deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}