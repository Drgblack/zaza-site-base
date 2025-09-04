import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales - Zaza Technologies',
  description: 'Conditions générales d\'utilisation des services Zaza Technologies incluant les outils pédagogiques Promptly assistés par IA.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ConditionsGeneralesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Conditions Générales d&apos;Utilisation</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : 1er janvier 2025 | En vigueur : 1er janvier 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
            <p className="mb-4">
              En accédant ou en utilisant les services de Zaza Technologies (« Service »), vous acceptez d&apos;être lié par ces Conditions d&apos;Utilisation (« Conditions »). Si vous n&apos;acceptez pas une partie de ces conditions, vous ne pouvez pas accéder au Service.
            </p>
            <p className="mb-4">
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Allemagne<br />
              <br />
              Directeur général : Dr. Greg Blackburn<br />
              Email : greg@zazatechnologies.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Comptes Utilisateur</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Création de Compte</h3>
                <p>Vous devez fournir des informations précises, complètes et à jour lors de la création d&apos;un compte. Vous êtes responsable de la protection de votre mot de passe et de toutes les activités sous votre compte.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Éligibilité</h3>
                <p>Vous devez avoir au moins 18 ans ou avoir le consentement parental/tutélaire pour utiliser notre Service. Pour les comptes d&apos;institutions éducatives, vous devez être autorisé à agir au nom de l&apos;institution.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Politique d&apos;Usage Acceptable</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Usages Autorisés</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Générer des commentaires assistés par IA pour les travaux d&apos;étudiants</li>
                  <li>Créer du contenu éducatif et des évaluations</li>
                  <li>Gérer les communications de classe avec les parents</li>
                  <li>Utiliser les analyses pour améliorer l&apos;efficacité de l&apos;enseignement</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Usages Interdits</h3>
                <p>Vous ne pouvez pas utiliser le Service pour :</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Violer des lois ou réglementations</li>
                  <li>Enfreindre les droits de propriété intellectuelle</li>
                  <li>Télécharger du code malveillant ou tenter de pirater le système</li>
                  <li>Partager ou traiter du contenu inapproprié impliquant des mineurs</li>
                  <li>Violer la vie privée des étudiants ou les réglementations éducatives</li>
                  <li>Utiliser le service à des fins commerciales en dehors de l&apos;éducation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Facturation et Abonnements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Plans d&apos;Abonnement</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Plan Gratuit :</strong> Fonctionnalités limitées avec restrictions d&apos;usage</li>
                  <li><strong>Plan Pro :</strong> 14,99 €/mois avec accès complet aux fonctionnalités</li>
                  <li><strong>Plans Scolaires :</strong> Prix personnalisés pour les institutions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Conditions de Paiement</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Les abonnements sont facturés mensuellement ou annuellement à l&apos;avance</li>
                  <li>Tous les frais ne sont pas remboursables sauf si requis par la loi</li>
                  <li>Les prix peuvent changer avec un préavis de 30 jours</li>
                  <li>Les paiements échoués peuvent entraîner une suspension du service</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Droit Applicable et Résolution des Litiges</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Droit Applicable</h3>
                <p>Ces Conditions sont régies par les lois de l&apos;Allemagne, sans égard à ses dispositions sur les conflits de lois.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Résolution des Litiges</h3>
                <p>Nous encourageons la résolution des litiges par communication directe. Pour les litiges formels, vous pouvez nous contacter à greg@zazatechnologies.com ou chercher une résolution par les canaux légaux appropriés à Düsseldorf, Allemagne.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Zaza Technologies UG (haftungsbeschränkt)</strong></p>
              <p><strong>Email :</strong> greg@zazatechnologies.com</p>
              <p><strong>Support :</strong> greg@zazatechnologies.com</p>
              <p><strong>Adresse :</strong><br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Allemagne</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}