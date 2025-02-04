"use client";
import { useState } from 'react';
import Link from 'next/link';

type NavbarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ search, setSearch }: NavbarProps) {
  return (
    <div className="flex gap-2 justify-between">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-2 border rounded-l-md"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r-md">
          Search
        </button>
      </div>
      <div>
        <Link href="/BlogForm" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Blog
        </Link>
      </div>
    </div>
  );
}
