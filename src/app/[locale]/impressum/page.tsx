import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum - Zaza Technologies',
  description: 'Impressum der Zaza Technologies UG (haftungsbeschränkt) gemäß § 5 TMG',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ImpressumPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Impressum</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          
          <p className="mb-6">
            Zaza Technologies UG (haftungsbeschränkt)<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Deutschland
          </p>
          
          <p className="mb-6">
            Handelsregister: [HRB-Nummer eintragen, sobald vorhanden]<br />
            Registergericht: Amtsgericht Düsseldorf
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Vertreten durch den Geschäftsführer:</h3>
          <p className="mb-6">Dr. Greg Blackburn</p>
          
          <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
          <p className="mb-6">
            E-Mail: <a href="mailto:greg@zazatechnologies.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">greg@zazatechnologies.com</a>
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Umsatzsteuer-ID</h3>
          <p className="mb-6">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            [wird nach Vergabe durch das Finanzamt ergänzt]
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
          <p className="mb-6">
            Dr. Greg Blackburn<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Deutschland
          </p>
        </div>
      </div>
    </div>
  );
}