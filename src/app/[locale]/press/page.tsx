import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink } from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PressPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const pressReleases = [
    {
      title: "Zaza Promptly Launches AI-Powered Parent Communication Tool for Teachers",
      date: "January 2024",
      summary: "Revolutionary AI tool saves teachers 5+ hours per week on grading and parent communication.",
      link: "#"
    },
    {
      title: "PhD in Professional Education Builds Next-Gen EdTech Platform",
      date: "December 2023",
      summary: "From paint brushes to PhD - founder's journey shapes teacher-first AI design philosophy.",
      link: "#"
    }
  ];

  const mediaKit = [
    { name: "Zaza Promptly Logo Package", type: "ZIP", size: "2.4 MB" },
    { name: "Founder Headshots", type: "ZIP", size: "8.1 MB" },
    { name: "Product Screenshots", type: "ZIP", size: "5.7 MB" },
    { name: "Brand Guidelines", type: "PDF", size: "1.2 MB" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Resources, news, and stories about Zaza Promptly's mission to empower educators.
            </p>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              For press inquiries, interviews, or partnership opportunities, please get in touch.
            </p>
            <Button asChild size="lg">
              <a href="mailto:press@zazatechnologies.com">
                Contact Press Team
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
            
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{release.title}</CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{release.date}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={release.link}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{release.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Media Kit</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.type} • {item.size}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Company Facts</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2023</div>
                <div className="text-gray-600 dark:text-gray-300">Founded</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Teachers Helped</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600 dark:text-gray-300">Hours Saved Weekly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Cover Our Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're always happy to share insights about the intersection of AI and education.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            <a href="mailto:press@zazatechnologies.com">
              Get in Touch
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}