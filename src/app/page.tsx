export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <header className="mb-10 flex items-center justify-between">
        <div className="font-semibold">Zaza</div>
        <nav className="space-x-6 text-sm">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section className="mb-12">
        <h1 className="text-4xl font-bold leading-tight">We help teachers thrive.</h1>
        <p className="mt-4 text-lg text-gray-600">
          Clean base site. We’ll add components, copy, and forms next.
        </p>
      </section>
    </main>
  );
}
