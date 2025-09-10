import { redirect } from 'next/navigation';

export default function RootPage() {
  // Fallback redirect in case middleware doesn't catch it
  redirect('/en');
}