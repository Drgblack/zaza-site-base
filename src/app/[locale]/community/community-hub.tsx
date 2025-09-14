import "server-only";
import Client from "./community-hub.client";
import type { Resource } from "@/lib/resources.shared";

async function loadResources(): Promise<Resource[]> {
  try {
    const mod = await import("@/lib/resources");
    const fn =
      (mod as any).getAllResources ??
      (mod as any).listResources ??
      (mod as any).default;
    const data = fn ? await Promise.resolve(fn()) : [];
    return (data ?? []) as Resource[];
  } catch {
    return [] as Resource[];
  }
}

export default async function CommunityHubPage({
  params
}: {
  params: { locale: string };
}) {
  const locale = params?.locale ?? "en";
  const resources = await loadResources();
  return <Client resources={resources} locale={locale} />;
}