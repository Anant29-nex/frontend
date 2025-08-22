"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type Post = {
  _id: string;
  title: string;
  content: string;
  author?: { name: string };
};

export default function Home() {
  const { user } = useUser(); // ✅ get logged-in user
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/all`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      {user ? (
        <h1 className="text-xl font-bold">
          Welcome, {user.name || user.email} 👋
        </h1>
      ) : (
        <h1 className="text-xl">Welcome to the Blog</h1>
      )}

      <h2 className="text-lg mt-6">Posts</h2>
      <ul className="space-y-4 mt-4">
        {posts.map((p) => (
          <li key={p._id} className="p-4 border rounded">
            <h3 className="font-semibold">{p.title}</h3>
            <p>{p.content}</p>
            <p className="text-sm text-gray-500">
              By {p.author?.name || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
