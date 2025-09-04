import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - Zaza Technologies',
  description: 'Mentions légales de Zaza Technologies UG (haftungsbeschränkt)',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function MentionsLegalesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mentions Légales</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="mb-6">
            Zaza Technologies UG (haftungsbeschränkt)<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Allemagne
          </p>
          
          <p className="mb-6">
            Registre du commerce : [numéro HRB, dès attribution]<br />
            Tribunal compétent : Amtsgericht Düsseldorf
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Directeur général :</h3>
          <p className="mb-6">Dr. Greg Blackburn</p>
          
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="mb-6">
            Email : <a href="mailto:greg@zazatechnologies.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">greg@zazatechnologies.com</a>
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Numéro de TVA intracommunautaire</h3>
          <p className="mb-6">
            Conformément à l'article 27 a de la loi allemande sur la TVA :<br />
            [à compléter dès émission]
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Responsable du contenu au sens de l'article 55 (2) RStV :</h3>
          <p className="mb-6">
            Dr. Greg Blackburn<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Allemagne
          </p>
        </div>
      </div>
    </div>
  );
}