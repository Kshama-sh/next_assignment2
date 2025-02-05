"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogForm() {
  const [formData, setFormData] = useState({ title: "", author: "", content: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPost = await response.json();
        router.push(`/posts/${newPost.id}`); 
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          rows={6}
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
}
