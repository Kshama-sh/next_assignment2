import { NextResponse } from "next/server";

let posts = [
  { id: 1, title: "Getting Started with Next.js", author: "John Doe", content: "Next.js is a powerful React framework..." },
  { id: 2, title: "Understanding React Hooks", author: "Jane Smith", content: "React Hooks allow functional components to manage state..." },
  { id: 3, title: "Tailwind CSS Basics", author: "Mike Johnson", content: "Tailwind CSS is a utility-first framework..." }
];

// GET request to fetch posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST request to create a new post
export async function POST(req: Request) {
  try {
    const { title, author, content } = await req.json();

    if (!title || !author || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newPost = { id: posts.length + 1, title, author, content };
    posts.push(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
