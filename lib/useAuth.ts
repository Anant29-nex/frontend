"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type Decoded = { id: string; exp: number };

export function useAuth() {
  const [user, setUser] = useState<Decoded | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: Decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);
  return user;
}
