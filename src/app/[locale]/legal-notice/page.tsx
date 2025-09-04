import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Notice - Zaza Technologies',
  description: 'Legal notice for Zaza Technologies UG (haftungsbeschränkt)',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LegalNoticePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Legal Notice</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="mb-6">
            Zaza Technologies UG (haftungsbeschränkt)<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Germany
          </p>
          
          <p className="mb-6">
            Commercial Register: [insert HRB number once assigned]<br />
            Register Court: Amtsgericht Düsseldorf
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Managing Director:</h3>
          <p className="mb-6">Dr. Greg Blackburn</p>
          
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="mb-6">
            Email: <a href="mailto:greg@zazatechnologies.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">greg@zazatechnologies.com</a>
          </p>
          
          <h3 className="text-lg font-semibold mb-4">VAT ID</h3>
          <p className="mb-6">
            VAT Identification Number in accordance with Section 27 a of the German VAT Act:<br />
            [to be added once issued]
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Responsible for content under Section 55 (2) RStV:</h3>
          <p className="mb-6">
            Dr. Greg Blackburn<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Germany
          </p>
        </div>
      </div>
    </div>
  );
}