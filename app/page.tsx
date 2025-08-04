"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  content: string;
  author?: {
    name: string;
  };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/all")
      .then(async (res) => {
        if (!res.ok) {
          console.error("Error fetching posts");
          return;
        }
        const data = await res.json();
        setPosts(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <main className="p-8">
      <nav className=" border-4 rounded-4xl p-5">
        <div className=" flex items-center justify-between  ">
          <div>
            <img alt="logo"></img>
          </div>

          <ul className="flex items-center gap-5">
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </nav>

      <h1 className="text-2xl font-bold mb-4 pt-15">Blogs</h1>
      <div className="container">
        <section className="grid grid-cols-2">
          <div>
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts found.</p>
            ) : (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li
                    key={post._id}
                    className="border p-4 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => router.push(`/posts/${post._id}`)}
                  >
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-600 mb-2">
                      {post.content.substring(0, 1000)}...
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      By: {post.author?.name || "Unknown"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
