import Link from 'next/link';

export function SimpleFooter() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Zaza Promptly', href: '/en' },
        { name: 'Zaza Teach', href: 'https://teach.zazatechnologies.com' },
        { name: 'Pricing', href: '/en/pricing' },
        { name: 'Resources', href: '/en/resources' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/en/about' },
        { name: 'Blog', href: '/en/blog' },
        { name: 'FAQ', href: '/en/faq' },
        { name: 'Contact', href: '/en/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/en/privacy' },
        { name: 'Terms of Service', href: '/en/terms' },
        { name: 'Cookie Policy', href: '/en/cookies' },
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Zaza Technologies', href: 'https://zazatechnologies.com' },
        { name: 'RealtyClose', href: 'https://realtyclose.com' },
        { name: 'LinkedIn', href: 'https://linkedin.com/company/zaza-technologies' },
        { name: 'Support', href: '/en/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/en" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Zaza Technologies
              </span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-sm">
              AI-powered tools that help teachers save 5+ hours per week with intelligent lesson planning, grading assistance, and classroom management.
            </p>
            <p className="text-sm text-gray-500 italic">
              Built by educators for educators
            </p>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-500 space-y-1">
              <div>© 2024 Zaza Technologies. All rights reserved.</div>
              <address className="not-italic">
                Zaza Technologies UG (haftungsbeschränkt), Gumbertstraße 150, 40229 Düsseldorf, Germany
              </address>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://linkedin.com/company/zaza-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}