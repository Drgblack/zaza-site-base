import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Zaza Technologies',
  description: 'Términos y condiciones para el uso de los servicios de Zaza Technologies incluyendo herramientas de enseñanza con IA Promptly.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CondicionesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Términos y Condiciones</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Última actualización: 1 de enero de 2025 | Vigente: 1 de enero de 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acuerdo de Términos</h2>
            <p className="mb-4">
              Al acceder o utilizar los servicios de Zaza Technologies ("Servicio"), usted acepta estar sujeto a estos Términos de Servicio ("Términos"). Si no está de acuerdo con alguna parte de estos términos, no puede acceder al Servicio.
            </p>
            <p className="mb-4">
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Alemania<br />
              <br />
              Director gerente: Dr. Greg Blackburn<br />
              Correo electrónico: greg@zazatechnologies.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Cuentas de Usuario</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Creación de Cuenta</h3>
                <p>Debe proporcionar información precisa, completa y actualizada al crear una cuenta. Usted es responsable de proteger su contraseña y todas las actividades bajo su cuenta.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Elegibilidad</h3>
                <p>Debe tener al menos 18 años o contar con el consentimiento de los padres/tutores para usar nuestro Servicio. Para cuentas de instituciones educativas, debe estar autorizado para actuar en nombre de la institución.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Política de Uso Aceptable</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Usos Permitidos</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Generar retroalimentación con IA para trabajos de estudiantes</li>
                  <li>Crear contenido educativo y evaluaciones</li>
                  <li>Gestionar comunicaciones del aula con padres</li>
                  <li>Utilizar análisis para mejorar la efectividad de la enseñanza</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Usos Prohibidos</h3>
                <p>No puede usar el Servicio para:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Violar leyes o regulaciones</li>
                  <li>Infringir derechos de propiedad intelectual</li>
                  <li>Subir código malicioso o intentar hackear el sistema</li>
                  <li>Compartir o procesar contenido inapropiado con menores</li>
                  <li>Violar la privacidad de estudiantes o regulaciones educativas</li>
                  <li>Usar el servicio para propósitos comerciales fuera de la educación</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Facturación y Suscripciones</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Planes de Suscripción</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Plan Gratuito:</strong> Funciones limitadas con restricciones de uso</li>
                  <li><strong>Plan Pro:</strong> €14.99/mes con acceso completo a funciones</li>
                  <li><strong>Planes Escolares:</strong> Precios personalizados para instituciones</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Términos de Pago</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Las suscripciones se facturan mensual o anualmente por adelantado</li>
                  <li>Todas las tarifas no son reembolsables excepto cuando lo requiera la ley</li>
                  <li>Los precios pueden cambiar con 30 días de aviso</li>
                  <li>Los pagos fallidos pueden resultar en suspensión del servicio</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Datos de Estudiantes y Privacidad</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Minimización de Datos</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Solo recopilamos datos necesarios para la prestación del servicio</li>
                  <li>Las muestras de trabajo de estudiantes se procesan de forma transitoria, no se almacenan</li>
                  <li>No se recopila información de contacto personal de estudiantes</li>
                  <li>Los datos se purgan automáticamente después del procesamiento</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Ley Aplicable y Resolución de Disputas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ley Aplicable</h3>
                <p>Estos Términos se rigen por las leyes de Alemania, sin tener en cuenta sus disposiciones sobre conflictos de leyes.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Resolución de Disputas</h3>
                <p>Alentamos resolver disputas a través de comunicación directa. Para disputas formales, puede contactarnos en greg@zazatechnologies.com o buscar resolución a través de canales legales apropiados en Düsseldorf, Alemania.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Zaza Technologies UG (haftungsbeschränkt)</strong></p>
              <p><strong>Correo electrónico:</strong> greg@zazatechnologies.com</p>
              <p><strong>Soporte:</strong> greg@zazatechnologies.com</p>
              <p><strong>Dirección:</strong><br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Alemania</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}