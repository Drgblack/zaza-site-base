import CommunityHub from "./community-hub.client";

export const dynamic = "force-static";

export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return <CommunityHub locale={locale} />;
}