export default function BuildStamp() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "";
  const short = sha ? sha.slice(0,7) : "dev";
  const url = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL || "";
  return (
    <div className="text-[11px] text-muted-foreground mt-2 opacity-60 select-all">
      build: {short} {url && `• ${url}`}
    </div>
  );
}