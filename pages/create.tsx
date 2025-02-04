import { CreateBlogForm } from '../components/CreateBlogForm'

export default function CreateBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <CreateBlogForm />
    </div>
  )
}

// pages/posts/[id].tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`)
  const post = await res.json()

  return { props: { post } }
}

export default function PostDetailPage({ post }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/posts/${post.id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          router.push('/')
        } else {
          alert('Failed to delete post')
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Something went wrong')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">By {post.author}</p>
        <p className="mb-6">{post.content}</p>

        <div className="flex space-x-4">
          <Link 
            href={`/update/${post.id}`} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
Last edited 55 minutes ago