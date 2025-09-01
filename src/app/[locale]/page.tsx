import {setRequestLocale} from 'next-intl/server';
import { Hero } from "@/components/site/hero";
import { Features } from "@/components/site/features";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
    </div>
  );
}