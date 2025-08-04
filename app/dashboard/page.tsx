"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetch("http://localhost:5000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load posts.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        onClick={() => router.push("/posts/new")}
      >
        + New Post
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul>
          {posts.map((post: any) => (
            <li key={post._id} className="border p-4 mb-3">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">
                {post.content.substring(0, 100)}...
              </p>
              <div className="mt-2 flex gap-3">
                <button
                  className="text-blue-600 underline"
                  onClick={() => router.push(`/posts/edit/${post._id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 underline"
                  onClick={async () => {
                    const token = localStorage.getItem("token");
                    await fetch(`http://localhost:5000/posts/${post._id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
