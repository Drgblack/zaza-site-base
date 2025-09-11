import Link from 'next/link';
import Image from 'next/image';
import { HeroCarousel } from '@/components/hero/hero-carousel';
import { SnippetTool } from '@/components/tools/snippet-tool';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Transform Your Teaching with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of educators who save 5+ hours per week with intelligent lesson planning, 
            grading assistance, and parent communication tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://teach.zazatechnologies.com"
              className="bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              Start Free Trial
            </a>
            <Link 
              href="/en/demo"
              className="bg-white text-purple-600 py-4 px-8 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Live Snippet Tool Demo */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Try Our AI Comment Generator
            </h2>
            <p className="text-xl text-gray-600">
              See how AI can help you write personalized student feedback in seconds
            </p>
          </div>
          <SnippetTool />
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-8 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold">4.8/5 Rating</div>
                <div className="text-sm text-purple-200">From verified teachers</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🏫</span>
              <div>
                <div className="font-bold">10,000+ Teachers</div>
                <div className="text-sm text-purple-200">Save time every week</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💯</span>
              <div>
                <div className="font-bold">95% Love It</div>
                <div className="text-sm text-purple-200">Would recommend to colleagues</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How can Promptly actually help? Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How can Promptly actually help?
            </h2>
            <p className="text-xl text-gray-600">
              Concrete ways to transform your teaching workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✍️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Write messages 10× faster
              </h3>
              <p className="text-gray-600">
                From parent emails to progress reports in minutes, not hours
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Support every student
              </h3>
              <p className="text-gray-600">
                Personalized feedback for each learner, even with 150+ students
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Save hours each week
              </h3>
              <p className="text-gray-600">
                Reclaim your evenings and weekends for what matters most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Turn every message into minutes saved Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Turn every message into minutes saved
            </h2>
            <p className="text-xl text-gray-600">
              AI-powered tools designed for real classroom needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comment Bank</h3>
              <p className="text-gray-600 text-sm">Build and reuse personalized feedback library</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tone Match</h3>
              <p className="text-gray-600 text-sm">Adjust message tone for parents, students, or admin</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">🌍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Translation</h3>
              <p className="text-gray-600 text-sm">Communicate in 30+ languages instantly</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Templates</h3>
              <p className="text-gray-600 text-sm">Start with proven message frameworks</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">FERPA compliant, your data stays yours</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-gray-600 text-sm">One-click responses for common situations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Message Writer Panel */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Message Writer
            </h2>
            <p className="text-xl text-purple-100">
              See how Promptly transforms your notes into polished communication
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-100">Your quick notes:</h3>
                <div className="bg-white/5 rounded-lg p-4 font-mono text-sm">
                  Emma - math test 85%<br/>
                  good improvement<br/>
                  still needs work on fractions<br/>
                  parent conference?
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-100">Promptly creates:</h3>
                <div className="bg-white/5 rounded-lg p-4 text-sm leading-relaxed">
                  Dear Emma's Parents,<br/><br/>
                  I'm pleased to share that Emma scored 85% on her recent math test, showing notable improvement! 
                  While celebrating this progress, I've noticed fractions remain challenging. 
                  I'd love to discuss strategies to support her continued growth. 
                  Would you be available for a brief conference next week?<br/><br/>
                  Best regards,<br/>
                  [Your name]
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-purple-200">No typing. No ChatGPT prompting. Just teaching.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by teachers who value their time
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of educators already saving hours each week
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-semibold">KL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Katie L.</div>
                  <div className="text-sm text-gray-600">5th Grade Teacher</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I used to spend entire Sundays writing parent emails. Now I'm done in 30 minutes and the messages are even better. This is a game-changer!"
              </p>
              <div className="mt-4 text-purple-600">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-semibold">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marcus R.</div>
                  <div className="text-sm text-gray-600">High School Math</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Finally, feedback that sounds like me but takes 90% less time. My students get better support, and I get my evenings back."
              </p>
              <div className="mt-4 text-purple-600">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-700 font-semibold">SP</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah P.</div>
                  <div className="text-sm text-gray-600">Middle School English</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The translation feature alone is worth it. I can now communicate effectively with all my families, not just English speakers."
              </p>
              <div className="mt-4 text-purple-600">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Start free, stay affordable
          </h2>
          <p className="text-lg text-purple-100 mb-6">
            Free forever for basic use. Upgrade only when you need more.
          </p>
          <Link 
            href="/en/pricing"
            className="inline-block bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Pricing Plans
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Promptly vs ChatGPT for Teachers
            </h2>
            <p className="text-xl text-gray-600">
              Purpose-built for education, not generic AI
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">Zaza Promptly</th>
                  <th className="py-4 px-6 text-center">ChatGPT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Teacher-specific templates</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">FERPA compliant</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">One-click parent messages</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Student comment banks</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Grade-appropriate language</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">Maybe</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Bulk message generation</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">Education-focused support</td>
                  <td className="py-4 px-6 text-center text-green-600">✓</td>
                  <td className="py-4 px-6 text-center text-gray-400">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section - Keeping original as "Why Zaza Promptly?" */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Zaza Promptly?
            </h2>
            <p className="text-xl text-gray-600">
              Built by educators, for educators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Instant Feedback
              </h3>
              <p className="text-gray-600">
                Generate personalized comments and feedback in seconds
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Save Time
              </h3>
              <p className="text-gray-600">
                Reduce grading time by up to 80% with AI assistance
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Student-Focused
              </h3>
              <p className="text-gray-600">
                Maintain personal connection while scaling your impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Gradient Closer */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Imagine Sunday afternoons free
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            No more hours of grading. No more writer's block on parent emails. 
            Just more time for you, your family, and the teaching you love.
          </p>
          <a 
            href="https://teach.zazatechnologies.com"
            className="inline-block bg-white text-purple-800 py-4 px-10 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Your Free Trial Today
          </a>
          <p className="mt-6 text-purple-300 text-sm">
            No credit card required • Free forever for basic use • Cancel anytime
          </p>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/en/blog"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog</h3>
              <p className="text-gray-600">Latest insights and tips for educators</p>
            </Link>
            <Link 
              href="/en/resources"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
              <p className="text-gray-600">Free AI teaching materials and guides</p>
            </Link>
            <Link 
              href="/en/pricing"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
              <p className="text-gray-600">Plans that fit your teaching needs</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}