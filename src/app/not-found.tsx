export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a 
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}