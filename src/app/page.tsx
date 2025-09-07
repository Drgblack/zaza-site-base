import {redirect} from 'next/navigation';

export default function Root() {
  redirect('/en'); // <— change to your default locale if not 'en'
}
