export const clientImage = (src?: string) =>
  src && typeof src === "string" && src.length > 0 ? src : "/images/blog/default.jpg";