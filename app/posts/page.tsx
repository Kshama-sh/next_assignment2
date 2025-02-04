import { notFound } from "next/navigation";

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    author: "John Doe",
    content: "Next.js is a powerful React framework that enables developers to build fast, SEO-friendly applications with server-side rendering and static site generation capabilities..."
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    author: "Jane Smith",
    content: "React Hooks are a revolutionary addition to React that allow you to use state and other React features in functional components, eliminating the need for class components..."
  },
  {
    id: 3,
    title: "Tailwind CSS Basics",
    author: "Mike Johnson",
    content: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup, making development faster and more flexible..."
  }
];

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) return notFound(); 

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600 text-sm mt-2">By {post.author}</p>
      <div className="mt-4">{post.content}</div>
    </div>
  );
}
