import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - Zaza Technologies',
  description: 'Découvrez comment Zaza Technologies protège votre vie privée et traite vos données personnelles en conformité avec le RGPD et autres réglementations de confidentialité.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PolitiqueDeConfidentialitePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Politique de Confidentialité</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : 1er janvier 2025 | En vigueur : 1er janvier 2025
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Entité Responsable</h2>
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
            <h2 className="text-2xl font-semibold mb-4">2. Informations que Nous Collectons</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informations de Compte</h3>
                <p>Lorsque vous créez un compte, nous collectons votre nom, adresse email, nom de l'école/organisation et rôle (enseignant, administrateur, etc.).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Données d'Usage</h3>
                <p>Nous collectons des informations sur la façon dont vous utilisez notre service, y compris les fonctionnalités consultées, le temps passé et les modèles d'interaction pour améliorer notre plateforme.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Données Étudiants (Limitées)</h3>
                <p>Nous traitons uniquement les données d'étudiants que vous saisissez volontairement pour la génération de feedback assisté par IA. Nous ne collectons jamais directement d'identifiants personnels ou d'informations de contact des étudiants.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Comment Nous Utilisons vos Informations</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Prestation du Service :</strong> Fournir des outils pédagogiques assistés par IA et génération de feedback</li>
              <li><strong>Gestion du Compte :</strong> Gérer votre abonnement, facturation et demandes de support</li>
              <li><strong>Amélioration de la Plateforme :</strong> Analyser les modèles d'usage pour améliorer les fonctionnalités et l'expérience utilisateur</li>
              <li><strong>Communication :</strong> Envoyer des mises à jour importantes, notifications de sécurité et contenu éducatif optionnel</li>
              <li><strong>Conformité Légale :</strong> Respecter les exigences réglementaires et protéger contre les abus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Vos Droits sous le RGPD</h2>
            <p className="mb-4">Sous le RGPD et autres réglementations de confidentialité, vous avez les droits suivants :</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Droit d'Accès :</strong> Demander une copie de vos données personnelles</li>
              <li><strong>Droit de Rectification :</strong> Corriger des données personnelles inexactes</li>
              <li><strong>Droit d'Effacement :</strong> Demander la suppression de vos données personnelles</li>
              <li><strong>Droit à la Portabilité :</strong> Exporter vos données dans un format lisible par machine</li>
              <li><strong>Droit d'Opposition :</strong> S'opposer au traitement de vos données personnelles</li>
              <li><strong>Droit de Limitation :</strong> Demander la limitation du traitement</li>
            </ul>
            <p className="text-sm mt-4">Pour exercer ces droits, contactez-nous à greg@zazatechnologies.com ou utilisez les paramètres de votre compte.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Sécurité des Données</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Chiffrement :</strong> Toutes les données sont chiffrées en transit avec TLS 1.3 et au repos avec le chiffrement AES-256</li>
              <li><strong>Centres de Données :</strong> Les données sont stockées dans des centres de données sécurisés et conformes SOC 2 dans l'Union européenne et aux États-Unis</li>
              <li><strong>Contrôles d'Accès :</strong> Des contrôles d'accès stricts garantissent que seul le personnel autorisé peut accéder aux données à des fins commerciales légitimes</li>
              <li><strong>Audits Réguliers :</strong> Nous effectuons des audits de sécurité réguliers et des tests de pénétration</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">Nous utilisons des cookies et technologies similaires pour :</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Cookies Essentiels :</strong> Authentification de compte et fonctionnalités principales</li>
              <li><strong>Cookies Analytiques :</strong> Comprendre les modèles d'usage (anonymisés)</li>
              <li><strong>Cookies de Préférences :</strong> Mémoriser vos paramètres et choix de langue</li>
            </ul>
            <p className="text-sm">Consultez notre Politique des Cookies pour des informations détaillées et options de désactivation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <p><strong>Responsable de la Confidentialité :</strong> Dr. Greg Blackburn</p>
              <p><strong>Email :</strong> greg@zazatechnologies.com</p>
              <p><strong>Adresse :</strong><br />
              Zaza Technologies UG (haftungsbeschränkt)<br />
              Gumbertstraße 150<br />
              40229 Düsseldorf<br />
              Allemagne</p>
              <p><strong>Délai de Réponse :</strong> Dans les 30 jours suivant la réception</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}