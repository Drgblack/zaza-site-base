'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog post error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Article Not Available
          </h1>
          <p className="text-gray-600">
            We're having trouble loading this article. Please try again or browse other articles.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/en/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}