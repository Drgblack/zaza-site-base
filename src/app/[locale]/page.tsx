import {setRequestLocale} from 'next-intl/server';
import { Hero } from "@/components/site/hero";
import { Features } from "@/components/site/features";
import { SnippetTool } from "@/components/site/snippet-tool";
import { ZaraAssistant } from "@/components/site/zara-assistant";
import { Testimonials } from "@/components/site/testimonials";
import { PricingCTA } from "@/components/site/pricing-cta";
import { BlogPreview } from "@/components/site/blog-preview";
import { ResourcesPreview } from "@/components/site/resources-preview";

type Props = {
  params: {locale: string};
};

export default function HomePage({params: {locale}}: Props) {
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <SnippetTool />
      <ZaraAssistant />
      <Testimonials />
      <PricingCTA />
      <BlogPreview />
      <ResourcesPreview />
    </div>
  );
}