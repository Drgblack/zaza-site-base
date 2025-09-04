import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - Zaza Technologies',
  description: 'Erfahren Sie, wie Zaza Technologies Ihre Privatsphäre schützt und Ihre persönlichen Daten in Übereinstimmung mit der DSGVO verarbeitet.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function DatenschutzPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Letzte Aktualisierung: 1. Januar 2025 | Gültig ab: 1. Januar 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Verantwortliche Stelle</h2>
            <p className="mb-4">
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Deutschland<br />
              <br />
              Geschäftsführer: Dr. Greg Blackburn<br />
              E-Mail: greg@zazatechnologies.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Kontoinformationen</h3>
                <p>Bei der Kontoerstellung erheben wir Ihren Namen, E-Mail-Adresse, Schule/Organisation und Rolle (Lehrer, Administrator, etc.).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Nutzungsdaten</h3>
                <p>Wir erfassen Informationen über Ihre Nutzung unseres Service, einschließlich genutzter Funktionen, Verweildauer und Interaktionsmustern zur Verbesserung unserer Plattform.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Schülerdaten (begrenzt)</h3>
                <p>Wir verarbeiten nur Schülerdaten, die Sie freiwillig für die KI-gestützte Feedback-Generierung eingeben. Wir sammeln niemals direkt persönliche Identifikatoren oder Kontaktinformationen von Schülern.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Zweck der Datenverarbeitung</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Service-Bereitstellung:</strong> Bereitstellung KI-gestützter Lehrwerkzeuge und Feedback-Generierung</li>
              <li><strong>Kontoverwaltung:</strong> Verwaltung Ihres Abonnements, der Abrechnung und Support-Anfragen</li>
              <li><strong>Plattform-Verbesserung:</strong> Analyse von Nutzungsmustern zur Verbesserung von Funktionen und Benutzererfahrung</li>
              <li><strong>Kommunikation:</strong> Versendung wichtiger Updates, Sicherheitsbenachrichtigungen und optionaler Bildungsinhalte</li>
              <li><strong>Rechtliche Compliance:</strong> Erfüllung regulatorischer Anforderungen und Schutz vor Missbrauch</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Ihre Rechte nach der DSGVO</h2>
            <p className="mb-4">Nach der DSGVO haben Sie folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Recht auf Auskunft:</strong> Anfrage einer Kopie Ihrer personenbezogenen Daten</li>
              <li><strong>Recht auf Berichtigung:</strong> Korrektur unrichtiger personenbezogener Daten</li>
              <li><strong>Recht auf Löschung:</strong> Anfrage der Löschung Ihrer personenbezogenen Daten</li>
              <li><strong>Recht auf Datenübertragbarkeit:</strong> Export Ihrer Daten in einem maschinenlesbaren Format</li>
              <li><strong>Widerspruchsrecht:</strong> Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten</li>
              <li><strong>Recht auf Einschränkung:</strong> Anfrage der Einschränkung der Verarbeitung</li>
            </ul>
            <p className="text-sm mt-4">Zur Ausübung dieser Rechte kontaktieren Sie uns unter greg@zazatechnologies.com oder nutzen Sie Ihre Kontoeinstellungen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Datensicherheit</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Verschlüsselung:</strong> Alle Daten werden bei der Übertragung mit TLS 1.3 und bei der Speicherung mit AES-256 verschlüsselt</li>
              <li><strong>Rechenzentren:</strong> Daten werden in sicheren, SOC 2-konformen Rechenzentren in der Europäischen Union und den Vereinigten Staaten gespeichert</li>
              <li><strong>Zugangskontrollen:</strong> Strenge Zugangskontrollen stellen sicher, dass nur autorisiertes Personal aus legitimen Geschäftszwecken auf Daten zugreifen kann</li>
              <li><strong>Regelmäßige Audits:</strong> Wir führen regelmäßige Sicherheitsaudits und Penetrationstests durch</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">Wir verwenden Cookies und ähnliche Technologien für:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Essentielle Cookies:</strong> Kontoanmeldung und Kernfunktionalitäten</li>
              <li><strong>Analyse-Cookies:</strong> Verstehen von Nutzungsmustern (anonymisiert)</li>
              <li><strong>Präferenz-Cookies:</strong> Speichern Ihrer Einstellungen und Sprachauswahl</li>
            </ul>
            <p className="text-sm">Weitere Informationen finden Sie in unserer Cookie-Richtlinie.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Kontakt</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Datenschutzbeauftragter:</strong> Dr. Greg Blackburn</p>
              <p><strong>E-Mail:</strong> greg@zazatechnologies.com</p>
              <p><strong>Adresse:</strong><br />
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Deutschland</p>
              <p><strong>Antwortzeit:</strong> Innerhalb von 30 Tagen nach Erhalt</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}