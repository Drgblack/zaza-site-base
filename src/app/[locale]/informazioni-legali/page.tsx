import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informazioni Legali - Zaza Technologies',
  description: 'Informazioni legali di Zaza Technologies UG (haftungsbeschränkt)',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function InformazioniLegaliPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Informazioni Legali</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="mb-6">
            Zaza Technologies UG (haftungsbeschränkt)<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Germania
          </p>
          
          <p className="mb-6">
            Registro delle imprese: [numero HRB da inserire quando disponibile]<br />
            Tribunale del registro: Amtsgericht Düsseldorf
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Amministratore delegato:</h3>
          <p className="mb-6">Dr. Greg Blackburn</p>
          
          <h3 className="text-lg font-semibold mb-4">Contatti</h3>
          <p className="mb-6">
            Email: <a href="mailto:greg@zazatechnologies.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">greg@zazatechnologies.com</a>
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Partita IVA</h3>
          <p className="mb-6">
            Numero di identificazione IVA ai sensi dell'articolo 27 a della legge tedesca sull'IVA:<br />
            [da aggiungere una volta rilasciato]
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Responsabile dei contenuti ai sensi dell'articolo 55 (2) RStV:</h3>
          <p className="mb-6">
            Dr. Greg Blackburn<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Germania
          </p>
        </div>
      </div>
    </div>
  );
}