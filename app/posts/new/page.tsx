"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    categories: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("User not logged in");

    const body = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
      categories: form.categories.split(",").map((cat) => cat.trim()),
    };

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const err = await res.json();
      alert("Error: " + (err.message || "Something went wrong"));
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4 font-bold">New Post</h1>
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
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Categories (comma-separated)"
          value={form.categories}
          onChange={(e) => setForm({ ...form, categories: e.target.value })}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </main>
  );
}
