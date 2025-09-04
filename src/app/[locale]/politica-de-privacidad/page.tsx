import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Zaza Technologies',
  description: 'Conozca cómo Zaza Technologies protege su privacidad y maneja sus datos personales en cumplimiento con el RGPD y otras regulaciones de privacidad.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PoliticaDePrivacidadPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Última actualización: 1 de enero de 2025 | Vigente: 1 de enero de 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Entidad Responsable</h2>
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
            <h2 className="text-2xl font-semibold mb-4">2. Información que Recopilamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Información de la Cuenta</h3>
                <p>Cuando crea una cuenta, recopilamos su nombre, dirección de correo electrónico, nombre de la escuela/organización y rol (profesor, administrador, etc.).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Datos de Uso</h3>
                <p>Recopilamos información sobre cómo utiliza nuestro servicio, incluidas las funciones accedidas, el tiempo empleado y los patrones de interacción para mejorar nuestra plataforma.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Datos de Estudiantes (Limitados)</h3>
                <p>Solo procesamos datos de estudiantes que usted introduce voluntariamente para la generación de retroalimentación con IA. Nunca recopilamos identificadores personales o información de contacto de estudiantes directamente.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cómo Utilizamos su Información</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Prestación del Servicio:</strong> Proporcionar herramientas de enseñanza con IA y generación de retroalimentación</li>
              <li><strong>Gestión de la Cuenta:</strong> Gestionar su suscripción, facturación y solicitudes de soporte</li>
              <li><strong>Mejora de la Plataforma:</strong> Analizar patrones de uso para mejorar funciones y experiencia del usuario</li>
              <li><strong>Comunicación:</strong> Enviar actualizaciones importantes, notificaciones de seguridad y contenido educativo opcional</li>
              <li><strong>Cumplimiento Legal:</strong> Cumplir requisitos regulatorios y proteger contra el mal uso</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Sus Derechos bajo el RGPD</h2>
            <p className="mb-4">Bajo el RGPD y otras regulaciones de privacidad, usted tiene los siguientes derechos:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Derecho de Acceso:</strong> Solicitar una copia de sus datos personales</li>
              <li><strong>Derecho de Rectificación:</strong> Corregir datos personales inexactos</li>
              <li><strong>Derecho de Supresión:</strong> Solicitar la eliminación de sus datos personales</li>
              <li><strong>Derecho a la Portabilidad:</strong> Exportar sus datos en un formato legible por máquina</li>
              <li><strong>Derecho de Oposición:</strong> Oponerse al procesamiento de sus datos personales</li>
              <li><strong>Derecho de Limitación:</strong> Solicitar la limitación del procesamiento</li>
            </ul>
            <p className="text-sm mt-4">Para ejercer estos derechos, contáctenos en greg@zazatechnologies.com o use la configuración de su cuenta.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Seguridad de Datos</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cifrado:</strong> Todos los datos están cifrados en tránsito usando TLS 1.3 y en reposo usando cifrado AES-256</li>
              <li><strong>Centros de Datos:</strong> Los datos se almacenan en centros de datos seguros y conformes con SOC 2 en la Unión Europea y Estados Unidos</li>
              <li><strong>Controles de Acceso:</strong> Controles de acceso estrictos aseguran que solo el personal autorizado pueda acceder a los datos con fines comerciales legítimos</li>
              <li><strong>Auditorías Regulares:</strong> Realizamos auditorías de seguridad regulares y pruebas de penetración</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">Utilizamos cookies y tecnologías similares para:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cookies Esenciales:</strong> Autenticación de cuenta y funcionalidad principal</li>
              <li><strong>Cookies Analíticas:</strong> Comprender patrones de uso (anonimizado)</li>
              <li><strong>Cookies de Preferencias:</strong> Recordar sus configuraciones y selecciones de idioma</li>
            </ul>
            <p className="text-sm">Consulte nuestra Política de Cookies para obtener información detallada y opciones de exclusión.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Oficial de Privacidad:</strong> Dr. Greg Blackburn</p>
              <p><strong>Correo electrónico:</strong> greg@zazatechnologies.com</p>
              <p><strong>Dirección:</strong><br />
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Alemania</p>
              <p><strong>Tiempo de Respuesta:</strong> Dentro de 30 días desde la recepción</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}