"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { state } = useAuthContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/results/${search}`);
    setSearch("");
  };

  return (
    <div className="flex items-center gap-2">
      <form
        className="flex justify-center md:justify-between"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="bg-white p-2 w-[260px] sm:w-80 text-xl rounded-xl text-black"
        />
      </form>
      {state.user.is_authenticated ? (
        <div>Welcome</div>
      ) : (
        <Link
          href="/login"
          className="p-2 bg-white rounded-lg text-black text-xl hover:bg-slate-200"
        >
          {" "}
          Log In
        </Link>
      )}
    </div>
  );
}
