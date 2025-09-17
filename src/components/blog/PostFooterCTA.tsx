export default function PostFooterCTA() {
  return (
    <section className="mt-10 rounded-2xl border bg-gradient-to-br from-brand-50 to-white p-6">
      <h3 className="text-lg font-semibold">Get more time back each week</h3>
      <p className="text-sm text-zinc-600 mt-1">
        Join thousands of educators using Zaza tools to reclaim 3–5 hours/week.
      </p>
      <div className="mt-4 flex gap-2">
        <a className="inline-flex items-center rounded-lg px-4 py-2 bg-brand-600 text-white hover:bg-brand-700 transition"
           href="/signup">Try Free for 14 Days</a>
        <a className="inline-flex items-center rounded-lg px-4 py-2 border hover:bg-zinc-50 transition"
           href="/pricing">See Plans</a>
      </div>
    </section>
  )
}