import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen - Zaza Technologies',
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung der Zaza Technologies Dienste einschließlich Promptly KI-gestützte Lehrwerkzeuge.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function AGBPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Letzte Aktualisierung: 1. Januar 2025 | Gültig ab: 1. Januar 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
            <p className="mb-4">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen von:<br />
              <br />
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Deutschland<br />
              <br />
              Geschäftsführer: Dr. Greg Blackburn<br />
              E-Mail: greg@zazatechnologies.com
            </p>
            <p>Durch die Nutzung unserer Dienste stimmen Sie diesen AGB zu. Falls Sie mit Teilen dieser Bedingungen nicht einverstanden sind, dürfen Sie den Service nicht nutzen.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Benutzerkonten</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Kontoerstellung</h3>
                <p>Sie müssen vollständige und korrekte Angaben bei der Kontoerstellung machen. Sie sind für die Sicherheit Ihres Passworts und alle Aktivitäten unter Ihrem Konto verantwortlich.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Berechtigung</h3>
                <p>Sie müssen mindestens 18 Jahre alt sein oder die Zustimmung eines Erziehungsberechtigten haben. Für Bildungseinrichtungen müssen Sie zur Vertretung der Institution berechtigt sein.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Zulässige Nutzung</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Erlaubte Nutzung</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>KI-gestütztes Feedback für Schülerarbeiten generieren</li>
                  <li>Bildungsinhalte und Bewertungen erstellen</li>
                  <li>Klassenzimmerkommunikation mit Eltern verwalten</li>
                  <li>Analysen zur Verbesserung der Lehreffektivität nutzen</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Verbotene Nutzung</h3>
                <p>Sie dürfen den Service nicht nutzen für:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Verstöße gegen Gesetze oder Vorschriften</li>
                  <li>Verletzung von Urheberrechten</li>
                  <li>Upload von schädlichem Code oder Hacking-Versuche</li>
                  <li>Verarbeitung unangemessener Inhalte mit Minderjährigen</li>
                  <li>Verletzung der Privatsphäre von Schülern</li>
                  <li>Kommerzielle Nutzung außerhalb des Bildungsbereichs</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Abrechnung und Abonnements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Abonnement-Pläne</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Kostenloser Plan:</strong> Eingeschränkte Funktionen mit Nutzungsbegrenzungen</li>
                  <li><strong>Pro Plan:</strong> 14,99 €/Monat mit vollem Funktionsumfang</li>
                  <li><strong>Schulpläne:</strong> Individuelle Preisgestaltung für Institutionen</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Zahlungsbedingungen</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Abonnements werden monatlich oder jährlich im Voraus abgerechnet</li>
                  <li>Alle Gebühren sind nicht erstattungsfähig, außer gesetzlich vorgeschrieben</li>
                  <li>Preisänderungen mit 30 Tagen Vorlaufzeit</li>
                  <li>Fehlgeschlagene Zahlungen können zur Service-Aussetzung führen</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Schülerdaten und Datenschutz</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Datenminimierung</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Wir sammeln nur für die Servicebereitstellung notwendige Daten</li>
                  <li>Schülerarbeitsproben werden temporär verarbeitet, nicht gespeichert</li>
                  <li>Keine persönlichen Kontaktinformationen von Schülern werden gesammelt</li>
                  <li>Daten werden nach der Verarbeitung automatisch gelöscht</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ihre Verantwortlichkeiten</h3>
                <p>Sie müssen sicherstellen, dass Sie die ordnungsgemäße Berechtigung zur Verarbeitung von Schülerdaten über unseren Service haben und geltende Datenschutzgesetze und institutionelle Richtlinien einhalten.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Geistiges Eigentum</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Unsere Inhalte</h3>
                <p>Der Service und seine ursprünglichen Inhalte, Funktionen und Funktionalitäten sind Eigentum von Zaza Technologies und durch internationale Urheberrechts-, Markenrechts- und andere Gesetze zum Schutz des geistigen Eigentums geschützt.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ihre Inhalte</h3>
                <p>Sie behalten das Eigentum an allen Inhalten, die Sie in den Service hochladen. Durch die Nutzung unseres Service gewähren Sie uns eine Lizenz zur Verarbeitung Ihrer Inhalte ausschließlich zum Zweck der Bereitstellung unserer Bildungsservices.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Haftungsausschluss und Haftungsbeschränkung</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Service "Wie Besehen"</h3>
                <p>Der Service wird auf "WIE BESEHEN" und "WIE VERFÜGBAR" Basis bereitgestellt. Wir übernehmen keine ausdrücklichen oder stillschweigenden Garantien bezüglich des Betriebs oder Inhalts des Service.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Haftungsbeschränkung</h3>
                <p>Im weitesten gesetzlich zulässigen Umfang haftet Zaza Technologies nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die aus Ihrer Nutzung des Service entstehen.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Kündigung</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Durch Sie</h3>
                <p>Sie können Ihr Konto jederzeit kündigen, indem Sie uns kontaktieren oder die Kontoeinstellungen verwenden. Bei Kündigung endet Ihr Zugang zum Service sofort.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Durch uns</h3>
                <p>Wir können Ihr Konto sofort kündigen oder sperren, wenn Sie gegen diese AGB verstoßen oder Aktivitäten durchführen, die unserem Service oder anderen Nutzern schaden könnten.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Anwendbares Recht und Streitbeilegung</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Anwendbares Recht</h3>
                <p>Diese AGB unterliegen deutschem Recht unter Ausschluss kollisionsrechtlicher Bestimmungen.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Streitbeilegung</h3>
                <p>Wir ermutigen zur Streitbeilegung durch direkte Kommunikation. Für formelle Streitigkeiten können Sie uns unter greg@zazatechnologies.com kontaktieren oder eine Lösung über entsprechende Rechtskanäle in Düsseldorf, Deutschland suchen.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Kontakt</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Zaza Technologies UG (haftungsbeschränkt)</strong></p>
              <p><strong>E-Mail:</strong> greg@zazatechnologies.com</p>
              <p><strong>Support:</strong> greg@zazatechnologies.com</p>
              <p><strong>Adresse:</strong><br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Deutschland</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}