'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import {Link} from '@/i18n/routing'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">500</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm max-w-2xl mx-auto">
            <summary className="cursor-pointer font-medium">Error Details (for debugging)</summary>
            <div className="mt-2 space-y-2">
              <div><strong>Message:</strong> {error.message}</div>
              <div><strong>Digest:</strong> {error.digest || 'None'}</div>
              <pre className="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded overflow-auto max-h-40">
                {error.stack}
              </pre>
            </div>
          </details>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}