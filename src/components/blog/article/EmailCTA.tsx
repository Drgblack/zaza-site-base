"use client";
export default function EmailCTA({ variant }:{ variant:"newsletter"|"product" }) {
  if (variant === "product") {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <h3 className="text-xl font-semibold">Try Zaza Teach</h3>
        <p className="mt-1 opacity-80">Lesson planning & classroom management with AI.</p>
        <a href="/teach" className="mt-4 inline-block rounded-xl border px-4 py-2">Get Started</a>
      </div>
    );
  }
  return (
    <form className="rounded-2xl border p-6">
      <h3 className="text-xl font-semibold">Get weekly AI-in-education tips</h3>
      <p className="mt-1 opacity-80">One practical insight every week.</p>
      <div className="mt-4 flex gap-2">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="you@school.edu" />
        <button className="rounded-xl border px-4">Subscribe</button>
      </div>
    </form>
  );
}