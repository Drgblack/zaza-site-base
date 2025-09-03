import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SearchX, Home, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 text-gray-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/en/blog">
              <BookOpen className="w-4 h-4" />
              Browse Blog
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}