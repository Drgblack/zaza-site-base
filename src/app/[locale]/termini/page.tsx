import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termini di Servizio - Zaza Technologies',
  description: 'Termini e condizioni per l\'uso dei servizi Zaza Technologies inclusi gli strumenti didattici Promptly assistiti da IA.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function TerminiPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Termini di Servizio</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ultimo aggiornamento: 1 gennaio 2025 | In vigore: 1 gennaio 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Accordo sui Termini</h2>
            <p className="mb-4">
              Accedendo o utilizzando i servizi di Zaza Technologies (&quot;Servizio&quot;), accetti di essere vincolato da questi Termini di Servizio (&quot;Termini&quot;). Se non sei d&apos;accordo con qualsiasi parte di questi termini, non puoi accedere al Servizio.
            </p>
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
            <h2 className="text-2xl font-semibold mb-4">2. Account Utente</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Creazione Account</h3>
                <p>Devi fornire informazioni accurate, complete e aggiornate durante la creazione di un account. Sei responsabile della protezione della tua password e di tutte le attività sotto il tuo account.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Idoneità</h3>
                <p>Devi avere almeno 18 anni o avere il consenso genitoriale/tutoriale per utilizzare il nostro Servizio. Per gli account di istituzioni educative, devi essere autorizzato ad agire per conto dell&apos;istituzione.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Politica di Uso Accettabile</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Usi Consentiti</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Generare feedback assistito da IA per lavori degli studenti</li>
                  <li>Creare contenuti educativi e valutazioni</li>
                  <li>Gestire comunicazioni in classe con i genitori</li>
                  <li>Utilizzare analisi per migliorare l&apos;efficacia didattica</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Usi Vietati</h3>
                <p>Non puoi utilizzare il Servizio per:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Violare leggi o regolamenti</li>
                  <li>Infrangere diritti di proprietà intellettuale</li>
                  <li>Caricare codice dannoso o tentare di hackerare il sistema</li>
                  <li>Condividere o elaborare contenuti inappropriati che coinvolgono minori</li>
                  <li>Violare la privacy degli studenti o regolamenti educativi</li>
                  <li>Usare il servizio per scopi commerciali al di fuori dell&apos;istruzione</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Fatturazione e Abbonamenti</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Piani di Abbonamento</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Piano Gratuito:</strong> Funzionalità limitate con restrizioni d&apos;uso</li>
                  <li><strong>Piano Pro:</strong> €14.99/mese con accesso completo alle funzionalità</li>
                  <li><strong>Piani Scolastici:</strong> Prezzi personalizzati per le istituzioni</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Termini di Pagamento</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Gli abbonamenti sono fatturati mensilmente o annualmente in anticipo</li>
                  <li>Tutte le tariffe non sono rimborsabili tranne quando richiesto dalla legge</li>
                  <li>I prezzi possono cambiare con 30 giorni di preavviso</li>
                  <li>I pagamenti falliti possono risultare nella sospensione del servizio</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Legge Applicabile e Risoluzione delle Controversie</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Legge Applicabile</h3>
                <p>Questi Termini sono governati dalle leggi della Germania, senza riguardo alle sue disposizioni sui conflitti di legge.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Risoluzione delle Controversie</h3>
                <p>Incoraggiamo la risoluzione delle controversie attraverso comunicazione diretta. Per controversie formali, puoi contattarci a greg@zazatechnologies.com o cercare risoluzione attraverso canali legali appropriati a Düsseldorf, Germania.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contatto</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Zaza Technologies UG (haftungsbeschränkt)</strong></p>
              <p><strong>Email:</strong> greg@zazatechnologies.com</p>
              <p><strong>Supporto:</strong> greg@zazatechnologies.com</p>
              <p><strong>Indirizzo:</strong><br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Germania</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}