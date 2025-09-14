export type Resource = { slug: string; title: string; href: string; category: string; size?: string };
export const RESOURCES: Resource[] = [];
export const categoryColors: Record<string,string> = {};