import { setRequestLocale } from 'next-intl/server';
import ContactPageClient from './contact-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Zaza Technologies',
  description: 'Get in touch with our team. Ask questions, request demos, or share feedback about our AI-powered teaching tools.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <ContactPageClient />;
}