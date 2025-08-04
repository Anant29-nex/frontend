"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    categories: "",
  });
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetch(`http://localhost:5000/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((post) =>
        setForm({
          title: post.title,
          content: post.content,
          tags: post.tags.join(", "),
          categories: post.categories.join(", "),
        })
      );
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updatedPost = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
      categories: form.categories.split(",").map((cat) => cat.trim()),
    };

    await fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    });

    router.push("/dashboard");
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4 font-bold">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Tags"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Categories"
          value={form.categories}
          onChange={(e) => setForm({ ...form, categories: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </main>
  );
}
