import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CareersPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Help build the next generation of AI-powered educational tools. Experience with React, Node.js, and AI/ML integrations preferred."
    },
    {
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive go-to-market strategy for our teacher-focused AI products. Education sector experience strongly preferred."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Support and guide educators in their journey with Zaza Promptly. Teaching background highly valued."
    }
  ];

  const benefits = [
    "100% Remote Work",
    "Competitive Salary + Equity",
    "Health, Dental & Vision",
    "Flexible PTO",
    "Learning & Development Budget",
    "Home Office Setup Allowance",
    "Mission-Driven Culture",
    "Work-Life Balance"
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Help us build AI tools that give teachers back their time, energy, and passion for education.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Zaza Technologies?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We're building something meaningful - AI that truly serves educators and transforms how teaching gets done.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Impact-First Culture</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every feature we build directly improves a teacher's daily life. Your work matters.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Remote-First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work from anywhere with flexible hours and a focus on results, not hours logged.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Early Stage Growth</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Join us early and shape the future of educational technology from the ground up.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant="outline">{position.location}</Badge>
                          <Badge variant="outline">{position.type}</Badge>
                        </div>
                      </div>
                      <Button asChild>
                        <a href={`mailto:careers@zazatechnologies.com?subject=Application: ${position.title}`}>
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{position.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {openPositions.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Open Positions</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We don't have any open positions right now, but we're always interested in hearing from talented people.
                  </p>
                  <Button asChild variant="outline">
                    <a href="mailto:careers@zazatechnologies.com">
                      Send us your resume
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-purple-600">Teacher-First</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every decision we make starts with: "How does this help teachers?"
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-purple-600">Authentic Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We build solutions grounded in real educational experience, not flashy tech demos.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-purple-600">Sustainable Growth</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We prioritize long-term impact over short-term metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join a team that's passionate about empowering educators and transforming education.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
            <a href="mailto:careers@zazatechnologies.com">
              Start the Conversation
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}