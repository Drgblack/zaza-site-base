import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informativa sulla Privacy - Zaza Technologies',
  description: 'Scopri come Zaza Technologies protegge la tua privacy e gestisce i tuoi dati personali in conformità con il GDPR e altre normative sulla privacy.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function InformativaSullaPrivacyPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Informativa sulla Privacy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ultimo aggiornamento: 1 gennaio 2025 | In vigore: 1 gennaio 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Entità Responsabile</h2>
            <p className="mb-4">
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Germania<br />
              <br />
              Amministratore delegato: Dr. Greg Blackburn<br />
              Email: greg@zazatechnologies.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Informazioni che Raccogliamo</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informazioni dell'Account</h3>
                <p>Quando crei un account, raccogliamo il tuo nome, indirizzo email, nome della scuola/organizzazione e ruolo (insegnante, amministratore, ecc.).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Dati di Utilizzo</h3>
                <p>Raccogliamo informazioni su come utilizzi il nostro servizio, incluse le funzionalità accedute, il tempo trascorso e i modelli di interazione per migliorare la nostra piattaforma.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Dati degli Studenti (Limitati)</h3>
                <p>Elaboriamo solo dati degli studenti che inserisci volontariamente per la generazione di feedback assistita da IA. Non raccogliamo mai direttamente identificatori personali o informazioni di contatto degli studenti.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Come Utilizziamo le tue Informazioni</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Erogazione del Servizio:</strong> Fornire strumenti didattici assistiti da IA e generazione di feedback</li>
              <li><strong>Gestione Account:</strong> Gestire il tuo abbonamento, fatturazione e richieste di supporto</li>
              <li><strong>Miglioramento Piattaforma:</strong> Analizzare modelli di utilizzo per migliorare le funzionalità e l'esperienza utente</li>
              <li><strong>Comunicazione:</strong> Inviare aggiornamenti importanti, notifiche di sicurezza e contenuti educativi opzionali</li>
              <li><strong>Conformità Legale:</strong> Rispettare i requisiti normativi e proteggere contro abusi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. I tuoi Diritti sotto il GDPR</h2>
            <p className="mb-4">Sotto il GDPR e altre normative sulla privacy, hai i seguenti diritti:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Diritto di Accesso:</strong> Richiedere una copia dei tuoi dati personali</li>
              <li><strong>Diritto di Rettifica:</strong> Correggere dati personali inesatti</li>
              <li><strong>Diritto di Cancellazione:</strong> Richiedere la cancellazione dei tuoi dati personali</li>
              <li><strong>Diritto alla Portabilità:</strong> Esportare i tuoi dati in un formato leggibile da macchina</li>
              <li><strong>Diritto di Opposizione:</strong> Opporsi al trattamento dei tuoi dati personali</li>
              <li><strong>Diritto di Limitazione:</strong> Richiedere la limitazione del trattamento</li>
            </ul>
            <p className="text-sm mt-4">Per esercitare questi diritti, contattaci a greg@zazatechnologies.com o usa le impostazioni del tuo account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Sicurezza dei Dati</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Crittografia:</strong> Tutti i dati sono crittografati in transito usando TLS 1.3 e a riposo usando crittografia AES-256</li>
              <li><strong>Data Center:</strong> I dati sono archiviati in data center sicuri e conformi SOC 2 nell'Unione Europea e negli Stati Uniti</li>
              <li><strong>Controlli di Accesso:</strong> Controlli di accesso rigorosi assicurano che solo il personale autorizzato possa accedere ai dati per scopi commerciali legittimi</li>
              <li><strong>Audit Regolari:</strong> Conduciamo audit di sicurezza regolari e test di penetrazione</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookie</h2>
            <p className="mb-4">Utilizziamo cookie e tecnologie simili per:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cookie Essenziali:</strong> Autenticazione account e funzionalità principali</li>
              <li><strong>Cookie Analitici:</strong> Comprendere modelli di utilizzo (anonimizzati)</li>
              <li><strong>Cookie delle Preferenze:</strong> Ricordare le tue impostazioni e scelte linguistiche</li>
            </ul>
            <p className="text-sm">Consulta la nostra Politica sui Cookie per informazioni dettagliate e opzioni di opt-out.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contatto</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Responsabile Privacy:</strong> Dr. Greg Blackburn</p>
              <p><strong>Email:</strong> greg@zazatechnologies.com</p>
              <p><strong>Indirizzo:</strong><br />
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Germania</p>
              <p><strong>Tempo di Risposta:</strong> Entro 30 giorni dalla ricezione</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}