import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal - Zaza Technologies',
  description: 'Aviso legal de Zaza Technologies UG (haftungsbeschränkt)',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function AvisoLegalPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Aviso Legal</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="mb-6">
            Zaza Technologies UG (haftungsbeschränkt)<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Alemania
          </p>
          
          <p className="mb-6">
            Registro mercantil: [número HRB, una vez asignado]<br />
            Juzgado de registro: Amtsgericht Düsseldorf
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Director gerente:</h3>
          <p className="mb-6">Dr. Greg Blackburn</p>
          
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="mb-6">
            Correo electrónico: <a href="mailto:greg@zazatechnologies.com" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">greg@zazatechnologies.com</a>
          </p>
          
          <h3 className="text-lg font-semibold mb-4">NIF-IVA</h3>
          <p className="mb-6">
            Número de identificación fiscal a efectos del IVA conforme al artículo 27 a de la Ley alemana del IVA:<br />
            [se añadirá cuando se emita]
          </p>
          
          <h3 className="text-lg font-semibold mb-4">Responsable del contenido según el artículo 55 (2) RStV:</h3>
          <p className="mb-6">
            Dr. Greg Blackburn<br />
            Gumbertstraße 150<br />
            40229 Düsseldorf<br />
            Alemania
          </p>
        </div>
      </div>
    </div>
  );
}