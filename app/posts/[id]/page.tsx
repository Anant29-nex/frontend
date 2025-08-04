"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  content: string;
  author?: {
    name: string;
  };
};

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/posts/public/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          console.error("Error fetching post");
          return;
        }
        const data = await res.json();
        setPost(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!post) return <p className="p-8">Loading post...</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <button
        className="text-blue-600 underline mb-4"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 italic mb-6">
        By: {post.author?.name || "Unknown"}
      </p>

      <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
    </main>
  );
}
