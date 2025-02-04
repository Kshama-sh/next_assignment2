"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  const defaultPosts = [
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

  const [posts, setPosts] = useState(defaultPosts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title && post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} /> 
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold ">Blog Posts</h1>
        </div>
        <div className="flex flex-col gap-2" >
          {currentPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="border p-4 rounded cursor-pointer hover:shadow-lg">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-600">By {post.author}</p>
                <p className="mt-2">{post.content.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage))
              )
            }
            disabled={
              currentPage === Math.ceil(filteredPosts.length / postsPerPage)
            }
            className="p-2 border"
          >
            Next
          </button>
        </div>
    </div>
    </div>
    
  );
}
